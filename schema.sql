-- ============================================
-- DoanhNghiepVN.today — MySQL Database Schema
-- Hệ sinh thái số Tạp chí Doanh Nghiệp Việt Nam
-- Database: doanhnghiepvn_db | User: dnvn_user
-- ============================================

-- ── 1. Bảng hội viên doanh nghiệp ─────────────────────────────
CREATE TABLE IF NOT EXISTS members (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  name                  VARCHAR(255) NOT NULL COMMENT 'Tên doanh nghiệp / Đơn vị',
  tax_code              VARCHAR(20)  COMMENT 'Mã số thuế',
  license               VARCHAR(50)  COMMENT 'Số giấy phép kinh doanh',
  industry              VARCHAR(100) COMMENT 'Ngành nghề / Lĩnh vực',
  size                  VARCHAR(50)  COMMENT 'Quy mô nhân sự',
  address               TEXT         COMMENT 'Địa chỉ',
  city                  VARCHAR(100) DEFAULT NULL COMMENT 'Tỉnh / Thành phố',
  website               VARCHAR(255) COMMENT 'Website',
  social                VARCHAR(255) COMMENT 'Fanpage / LinkedIn',
  description           TEXT         COMMENT 'Mô tả hoạt động',
  tier                  ENUM('Silver','Gold','Platinum') DEFAULT 'Silver' COMMENT 'Gói hội viên',
  tier_expires_at       TIMESTAMP    NULL DEFAULT NULL COMMENT 'Hạn gói hội viên',
  pending_tier_upgrade  ENUM('Silver','Gold','Platinum') DEFAULT NULL COMMENT 'Yêu cầu nâng cấp gói',
  is_featured           TINYINT(1)   DEFAULT 0 COMMENT '1: Hội viên tiêu biểu ghim trang chủ',
  status                ENUM('pending','approved','rejected','suspended') DEFAULT 'pending' COMMENT 'Trạng thái tài khoản',
  contact_name          VARCHAR(100) COMMENT 'Tên người đại diện',
  contact_pos           VARCHAR(100) COMMENT 'Chức vụ',
  email                 VARCHAR(255) DEFAULT NULL COMMENT 'Email liên hệ',
  username              VARCHAR(100) UNIQUE DEFAULT NULL COMMENT 'Tên đăng nhập',
  password_hash         VARCHAR(255) DEFAULT NULL COMMENT 'Mật khẩu mã hóa',
  phone                 VARCHAR(20)  COMMENT 'Số điện thoại',
  goal                  TEXT         COMMENT 'Mục tiêu tham gia',
  referral              VARCHAR(100) COMMENT 'Biết đến qua kênh nào',
  reject_reason         TEXT         COMMENT 'Lý do từ chối',
  created_at            TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_tier (tier),
  INDEX idx_industry (industry),
  INDEX idx_city (city)
) ENGINE=InnoDB COMMENT='Danh sách hội viên doanh nghiệp';

-- ── 2. Bảng phiên đăng nhập hội viên ─────────────────────────
CREATE TABLE IF NOT EXISTS member_sessions (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  member_id     INT NOT NULL,
  token         VARCHAR(255) NOT NULL UNIQUE,
  expires_at    TIMESTAMP NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  INDEX idx_token (token)
) ENGINE=InnoDB COMMENT='Token phiên đăng nhập hội viên';

-- ── 3. Bảng quản trị viên hệ thống ───────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(50)  NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  role          ENUM('superadmin','admin','editor','creator','member') DEFAULT 'admin',
  last_login    TIMESTAMP NULL DEFAULT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Tài khoản quản trị và ban điều hành';

-- ── 4. Bảng phiên đăng nhập quản trị ─────────────────────────
CREATE TABLE IF NOT EXISTS admin_sessions (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  admin_id      INT NOT NULL,
  token         VARCHAR(255) NOT NULL UNIQUE,
  expires_at    DATETIME NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
  INDEX idx_token (token)
) ENGINE=InnoDB COMMENT='Phiên đăng nhập quản trị viên';

-- ── 5. Bảng ban biên tập & Creator ───────────────────────────
CREATE TABLE IF NOT EXISTS content_creators (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  username      VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  requires_approval TINYINT(1) DEFAULT 1,
  phone         VARCHAR(50)  DEFAULT NULL,
  email         VARCHAR(191) DEFAULT NULL,
  role          VARCHAR(50)  DEFAULT 'creator',
  status        VARCHAR(50)  DEFAULT 'active',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Tài khoản Ban biên tập & Creator';

-- ── 6. Bảng phiên đăng nhập Creator ──────────────────────────
CREATE TABLE IF NOT EXISTS creator_sessions (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  creator_id    INT NOT NULL,
  token         VARCHAR(255) NOT NULL UNIQUE,
  expires_at    DATETIME NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES content_creators(id) ON DELETE CASCADE,
  INDEX idx_token (token)
) ENGINE=InnoDB COMMENT='Phiên đăng nhập Biên tập viên / Creator';

-- ── 7. Bảng ban tổ chức sự kiện & soát vé ────────────────────
CREATE TABLE IF NOT EXISTS event_organizers (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  username      VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone         VARCHAR(50)  DEFAULT NULL,
  email         VARCHAR(191) DEFAULT NULL,
  role          VARCHAR(50)  DEFAULT 'organizer' COMMENT 'organizer hoặc ticket_inspector',
  status        VARCHAR(50)  DEFAULT 'active',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Tài khoản Ban tổ chức Sự kiện & Soát vé';

-- ── 8. Bảng phiên đăng nhập Ban tổ chức sự kiện ───────────────
CREATE TABLE IF NOT EXISTS organizer_sessions (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  organizer_id  INT NOT NULL,
  token         VARCHAR(255) NOT NULL UNIQUE,
  expires_at    DATETIME NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organizer_id) REFERENCES event_organizers(id) ON DELETE CASCADE,
  INDEX idx_token (token)
) ENGINE=InnoDB COMMENT='Phiên đăng nhập Ban tổ chức Sự kiện';

-- ── 9. Bảng bài viết & tin tức ───────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  member_id           INT          DEFAULT NULL COMMENT 'NULL nếu là bài từ ban biên tập/creator',
  creator_id          INT          DEFAULT NULL COMMENT 'NULL nếu là bài từ hội viên',
  title               VARCHAR(255) NOT NULL,
  slug                VARCHAR(550) DEFAULT NULL,
  category            VARCHAR(100) DEFAULT 'Tin tức',
  sub_category        VARCHAR(100) DEFAULT NULL,
  summary             TEXT,
  body                LONGTEXT     NOT NULL,
  image_url           VARCHAR(1000) DEFAULT NULL,
  author_name         VARCHAR(100),
  author_pos          VARCHAR(100),
  contact_info        VARCHAR(255),
  source_url          VARCHAR(500) DEFAULT NULL,
  tags                JSON         DEFAULT NULL,
  deadline            VARCHAR(50)  DEFAULT NULL,
  type                VARCHAR(50)  DEFAULT 'Tin tức' COMMENT 'Tìm đối tác, Cần mua, Cần bán, Tin tức...',
  status              ENUM('draft','pending','approved','rejected','hidden') DEFAULT 'pending',
  is_featured         TINYINT(1)   DEFAULT 0,
  featured_requested  TINYINT(1)   DEFAULT 0,
  reject_reason       TEXT         DEFAULT NULL,
  published_at        TIMESTAMP    NULL DEFAULT NULL,
  views               INT          DEFAULT 0,
  likes               INT          DEFAULT 0,
  created_at          TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_featured (is_featured),
  INDEX idx_created (created_at),
  INDEX idx_category (category),
  INDEX idx_creator (creator_id),
  INDEX idx_slug (slug)
) ENGINE=InnoDB COMMENT='Bài viết và tin đăng doanh nghiệp';

-- ── 10. Bảng sự kiện & hội thảo ──────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(255) NOT NULL COMMENT 'Tiêu đề sự kiện',
  slug          VARCHAR(255) DEFAULT NULL COMMENT 'Đường dẫn thân thiện',
  short_desc    TEXT         DEFAULT NULL COMMENT 'Mô tả ngắn',
  description   TEXT         DEFAULT NULL COMMENT 'Tóm tắt sự kiện',
  content       LONGTEXT     DEFAULT NULL COMMENT 'Nội dung chi tiết (Rich Text HTML)',
  event_date    DATETIME     NOT NULL     COMMENT 'Thời gian bắt đầu',
  end_date      DATETIME     DEFAULT NULL COMMENT 'Thời gian kết thúc',
  location      VARCHAR(255) DEFAULT NULL COMMENT 'Địa điểm tổ chức',
  organizer     VARCHAR(100) DEFAULT 'Tạp chí Doanh Nghiệp Việt Nam',
  capacity      INT          DEFAULT 0    COMMENT 'Giới hạn số lượng vé (0 = không giới hạn)',
  image_url     VARCHAR(500) DEFAULT NULL COMMENT 'Ảnh đại diện sự kiện',
  is_paid       TINYINT(1)   DEFAULT 0    COMMENT '0: Miễn phí, 1: Có thu phí',
  price         DECIMAL(15,2) DEFAULT 0   COMMENT 'Mức phí (đ/vé)',
  is_published  TINYINT(1)   DEFAULT 1    COMMENT '1: Công khai lên website, 0: Ẩn',
  status        ENUM('upcoming','ongoing','completed','cancelled') DEFAULT 'upcoming',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_event_date (event_date),
  INDEX idx_status (status),
  INDEX idx_published (is_published)
) ENGINE=InnoDB COMMENT='Quản lý sự kiện và hội thảo doanh nghiệp';

-- ── 11. Bảng đăng ký tham gia sự kiện & cấp vé QR ───────────
CREATE TABLE IF NOT EXISTS event_registrations (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  event_id        INT          NOT NULL,
  member_id       INT          DEFAULT NULL COMMENT 'Khóa ngoại liên kết hội viên (nếu có)',
  ticket_code     VARCHAR(50)  NOT NULL UNIQUE COMMENT 'Mã vé / Mã QR check-in',
  full_name       VARCHAR(150) NOT NULL COMMENT 'Họ và tên người đăng ký',
  phone           VARCHAR(30)  NOT NULL COMMENT 'Số điện thoại',
  email           VARCHAR(255) DEFAULT NULL COMMENT 'Email nhận thông tin',
  company         VARCHAR(255) DEFAULT NULL COMMENT 'Đơn vị / Công ty',
  quantity        INT          DEFAULT 1    COMMENT 'Số lượng vé đăng ký',
  total_amount    DECIMAL(15,2) DEFAULT 0   COMMENT 'Tổng tiền thanh toán (VNĐ)',
  payment_status  ENUM('free','pending','paid','cancelled') DEFAULT 'free' COMMENT 'Trạng thái thanh toán',
  payment_note    VARCHAR(255) DEFAULT NULL COMMENT 'Ghi chú / Cú pháp chuyển khoản',
  payment_proof   VARCHAR(500) DEFAULT NULL COMMENT 'Ảnh chứng từ thanh toán chuyển khoản',
  checkin_status  ENUM('not_checked_in','checked_in') DEFAULT 'not_checked_in' COMMENT 'Trạng thái điểm danh',
  checkin_time    DATETIME     DEFAULT NULL COMMENT 'Thời gian quét mã QR check-in',
  create_account  TINYINT(1)   DEFAULT 0    COMMENT 'Yêu cầu tạo tài khoản theo dõi',
  notes           TEXT         DEFAULT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_event (event_id),
  INDEX idx_ticket (ticket_code),
  INDEX idx_phone (phone),
  INDEX idx_reg_member (member_id),
  INDEX idx_payment_status (payment_status)
) ENGINE=InnoDB COMMENT='Danh sách đăng ký tham gia sự kiện và vé QR';

-- ── 12. Bảng quan tâm sự kiện (Tương thích ngược) ───────────
CREATE TABLE IF NOT EXISTS event_interests (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  event_id      INT NOT NULL,
  member_id     INT DEFAULT NULL,
  name          VARCHAR(100) NOT NULL,
  phone         VARCHAR(20)  NOT NULL,
  email         VARCHAR(255),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_event (event_id),
  INDEX idx_member (member_id)
) ENGINE=InnoDB COMMENT='Đăng ký quan tâm sự kiện';

-- ── 13. Bảng Leads & Đăng ký tư vấn doanh nghiệp ─────────────
CREATE TABLE IF NOT EXISTS leads (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  full_name     VARCHAR(255) NOT NULL,
  phone         VARCHAR(50)  NOT NULL,
  email         VARCHAR(255) DEFAULT NULL,
  city          VARCHAR(100) DEFAULT NULL,
  member_type   VARCHAR(100) DEFAULT 'Tư vấn chung',
  company_name  VARCHAR(255) DEFAULT NULL,
  notes         TEXT         DEFAULT NULL,
  status        VARCHAR(50)  DEFAULT 'new',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone (phone),
  INDEX idx_status (status)
) ENGINE=InnoDB COMMENT='Danh sách khách hàng tiềm năng & đăng ký tư vấn';

-- ── 14. Bảng chuyên mục & lĩnh vực con (Song ngữ) ───────────
CREATE TABLE IF NOT EXISTS categories (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  name_en       VARCHAR(255) DEFAULT NULL,
  slug          VARCHAR(255) NOT NULL UNIQUE,
  order_index   INT DEFAULT 0,
  status        ENUM('active', 'inactive') DEFAULT 'active',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Chuyên mục chính';

CREATE TABLE IF NOT EXISTS sub_categories (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  category_id   INT NOT NULL,
  name          VARCHAR(255) NOT NULL,
  name_en       VARCHAR(255) DEFAULT NULL,
  slug          VARCHAR(255),
  order_index   INT DEFAULT 0,
  status        ENUM('active', 'inactive') DEFAULT 'active',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  INDEX idx_category (category_id)
) ENGINE=InnoDB COMMENT='Lĩnh vực con';

-- ── 15. Bảng cấu hình AI & Trợ lý ảo ─────────────────────────
CREATE TABLE IF NOT EXISTS ai_config (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  provider            VARCHAR(50)  NOT NULL DEFAULT 'openrouter',
  model               VARCHAR(100) NOT NULL,
  system_prompt       TEXT,
  system_instruction  TEXT DEFAULT NULL,
  is_active           TINYINT(1)   DEFAULT 1,
  updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Cấu hình AI Proxy';

-- ── 16. Bảng lưu trữ lịch sử hội thoại AI Chat ───────────────
CREATE TABLE IF NOT EXISTS chat_logs (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  session_id    VARCHAR(100) NOT NULL,
  member_id     INT          DEFAULT NULL,
  role          VARCHAR(20)  NOT NULL DEFAULT 'user',
  content       LONGTEXT     NOT NULL,
  provider      VARCHAR(50)  DEFAULT NULL,
  model         VARCHAR(100) DEFAULT NULL,
  tokens_in     INT          DEFAULT 0,
  tokens_out    INT          DEFAULT 0,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session (session_id),
  INDEX idx_member (member_id)
) ENGINE=InnoDB COMMENT='Lịch sử trò chuyện với AI Bot';

-- ============================================
-- DỮ LIỆU KHỞI TẠO MẪU (kienan.today)
-- ============================================

-- Admin mặc định (Username: admin | Password: Admin@123)
INSERT INTO admins (username, password_hash, name, email, role) VALUES
('admin', '$2b$10$3luJFH.EMVPnxeH8BdXn9.5tnCQ9huv13yzOzHrwYGiRhgV7dcufq', 'Ban Quản trị kienan.today', 'admin@kienan.today', 'superadmin')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Cấu hình AI mặc định (Google Gemini Flash qua OpenRouter / Google API)
INSERT INTO ai_config (provider, model, is_active) VALUES ('openrouter', 'google/gemini-3-flash-preview', 1)
ON DUPLICATE KEY UPDATE model=VALUES(model);

-- Khởi tạo 7 Chuyên mục chính kienan.today
INSERT INTO categories (name, name_en, slug, order_index, status) VALUES
('Khám phá Kiến An', 'Discover Kien An', 'kham-pha-kien-an', 1, 'active'),
('Doanh nghiệp & Dịch vụ', 'Enterprises & Services', 'doanh-nghiep-dich-vu', 2, 'active'),
('Sự kiện & Hoạt động', 'Events & Activities', 'su-kien-hoat-dong', 3, 'active'),
('Cộng đồng & Sáng kiến', 'Community & Initiatives', 'cong-dong-sang-kien', 4, 'active'),
('Cơ hội Hợp tác', 'Partnership Opportunities', 'co-hoi-hop-tac', 5, 'active'),
('AI Center & Kỹ năng số', 'AI Center & Digital Skills', 'ai-center', 6, 'active'),
('Dữ liệu & Tiện ích', 'Data & Utilities', 'du-lieu-tien-ich', 7, 'active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Khởi tạo Lĩnh vực con tương ứng
INSERT INTO sub_categories (category_id, name, name_en, slug, order_index, status) VALUES
(1, 'Điểm đến & Thắng cảnh', 'Destinations & Landscapes', 'diem-den-thang-canh', 1, 'active'),
(1, 'Đồi Thiên Văn & Phù Liễn', 'Thien Van Hill & Phu Lien', 'doi-thien-van-phu-lien', 2, 'active'),
(1, 'Hồ Hạnh Phúc & Cảnh quan', 'Hanh Phuc Lake & Landscapes', 'ho-hanh-phuc-canh-quan', 3, 'active'),
(1, 'Lịch sử & Di sản văn hóa', 'History & Cultural Heritage', 'lich-su-di-san-van-hoa', 4, 'active'),
(1, 'Ẩm thực & Trải nghiệm', 'Cuisine & Experiences', 'am-thuc-trai-nghiem', 5, 'active'),
(2, 'Danh bạ Doanh nghiệp', 'Business Directory', 'danh-ba-doanh-nghiep', 1, 'active'),
(2, 'Hộ kinh doanh cá thể', 'Local Businesses', 'ho-kinh-doanh-ca-the', 2, 'active'),
(2, 'Sản phẩm & Đặc sản', 'Local Products & Specialties', 'san-pham-dac-san', 3, 'active'),
(2, 'Dịch vụ đời sống & Tiện ích', 'Living Services & Amenities', 'dich-vu-doi-song-tien-ich', 4, 'active'),
(3, 'Sự kiện sắp diễn ra', 'Upcoming Events', 'su-kien-sap-dien-ra', 1, 'active'),
(3, 'Hội thảo Chuyển đổi số & AI', 'Digital Transformation & AI Workshops', 'hoi-thao-chuyen-doi-so-ai', 2, 'active'),
(3, 'Hoạt động cộng đồng Hồ Hạnh Phúc', 'Hanh Phuc Lake Community Events', 'hoat-dong-cong-dong-ho-hanh-phuc', 3, 'active'),
(3, 'Văn hóa - Thể thao địa phương', 'Local Sports & Culture', 'van-hoa-the-thao-dia-phuong', 4, 'active'),
(4, 'Câu chuyện nhân vật', 'People & Stories', 'cau-chuyen-nhan-vat', 1, 'active'),
(4, 'Sáng kiến đổi mới', 'Innovation Initiatives', 'sang-kien-doi-moi', 2, 'active'),
(4, 'Người Kiến An xa quê', 'Kien An Overseas & Expats', 'nguoi-kien-an-xa-que', 3, 'active'),
(4, 'Cộng tác viên & Tình nguyện', 'Volunteers & Contributors', 'cong-tac-vien-tinh-nguyen', 4, 'active'),
(5, 'Tìm kiếm đối tác', 'Find Business Partners', 'tim-kiem-doi-tac', 1, 'active'),
(5, 'Tuyển dụng & Việc làm', 'Recruitment & Jobs', 'tuyen-dung-viec-lam', 2, 'active'),
(5, 'Xúc tiến thương mại', 'Trade Promotion', 'xuc-tien-thuong-mai', 3, 'active'),
(5, 'Không gian sáng tạo', 'Creative Spaces', 'khong-gian-sang-tao', 4, 'active'),
(6, 'Trợ lý AI Phường/Xã', 'Ward/Commune AI Assistant', 'tro-ly-ai-phuong-xa', 1, 'active'),
(6, 'Hệ sinh thái ORION', 'ORION AI Ecosystem', 'he-sinh-thai-orion', 2, 'active'),
(6, 'Trợ lý tuyển sinh Edunow', 'Edunow Admissions AI', 'tro-ly-tuyen-sinh-edunow', 3, 'active'),
(6, 'Khóa học & Kỹ năng AI', 'AI Courses & Skills', 'khoa-hoc-ky-nang-ai', 4, 'active'),
(7, 'Bản đồ địa điểm', 'Place Map', 'ban-do-dia-diem', 1, 'active'),
(7, 'Chỉ dẫn đường & Bãi xe', 'Directions & Parking', 'chi-dan-duong-bai-xe', 2, 'active'),
(7, 'Thông tin dịch vụ công', 'Public Services Info', 'thong-tin-dich-vu-cong', 3, 'active'),
(7, 'Đường dây nóng khẩn cấp', 'Emergency Hotlines', 'duong-day-nong-khan-cap', 4, 'active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

