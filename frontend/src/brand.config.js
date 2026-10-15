/**
 * BRAND CONFIGURATION (CẤU HÌNH THƯƠNG HIỆU TẬP TRUNG)
 * -------------------------------------------------------------
 * Quản lý toàn bộ thông tin nhận diện thương hiệu của nền tảng kienan.today.
 * Đơn vị đề xuất phát triển: Công ty Cổ phần ADT Quốc Tế
 * Thông điệp: "Kiến An đổi mới – Kiến An vươn mình" (Media + Data + Community + AI)
 */

export const brandConfig = {
  // Thông tin định danh thương hiệu
  brandName: 'kienan.today',          // Tên thương hiệu hiển thị chính
  brandDisplayName: 'kienan.today',
  brandShortName: 'Kiến An',          // Tên viết tắt ngắn gọn
  platformName: 'KienAn.today Digital Platform',
  companyLegalName: 'Cổng thông tin, Dữ liệu & Kết nối Cộng đồng Kiến An',
  partnerLegalName: 'Công ty Cổ phần ADT Quốc Tế',
  
  // Slogan & Định vị
  slogan: 'Kiến An đổi mới – Kiến An vươn mình',
  tagline: 'Khám phá cảnh quan, văn hóa và nhịp sống Kiến An. Kết nối doanh nghiệp, cộng đồng và những cơ hội phát triển trên cùng một nền tảng số.',
  description: 'kienan.today kết nối thông tin địa phương, điểm đến, doanh nghiệp, dịch vụ và hoạt động cộng đồng phục vụ phường Kiến An, TP. Hải Phòng tích hợp Trí tuệ Nhân tạo.',
  
  // Tên miền & Đường dẫn
  domain: 'kienan.today',
  demoDomain: 'demo.kienan.today',
  baseUrl: 'https://kienan.today',
  demoUrl: 'https://demo.kienan.today',
  apiBaseUrl: '/api',

  // Nhận diện hình ảnh & Logo
  logo: {
    primary: '/logo_kienan.png',
    dark: '/logo_kienan_dark.png',
    icon: '/logo_icon.svg',
    alt: 'kienan.today Logo',
    favicon: '/favicon.svg',
    defaultThumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    fallbackCompanyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80'
  },

  // Hệ màu chủ đạo Kiến An - Hải Phòng & ADT (Navy, Teal Cyan, ADT Red, Warm Gold)
  colors: {
    navy: '#102A43',          // Xanh navy tiêu đề, điều hướng, chiều sâu
    primary: '#102A43',       // Màu chủ đạo
    primaryHover: '#0b1d2e',  // Navy đậm hover
    primaryDark: '#081522',   // Navy đậm nhất
    primaryLight: '#E2E8F0',  // Nền phụ
    teal: '#007F82',          // Xanh ngọc điểm nhấn, icon, nút tương tác
    accent: '#007F82',        // Accent chính
    accentHover: '#006668',
    accentGlow: 'rgba(0, 127, 130, 0.4)',
    brandRed: '#D62839',      // Đỏ ADT Quốc Tế & chi tiết nổi bật
    gold: '#F4B544',          // Vàng ấm điểm nhấn nhỏ, nhãn, nút trên nền tối
    goldLight: '#FCD34D',
    goldGlow: 'rgba(244, 181, 68, 0.35)',
    bgLight: '#F4F7FA',       // Nền sáng thoáng đãng
    white: '#FFFFFF',
    darkBg: '#0D1E30',
    darkCard: '#13283E'
  },

  // Trợ lý Trí tuệ Nhân tạo (AI Assistant)
  aiAssistant: {
    name: 'Trợ lý AI Kiến An',
    shortName: 'Kiến An AI',
    title: 'Trợ lý AI Cố vấn Thông tin, Điểm đến & Doanh nghiệp Kiến An',
    avatar: '/ai_robot_avatar-removebg.png',
    welcomeMessage: 'Xin chào! Tôi là Trợ lý AI của kienan.today. Tôi có thể hỗ trợ bạn khám phá không gian Hồ Hạnh Phúc, Đồi Thiên Văn, tra cứu doanh nghiệp, hoạt động cộng đồng và giải pháp AI 24/7.',
    systemRole: 'Bạn là trợ lý AI chuyên nghiệp của nền tảng kienan.today — Nền tảng thông tin, dữ liệu và kết nối cộng đồng, doanh nghiệp phường Kiến An, TP. Hải Phòng do ADT Quốc Tế đề xuất phát triển. Hãy tư vấn chính xác, chu đáo, có dẫn nguồn tin cậy về địa phương Kiến An, điểm đến, ẩm thực, lịch sự kiện và các giải pháp AI.',
    quickSuggestions: [
      'Tôi nên bắt đầu khám phá Kiến An từ đâu?',
      'Doanh nghiệp tham gia kienan.today như thế nào?',
      'Tìm thông tin hoạt động cộng đồng ở đâu?',
      'AI có thể hỗ trợ công việc của tôi ra sao?'
    ]
  },

  // Thông tin liên hệ & Đơn vị phát triển
  contact: {
    hotline: '0986 354 152',
    techHotline: '0986 354 152',
    email: 'contact@kienan.today',
    supportEmail: 'support@kienan.today',
    companyName: 'Công ty Cổ phần ADT Quốc Tế',
    companyWebsite: 'https://www.adtgroup.net',
    address: 'Phường Kiến An, Thành phố Hải Phòng, Việt Nam',
    techAddress: 'Công ty Cổ phần ADT Quốc Tế — 0986 354 152',
    workingHours: '08:00 - 17:30 (Thứ 2 - Thứ 6)',
    copyright: '© 2026 kienan.today — Đơn vị đề xuất & phát triển: Công ty Cổ phần ADT Quốc Tế.'
  },

  // Giải pháp AI của ADT Quốc Tế (Theo Chương 6 đặc tả thiết kế)
  aiSolutions: {
    bannerTitle: 'Làm chủ AI bứt phá tương lai',
    bannerSubtitle: 'Đưa AI vào công việc thực tế — hỗ trợ chính quyền, phát triển doanh nghiệp và nâng cao hiệu quả tuyển sinh.',
    solutions: [
      {
        id: 'gov',
        targetLabel: 'CHÍNH QUYỀN',
        badge: 'Giải Nhì CCHC Hà Nội 2025',
        title: 'Bộ Đôi Trợ Lý AI Phường/Xã',
        description: 'Giải pháp AI hỗ trợ cán bộ và người dân trong tra cứu thông tin, hướng dẫn thủ tục và xử lý công việc. Tìm hiểu dấu ấn tại cuộc thi cải cách hành chính Hà Nội năm 2025.',
        link: 'https://www.adtgroup.net/bo-doi-tro-ly-ai-phuong-xa-dat-giai-nhi-ha-noi-2025',
        buttonText: 'Tìm hiểu giải pháp'
      },
      {
        id: 'enterprise',
        targetLabel: 'DOANH NGHIỆP',
        badge: 'AI Ecosystem',
        title: 'ORION — Hệ sinh thái AI cho doanh nghiệp',
        description: 'Kết nối bán hàng, marketing, tri thức và hỗ trợ điều hành. ORION giúp doanh nghiệp đưa AI vào những công việc tạo ra giá trị mỗi ngày.',
        features: 'AI Sales · Auto Marketing · AI Center · AI Management',
        link: 'https://www.adtgroup.net/orion-nen-tang-ai-agent-quan-tri-doanh-nghiep',
        buttonText: 'Khám phá ORION'
      },
      {
        id: 'education',
        targetLabel: 'GIÁO DỤC',
        badge: 'Tuyển sinh số',
        title: 'Edunow.AI — Trợ lý AI tuyển sinh',
        description: 'Xây dựng trợ lý tuyển sinh từ dữ liệu chính thức của nhà trường, hỗ trợ giải đáp thông tin cho thí sinh và phụ huynh trên website, Zalo OA và Facebook Page.',
        link: 'https://www.adtgroup.net/edunow-ai-giai-phap-ung-dung-ai-cho-viec-tuyen-sinh',
        buttonText: 'Tìm hiểu Edunow.AI'
      }
    ]
  },

  // Thông tin thanh toán / Chuyển khoản sự kiện (VietQR)
  bankAccount: {
    bankName: 'Techcombank',
    bankBranch: 'Chi nhánh Hà Nội / Hải Phòng',
    accountNumber: '19036730021017',
    accountHolder: 'CONG TY CO PHAN ADT QUOC TE',
    binCode: '970407'
  },

  // Mạng xã hội
  socials: {
    facebook: 'https://facebook.com/adtgroup.net',
    website: 'https://www.adtgroup.net',
    zalo: 'https://zalo.me/0986354152'
  },

  // Gói hội viên
  membership: {
    benefitsTitle: 'Quyền lợi Hội viên kienan.today',
    badgeText: 'Mạng lưới kết nối cộng đồng & doanh nghiệp Kiến An',
    tiers: [
      { id: 'Standard', name: 'Khám phá (Cơ bản)', badge: 'Thành viên Khám phá' },
      { id: 'Silver', name: 'Doanh nghiệp Kết nối', badge: 'Đối tác Bạc' },
      { id: 'Gold', name: 'Doanh nghiệp Tiêu biểu', badge: 'Đối tác Vàng' },
      { id: 'Diamond', name: 'Đối tác Chiến lược', badge: 'Đối tác Kim Cương' }
    ]
  }
};

export const BRAND_CONFIG = brandConfig;
export default brandConfig;
