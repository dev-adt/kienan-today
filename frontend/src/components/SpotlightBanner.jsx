import React from 'react';
import brandConfig from '../brand.config';

/**
 * High-Impact Spotlight Banner
 * Styled with Kien An Deep Navy, Teal Cyan, and Warm Gold theme.
 */
export const SpotlightBanner = ({
  badgeText = 'ĐỔI MỚI SÁNG TẠO • KIẾN AN',
  title = 'KienAn.today — Kiến An đổi mới, Kiến An vươn mình',
  subtitle = 'Nền tảng số kết nối cộng đồng, doanh nghiệp và các cơ hội phát triển cùng Trí tuệ Nhân tạo.',
  buttonText = 'Khám phá Kiến An',
  link = '/posts',
  variant = 'primary'
}) => {
  return (
    <div style={{
      width: '100%',
      position: 'relative',
      background: 'linear-gradient(135deg, #0A1B2C 0%, #102A43 50%, #007F82 100%)',
      color: '#FFFFFF',
      borderBottom: '2px solid rgba(0, 127, 130, 0.4)',
      boxShadow: '0 8px 30px rgba(10, 27, 44, 0.45)',
      overflow: 'hidden',
      zIndex: 10
    }}>
      {/* Background Dot Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(94, 234, 212, 0.15) 1.2px, transparent 1.2px)',
        backgroundSize: '22px 22px',
        opacity: 0.6,
        pointerEvents: 'none'
      }} />

      {/* Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '15%',
        width: '400px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(0, 127, 130, 0.25) 0%, rgba(10, 27, 44, 0) 70%)',
        pointerEvents: 'none',
        filter: 'blur(30px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-40%',
        right: '10%',
        width: '350px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(244, 181, 68, 0.22) 0%, rgba(10, 27, 44, 0) 70%)',
        pointerEvents: 'none',
        filter: 'blur(35px)'
      }} />

      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        {/* Left Side: Badge + Title + Subtitle */}
        <div style={{ flex: '1 1 540px', minWidth: '280px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(244, 181, 68, 0.15)',
            border: '1px solid rgba(244, 181, 68, 0.4)',
            borderRadius: '9999px',
            padding: '3px 12px',
            marginBottom: '6px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#F4B544',
              boxShadow: '0 0 8px #F4B544',
              display: 'inline-block'
            }} />
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#FCD34D',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              {badgeText}
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Be Vietnam Pro', 'Outfit', sans-serif",
            fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
            fontWeight: '800',
            lineHeight: 1.3,
            color: '#FFFFFF',
            marginBottom: '4px',
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h2>

          <p style={{
            fontSize: 'clamp(12px, 1.4vw, 13px)',
            color: '#E2E8F0',
            lineHeight: 1.45,
            margin: 0
          }}>
            {subtitle}
          </p>
        </div>

        {/* Right Side: CTA Button */}
        <div style={{ flexShrink: 0 }}>
          <a
            href={link}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              padding: '9px 20px',
              background: 'linear-gradient(135deg, #00A896 0%, #007F82 100%)',
              color: '#FFFFFF',
              fontWeight: '750',
              fontSize: '13px',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(0, 127, 130, 0.4)',
              transition: 'all 0.22s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 127, 130, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 127, 130, 0.4)';
            }}
          >
            <span>{buttonText}</span>
            <i className="ti ti-arrow-right" style={{ fontSize: '13px' }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SpotlightBanner;
