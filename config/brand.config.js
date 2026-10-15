/**
 * BACKEND BRAND CONFIGURATION
 * -------------------------------------------------------------
 * File cấu hình thương hiệu tập trung cho Node.js Express Backend.
 * Tự động đồng bộ với biến môi trường (.env) nếu có.
 */

require('dotenv').config();

const brandConfig = {
  appName: process.env.APP_NAME || 'kienan.today Platform',
  brandName: process.env.BRAND_NAME || 'kienan.today',
  brandShortName: process.env.BRAND_SHORT_NAME || 'Kiến An',
  siteUrl: process.env.SITE_URL || 'https://kienan.today',
  demoSiteUrl: 'https://demo.kienan.today',
  
  // Nhận diện logo thương hiệu
  logo: {
    primary: '/logo_kienan.png',
    dark: '/logo_kienan_dark.png',
    icon: '/logo_icon.svg',
    favicon: '/favicon.svg'
  },
  
  // Thông tin thanh toán ngân hàng (VietQR)
  bankAccount: {
    bankName: 'Techcombank',
    bankBranch: 'Chi nhánh Hà Nội / Hải Phòng',
    accountNumber: '19036730021017',
    accountHolder: 'CONG TY CO PHAN ADT QUOC TE',
    binCode: '970407'
  },

  // AI System Persona Prompt cho Kiến An
  ai: {
    agentName: process.env.AI_AGENT_NAME || 'Trợ lý AI Kiến An',
    systemPrompt: process.env.AI_SYSTEM_PROMPT || 
      "Bạn là trợ lý AI chuyên nghiệp của nền tảng kienan.today — Nền tảng thông tin, dữ liệu và kết nối cộng đồng, doanh nghiệp phường Kiến An, TP. Hải Phòng do ADT Quốc Tế phát triển. Hãy tư vấn chính xác, chu đáo, có dẫn nguồn tin cậy về địa phương Kiến An, điểm đến (Hồ Hạnh Phúc, Đồi Thiên Văn, Đài khí tượng Phù Liễn), ẩm thực, lịch sự kiện và các giải pháp AI (Trợ lý phường/xã, ORION, Edunow.AI)."
  },

  // Email Brand Info
  email: {
    fromName: process.env.SMTP_FROM_NAME || 'Ban Biên Tập kienan.today',
    fromAddress: process.env.SMTP_FROM || `"kienan.today" <${process.env.SMTP_USER || 'no-reply@kienan.today'}>`,
    supportEmail: process.env.SUPPORT_EMAIL || 'support@kienan.today'
  },

  // Chuyên mục mặc định Kiến An theo Đặc tả kiến trúc hệ sinh thái số kienan.today
  defaultCategories: [
    { name: 'Khám phá Kiến An', slug: 'kham-pha-kien-an', icon: '🌲', description: 'Cảnh quan, lịch sử, văn hóa, Đồi Thiên Văn, Hồ Hạnh Phúc' },
    { name: 'Doanh nghiệp & Dịch vụ', slug: 'doanh-nghiep-dich-vu', icon: '🏢', description: 'Hồ sơ doanh nghiệp, hộ kinh doanh, ẩm thực, sản phẩm địa phương' },
    { name: 'Sự kiện & Hoạt động', slug: 'su-kien-hoat-dong', icon: '📅', description: 'Sự kiện sắp diễn ra, hội thảo chuyển đổi số, sinh hoạt cộng đồng' },
    { name: 'Cộng đồng & Sáng kiến', slug: 'cong-dong-sang-kien', icon: '🤝', description: 'Con người Kiến An, sáng kiến số, kết nối người xa quê' },
    { name: 'Cơ hội Hợp tác', slug: 'co-hoi-hop-tac', icon: '💼', description: 'Nhu cầu đối tác, tìm nhà cung cấp, việc làm và xúc tiến thương mại' },
    { name: 'AI Center & Kỹ năng số', slug: 'ai-center', icon: '🤖', description: 'Trợ lý AI, kỹ năng ứng dụng AI, giải pháp ORION, Edunow' },
    { name: 'Dữ liệu & Tiện ích', slug: 'du-lieu-tien-ich', icon: '📊', description: 'Bản đồ, địa điểm, chỉ dẫn dịch vụ và cẩm nang tiện ích' }
  ]
};

module.exports = brandConfig;
