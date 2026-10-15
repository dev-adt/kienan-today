/**
 * Fast & Resilient API Client with strict timeouts & fallbacks
 * Prevents endless loading spinners when backend/network is slow or recovering.
 */

export const DEFAULT_TIMEOUT_MS = 10000;

export async function fetchWithTimeout(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Yêu cầu mạng hết thời gian chờ (${timeoutMs}ms): ${url}`);
    }
    throw error;
  }
}

export async function fetchJsonWithTimeout(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const res = await fetchWithTimeout(url, options, timeoutMs);
  if (!res.ok) {
    let errMsg = `HTTP Error ${res.status}`;
    try {
      const errJson = await res.json();
      if (errJson && errJson.error) errMsg = errJson.error;
    } catch (_) {}
    throw new Error(errMsg);
  }
  return await res.json();
}

/**
 * Fallback data cho kienan.today (Kiến An, Hải Phòng)
 */
export const FALLBACK_POSTS = [
  {
    id: 'ka-post-1',
    title: 'Hồ Hạnh Phúc: Điểm hẹn văn hóa, cảnh quan xanh và không gian sinh hoạt cộng đồng giữa lòng Kiến An',
    slug: 'ho-hanh-phuc-diem-hen-van-hoa-canh-quan-xanh-kien-an',
    category: 'Khám phá Kiến An',
    sub_category: 'Hồ Hạnh Phúc & Cảnh quan',
    summary: 'Khám phá không gian cảnh quan mặt nước trong lành, những hoạt động giao lưu văn hóa nghệ thuật cuối tuần và các trải nghiệm cộng đồng gắn liền với nhịp sống đổi mới của người dân Kiến An.',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Ban Biên tập kienan.today',
    company_name: 'Cổng thông tin kienan.today',
    company_tier: 'Diamond',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    views: 1850,
    is_featured: 1
  },
  {
    id: 'ka-post-2',
    title: 'Đồi Thiên Văn và Đài khí tượng Phù Liễn: Hành trình di sản khoa học hơn 120 năm tại Hải Phòng',
    slug: 'doi-thien-van-dai-khi-tuong-phu-lien-di-san-khoa-hoc-kien-an',
    category: 'Khám phá Kiến An',
    sub_category: 'Đồi Thiên Văn & Phù Liễn',
    summary: 'Tìm hiểu cảnh quan rừng thông xanh ngát, dấu ấn lịch sử kiến trúc phương Tây đầu thế kỷ 20 và câu chuyện khoa học khí tượng thiên văn độc đáo trên đỉnh núi Thiên Văn.',
    image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Nhóm Nghiên cứu Văn hóa & Di sản',
    company_name: 'Cộng đồng Khám phá Kiến An',
    company_tier: 'Diamond',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    views: 2420,
    is_featured: 1
  },
  {
    id: 'ka-post-3',
    title: 'Phát triển kinh tế số và hỗ trợ hộ kinh doanh Kiến An tiếp cận nền tảng thương mại điện tử',
    slug: 'phat-trien-kinh-te-so-va-ho-tro-ho-kinh-doanh-kien-an',
    category: 'Doanh nghiệp & Dịch vụ',
    sub_category: 'Hộ kinh doanh cá thể',
    summary: 'Chương trình đồng hành chuyển đổi số, xây dựng hồ sơ số cho các cơ sở kinh doanh, nhà hàng ẩm thực và dịch vụ địa phương nhằm gia tăng khả năng tiếp cận khách hàng trên internet.',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Tổ Công nghệ số Cộng đồng',
    company_name: 'Công ty Cổ phần ADT Quốc Tế',
    company_tier: 'Gold',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    views: 1340,
    is_featured: 1
  },
  {
    id: 'ka-post-4',
    title: 'Ẩm thực Kiến An: Những thức quà đậm vị đất cảng và gợi ý hành trình khám phá một buổi',
    slug: 'am-thuc-kien-an-thuc-qua-dam-vi-dat-cang',
    category: 'Khám phá Kiến An',
    sub_category: 'Ẩm thực & Trải nghiệm',
    summary: 'Từ bánh đa cua, chả chìa nướng thơm lừng đến những quán cà phê view đồi lãng mạn, Kiến An mang đến trải nghiệm phong phú cho gia đình và bạn trẻ vào dịp cuối tuần.',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Ban Đời sống & Trải nghiệm',
    company_name: 'Hiệp hội Ẩm thực & Du lịch Hải Phòng',
    company_tier: 'Gold',
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
    views: 1690,
    is_featured: 0
  },
  {
    id: 'ka-post-5',
    title: 'Hội thảo Kiến An kiến tạo không gian đổi mới sáng tạo và chuyển đổi số kỷ nguyên AI',
    slug: 'hoi-thao-kien-an-kien-tao-khong-gian-doi-moi-sang-tao',
    category: 'Sự kiện & Hoạt động',
    sub_category: 'Hội thảo Chuyển đổi số & AI',
    summary: 'Tổng hợp các giải pháp công nghệ ứng dụng AI, trợ lý ảo phường/xã phục vụ người dân, doanh nghiệp và định hướng xây dựng hạ tầng dữ liệu mở cho địa phương.',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Tổ Biên tập Chuyển đổi số',
    company_name: 'Công ty Cổ phần ADT Quốc Tế',
    company_tier: 'Diamond',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    views: 3120,
    is_featured: 1
  },
  {
    id: 'ka-post-6',
    title: 'Sáng kiến Kết nối người con Kiến An xa quê: Góp sức xây dựng quê hương văn minh, hiện đại',
    slug: 'sang-kien-ket-noi-nguoi-kien-an-xa-que',
    category: 'Cộng đồng & Sáng kiến',
    sub_category: 'Người Kiến An xa quê',
    summary: 'Mạng lưới giao lưu, chia sẻ kinh nghiệm và kết nối nguồn lực từ các chuyên gia, doanh nhân xuất thân từ Kiến An đang công tác trên khắp mọi miền tổ quốc.',
    image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Ban Liên lạc Cộng đồng',
    company_name: 'Cộng đồng kienan.today',
    company_tier: 'Silver',
    created_at: new Date(Date.now() - 3600000 * 60).toISOString(),
    views: 1480,
    is_featured: 0
  }
];

export const FALLBACK_EVENTS = [
  {
    id: 'ka-evt-1',
    title: 'Hội thảo Ứng dụng AI & Công nghệ số trong Quản trị Doanh nghiệp và Dịch vụ Công',
    short_desc: 'Chia sẻ các ứng dụng AI thiết thực cho chính quyền cấp phường, hộ kinh doanh và trường học.',
    description: 'Chia sẻ các ứng dụng AI thiết thực cho chính quyền cấp phường, hộ kinh doanh và trường học. Trải nghiệm Bộ Đôi Trợ Lý AI Phường/Xã và nền tảng ORION.',
    event_date: '2026-11-20 08:30:00',
    start_time: '2026-11-20 08:30:00',
    end_time: '2026-11-20 11:30:00',
    location: 'Hội trường Trung tâm Văn hóa, Phường Kiến An, TP. Hải Phòng',
    organizer: 'Công ty Cổ phần ADT Quốc Tế phối hợp cùng Đối tác',
    banner_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    is_paid: 0,
    price: 0,
    max_tickets: 150,
    capacity: 150,
    registered_tickets: 42,
    status: 'upcoming'
  },
  {
    id: 'ka-evt-2',
    title: 'Ngày hội Trải nghiệm Văn hóa & Ẩm thực cuối tuần bên Hồ Hạnh Phúc',
    short_desc: 'Không gian gặp gỡ cộng đồng với các gian hàng giới thiệu sản phẩm tiêu biểu địa phương.',
    description: 'Không gian gặp gỡ cộng đồng với các gian hàng giới thiệu sản phẩm tiêu biểu địa phương, biểu diễn nghệ thuật đường phố và hoạt động gắn kết gia đình.',
    event_date: '2026-11-28 17:00:00',
    start_time: '2026-11-28 17:00:00',
    end_time: '2026-11-28 21:30:00',
    location: 'Khu vực Vườn hoa ven Hồ Hạnh Phúc, Kiến An, Hải Phòng',
    organizer: 'Ban Tổ chức Hoạt động Cộng đồng Kiến An',
    banner_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    is_paid: 0,
    price: 0,
    max_tickets: 300,
    capacity: 300,
    registered_tickets: 115,
    status: 'upcoming'
  },
  {
    id: 'ka-evt-3',
    title: 'Diễn đàn Kết nối Doanh nghiệp & Xúc tiến Thương mại Kiến An 2026',
    short_desc: 'Giao lưu trực tiếp giữa các doanh nghiệp sản xuất, du lịch và nhà cung cấp dịch vụ địa phương.',
    description: 'Tập hợp hơn 200 doanh nghiệp vừa và nhỏ, hợp tác xã và hộ kinh doanh cá thể trên địa bàn Kiến An, mở rộng chuỗi cung ứng và cơ hội liên kết tiêu thụ sản phẩm.',
    event_date: '2026-12-05 08:30:00',
    start_time: '2026-12-05 08:30:00',
    end_time: '2026-12-05 16:30:00',
    location: 'Trung tâm Hội nghị UBND Quận Kiến An, TP. Hải Phòng',
    organizer: 'Hội Doanh nghiệp & KienAn.today',
    banner_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    is_paid: 0,
    price: 0,
    max_tickets: 250,
    capacity: 250,
    registered_tickets: 88,
    status: 'upcoming'
  },
  {
    id: 'ka-evt-4',
    title: 'Tọa đàm Hướng nghiệp & Phát triển Kỹ năng số cho Thanh niên Kiến An',
    short_desc: 'Trải nghiệm ứng dụng trí tuệ nhân tạo và định hướng nghề nghiệp công nghệ tương lai.',
    description: 'Chương trình phối hợp cùng các chuyên gia Edunow và ADT Group chia sẻ kiến thức sử dụng AI thực tế trong học tập và công việc.',
    event_date: '2026-12-12 14:00:00',
    start_time: '2026-12-12 14:00:00',
    end_time: '2026-12-12 17:00:00',
    location: 'Hội trường Nhà Văn hóa Thiếu nhi Kiến An',
    organizer: 'Đoàn Thanh niên & ADT Group',
    banner_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    is_paid: 1,
    price: 150000,
    max_tickets: 180,
    capacity: 180,
    registered_tickets: 56,
    status: 'upcoming'
  }
];

export const FALLBACK_MEMBERS = [
  {
    id: 'ka-mem-1',
    company_name: 'Công ty Cổ phần ADT Quốc Tế',
    sector: 'Công nghệ thông tin & Trí tuệ Nhân tạo (AI)',
    address: 'Đối tác chiến lược nền tảng kienan.today',
    tier: 'Diamond',
    logo_url: '/images/adt_logo.svg',
    description: 'Đơn vị tiên phong phát triển các giải pháp Trợ lý AI Phường/Xã, Hệ sinh thái AI doanh nghiệp ORION và Edunow.AI tuyển sinh thông minh.',
    verified: 1
  },
  {
    id: 'ka-mem-2',
    company_name: 'Tổ hợp Dịch vụ & Ẩm thực Đồi Thiên Văn',
    sector: 'Dịch vụ, Du lịch & Trải nghiệm văn hóa',
    address: 'Đường lên Đồi Thiên Văn, Kiến An, Hải Phòng',
    tier: 'Gold',
    logo_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    description: 'Không gian cà phê sinh thái, ngắm toàn cảnh thung lũng và phục vụ ẩm thực địa phương đặc sắc.',
    verified: 1
  },
  {
    id: 'ka-mem-3',
    company_name: 'Hợp tác xã Nông nghiệp Sạch & Đặc sản Vùng',
    sector: 'Nông nghiệp công nghệ & Sản phẩm địa phương',
    address: 'Khu vực Kiến An, TP. Hải Phòng',
    tier: 'Silver',
    logo_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=200&q=80',
    description: 'Cung cấp các sản phẩm rau củ quả an toàn, hoa quả sạch và sản phẩm truyền thống tiêu chuẩn kiểm định.',
    verified: 1
  },
  {
    id: 'ka-mem-4',
    company_name: 'Trung tâm Phát triển Kỹ năng số & Sáng tạo Trẻ',
    sector: 'Giáo dục, Đào tạo kỹ năng số & STEM',
    address: 'Đường Trần Tất Văn, Phường Kiến An, TP. Hải Phòng',
    tier: 'Silver',
    logo_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
    description: 'Tổ chức các lớp học lập trình, kỹ năng ứng dụng AI và tư duy khoa học cho học sinh, thanh niên địa phương.',
    verified: 1
  }
];
