/**
 * Cấu hình Chuyên mục chính và Lĩnh vực con mặc định cho kienan.today
 * (Đồng bộ theo Phụ lục 3 - Đặc tả dự án kienan.today và Landing Page)
 * Lưu ý: Dữ liệu được tải động từ API /api/categories (Quản lý chuyên mục trong Admin).
 */

export const CATEGORIES_DATA = [
  {
    id: 'kham-pha-kien-an',
    name: 'Khám phá Kiến An',
    name_en: 'Discover Kien An',
    order_index: 1,
    subcategories: [
      'Điểm đến & Thắng cảnh',
      'Đồi Thiên Văn & Phù Liễn',
      'Hồ Hạnh Phúc & Cảnh quan',
      'Lịch sử & Di sản văn hóa',
      'Ẩm thực & Trải nghiệm'
    ]
  },
  {
    id: 'doanh-nghiep-dich-vu',
    name: 'Doanh nghiệp & Dịch vụ',
    name_en: 'Enterprises & Services',
    order_index: 2,
    subcategories: [
      'Danh bạ Doanh nghiệp',
      'Hộ kinh doanh cá thể',
      'Sản phẩm & Đặc sản',
      'Dịch vụ đời sống & Tiện ích'
    ]
  },
  {
    id: 'su-kien-hoat-dong',
    name: 'Sự kiện & Hoạt động',
    name_en: 'Events & Activities',
    order_index: 3,
    subcategories: [
      'Sự kiện sắp diễn ra',
      'Hội thảo Chuyển đổi số & AI',
      'Hoạt động cộng đồng Hồ Hạnh Phúc',
      'Văn hóa - Thể thao địa phương'
    ]
  },
  {
    id: 'cong-dong-sang-kien',
    name: 'Cộng đồng & Sáng kiến',
    name_en: 'Community & Initiatives',
    order_index: 4,
    subcategories: [
      'Câu chuyện nhân vật',
      'Sáng kiến đổi mới',
      'Người Kiến An xa quê',
      'Cộng tác viên & Tình nguyện'
    ]
  },
  {
    id: 'co-hoi-hop-tac',
    name: 'Cơ hội Hợp tác',
    name_en: 'Partnership Opportunities',
    order_index: 5,
    subcategories: [
      'Tìm kiếm đối tác',
      'Tuyển dụng & Việc làm',
      'Xúc tiến thương mại',
      'Không gian sáng tạo'
    ]
  },
  {
    id: 'ai-center',
    name: 'AI Center & Kỹ năng số',
    name_en: 'AI Center & Digital Skills',
    order_index: 6,
    subcategories: [
      'Trợ lý AI Phường/Xã',
      'Hệ sinh thái ORION',
      'Trợ lý tuyển sinh Edunow',
      'Khóa học & Kỹ năng AI'
    ]
  },
  {
    id: 'du-lieu-tien-ich',
    name: 'Dữ liệu & Tiện ích',
    name_en: 'Data & Utilities',
    order_index: 7,
    subcategories: [
      'Bản đồ địa điểm',
      'Chỉ dẫn đường & Bãi xe',
      'Thông tin dịch vụ công',
      'Đường dây nóng khẩn cấp'
    ]
  }
];

export const ALL_CATEGORIES = CATEGORIES_DATA.map(c => c.name);

export const getSubcategoriesByCategory = (categoryName) => {
  const cat = CATEGORIES_DATA.find(c => c.name === categoryName);
  return cat ? cat.subcategories : [];
};

export const CATEGORY_LABELS = {
  // Kiến An Specific Categories
  'Khám phá Kiến An': { vi: 'Khám phá Kiến An', en: 'Discover Kien An', zh: '探索建安', ja: 'キエンアン探索', ko: '끼엔안 탐방' },
  'Doanh nghiệp & Dịch vụ': { vi: 'Doanh nghiệp & Dịch vụ', en: 'Enterprises & Services', zh: '企业与服务', ja: '企業・サービス', ko: '기업 및 서비스' },
  'Sự kiện & Hoạt động': { vi: 'Sự kiện & Hoạt động', en: 'Events & Activities', zh: '活动与事件', ja: 'イベント・活動', ko: '이벤트 및 활동' },
  'Cộng đồng & Sáng kiến': { vi: 'Cộng đồng & Sáng kiến', en: 'Community & Initiatives', zh: '社区与倡议', ja: '地域社会・イニシアティブ', ko: '커뮤니티 및 이니셔티브' },
  'Cơ hội Hợp tác': { vi: 'Cơ hội Hợp tác', en: 'Partnership Opportunities', zh: '合作机遇', ja: '連携の機会', ko: '협력 기회' },
  'AI Center & Kỹ năng số': { vi: 'AI Center & Kỹ năng số', en: 'AI Center & Digital Skills', zh: 'AI中心与数字技能', ja: 'AIセンター・デジタルスキル', ko: 'AI 센터 및 디지털 역량' },
  'Dữ liệu & Tiện ích': { vi: 'Dữ liệu & Tiện ích', en: 'Data & Utilities', zh: '数据与实用信息', ja: 'データ・生活情報', ko: '데이터 및 편의시설' },
  
  // Backwards compatibility / General Labels
  'Doanh nghiệp & Sản phẩm': { vi: 'Doanh nghiệp & Sản phẩm', en: 'Enterprises & Products', zh: '企业与产品', ja: '企業・製品', ko: '기업 및 제품' },
  'Đầu tư & Dự án': { vi: 'Đầu tư & Dự án', en: 'Investment & Projects', zh: '投资与项目', ja: '投資・プロジェクト', ko: '투자 및 프로젝트' },
  'Du lịch & Trải nghiệm': { vi: 'Du lịch & Trải nghiệm', en: 'Tourism & Experiences', zh: '旅游与体验', ja: '観光・体験', ko: '관광 및 체험' },
  'Dữ liệu & Báo cáo': { vi: 'Dữ liệu & Báo cáo', en: 'Data & Reports', zh: '数据与报告', ja: 'データ・レポート', ko: '데이터 및 보고서' },
  'Sự kiện & Diễn đàn': { vi: 'Sự kiện & Diễn đàn', en: 'Events & Forums', zh: '活动与论坛', ja: 'イベント・フォーラム', ko: '이벤트 및 포럼' }
};

export const SUBCATEGORY_LABELS = {
  // Kiến An Subcategories
  'Điểm đến & Thắng cảnh': { vi: 'Điểm đến & Thắng cảnh', en: 'Destinations & Landscapes', zh: '景点与景观', ja: '観光名所・風景', ko: '명소 및 경관' },
  'Đồi Thiên Văn & Phù Liễn': { vi: 'Đồi Thiên Văn & Phù Liễn', en: 'Thien Van Hill & Phu Lien', zh: '天文山与符辇', ja: 'ティエンヴァン山・フーリエン', ko: '티엔반 언덕 및 푸리엔' },
  'Hồ Hạnh Phúc & Cảnh quan': { vi: 'Hồ Hạnh Phúc & Cảnh quan', en: 'Hanh Phuc Lake & Landscapes', zh: '幸福湖与景观', ja: '幸福湖・景観', ko: '한푹 호수 및 경관' },
  'Lịch sử & Di sản văn hóa': { vi: 'Lịch sử & Di sản văn hóa', en: 'History & Cultural Heritage', zh: '历史与文化遗产', ja: '歴史・文化遺産', ko: '역사 및 문화유산' },
  'Ẩm thực & Trải nghiệm': { vi: 'Ẩm thực & Trải nghiệm', en: 'Cuisine & Experiences', zh: '美食与体验', ja: 'グルメ・体験', ko: '음식 및 체험' },
  'Danh bạ Doanh nghiệp': { vi: 'Danh bạ Doanh nghiệp', en: 'Business Directory', zh: '企业名录', ja: '企業名鑑', ko: '기업 디렉토리' },
  'Hộ kinh doanh cá thể': { vi: 'Hộ kinh doanh cá thể', en: 'Local Businesses', zh: '个体工商户', ja: '個人商店・事業者', ko: '자영업자 및 소상공인' },
  'Sản phẩm & Đặc sản': { vi: 'Sản phẩm & Đặc sản', en: 'Local Products & Specialties', zh: '特色产品', ja: '特産品・製品', ko: '특산물 및 제품' },
  'Dịch vụ đời sống & Tiện ích': { vi: 'Dịch vụ đời sống & Tiện ích', en: 'Living Services & Amenities', zh: '生活服务与便利设施', ja: '生活サービス・利便施設', ko: '생활 서비스 및 편의시설' },
  'Sự kiện sắp diễn ra': { vi: 'Sự kiện sắp diễn ra', en: 'Upcoming Events', zh: '近期活动', ja: '近日開催イベント', ko: '예정된 행사' },
  'Hội thảo Chuyển đổi số & AI': { vi: 'Hội thảo Chuyển đổi số & AI', en: 'Digital Transformation & AI Workshops', zh: '数字化转型与AI研讨会', ja: 'DX・AIセミナー', ko: '디지털 전환 및 AI 워크숍' },
  'Hoạt động cộng đồng Hồ Hạnh Phúc': { vi: 'Hoạt động cộng đồng Hồ Hạnh Phúc', en: 'Hanh Phuc Lake Community Events', zh: '幸福湖社区活动', ja: '幸福湖コミュニティ活動', ko: '한푹 호수 커뮤니티 행사' },
  'Văn hóa - Thể thao địa phương': { vi: 'Văn hóa - Thể thao địa phương', en: 'Local Sports & Culture', zh: '地方文化体育', ja: '地域スポーツ・文化', ko: '지역 문화 및 스포츠' },
  'Câu chuyện nhân vật': { vi: 'Câu chuyện nhân vật', en: 'People & Stories', zh: '人物故事', ja: '人物ストーリー', ko: '인물 이야기' },
  'Sáng kiến đổi mới': { vi: 'Sáng kiến đổi mới', en: 'Innovation Initiatives', zh: '创新倡议', ja: 'イノベーションの取り組み', ko: '혁신 계획' },
  'Người Kiến An xa quê': { vi: 'Người Kiến An xa quê', en: 'Kien An Overseas & Expats', zh: '游子乡情', ja: '出身者ネットワーク', ko: '고향을 떠난 끼엔안 사람들' },
  'Cộng tác viên & Tình nguyện': { vi: 'Cộng tác viên & Tình nguyện', en: 'Volunteers & Contributors', zh: '志愿者与合作者', ja: 'ボランティア・寄稿者', ko: '자원봉사 및 기여' },
  'Tìm kiếm đối tác': { vi: 'Tìm kiếm đối tác', en: 'Find Business Partners', zh: '寻找商业伙伴', ja: 'パートナー募集', ko: '비즈니스 파트너 찾기' },
  'Tuyển dụng & Việc làm': { vi: 'Tuyển dụng & Việc làm', en: 'Recruitment & Jobs', zh: '招聘与求职', ja: '採用・求人', ko: '채용 및 구직' },
  'Xúc tiến thương mại': { vi: 'Xúc tiến thương mại', en: 'Trade Promotion', zh: '贸易促进', ja: '貿易・通商促進', ko: '무역 촉진' },
  'Không gian sáng tạo': { vi: 'Không gian sáng tạo', en: 'Creative Spaces', zh: '创意空间', ja: 'クリエイティブスペース', ko: '창의 공간' },
  'Trợ lý AI Phường/Xã': { vi: 'Trợ lý AI Phường/Xã', en: 'Ward/Commune AI Assistant', zh: '坊级AI助手', ja: '行政AIアシスタント', ko: '행정 복지 AI 어시스턴트' },
  'Hệ sinh thái ORION': { vi: 'Hệ sinh thái ORION', en: 'ORION AI Ecosystem', zh: 'ORION生态系统', ja: 'ORION AIエコシステム', ko: 'ORION AI 생태계' },
  'Trợ lý tuyển sinh Edunow': { vi: 'Trợ lý tuyển sinh Edunow', en: 'Edunow Admissions AI', zh: 'Edunow招生助手', ja: 'Edunow入試AI', ko: 'Edunow 입학 AI' },
  'Khóa học & Kỹ năng AI': { vi: 'Khóa học & Kỹ năng AI', en: 'AI Courses & Skills', zh: 'AI培训与技能', ja: 'AI講座・スキルアップ', ko: 'AI 교육 및 역량 강화' },
  'Bản đồ địa điểm': { vi: 'Bản đồ địa điểm', en: 'Place Map', zh: '地点地图', ja: 'マップ・アクセス', ko: '지도 및 위치 안내' },
  'Chỉ dẫn đường & Bãi xe': { vi: 'Chỉ dẫn đường & Bãi xe', en: 'Directions & Parking', zh: '路线与停车指引', ja: '道案内・駐車場', ko: '길 안내 및 주차 정보' },
  'Thông tin dịch vụ công': { vi: 'Thông tin dịch vụ công', en: 'Public Services Info', zh: '公共服务指南', ja: '公共サービス案内', ko: '공공 서비스 안내' },
  'Đường dây nóng khẩn cấp': { vi: 'Đường dây nóng khẩn cấp', en: 'Emergency Hotlines', zh: '紧急热线', ja: '緊急連絡先', ko: '긴급 연락처' }
};

export const getCategoryLabel = (cat, lang = 'vi') => {
  if (!cat) return '';
  const l = lang || 'vi';
  if (typeof cat === 'object') {
    if (cat.name) {
      if (CATEGORY_LABELS[cat.name]?.[l]) return CATEGORY_LABELS[cat.name][l];
      if (l === 'en' && cat.name_en) return String(cat.name_en);
      if (l !== 'vi' && CATEGORY_LABELS[cat.name]?.en) return CATEGORY_LABELS[cat.name].en;
      return String(cat.name);
    }
    return '';
  }
  if (typeof cat === 'string') {
    if (CATEGORY_LABELS[cat]?.[l]) return CATEGORY_LABELS[cat][l];
    if (l !== 'vi' && CATEGORY_LABELS[cat]?.en) return CATEGORY_LABELS[cat].en;
    return cat;
  }
  return String(cat);
};

export const getSubCategoryLabel = (sub, lang = 'vi') => {
  if (!sub) return '';
  const l = lang || 'vi';
  if (typeof sub === 'object') {
    if (sub.name) {
      if (SUBCATEGORY_LABELS[sub.name]?.[l]) return SUBCATEGORY_LABELS[sub.name][l];
      if (l === 'en' && sub.name_en) return String(sub.name_en);
      if (l !== 'vi' && SUBCATEGORY_LABELS[sub.name]?.en) return SUBCATEGORY_LABELS[sub.name].en;
      return String(sub.name);
    }
    return '';
  }
  if (typeof sub === 'string') {
    if (SUBCATEGORY_LABELS[sub]?.[l]) return SUBCATEGORY_LABELS[sub][l];
    if (l !== 'vi' && SUBCATEGORY_LABELS[sub]?.en) return SUBCATEGORY_LABELS[sub].en;
    return sub;
  }
  return String(sub);
};

export default CATEGORIES_DATA;
