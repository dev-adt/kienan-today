import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import { usePWA } from '../contexts/PWAContext';
import brandConfig from '../brand.config';

export const Footer = () => {
  const { currentLang } = useTranslation();
  const { isInstalled, installApp } = usePWA();

  return (
    <footer style={{
      backgroundColor: '#0B1D2E',
      backgroundImage: 'linear-gradient(180deg, #102A43 0%, #081522 100%)',
      color: '#CBD5E1',
      padding: '3.5rem 0 1.5rem',
      fontSize: '12.5px',
      borderTop: '1px solid rgba(0, 127, 130, 0.35)',
      lineHeight: '1.65'
    }}>
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Main 4-Column Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Column 1: Logo & Brand Title */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #102A43 0%, #007F82 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '16px',
                  border: '1px solid rgba(0, 127, 130, 0.5)',
                  flexShrink: 0
                }}>
                  <img 
                    src="/logo_icon.svg" 
                    alt="kienan.today Logo" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { 
                      e.target.src = '/logo_icon.png';
                      e.target.onerror = () => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerText = 'KA';
                      };
                    }}
                  />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Be Vietnam Pro', 'Outfit', sans-serif",
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#ffffff',
                    letterSpacing: '-0.3px',
                    lineHeight: '1.1'
                  }}>
                    kienan<span style={{ color: '#007F82' }}>.today</span>
                  </div>
                  <div style={{
                    fontSize: '9px',
                    fontWeight: '700',
                    color: '#F4B544',
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    marginTop: '2px'
                  }}>
                    {currentLang === 'en' ? 'Information, Data & Community' : 'Cổng thông tin, Dữ liệu & Cộng đồng'}
                  </div>
                </div>
              </div>
            </Link>
            <div style={{
              fontSize: '12px',
              color: '#94A3B8',
              lineHeight: '1.6',
              marginTop: '0.5rem',
              marginBottom: '1rem'
            }}>
              {brandConfig.description}
            </div>
            <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={installApp}
                title="Cài đặt ứng dụng kienan.today (PWA)"
                style={{
                  background: 'rgba(0, 127, 130, 0.18)',
                  border: '1px solid rgba(0, 127, 130, 0.45)',
                  color: '#5EEAD4',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.18s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 127, 130, 0.35)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 127, 130, 0.18)'; }}
              >
                <i className="ti ti-device-mobile-down"></i>
                <span>{isInstalled ? (currentLang === 'en' ? '✓ PWA App Installed' : '✓ Ứng dụng PWA đã cài') : (currentLang === 'en' ? 'Install PWA App' : 'Cài đặt ứng dụng PWA')}</span>
              </button>

              <Link
                to="/guide"
                title={currentLang === 'en' ? 'System User Guide' : 'Hướng dẫn sử dụng hệ thống'}
                style={{
                  background: 'rgba(214, 40, 57, 0.18)',
                  border: '1px solid rgba(214, 40, 57, 0.45)',
                  color: '#FCA5A5',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.18s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(214, 40, 57, 0.35)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(214, 40, 57, 0.18)'; }}
              >
                <i className="ti ti-book"></i>
                <span>{currentLang === 'en' ? 'User Guide' : 'Hướng dẫn sử dụng'}</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Agency & Platform Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div>
              <span style={{ color: '#94A3B8' }}>{currentLang === 'en' ? 'Development Partner:' : 'Đơn vị đề xuất & phát triển:'}</span>{' '}
              <strong style={{ color: '#ffffff' }}>{brandConfig.partnerLegalName}</strong>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>{currentLang === 'en' ? 'Platform Name:' : 'Nền tảng vận hành:'}</span>{' '}
              <strong style={{ color: '#5EEAD4' }}>{brandConfig.platformName}</strong>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>{currentLang === 'en' ? 'Development Message:' : 'Thông điệp phát triển:'}</span>{' '}
              <span style={{ color: '#E2E8F0', fontStyle: 'italic' }}>"{brandConfig.slogan}"</span>
            </div>
            <div style={{ marginTop: '4px' }}>
              <span style={{ color: '#94A3B8' }}>{currentLang === 'en' ? 'Technology Solutions:' : 'Hệ sinh thái công nghệ:'}</span>{' '}
              <span style={{ color: '#FCD34D' }}>Trợ lý AI Phường/Xã · ORION AI · Edunow.AI</span>
            </div>
          </div>

          {/* Column 3: Contact & Support */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '12px' }}>
            <div>
              <span style={{ color: '#94A3B8' }}>{currentLang === 'en' ? 'Platform Editorial:' : 'Ban Quản trị Cổng thông tin:'}</span>{' '}
              <strong style={{ color: '#ffffff' }}>{currentLang === 'en' ? `Editorial Board of ${brandConfig.brandShortName}` : `Ban Biên Tập ${brandConfig.brandShortName}`}</strong>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>{currentLang === 'en' ? 'Working Hours:' : 'Giờ làm việc:'}</span>{' '}
              <span style={{ color: '#E2E8F0' }}>{brandConfig.contact.workingHours}</span>
            </div>
            <div style={{ marginTop: '2px' }}>
              <span style={{ color: '#94A3B8' }}>{currentLang === 'en' ? 'Direct Hotline:' : 'Hotline liên hệ:'}</span>{' '}
              <a href={`tel:${brandConfig.contact.hotline.replace(/\s+/g, '')}`} style={{ color: '#F4B544', fontWeight: '750', textDecoration: 'none' }}>
                {brandConfig.contact.hotline}
              </a>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>Email:</span>{' '}
              <a href={`mailto:${brandConfig.contact.email}`} style={{ color: '#5EEAD4', textDecoration: 'none' }}>{brandConfig.contact.email}</a>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>Website ADT:</span>{' '}
              <a href={brandConfig.contact.companyWebsite} target="_blank" rel="noreferrer" style={{ color: '#FCD34D', textDecoration: 'none' }}>www.adtgroup.net</a>
            </div>
          </div>

          {/* Column 4: Address & Social Media */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '13px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              {currentLang === 'en' ? 'Connection & Headquarters' : 'Địa chỉ & Kết nối cộng đồng'}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <i className="ti ti-map-pin" style={{ color: '#007F82', marginTop: '3px', flexShrink: 0 }}></i>
              <span><strong>{currentLang === 'en' ? 'Address:' : 'Địa bàn phục vụ:'}</strong> {brandConfig.contact.address}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
              <a href={`tel:${brandConfig.contact.hotline.replace(/\s+/g, '')}`} style={{ color: '#F4B544', textDecoration: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <i className="ti ti-phone"></i> {brandConfig.contact.hotline}
              </a>
              <span style={{ color: '#475569' }}>|</span>
              <a href={`mailto:${brandConfig.contact.supportEmail}`} style={{ color: '#CBD5E1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <i className="ti ti-mail"></i> {brandConfig.contact.supportEmail}
              </a>
            </div>

            {/* Social Media Links */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '6px' }}>
                {currentLang === 'en' ? 'Follow & Connect:' : 'Kênh kết nối & Mạng xã hội:'}
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <a 
                  href={brandConfig.socials.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textDecoration: 'none', transition: 'transform 0.2s' }}
                  title="Facebook ADT Group"
                >
                  <i className="ti ti-brand-facebook" style={{ fontSize: '16px' }}></i>
                </a>
                <a 
                  href={brandConfig.socials.website} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0, 127, 130, 0.3)', border: '1px solid #007F82', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5EEAD4', textDecoration: 'none', transition: 'transform 0.2s' }}
                  title="Website ADT Group"
                >
                  <i className="ti ti-world" style={{ fontSize: '16px' }}></i>
                </a>
                <Link 
                  to="/ai-chat"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(244, 181, 68, 0.2)', border: '1px solid #F4B544', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F4B544', textDecoration: 'none', transition: 'transform 0.2s' }}
                  title={brandConfig.aiAssistant.name}
                >
                  <i className="ti ti-sparkles" style={{ fontSize: '15px' }}></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '12px',
          color: '#94A3B8'
        }}>
          <div>
            {brandConfig.contact.copyright}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <Link
              to="/guide"
              style={{
                color: '#F4B544',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'rgba(244, 181, 68, 0.12)',
                border: '1px solid rgba(244, 181, 68, 0.35)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(244, 181, 68, 0.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(244, 181, 68, 0.12)'; }}
            >
              <i className="ti ti-book" style={{ fontSize: '14px' }}></i>
              <span>{currentLang === 'en' ? 'User Guide' : 'Hướng dẫn sử dụng'}</span>
            </Link>
            <Link to="/posts" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
              {currentLang === 'en' ? 'Explore Kien An' : 'Khám phá Kiến An'}
            </Link>
            <Link to="/members" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
              {currentLang === 'en' ? 'Enterprises' : 'Doanh nghiệp'}
            </Link>
            <Link to="/events" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
              {currentLang === 'en' ? 'Events' : 'Sự kiện'}
            </Link>
            <Link to="/ai-chat" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
              {currentLang === 'en' ? 'AI Assistant' : 'Trợ lý AI'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
