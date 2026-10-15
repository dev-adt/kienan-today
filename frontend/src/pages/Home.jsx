import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingAIBot from '../components/FloatingAIBot';
import SEOHead from '../components/SEOHead';
import SpotlightBanner from '../components/SpotlightBanner';
import brandConfig from '../brand.config';
import { getCategoryLabel } from '../constants/categories';
import { fetchJsonWithTimeout, FALLBACK_POSTS, FALLBACK_EVENTS, FALLBACK_MEMBERS } from '../utils/api';
import './HomeKienAn.css';

// Sub-component đếm ngược sự kiện độc lập (memoized chống giật dịch DOM)
const HomeEventCountdown = React.memo(({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!eventDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    let dateStr = String(eventDate).trim();
    if (/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}(:\d{2})?$/.test(dateStr)) {
      dateStr = dateStr.replace(' ', 'T') + '+07:00';
    }
    const diff = new Date(dateStr).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  });

  useEffect(() => {
    if (!eventDate) return;
    const timer = setInterval(() => {
      try {
        let dateStr = String(eventDate).trim();
        if (/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}(:\d{2})?$/.test(dateStr)) {
          dateStr = dateStr.replace(' ', 'T') + '+07:00';
        }
        const diff = new Date(dateStr).getTime() - Date.now();
        if (diff > 0) {
          setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60)
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      } catch (e) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
      <div style={{ background: '#102A43', color: '#5EEAD4', padding: '6px 10px', borderRadius: '6px', textAlign: 'center', minWidth: '45px' }}>
        <div style={{ fontSize: '15px', fontWeight: '800' }} className="notranslate" translate="no">{String(timeLeft.days).padStart(2, '0')}</div>
        <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#CBD5E1' }}>Ngày</div>
      </div>
      <div style={{ background: '#102A43', color: '#5EEAD4', padding: '6px 10px', borderRadius: '6px', textAlign: 'center', minWidth: '45px' }}>
        <div style={{ fontSize: '15px', fontWeight: '800' }} className="notranslate" translate="no">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#CBD5E1' }}>Giờ</div>
      </div>
      <div style={{ background: '#102A43', color: '#5EEAD4', padding: '6px 10px', borderRadius: '6px', textAlign: 'center', minWidth: '45px' }}>
        <div style={{ fontSize: '15px', fontWeight: '800' }} className="notranslate" translate="no">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#CBD5E1' }}>Phút</div>
      </div>
      <div style={{ background: '#102A43', color: '#5EEAD4', padding: '6px 10px', borderRadius: '6px', textAlign: 'center', minWidth: '45px' }}>
        <div style={{ fontSize: '15px', fontWeight: '800' }} className="notranslate" translate="no">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#CBD5E1' }}>Giây</div>
      </div>
    </div>
  );
});

export const Home = () => {
  const { currentLang, t } = useTranslation();
  const navigate = useNavigate();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Form Đồng hành & Kết nối (POST /api/leads)
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    serviceNeed: 'Giới thiệu doanh nghiệp & Dịch vụ địa phương',
    notes: '',
    agreeTerms: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Dynamic Live Data từ Backend
  const [latestPosts, setLatestPosts] = useState(FALLBACK_POSTS);
  const [eventsList, setEventsList] = useState(FALLBACK_EVENTS);
  const [featuredMembers, setFeaturedMembers] = useState(FALLBACK_MEMBERS);
  const [selectedPostFilter, setSelectedPostFilter] = useState('all');

  // Interactive AI Assistant Box State (Section 10)
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Xin chào! Tôi là Trợ lý AI của kienan.today. Bạn muốn tìm hiểu thông tin gì về Đồi Thiên Văn, Hồ Hạnh Phúc, doanh nghiệp hay giải pháp AI?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Quick Event Registration Modal State
  const [registerModalEvent, setRegisterModalEvent] = useState(null);
  const [regForm, setRegForm] = useState({ fullName: '', phone: '', email: '', quantity: 1 });
  const [submittingReg, setSubmittingReg] = useState(false);
  const [regSuccessData, setRegSuccessData] = useState(null);

  // Nạp dữ liệu đồng thời từ API
  useEffect(() => {
    let isMounted = true;
    const fetchHomeData = async () => {
      try {
        const [postsRes, eventsRes, membersRes] = await Promise.allSettled([
          fetchJsonWithTimeout('/api/posts?limit=6'),
          fetchJsonWithTimeout('/api/events?limit=4'),
          fetchJsonWithTimeout('/api/members?limit=4')
        ]);

        if (isMounted) {
          if (postsRes.status === 'fulfilled' && postsRes.value?.data) {
            setLatestPosts(postsRes.value.data);
          }
          if (eventsRes.status === 'fulfilled' && eventsRes.value?.data) {
            setEventsList(eventsRes.value.data);
          }
          if (membersRes.status === 'fulfilled' && membersRes.value?.data) {
            setFeaturedMembers(membersRes.value.data);
          }
        }
      } catch (err) {
        console.warn('Lỗi nạp dữ liệu trang chủ kienan.today:', err);
      }
    };
    fetchHomeData();
    return () => { isMounted = false; };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/posts?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.companyName.trim()) {
      alert(currentLang === 'en' ? 'Please fill in Name, Company, and Phone (*)' : 'Vui lòng điền Họ tên, Đơn vị và Số điện thoại (*)');
      return;
    }
    setFormLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          city: 'Hải Phòng',
          companyName: formData.companyName,
          memberType: formData.serviceNeed,
          notes: `[kienan.today] Nhu cầu: ${formData.serviceNeed}. Nội dung: ${formData.notes || 'Không có'}`
        })
      });
      if (res.ok) {
        setFormSubmitted(true);
      } else {
        const json = await res.json();
        alert(json.error || 'Có lỗi xảy ra khi gửi thông tin');
      }
    } catch (err) {
      alert('Không thể kết nối máy chủ. Quý khách vui lòng gọi Hotline 0986 354 152 để được hỗ trợ trực tiếp.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleSendAiQuestion = async (questionText) => {
    const q = (questionText || chatInput).trim();
    if (!q || chatLoading) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: q }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q })
      });
      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || data.response || data.message || 'Cảm ơn bạn đã đặt câu hỏi. Đội ngũ kienan.today sẽ phản hồi sớm nhất!';
        setChatMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
      } else {
        setChatMessages(prev => [...prev, { sender: 'bot', text: 'Hệ thống AI đang được bảo trì hoặc cập nhật dữ liệu. Quý vị có thể tra cứu nhanh qua menu Khám phá Kiến An hoặc gọi hotline 0986 354 152.' }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'bot', text: 'Không thể kết nối dịch vụ AI. Xin vui lòng thử lại sau.' }]);
    } finally {
      setChatLoading(false);
      setTimeout(() => {
        if (chatBottomRef.current) chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleQuickRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.phone) {
      alert('Vui lòng nhập Họ tên và Số điện thoại');
      return;
    }
    setSubmittingReg(true);
    try {
      const res = await fetch(`/api/events/${registerModalEvent.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: regForm.fullName,
          phone: regForm.phone,
          email: regForm.email,
          quantity: regForm.quantity || 1
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegSuccessData(data.data);
      } else {
        alert(data.error || 'Có lỗi xảy ra khi đăng ký vé.');
      }
    } catch (err) {
      alert('Không thể kết nối máy chủ, vui lòng thử lại.');
    } finally {
      setSubmittingReg(false);
    }
  };

  // Lọc bài viết
  const filteredPosts = selectedPostFilter === 'all'
    ? latestPosts
    : latestPosts.filter(p => p.category?.includes(selectedPostFilter) || p.sub_category?.includes(selectedPostFilter));

  return (
    <div className="kienan-home">
      <SEOHead 
        title="kienan.today | Khám phá Kiến An, kết nối cộng đồng và doanh nghiệp"
        description="Khám phá Kiến An, Hải Phòng; kết nối doanh nghiệp, cộng đồng, sự kiện và giải pháp AI cùng kienan.today."
      />
      <SpotlightBanner />
      <Navbar />

      <main id="main-content">
        {/* ==============================================================================
            1. HERO SECTION (Chương 4 Landing Page Docx)
            ============================================================================== */}
        <section className="ka-hero" id="hero">
          <div className="ka-hero-bg-overlay"></div>
          <div className="ka-hero-particles"></div>
          
          <div className="ka-container ka-hero-container">
            <div>
              <div className="ka-hero-eyebrow">
                <i className="ti ti-map-pin"></i>
                <span>KIENAN.TODAY · KIẾN AN, HẢI PHÒNG</span>
              </div>
              <h1 className="ka-hero-title">
                Kiến An đổi mới — <br />
                <span className="highlight-teal">Kiến An vươn mình</span>
              </h1>
              <p className="ka-hero-desc">
                Khám phá cảnh quan, văn hóa và nhịp sống Kiến An. Kết nối doanh nghiệp, cộng đồng và những cơ hội phát triển trên cùng một nền tảng số.
              </p>
              
              <div className="ka-hero-actions">
                <a href="#kham-pha" className="ka-btn-primary">
                  <i className="ti ti-compass"></i>
                  <span>Khám phá Kiến An</span>
                </a>
                <a href="#doanh-nghiep" className="ka-btn-outline">
                  <i className="ti ti-building-store"></i>
                  <span>Kết nối doanh nghiệp</span>
                </a>
              </div>

              {/* 3 Cụm thông tin nhỏ */}
              <div className="ka-hero-triad">
                <span><i className="ti ti-sparkles" style={{ color: '#F4B544' }}></i> Bản sắc địa phương</span>
                <span className="dot">·</span>
                <span><i className="ti ti-users" style={{ color: '#5EEAD4' }}></i> Kết nối cộng đồng</span>
                <span className="dot">·</span>
                <span><i className="ti ti-cpu" style={{ color: '#FCD34D' }}></i> Đồng hành cùng AI</span>
              </div>

              {/* Thanh tìm kiếm dữ liệu */}
              <div className="ka-hero-search">
                <form onSubmit={handleSearchSubmit} className="ka-search-input-group">
                  <i className="ti ti-search" style={{ alignSelf: 'center', marginLeft: '12px', color: '#627D98', fontSize: '18px' }}></i>
                  <input 
                    type="text" 
                    className="ka-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={currentLang === 'en' ? "Search places, business directory, events..." : "Tìm kiếm điểm đến, doanh nghiệp, sự kiện..."}
                  />
                  <button type="submit" className="ka-search-btn">
                    <span>{currentLang === 'en' ? 'Search' : 'Tìm kiếm'}</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Visual Card bên phải */}
            <div className="ka-hero-visual-card">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" 
                alt="Toàn cảnh Đồi Thiên Văn và Kiến An" 
                className="ka-hero-visual-img"
              />
              <div className="ka-hero-visual-badge">
                <h4>Đồi Thiên Văn & Hồ Hạnh Phúc</h4>
                <p>Biểu tượng tự nhiên, di sản khoa học khí tượng và không gian văn hóa cộng đồng Kiến An.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================================
            2. GIỚI THIỆU NGẮN VỀ KIENAN.TODAY & 4 LỢI ÍCH (Chương 5 Landing Page Docx)
            ============================================================================== */}
        <section className="ka-section" style={{ background: '#FFFFFF' }}>
          <div className="ka-container">
            <div className="ka-section-header">
              <span className="ka-section-badge">
                <i className="ti ti-info-circle"></i> Về kienan.today
              </span>
              <h2 className="ka-section-title">
                Một địa chỉ số để hiểu Kiến An và kết nối những cơ hội mới
              </h2>
              <p className="ka-section-desc">
                “kienan.today kết nối thông tin địa phương, điểm đến, doanh nghiệp, dịch vụ và hoạt động cộng đồng. Người dân tìm được thông tin hữu ích, doanh nghiệp có thêm cơ hội giới thiệu năng lực, người quan tâm đến Kiến An có thể khám phá và tìm cách đồng hành.”
              </p>
            </div>

            {/* 4 Lợi ích với biểu tượng tinh tế */}
            <div className="ka-intro-grid">
              <div className="ka-intro-card">
                <div className="ka-intro-icon">
                  <i className="ti ti-map-2"></i>
                </div>
                <h3>Khám phá địa phương</h3>
                <p>Tìm hiểu cảnh quan sinh thái, chiều sâu văn hóa và câu chuyện lịch sử Đồi Thiên Văn, Hồ Hạnh Phúc.</p>
              </div>

              <div className="ka-intro-card">
                <div className="ka-intro-icon">
                  <i className="ti ti-briefcase"></i>
                </div>
                <h3>Kết nối doanh nghiệp</h3>
                <p>Không gian giới thiệu sản phẩm, dịch vụ địa phương và mở rộng cơ hội hợp tác kinh doanh bền vững.</p>
              </div>

              <div className="ka-intro-card">
                <div className="ka-intro-icon">
                  <i className="ti ti-calendar-event"></i>
                </div>
                <h3>Tham gia cộng đồng</h3>
                <p>Theo dõi lịch hoạt động văn hóa, sự kiện chuyển đổi số và các sáng kiến xã hội phù hợp.</p>
              </div>

              <div className="ka-intro-card">
                <div className="ka-intro-icon">
                  <i className="ti ti-robot"></i>
                </div>
                <h3>Ứng dụng AI thực tiễn</h3>
                <p>Tìm kiếm thông tin thông minh 24/7, nâng cao kỹ năng số cho cán bộ, doanh nghiệp và người dân.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================================
            3. BANNER "LÀM CHỦ AI BỨT PHÁ TƯƠNG LAI" & 3 KHỐI GIẢI PHÁP ADT (Chương 6 Docx)
            ============================================================================== */}
        <section className="ka-section" style={{ background: '#F4F7FA', paddingTop: '40px' }} id="giai-phap-ai">
          <div className="ka-container">
            {/* Banner nổi bật chạy ngang */}
            <div className="ka-ai-banner-wrap">
              <div className="ka-ai-banner">
                <div className="ka-ai-banner-pattern"></div>
                <div className="ka-ai-banner-content">
                  <div className="ka-ai-banner-agency">
                    <i className="ti ti-award"></i>
                    <span>CÔNG TY CỔ PHẦN ADT QUỐC TẾ</span>
                  </div>
                  <h2 className="ka-ai-banner-title">
                    Làm chủ AI <span>bứt phá tương lai</span>
                  </h2>
                  <p className="ka-ai-banner-desc">
                    “Đưa AI vào công việc thực tế — hỗ trợ chính quyền, phát triển doanh nghiệp và nâng cao hiệu quả tuyển sinh.”
                  </p>
                  <a href="#ai-solutions-cards" className="ka-ai-banner-btn">
                    <span>Khám phá giải pháp AI</span>
                    <i className="ti ti-arrow-down"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Đúng 3 Khối giải pháp AI nằm ngay dưới Banner */}
            <div className="ka-ai-solutions-grid" id="ai-solutions-cards">
              {/* Khối 1: Chính quyền */}
              <a 
                href="https://www.adtgroup.net/bo-doi-tro-ly-ai-phuong-xa-dat-giai-nhi-ha-noi-2025" 
                target="_blank" 
                rel="noreferrer"
                className="ka-ai-solution-card"
              >
                <div className="ka-ai-card-top">
                  <div>
                    <span className="ka-ai-target-badge">CHÍNH QUYỀN</span>
                    <span className="ka-ai-secondary-badge">Giải Nhì CCHC Hà Nội 2025</span>
                  </div>
                  <h3 className="ka-ai-card-title">Bộ Đôi Trợ Lý AI Phường/Xã</h3>
                  <p className="ka-ai-card-desc">
                    “Giải pháp AI hỗ trợ cán bộ và người dân trong tra cứu thông tin, hướng dẫn thủ tục và xử lý công việc. Tìm hiểu dấu ấn tại cuộc thi cải cách hành chính Hà Nội năm 2025.”
                  </p>
                </div>
                <div className="ka-ai-card-btn">
                  <span>Tìm hiểu giải pháp</span>
                  <i className="ti ti-arrow-up-right"></i>
                </div>
              </a>

              {/* Khối 2: Doanh nghiệp */}
              <a 
                href="https://www.adtgroup.net/orion-nen-tang-ai-agent-quan-tri-doanh-nghiep" 
                target="_blank" 
                rel="noreferrer"
                className="ka-ai-solution-card"
              >
                <div className="ka-ai-card-top">
                  <div>
                    <span className="ka-ai-target-badge">DOANH NGHIỆP</span>
                  </div>
                  <h3 className="ka-ai-card-title">ORION — Hệ sinh thái AI cho doanh nghiệp</h3>
                  <p className="ka-ai-card-desc">
                    “Kết nối bán hàng, marketing, tri thức và hỗ trợ điều hành. ORION giúp doanh nghiệp đưa AI vào những công việc tạo ra giá trị mỗi ngày.”
                  </p>
                  <div className="ka-ai-card-features">
                    AI Sales · Auto Marketing · AI Center · AI Management
                  </div>
                </div>
                <div className="ka-ai-card-btn">
                  <span>Khám phá ORION</span>
                  <i className="ti ti-arrow-up-right"></i>
                </div>
              </a>

              {/* Khối 3: Giáo dục */}
              <a 
                href="https://www.adtgroup.net/edunow-ai-giai-phap-ung-dung-ai-cho-viec-tuyen-sinh" 
                target="_blank" 
                rel="noreferrer"
                className="ka-ai-solution-card"
              >
                <div className="ka-ai-card-top">
                  <div>
                    <span className="ka-ai-target-badge">GIÁO DỤC</span>
                  </div>
                  <h3 className="ka-ai-card-title">Edunow.AI — Trợ lý AI tuyển sinh</h3>
                  <p className="ka-ai-card-desc">
                    “Xây dựng trợ lý tuyển sinh từ dữ liệu chính thức của nhà trường, hỗ trợ giải đáp thông tin cho thí sinh và phụ huynh trên website, Zalo OA và Facebook Page.”
                  </p>
                </div>
                <div className="ka-ai-card-btn">
                  <span>Tìm hiểu Edunow.AI</span>
                  <i className="ti ti-arrow-up-right"></i>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ==============================================================================
            4. KHÁM PHÁ KIẾN AN (Chương 7 Docx: Hồ Hạnh Phúc & Đồi Thiên Văn)
            ============================================================================== */}
        <section className="ka-section" id="kham-pha" style={{ background: '#FFFFFF' }}>
          <div className="ka-container">
            <div className="ka-section-header">
              <span className="ka-section-badge">
                <i className="ti ti-landscape"></i> Điểm đến & Cảnh quan
              </span>
              <h2 className="ka-section-title">
                Những không gian làm nên dấu ấn Kiến An
              </h2>
              <p className="ka-section-desc">
                Cảnh quan thơ mộng, không khí trong lành và chiều sâu lịch sử văn hóa tạo nên bản sắc độc đáo của vùng đất dưới chân đồi Thiên Văn.
              </p>
            </div>

            {/* 2 Khối ảnh lớn: Hồ Hạnh Phúc & Đồi Thiên Văn */}
            <div className="ka-places-grid">
              <div className="ka-place-feature-card">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80" 
                  alt="Hồ Hạnh Phúc Kiến An" 
                  className="ka-place-bg-img"
                />
                <div className="ka-place-overlay"></div>
                <div className="ka-place-content">
                  <span className="ka-place-tag">Không gian gặp gỡ cộng đồng</span>
                  <h3 className="ka-place-title">Hồ Hạnh Phúc</h3>
                  <p className="ka-place-desc">
                    “Khám phá không gian cảnh quan và những hoạt động văn hóa, sự kiện, trải nghiệm gắn với nhịp sống Kiến An.”
                  </p>
                  <Link to="/posts?category=Khám%20phá%20Kiến%20An" className="ka-place-link">
                    <span>Tìm hiểu câu chuyện Hồ Hạnh Phúc</span>
                    <i className="ti ti-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className="ka-place-feature-card">
                <img 
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80" 
                  alt="Đồi Thiên Văn và Đài khí tượng Phù Liễn" 
                  className="ka-place-bg-img"
                />
                <div className="ka-place-overlay"></div>
                <div className="ka-place-content">
                  <span className="ka-place-tag" style={{ background: '#5EEAD4' }}>Cảnh quan & Lịch sử</span>
                  <h3 className="ka-place-title">Đồi Thiên Văn & Đài Khí tượng Phù Liễn</h3>
                  <p className="ka-place-desc">
                    “Tìm hiểu cảnh quan, dấu ấn lịch sử và những câu chuyện khoa học, văn hóa gắn với Đồi Thiên Văn.”
                  </p>
                  <Link to="/posts?category=Khám%20phá%20Kiến%20An" className="ka-place-link">
                    <span>Khám phá Đồi Thiên Văn</span>
                    <i className="ti ti-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Danh sách bài viết tin tức mới nhất */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#102A43' }}>Bài viết & Câu chuyện Kiến An</h3>
                <p style={{ fontSize: '0.92rem', color: '#627D98', margin: 0 }}>Văn hóa · Ẩm thực · Con người · Trải nghiệm địa phương</p>
              </div>
              <Link to="/posts" style={{ color: '#007F82', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Xem tất cả bài viết</span>
                <i className="ti ti-arrow-right"></i>
              </Link>
            </div>

            <div className="ka-posts-grid">
              {filteredPosts.slice(0, 3).map((post) => (
                <Link key={post.id} to={`/posts/${post.id}`} className="ka-post-card">
                  <div className="ka-post-thumb-wrap">
                    <img 
                      src={post.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'} 
                      alt={post.title} 
                      className="ka-post-thumb"
                    />
                    <span className="ka-post-cat-badge">{post.sub_category || post.category}</span>
                  </div>
                  <div className="ka-post-body">
                    <div>
                      <h4 className="ka-post-title">{post.title}</h4>
                      <p className="ka-post-summary">{post.summary}</p>
                    </div>
                    <div className="ka-post-footer">
                      <span><i className="ti ti-eye"></i> {post.views || 0} lượt đọc</span>
                      <span style={{ color: '#007F82', fontWeight: 650 }}>Đọc chi tiết →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================================
            5. DOANH NGHIỆP VÀ CƠ HỘI HỢP TÁC (Chương 8 Docx)
            ============================================================================== */}
        <section className="ka-section" id="doanh-nghiep" style={{ background: '#F4F7FA' }}>
          <div className="ka-container">
            <div className="ka-section-header">
              <span className="ka-section-badge">
                <i className="ti ti-briefcase"></i> Kết nối kinh tế
              </span>
              <h2 className="ka-section-title">
                Doanh nghiệp Kiến An kết nối để phát triển
              </h2>
              <p className="ka-section-desc">
                “Một không gian để doanh nghiệp, hộ kinh doanh và đơn vị dịch vụ giới thiệu năng lực, tiếp cận khách hàng và tìm kiếm đối tác phù hợp.”
              </p>
            </div>

            {/* 4 Nhóm trụ cột */}
            <div className="ka-biz-pillars-grid">
              <div className="ka-biz-pillar-item">
                <div className="ka-biz-pillar-icon"><i className="ti ti-id-badge-2"></i></div>
                <h4>Hồ sơ doanh nghiệp</h4>
                <p>Hồ sơ số hóa cho doanh nghiệp và hộ kinh doanh cá thể.</p>
              </div>

              <div className="ka-biz-pillar-item">
                <div className="ka-biz-pillar-icon"><i className="ti ti-building-store"></i></div>
                <h4>Sản phẩm & Dịch vụ</h4>
                <p>Quảng bá sản phẩm đặc trưng và tiện ích đời sống.</p>
              </div>

              <div className="ka-biz-pillar-item">
                <div className="ka-biz-pillar-icon"><i className="ti ti-handshake"></i></div>
                <h4>Nhu cầu hợp tác</h4>
                <p>Tìm đối tác kinh doanh, nhà cung cấp và mở rộng thị trường.</p>
              </div>

              <div className="ka-biz-pillar-item">
                <div className="ka-biz-pillar-icon"><i className="ti ti-cpu"></i></div>
                <h4>Kỹ năng & AI</h4>
                <p>Nâng cao năng lực ứng dụng công nghệ và công cụ AI.</p>
              </div>
            </div>

            {/* Danh bạ doanh nghiệp hội viên tiêu biểu */}
            <div className="ka-members-grid">
              {featuredMembers.map((member) => (
                <div key={member.id} className="ka-member-card">
                  <div>
                    <div className="ka-member-header">
                      <img 
                        src={member.logo_url || '/logo_icon.svg'} 
                        alt={member.company_name} 
                        className="ka-member-logo"
                        onError={(e) => { e.target.src = '/logo_icon.svg'; }}
                      />
                      <div>
                        <h4 className="ka-member-name">{member.company_name}</h4>
                        <div className="ka-member-sector">{member.sector}</div>
                      </div>
                    </div>
                    <p className="ka-member-desc">{member.description}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: '#627D98', borderTop: '1px solid rgba(16,42,67,0.08)', paddingTop: '10px' }}>
                    <span><i className="ti ti-map-pin"></i> {member.address}</span>
                    <span style={{ color: '#007F82', fontWeight: 700 }}>✓ Đã xác minh</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 2 Nút hành động chuẩn docx */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '20px' }}>
              <Link to="/register" className="ka-btn-primary">
                <i className="ti ti-user-plus"></i>
                <span>Đăng ký giới thiệu doanh nghiệp</span>
              </Link>
              <a href="#dong-hanh" className="ka-btn-outline" style={{ background: '#102A43', borderColor: '#102A43', color: '#ffffff' }}>
                <i className="ti ti-send"></i>
                <span>Gửi nhu cầu hợp tác</span>
              </a>
            </div>
          </div>
        </section>

        {/* ==============================================================================
            6. SỰ KIỆN VÀ CỘNG ĐỒNG (Chương 9 Docx)
            ============================================================================== */}
        <section className="ka-section" id="su-kien" style={{ background: '#FFFFFF' }}>
          <div className="ka-container">
            <div className="ka-section-header">
              <span className="ka-section-badge">
                <i className="ti ti-calendar"></i> Lịch hoạt động
              </span>
              <h2 className="ka-section-title">
                Gặp gỡ hôm nay mở thêm cơ hội ngày mai
              </h2>
              <p className="ka-section-desc">
                Tham gia các hội thảo chuyển đổi số, sinh hoạt cộng đồng Hồ Hạnh Phúc và diễn đàn kết nối nguồn lực địa phương.
              </p>
            </div>

            <div className="ka-events-grid">
              {eventsList.map((event) => (
                <div key={event.id} className="ka-event-card">
                  <img 
                    src={event.banner_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'} 
                    alt={event.title} 
                    className="ka-event-banner"
                  />
                  <div className="ka-event-body">
                    <div className="ka-event-meta">
                      <span><i className="ti ti-calendar-time"></i> {event.start_time}</span>
                      <span>·</span>
                      <span><i className="ti ti-map-pin"></i> {event.location}</span>
                    </div>
                    <h3 className="ka-event-title">{event.title}</h3>
                    <p className="ka-event-desc">{event.description}</p>
                    
                    {/* Countdown Timer */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.82rem', color: '#627D98', fontWeight: 650 }}>Đếm ngược sự kiện:</div>
                      <HomeEventCountdown eventDate={event.start_time} />
                    </div>

                    <button 
                      onClick={() => setRegisterModalEvent(event)}
                      className="ka-btn-primary"
                      style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                    >
                      <i className="ti ti-ticket"></i>
                      <span>Đăng ký tham gia / Nhận vé QR</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================================
            7. TRỢ LÝ AI KIẾN AN (Chương 10 Docx: Nền tối, Trái Giới thiệu + Phải Chat)
            ============================================================================== */}
        <section className="ka-section dark" id="tro-ly-ai">
          <div className="ka-container">
            <div className="ka-ai-assistant-box">
              {/* Cột trái: Giới thiệu & 4 Câu hỏi gợi ý chuẩn docx */}
              <div className="ka-ai-bot-left">
                <span className="ka-section-badge" style={{ marginBottom: '14px' }}>
                  <i className="ti ti-sparkles"></i> AI Assistant 24/7
                </span>
                <h2>Bạn muốn tìm hiểu điều gì về Kiến An?</h2>
                <p>
                  “Định hướng trợ lý AI giúp bạn tìm thông tin địa phương, khám phá điểm đến, xem hoạt động và kết nối dịch vụ phù hợp.”
                </p>

                <div className="ka-ai-prompts-title">
                  <i className="ti ti-bulb"></i> Câu hỏi gợi ý nhanh:
                </div>
                <div className="ka-ai-prompts-list">
                  {[
                    'Tôi nên bắt đầu khám phá Kiến An từ đâu?',
                    'Doanh nghiệp tham gia kienan.today như thế nào?',
                    'Tìm thông tin hoạt động cộng đồng ở đâu?',
                    'AI có thể hỗ trợ công việc của tôi ra sao?'
                  ].map((prompt, idx) => (
                    <button 
                      key={idx}
                      className="ka-ai-prompt-btn"
                      onClick={() => handleSendAiQuestion(prompt)}
                    >
                      <span>{prompt}</span>
                      <i className="ti ti-arrow-right" style={{ color: '#F4B544' }}></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cột phải: Giao diện hội thoại tương tác trực tiếp */}
              <div className="ka-ai-bot-right">
                <div className="ka-ai-chat-header">
                  <div className="ka-ai-chat-avatar">
                    <i className="ti ti-robot"></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.05rem' }}>Trợ lý AI Kiến An</div>
                    <div style={{ fontSize: '0.8rem', color: '#5EEAD4' }}>● Sẵn sàng tư vấn thông tin & dữ liệu</div>
                  </div>
                </div>

                <div className="ka-ai-chat-body">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`ka-chat-bubble ${msg.sender}`}>
                      {msg.text}
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="ka-chat-bubble bot">
                      <i className="ti ti-loader animate-spin"></i> Trợ lý AI đang tra cứu tri thức Kiến An...
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSendAiQuestion(); }} className="ka-ai-chat-form">
                  <input 
                    type="text" 
                    className="ka-ai-chat-input"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Nhập câu hỏi của bạn về Kiến An..."
                    disabled={chatLoading}
                  />
                  <button type="submit" className="ka-ai-chat-send" disabled={chatLoading}>
                    <i className="ti ti-send"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================================
            8. KÊU GỌI ĐỒNG HÀNH & FORM LIÊN HỆ / XÚC TIẾN (Chương 11 Docx)
            ============================================================================== */}
        <section className="ka-section" id="dong-hanh" style={{ background: '#F4F7FA' }}>
          <div className="ka-container">
            <div className="ka-consult-grid">
              {/* Thông tin đơn vị phát triển */}
              <div className="ka-consult-info">
                <span className="ka-section-badge">
                  <i className="ti ti-mail-fast"></i> Hợp tác & Kết nối
                </span>
                <h2>Cùng xây dựng một Kiến An kết nối và đổi mới</h2>
                <p>
                  “Bạn là doanh nghiệp, đơn vị dịch vụ, tổ chức cộng đồng hay người quan tâm đến Kiến An? Hãy cùng trao đổi cách tham gia, đóng góp nội dung và phát triển những hoạt động có giá trị.”
                </p>

                <div className="ka-contact-details">
                  <div className="ka-contact-item">
                    <div className="ka-contact-icon">
                      <i className="ti ti-building"></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#627D98' }}>Đơn vị đề xuất phát triển:</div>
                      <strong>Công ty Cổ phần ADT Quốc Tế</strong>
                    </div>
                  </div>

                  <div className="ka-contact-item">
                    <div className="ka-contact-icon">
                      <i className="ti ti-phone-call"></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#627D98' }}>Hotline trao đổi trực tiếp:</div>
                      <a href="tel:0986354152">0986 354 152</a>
                    </div>
                  </div>

                  <div className="ka-contact-item">
                    <div className="ka-contact-icon">
                      <i className="ti ti-world"></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#627D98' }}>Website chính thức ADT:</div>
                      <a href="https://www.adtgroup.net" target="_blank" rel="noreferrer">www.adtgroup.net</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form gửi thông tin kết nối (POST /api/leads) */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '35px', boxShadow: '0 4px 20px rgba(16,42,67,0.06)' }}>
                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E6F7F7', color: '#007F82', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
                      <i className="ti ti-check"></i>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#102A43', marginBottom: '10px' }}>Gửi thông tin thành công!</h3>
                    <p style={{ color: '#627D98', lineHeight: 1.6, marginBottom: '24px' }}>
                      Cảm ơn Quý đơn vị đã quan tâm đồng hành cùng <strong>kienan.today</strong>. Bộ phận xúc tiến & hỗ trợ của ADT Quốc Tế sẽ liên hệ lại qua số điện thoại đã cung cấp trong vòng 24 giờ.
                    </p>
                    <button 
                      onClick={() => { setFormSubmitted(false); setFormData({ fullName: '', companyName: '', phone: '', email: '', serviceNeed: 'Giới thiệu doanh nghiệp & Dịch vụ địa phương', notes: '', agreeTerms: true }); }}
                      className="ka-btn-primary"
                    >
                      <span>Gửi thông tin khác</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleConsultSubmit} className="ka-form">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#102A43', marginBottom: '4px' }}>Đăng ký trao đổi & Đồng hành</h3>
                    <p style={{ fontSize: '0.88rem', color: '#627D98', marginBottom: '16px' }}>Vui lòng để lại thông tin để nhận phản hồi từ bộ phận phụ trách.</p>

                    <div className="ka-form-group">
                      <label>Họ và tên (*)</label>
                      <input 
                        type="text" 
                        className="ka-form-input"
                        placeholder="Nguyễn Văn A"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="ka-form-group">
                      <label>Đơn vị / Doanh nghiệp (*)</label>
                      <input 
                        type="text" 
                        className="ka-form-input"
                        placeholder="Tên doanh nghiệp, cơ sở kinh doanh hoặc tổ chức"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className="ka-form-group">
                        <label>Số điện thoại (*)</label>
                        <input 
                          type="tel" 
                          className="ka-form-input"
                          placeholder="0986..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="ka-form-group">
                        <label>Email</label>
                        <input 
                          type="email" 
                          className="ka-form-input"
                          placeholder="email@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="ka-form-group">
                      <label>Nhu cầu quan tâm</label>
                      <select 
                        className="ka-form-select"
                        value={formData.serviceNeed}
                        onChange={(e) => setFormData({ ...formData, serviceNeed: e.target.value })}
                      >
                        <option value="Giới thiệu doanh nghiệp & Dịch vụ địa phương">Giới thiệu doanh nghiệp & Dịch vụ địa phương</option>
                        <option value="Đăng ký tham gia sự kiện & Hội thảo chuyển đổi số">Đăng ký tham gia sự kiện & Hội thảo chuyển đổi số</option>
                        <option value="Ứng dụng Trợ lý AI Phường/Xã cho cán bộ & người dân">Ứng dụng Trợ lý AI Phường/Xã cho cán bộ & người dân</option>
                        <option value="Tìm hiểu giải pháp ORION cho doanh nghiệp">Tìm hiểu giải pháp ORION cho doanh nghiệp</option>
                        <option value="Trợ lý AI tuyển sinh Edunow cho trường học">Trợ lý AI tuyển sinh Edunow cho trường học</option>
                        <option value="Đóng góp câu chuyện văn hóa, lịch sử Kiến An">Đóng góp câu chuyện văn hóa, lịch sử Kiến An</option>
                      </select>
                    </div>

                    <div className="ka-form-group">
                      <label>Nội dung trao đổi</label>
                      <textarea 
                        className="ka-form-textarea"
                        rows="3"
                        placeholder="Mô tả tóm tắt nhu cầu hoặc đề xuất phối hợp của bạn..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="ka-form-checkbox">
                      <input 
                        type="checkbox" 
                        id="agreeTerms" 
                        checked={formData.agreeTerms} 
                        onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })} 
                        required 
                      />
                      <label htmlFor="agreeTerms">Tôi đồng ý để bộ phận xúc tiến kienan.today liên hệ trao đổi thông tin.</label>
                    </div>

                    <button type="submit" className="ka-btn-primary" style={{ justifyContent: 'center', marginTop: '6px' }} disabled={formLoading}>
                      {formLoading ? 'Đang gửi thông tin...' : 'Gửi đăng ký đồng hành'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal đăng ký vé sự kiện nhanh (Bảo toàn 100% tính năng QR code) */}
      {registerModalEvent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,27,44,0.75)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', maxWidth: '520px', width: '100%', padding: '30px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button 
              onClick={() => { setRegisterModalEvent(null); setRegSuccessData(null); }}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#627D98' }}
            >
              ✕
            </button>

            {regSuccessData ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: '#007F82', marginBottom: '10px' }}>✓</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#102A43', marginBottom: '10px' }}>Đăng ký vé thành công!</h3>
                <p style={{ color: '#627D98', fontSize: '0.95rem', marginBottom: '16px' }}>Mã vé của bạn: <strong style={{ color: '#007F82' }}>{regSuccessData.ticket_code}</strong></p>
                {regSuccessData.qr_code && (
                  <img src={regSuccessData.qr_code} alt="QR Code" style={{ width: '180px', height: '180px', margin: '0 auto 16px', display: 'block', border: '1px solid #E2E8F0', borderRadius: '8px' }} />
                )}
                <p style={{ fontSize: '0.85rem', color: '#627D98' }}>Vui lòng lưu lại mã vé hoặc ảnh QR để đối soát khi check-in tại sự kiện.</p>
                <button onClick={() => { setRegisterModalEvent(null); setRegSuccessData(null); }} className="ka-btn-primary" style={{ marginTop: '16px' }}>
                  Đóng cửa sổ
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickRegisterSubmit} className="ka-form">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#102A43', marginBottom: '4px' }}>Đăng ký tham dự sự kiện</h3>
                <p style={{ fontSize: '0.88rem', color: '#007F82', fontWeight: 700, marginBottom: '16px' }}>{registerModalEvent.title}</p>

                <div className="ka-form-group">
                  <label>Họ và tên (*)</label>
                  <input 
                    type="text" 
                    className="ka-form-input" 
                    value={regForm.fullName} 
                    onChange={e => setRegForm({ ...regForm, fullName: e.target.value })} 
                    required 
                  />
                </div>

                <div className="ka-form-group">
                  <label>Số điện thoại (*)</label>
                  <input 
                    type="tel" 
                    className="ka-form-input" 
                    value={regForm.phone} 
                    onChange={e => setRegForm({ ...regForm, phone: e.target.value })} 
                    required 
                  />
                </div>

                <div className="ka-form-group">
                  <label>Email (Nhận vé điện tử)</label>
                  <input 
                    type="email" 
                    className="ka-form-input" 
                    value={regForm.email} 
                    onChange={e => setRegForm({ ...regForm, email: e.target.value })} 
                  />
                </div>

                <div className="ka-form-group">
                  <label>Số lượng vé</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    className="ka-form-input" 
                    value={regForm.quantity} 
                    onChange={e => setRegForm({ ...regForm, quantity: parseInt(e.target.value) || 1 })} 
                  />
                </div>

                <button type="submit" className="ka-btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }} disabled={submittingReg}>
                  {submittingReg ? 'Đang xuất vé...' : 'Xác nhận đăng ký'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
      <FloatingAIBot />
    </div>
  );
};

export default Home;
