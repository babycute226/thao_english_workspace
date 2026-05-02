/* Work English 2026 - Static self-study app
   Features: bilingual workplace lessons, 7 fields, 10 levels, dynamic daily prompts, quizzes, local progress, hourly vibe changes and YouTube background music.
*/

const STORAGE_KEY = "workEnglish2026ProgressV5";
const FIELD_KEY = "workEnglish2026CurrentField";
const LEVEL_KEY = "workEnglish2026CurrentLevel";
const VIBE_KEY = "workEnglish2026Vibe";
const DAILY_TREND_KEY = "workEnglish2026DailyTrendSalt";
const ONE_HOUR = 60 * 60 * 1000;

const tracks = [
  { title: "Lofi Study • nhẹ nhàng", videoId: "jfKfPfyJRdk" },
  { title: "Piano Study • không lời", videoId: "lTRiuFIWV54" },
  { title: "Cafe Jazz • tập trung", videoId: "Dx5qFachd3A" },
  { title: "Calm Ambient • deep focus", videoId: "kgx4WGK0oNU" }
];

const vibes = [
  {
    title: "Morning Focus Cafe",
    text: "Tông sáng, nhẹ, hợp học từ vựng và nghe ngắn trước giờ làm.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    gradient: "radial-gradient(circle at 12% 20%, rgba(147,242,220,.34), transparent 30%), radial-gradient(circle at 85% 15%, rgba(248,217,136,.26), transparent 34%), linear-gradient(135deg, #102235 0%, #17304c 48%, #2f2447 100%)"
  },
  {
    title: "Hybrid Team Lounge",
    text: "Không khí họp nhóm, networking và luyện phản xạ giao tiếp chuyên nghiệp.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    gradient: "radial-gradient(circle at 20% 15%, rgba(180,167,255,.3), transparent 32%), radial-gradient(circle at 78% 12%, rgba(147,242,220,.2), transparent 30%), linear-gradient(135deg, #101524 0%, #243454 55%, #402d55 100%)"
  },
  {
    title: "Deep Work Desk",
    text: "Tập trung cho email, báo cáo, prompt AI và chuẩn bị thuyết trình.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    gradient: "radial-gradient(circle at 25% 18%, rgba(120,220,255,.22), transparent 30%), radial-gradient(circle at 80% 18%, rgba(255,172,205,.22), transparent 32%), linear-gradient(135deg, #0d1724 0%, #17324b 52%, #42284c 100%)"
  },
  {
    title: "Evening Chill Practice",
    text: "Dịu mắt, hợp ôn lại bài, làm quiz và xem tiến độ sau một ngày làm việc.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    gradient: "radial-gradient(circle at 20% 10%, rgba(255,218,138,.24), transparent 30%), radial-gradient(circle at 82% 20%, rgba(147,242,220,.2), transparent 32%), linear-gradient(135deg, #111827 0%, #1f2937 50%, #3b2f58 100%)"
  }
];

const fieldProfiles = {
  food: {
    id: "food",
    label: "Ẩm thực",
    labelEn: "Food & Beverage",
    role: "F&B coordinator",
    roleVi: "điều phối viên F&B",
    context: "menu updates, supplier requests, food quality, reservations, and customer feedback",
    contextVi: "cập nhật thực đơn, yêu cầu nhà cung cấp, chất lượng món ăn, đặt bàn và phản hồi khách hàng",
    project: "seasonal menu launch",
    projectVi: "ra mắt thực đơn theo mùa",
    metric: "table turnover and customer satisfaction",
    metricVi: "vòng quay bàn và mức hài lòng của khách",
    item: "menu update",
    itemVi: "cập nhật thực đơn",
    stakeholder: "head chef",
    customer: "guest",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
  },
  accounting: {
    id: "accounting",
    label: "Kế toán",
    labelEn: "Accounting",
    role: "accounting assistant",
    roleVi: "nhân viên kế toán",
    context: "invoices, payment schedules, receipts, monthly closing, and tax documents",
    contextVi: "hóa đơn, lịch thanh toán, biên lai, khóa sổ tháng và hồ sơ thuế",
    project: "monthly closing checklist",
    projectVi: "checklist khóa sổ cuối tháng",
    metric: "invoice accuracy and payment timing",
    metricVi: "độ chính xác hóa đơn và thời gian thanh toán",
    item: "invoice reconciliation",
    itemVi: "đối soát hóa đơn",
    stakeholder: "finance manager",
    customer: "vendor",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80"
  },
  analyst: {
    id: "analyst",
    label: "Analyst",
    labelEn: "Analyst",
    role: "business analyst",
    roleVi: "chuyên viên phân tích kinh doanh",
    context: "dashboards, KPIs, user behavior, insights, and data-backed recommendations",
    contextVi: "dashboard, KPI, hành vi người dùng, insight và đề xuất dựa trên dữ liệu",
    project: "weekly KPI dashboard",
    projectVi: "dashboard KPI hằng tuần",
    metric: "conversion rate and retention",
    metricVi: "tỷ lệ chuyển đổi và tỷ lệ giữ chân",
    item: "data insight",
    itemVi: "insight dữ liệu",
    stakeholder: "product manager",
    customer: "internal stakeholder",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
  },
  tourism: {
    id: "tourism",
    label: "Du lịch",
    labelEn: "Tourism",
    role: "tour consultant",
    roleVi: "tư vấn viên du lịch",
    context: "itineraries, bookings, travel documents, customer requests, and local experiences",
    contextVi: "lịch trình, đặt dịch vụ, giấy tờ du lịch, yêu cầu khách hàng và trải nghiệm địa phương",
    project: "customized travel itinerary",
    projectVi: "lịch trình du lịch cá nhân hóa",
    metric: "booking conversion and traveler satisfaction",
    metricVi: "tỷ lệ chốt booking và mức hài lòng của khách du lịch",
    item: "travel itinerary",
    itemVi: "lịch trình du lịch",
    stakeholder: "tour operator",
    customer: "traveler",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  hotel: {
    id: "hotel",
    label: "Khách sạn",
    labelEn: "Hospitality",
    role: "front office supervisor",
    roleVi: "giám sát lễ tân",
    context: "check-ins, room requests, guest complaints, housekeeping updates, and service recovery",
    contextVi: "check-in, yêu cầu phòng, phàn nàn của khách, cập nhật buồng phòng và xử lý dịch vụ",
    project: "VIP guest arrival plan",
    projectVi: "kế hoạch đón khách VIP",
    metric: "occupancy rate and guest review score",
    metricVi: "tỷ lệ lấp phòng và điểm đánh giá của khách",
    item: "room request",
    itemVi: "yêu cầu phòng",
    stakeholder: "housekeeping team",
    customer: "hotel guest",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
  },
  business: {
    id: "business",
    label: "Kinh doanh",
    labelEn: "Business",
    role: "business development executive",
    roleVi: "nhân viên phát triển kinh doanh",
    context: "client meetings, proposals, follow-ups, contracts, and revenue opportunities",
    contextVi: "họp khách hàng, đề xuất, follow-up, hợp đồng và cơ hội doanh thu",
    project: "new client proposal",
    projectVi: "đề xuất cho khách hàng mới",
    metric: "pipeline value and deal conversion",
    metricVi: "giá trị pipeline và tỷ lệ chốt deal",
    item: "client proposal",
    itemVi: "đề xuất khách hàng",
    stakeholder: "sales manager",
    customer: "prospect",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80"
  },
  marketing: {
    id: "marketing",
    label: "Marketing",
    labelEn: "Marketing",
    role: "marketing specialist",
    roleVi: "chuyên viên marketing",
    context: "campaign briefs, content calendars, social posts, ads, leads, and brand messaging",
    contextVi: "brief chiến dịch, lịch nội dung, bài đăng mạng xã hội, quảng cáo, lead và thông điệp thương hiệu",
    project: "product launch campaign",
    projectVi: "chiến dịch ra mắt sản phẩm",
    metric: "engagement rate and qualified leads",
    metricVi: "tỷ lệ tương tác và lead chất lượng",
    item: "campaign brief",
    itemVi: "brief chiến dịch",
    stakeholder: "creative team",
    customer: "target audience",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
  }
};

const levelProfiles = [
  { level: 1, name: "Cơ bản", cefr: "A1", minutes: 12, complexity: "short phrases", taskVi: "nhận biết từ vựng và câu đơn", grammar: "Subject + verb + object", output: "1 câu ngắn" },
  { level: 2, name: "Nền tảng", cefr: "A1+", minutes: 14, complexity: "simple workplace sentences", taskVi: "nói câu đơn có bối cảnh", grammar: "I need / I have / I can", output: "2 câu ngắn" },
  { level: 3, name: "Sơ cấp ứng dụng", cefr: "A2", minutes: 16, complexity: "polite requests", taskVi: "đặt câu hỏi lịch sự", grammar: "Could you please + verb...?", output: "tin nhắn 3 câu" },
  { level: 4, name: "Tiền trung cấp", cefr: "A2+", minutes: 18, complexity: "clear updates", taskVi: "cập nhật tiến độ rõ ràng", grammar: "I’m working on / I’ll send / by + time", output: "đoạn 40 từ" },
  { level: 5, name: "Trung cấp", cefr: "B1", minutes: 22, complexity: "structured messages", taskVi: "viết email/đoạn có mục đích", grammar: "For context, ... / Please let me know...", output: "email 70 từ" },
  { level: 6, name: "Trung cấp mạnh", cefr: "B1+", minutes: 25, complexity: "meetings and summaries", taskVi: "tóm tắt quyết định và việc cần làm", grammar: "To summarize, we agreed to...", output: "recap 90 từ" },
  { level: 7, name: "Cận nâng cao", cefr: "B2", minutes: 28, complexity: "data-backed recommendations", taskVi: "giải thích số liệu và đề xuất", grammar: "Based on these findings, I recommend...", output: "đề xuất 120 từ" },
  { level: 8, name: "Nâng cao", cefr: "B2+", minutes: 32, complexity: "negotiation and stakeholder alignment", taskVi: "đàm phán phương án và xử lý rủi ro", grammar: "Would it be possible to...? / The trade-off is...", output: "kịch bản 2 lượt" },
  { level: 9, name: "Chuyên nghiệp", cefr: "C1-", minutes: 36, complexity: "executive communication", taskVi: "trình bày cho quản lý/khách hàng", grammar: "The key implication is... / I would propose...", output: "brief 150 từ" },
  { level: 10, name: "Nâng cao chuyên sâu", cefr: "C1", minutes: 40, complexity: "strategic, concise, high-stakes English", taskVi: "phân tích tình huống phức tạp và ra quyết định", grammar: "Despite..., we should... because...", output: "executive summary 180 từ" }
];

const lessonBlueprints = [
  {
    id: "intro-networking",
    skill: "Speaking",
    titleEn: "Professional Introductions & Networking",
    titleVi: "Giới thiệu bản thân và networking",
    goal: "introduce your role and start a professional conversation",
    goalVi: "giới thiệu vai trò và mở đầu hội thoại chuyên nghiệp"
  },
  {
    id: "email-chat",
    skill: "Writing",
    titleEn: "Clear Email & Workplace Chat",
    titleVi: "Email và chat công việc rõ ràng",
    goal: "write concise requests, updates, and follow-ups",
    goalVi: "viết yêu cầu, cập nhật và follow-up ngắn gọn"
  },
  {
    id: "hybrid-meetings",
    skill: "Listening/Speaking",
    titleEn: "Hybrid Meetings & Turn-taking",
    titleVi: "Họp hybrid và cách vào lượt nói",
    goal: "join a meeting, clarify points, and confirm action items",
    goalVi: "tham gia họp, làm rõ ý và xác nhận việc cần làm"
  },
  {
    id: "ai-prompts",
    skill: "Digital English",
    titleEn: "AI Prompting in English",
    titleVi: "Viết prompt AI bằng tiếng Anh",
    goal: "use English prompts to draft, summarize, and check work output",
    goalVi: "dùng prompt tiếng Anh để soạn, tóm tắt và kiểm tra kết quả công việc"
  },
  {
    id: "data-storytelling",
    skill: "Presentation",
    titleEn: "Data Storytelling & Recommendations",
    titleVi: "Kể chuyện bằng dữ liệu và đề xuất",
    goal: "explain numbers, trends, causes, and next steps",
    goalVi: "giải thích số liệu, xu hướng, nguyên nhân và bước tiếp theo"
  },
  {
    id: "service-negotiation",
    skill: "Service English",
    titleEn: "Customer Service & Negotiation",
    titleVi: "Chăm sóc khách hàng và đàm phán",
    goal: "show empathy, offer options, and negotiate a practical solution",
    goalVi: "thể hiện đồng cảm, đưa lựa chọn và đàm phán giải pháp thực tế"
  },
  {
    id: "feedback-leadership",
    skill: "Leadership Communication",
    titleEn: "Feedback & Team Communication",
    titleVi: "Góp ý và giao tiếp nhóm",
    goal: "give constructive feedback and disagree respectfully",
    goalVi: "góp ý xây dựng và bất đồng quan điểm một cách tôn trọng"
  },
  {
    id: "career-growth",
    skill: "Career English",
    titleEn: "Career Growth & Interview Stories",
    titleVi: "Phát triển nghề nghiệp và phỏng vấn",
    goal: "describe achievements, learning goals, and career direction",
    goalVi: "nói về thành tựu, mục tiêu học tập và hướng phát triển nghề nghiệp"
  }
];

const trendSeeds = [
  "AI-assisted communication", "hybrid work etiquette", "short-form business writing", "data-informed decisions",
  "customer empathy", "sustainability at work", "cross-functional collaboration", "personal branding",
  "automation handover", "global teamwork", "service recovery", "risk communication"
];

const sourceResources = [
  { title: "British Council Business", url: "https://learnenglish.britishcouncil.org/free-resources/business" },
  { title: "VOA Learning English", url: "https://learningenglish.voanews.com/" },
  { title: "VOA Lessons of the Day", url: "https://learningenglish.voanews.com/z/952" },
  { title: "BBC English at Work", url: "https://www.youtube.com/playlist?list=PLcetZ6gSk969oGvAI0e4_PgVnlGbm64bp" },
  { title: "Cambridge Business English", url: "https://www.cambridgeenglish.org/in/exams-and-tests/business-english/" }
];


const fieldVocabularyBank = {
  food: [
    { term: "reservation", ipa: "/ˌrezərˈveɪʃən/", vi: "đặt bàn", sample: "Please confirm the reservation before noon." },
    { term: "ingredient", ipa: "/ɪnˈɡriːdiənt/", vi: "nguyên liệu", sample: "We need to check the ingredient list with the chef." },
    { term: "supplier", ipa: "/səˈplaɪər/", vi: "nhà cung cấp", sample: "The supplier will deliver fresh seafood tomorrow." },
    { term: "portion", ipa: "/ˈpɔːrʃən/", vi: "khẩu phần", sample: "The portion size should be consistent for every guest." },
    { term: "allergy", ipa: "/ˈælərdʒi/", vi: "dị ứng", sample: "Please ask the guest about any food allergy." },
    { term: "turnover", ipa: "/ˈtɜːrnoʊvər/", vi: "vòng quay", sample: "Table turnover improved after we changed the seating plan." },
    { term: "signature dish", ipa: "/ˈsɪɡnətʃər dɪʃ/", vi: "món đặc trưng", sample: "The signature dish should appear at the top of the menu." },
    { term: "service recovery", ipa: "/ˈsɜːrvɪs rɪˈkʌvəri/", vi: "khắc phục dịch vụ", sample: "Service recovery is important when a guest has a bad experience." },
    { term: "food safety", ipa: "/fuːd ˈseɪfti/", vi: "an toàn thực phẩm", sample: "Food safety training is required for the whole team." },
    { term: "menu engineering", ipa: "/ˈmenjuː ˌendʒɪˈnɪrɪŋ/", vi: "tối ưu thực đơn", sample: "Menu engineering helps us promote profitable items." }
  ],
  accounting: [
    { term: "invoice", ipa: "/ˈɪnvɔɪs/", vi: "hóa đơn", sample: "Could you please send the invoice again?" },
    { term: "receipt", ipa: "/rɪˈsiːt/", vi: "biên lai", sample: "Please attach the receipt to the expense report." },
    { term: "reconciliation", ipa: "/ˌrekənsɪliˈeɪʃən/", vi: "đối soát", sample: "Bank reconciliation must be completed before closing." },
    { term: "payable", ipa: "/ˈpeɪəbl/", vi: "khoản phải trả", sample: "The payable amount is due next Friday." },
    { term: "receivable", ipa: "/rɪˈsiːvəbl/", vi: "khoản phải thu", sample: "The receivable balance increased this month." },
    { term: "closing", ipa: "/ˈkloʊzɪŋ/", vi: "khóa sổ", sample: "Monthly closing starts on the last working day." },
    { term: "variance", ipa: "/ˈveriəns/", vi: "chênh lệch", sample: "The variance should be explained in the report." },
    { term: "accrual", ipa: "/əˈkruːəl/", vi: "khoản dồn tích", sample: "We need to record an accrual for this expense." },
    { term: "audit trail", ipa: "/ˈɔːdɪt treɪl/", vi: "dấu vết kiểm toán", sample: "The audit trail helps us verify each transaction." },
    { term: "compliance", ipa: "/kəmˈplaɪəns/", vi: "tuân thủ", sample: "Compliance is essential when preparing tax documents." }
  ],
  analyst: [
    { term: "dashboard", ipa: "/ˈdæʃbɔːrd/", vi: "bảng điều khiển dữ liệu", sample: "The dashboard shows weekly performance." },
    { term: "metric", ipa: "/ˈmetrɪk/", vi: "chỉ số", sample: "Which metric should we track first?" },
    { term: "insight", ipa: "/ˈɪnsaɪt/", vi: "phát hiện/insight", sample: "The insight explains why users drop off." },
    { term: "segment", ipa: "/ˈseɡmənt/", vi: "phân khúc", sample: "This customer segment has a higher conversion rate." },
    { term: "baseline", ipa: "/ˈbeɪslaɪn/", vi: "mốc cơ sở", sample: "We need a baseline before measuring improvement." },
    { term: "retention", ipa: "/rɪˈtenʃən/", vi: "tỷ lệ giữ chân", sample: "Retention improved after the onboarding update." },
    { term: "forecast", ipa: "/ˈfɔːrkæst/", vi: "dự báo", sample: "The forecast shows demand may rise next month." },
    { term: "outlier", ipa: "/ˈaʊtlaɪər/", vi: "điểm ngoại lệ", sample: "One outlier changed the average significantly." },
    { term: "correlation", ipa: "/ˌkɔːrəˈleɪʃən/", vi: "mối tương quan", sample: "Correlation does not always mean causation." },
    { term: "actionable", ipa: "/ˈækʃənəbl/", vi: "có thể hành động", sample: "A good insight should be actionable." }
  ],
  tourism: [
    { term: "itinerary", ipa: "/aɪˈtɪnəreri/", vi: "lịch trình", sample: "I will send the itinerary this afternoon." },
    { term: "booking", ipa: "/ˈbʊkɪŋ/", vi: "đặt dịch vụ", sample: "The booking includes airport pickup." },
    { term: "departure", ipa: "/dɪˈpɑːrtʃər/", vi: "khởi hành", sample: "Departure is scheduled for 8 AM." },
    { term: "accommodation", ipa: "/əˌkɑːməˈdeɪʃən/", vi: "chỗ ở", sample: "Accommodation is included in the package." },
    { term: "local guide", ipa: "/ˈloʊkl ɡaɪd/", vi: "hướng dẫn viên địa phương", sample: "A local guide will meet the travelers at the station." },
    { term: "travel insurance", ipa: "/ˈtrævl ɪnˈʃʊrəns/", vi: "bảo hiểm du lịch", sample: "Travel insurance is recommended for this trip." },
    { term: "customized tour", ipa: "/ˈkʌstəmaɪzd tʊr/", vi: "tour cá nhân hóa", sample: "We can design a customized tour for your family." },
    { term: "cancellation policy", ipa: "/ˌkænsəˈleɪʃən ˈpɑːləsi/", vi: "chính sách hủy", sample: "Please review the cancellation policy before payment." },
    { term: "hidden gem", ipa: "/ˈhɪdn dʒem/", vi: "điểm đến ít người biết", sample: "This village is a hidden gem for food lovers." },
    { term: "peak season", ipa: "/piːk ˈsiːzən/", vi: "mùa cao điểm", sample: "Prices are higher during peak season." }
  ],
  hotel: [
    { term: "check-in", ipa: "/ˈtʃek ɪn/", vi: "nhận phòng", sample: "Check-in starts at 2 PM." },
    { term: "housekeeping", ipa: "/ˈhaʊskiːpɪŋ/", vi: "buồng phòng", sample: "Housekeeping will prepare the room soon." },
    { term: "occupancy", ipa: "/ˈɑːkjəpənsi/", vi: "tỷ lệ lấp phòng", sample: "Occupancy is high this weekend." },
    { term: "amenity", ipa: "/əˈmenəti/", vi: "tiện nghi", sample: "The room includes a welcome amenity." },
    { term: "upgrade", ipa: "/ˈʌpɡreɪd/", vi: "nâng hạng", sample: "We can offer a complimentary upgrade." },
    { term: "late checkout", ipa: "/leɪt ˈtʃekaʊt/", vi: "trả phòng muộn", sample: "Late checkout is subject to availability." },
    { term: "service recovery", ipa: "/ˈsɜːrvɪs rɪˈkʌvəri/", vi: "khắc phục dịch vụ", sample: "Service recovery can turn a complaint into loyalty." },
    { term: "front desk", ipa: "/frʌnt desk/", vi: "lễ tân", sample: "Please contact the front desk for assistance." },
    { term: "guest preference", ipa: "/ɡest ˈprefərəns/", vi: "sở thích của khách", sample: "Guest preferences should be added to the profile." },
    { term: "room inventory", ipa: "/ruːm ˈɪnvəntɔːri/", vi: "tồn phòng", sample: "Room inventory changes quickly during holidays." }
  ],
  business: [
    { term: "proposal", ipa: "/prəˈpoʊzəl/", vi: "đề xuất", sample: "The proposal should include pricing and next steps." },
    { term: "pipeline", ipa: "/ˈpaɪplaɪn/", vi: "danh sách cơ hội", sample: "The sales pipeline looks healthy this quarter." },
    { term: "follow-up", ipa: "/ˈfɑːloʊ ʌp/", vi: "theo dõi sau trao đổi", sample: "I will send a follow-up email after the meeting." },
    { term: "stakeholder", ipa: "/ˈsteɪkhoʊldər/", vi: "bên liên quan", sample: "We need approval from the key stakeholder." },
    { term: "deal", ipa: "/diːl/", vi: "thương vụ", sample: "The deal may close next week." },
    { term: "scope", ipa: "/skoʊp/", vi: "phạm vi", sample: "The project scope should be clear before signing." },
    { term: "timeline", ipa: "/ˈtaɪmlaɪn/", vi: "mốc thời gian", sample: "Can we confirm the timeline today?" },
    { term: "value proposition", ipa: "/ˈvæljuː ˌprɑːpəˈzɪʃən/", vi: "giá trị đề xuất", sample: "The value proposition must be clear to the client." },
    { term: "negotiation", ipa: "/nɪˌɡoʊʃiˈeɪʃən/", vi: "đàm phán", sample: "Negotiation starts after the client reviews the proposal." },
    { term: "renewal", ipa: "/rɪˈnuːəl/", vi: "gia hạn", sample: "The renewal discussion is scheduled for Monday." }
  ],
  marketing: [
    { term: "campaign", ipa: "/kæmˈpeɪn/", vi: "chiến dịch", sample: "The campaign will launch next Monday." },
    { term: "audience", ipa: "/ˈɔːdiəns/", vi: "đối tượng mục tiêu", sample: "The audience prefers short video content." },
    { term: "engagement", ipa: "/ɪnˈɡeɪdʒmənt/", vi: "tương tác", sample: "Engagement increased after the headline changed." },
    { term: "lead", ipa: "/liːd/", vi: "khách hàng tiềm năng", sample: "This ad generated twenty qualified leads." },
    { term: "brand message", ipa: "/brænd ˈmesɪdʒ/", vi: "thông điệp thương hiệu", sample: "The brand message should be simple and memorable." },
    { term: "content calendar", ipa: "/ˈkɑːntent ˈkæləndər/", vi: "lịch nội dung", sample: "The content calendar needs two posts per week." },
    { term: "conversion", ipa: "/kənˈvɜːrʒən/", vi: "chuyển đổi", sample: "Conversion improved after we simplified the form." },
    { term: "positioning", ipa: "/pəˈzɪʃənɪŋ/", vi: "định vị", sample: "Positioning helps customers understand why we are different." },
    { term: "call to action", ipa: "/kɔːl tuː ˈækʃən/", vi: "lời kêu gọi hành động", sample: "The call to action should be visible above the fold." },
    { term: "organic reach", ipa: "/ɔːrˈɡænɪk riːtʃ/", vi: "lượt tiếp cận tự nhiên", sample: "Organic reach is lower, so the content must be more useful." }
  ]
};

const levelPowerWords = [
  [{ term: "task", ipa: "/tæsk/", vi: "nhiệm vụ", sample: "This task is simple and clear." }, { term: "help", ipa: "/help/", vi: "giúp đỡ", sample: "Could you help me with this task?" }],
  [{ term: "update", ipa: "/ˈʌpdeɪt/", vi: "cập nhật", sample: "I need a quick update." }, { term: "confirm", ipa: "/kənˈfɜːrm/", vi: "xác nhận", sample: "Please confirm the time." }],
  [{ term: "request", ipa: "/rɪˈkwest/", vi: "yêu cầu", sample: "This is a polite request." }, { term: "deadline", ipa: "/ˈdedlaɪn/", vi: "hạn chót", sample: "The deadline is Friday." }],
  [{ term: "progress", ipa: "/ˈprɑːɡres/", vi: "tiến độ", sample: "The progress is on track." }, { term: "issue", ipa: "/ˈɪʃuː/", vi: "vấn đề", sample: "We found one small issue." }],
  [{ term: "context", ipa: "/ˈkɑːntekst/", vi: "bối cảnh", sample: "For context, the client changed the timeline." }, { term: "priority", ipa: "/praɪˈɔːrəti/", vi: "ưu tiên", sample: "The priority is customer satisfaction." }],
  [{ term: "recap", ipa: "/ˈriːkæp/", vi: "tóm tắt sau họp", sample: "I will send the recap after the meeting." }, { term: "action item", ipa: "/ˈækʃən ˈaɪtəm/", vi: "việc cần làm", sample: "Each action item needs an owner." }],
  [{ term: "recommendation", ipa: "/ˌrekəmenˈdeɪʃən/", vi: "đề xuất", sample: "My recommendation is based on the data." }, { term: "impact", ipa: "/ˈɪmpækt/", vi: "tác động", sample: "We should measure the impact next week." }],
  [{ term: "trade-off", ipa: "/ˈtreɪd ɔːf/", vi: "sự đánh đổi", sample: "The trade-off is speed versus quality." }, { term: "alignment", ipa: "/əˈlaɪnmənt/", vi: "sự thống nhất", sample: "We need alignment before the launch." }],
  [{ term: "implication", ipa: "/ˌɪmplɪˈkeɪʃən/", vi: "hàm ý", sample: "The implication is important for the next decision." }, { term: "executive summary", ipa: "/ɪɡˈzekjətɪv ˈsʌməri/", vi: "tóm tắt cho lãnh đạo", sample: "The executive summary should be concise." }],
  [{ term: "strategic", ipa: "/strəˈtiːdʒɪk/", vi: "mang tính chiến lược", sample: "This is a strategic decision." }, { term: "mitigation", ipa: "/ˌmɪtɪˈɡeɪʃən/", vi: "giảm thiểu rủi ro", sample: "Risk mitigation should be part of the plan." }]
];

const blueprintVocabularyBank = {
  "intro-networking": [
    { term: "responsibility", ipa: "/rɪˌspɑːnsəˈbɪləti/", vi: "trách nhiệm", sample: "My main responsibility is coordinating requests." },
    { term: "background", ipa: "/ˈbækɡraʊnd/", vi: "nền tảng/kinh nghiệm", sample: "Could you tell me about your background?" }
  ],
  "email-chat": [
    { term: "subject line", ipa: "/ˈsʌbdʒekt laɪn/", vi: "tiêu đề email", sample: "The subject line should be specific." },
    { term: "attachment", ipa: "/əˈtætʃmənt/", vi: "tệp đính kèm", sample: "Please review the attachment." }
  ],
  "hybrid-meetings": [
    { term: "turn-taking", ipa: "/tɜːrn ˈteɪkɪŋ/", vi: "lượt nói", sample: "Turn-taking is important in hybrid meetings." },
    { term: "clarify", ipa: "/ˈklerəfaɪ/", vi: "làm rõ", sample: "Could you clarify the next step?" }
  ],
  "ai-prompts": [
    { term: "constraint", ipa: "/kənˈstreɪnt/", vi: "ràng buộc", sample: "Add a word limit as a constraint." },
    { term: "format", ipa: "/ˈfɔːrmæt/", vi: "định dạng", sample: "Return the answer in table format." }
  ],
  "data-storytelling": [
    { term: "trend", ipa: "/trend/", vi: "xu hướng", sample: "The trend is positive this quarter." },
    { term: "finding", ipa: "/ˈfaɪndɪŋ/", vi: "phát hiện", sample: "The main finding is easy to explain." }
  ],
  "service-negotiation": [
    { term: "empathy", ipa: "/ˈempəθi/", vi: "sự đồng cảm", sample: "Empathy helps reduce customer frustration." },
    { term: "alternative", ipa: "/ɔːlˈtɜːrnətɪv/", vi: "phương án thay thế", sample: "We can offer an alternative solution." }
  ],
  "feedback-leadership": [
    { term: "constructive", ipa: "/kənˈstrʌktɪv/", vi: "mang tính xây dựng", sample: "Constructive feedback focuses on behavior." },
    { term: "perspective", ipa: "/pərˈspektɪv/", vi: "góc nhìn", sample: "I would like to add another perspective." }
  ],
  "career-growth": [
    { term: "achievement", ipa: "/əˈtʃiːvmənt/", vi: "thành tựu", sample: "One achievement I am proud of is reducing manual work." },
    { term: "transferable skill", ipa: "/trænsˈfɜːrəbl skɪl/", vi: "kỹ năng chuyển đổi", sample: "Communication is a transferable skill." }
  ]
};

function clampLevel(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 1;
  return Math.min(10, Math.max(1, Math.round(number)));
}

function getFieldProfile(fieldId) {
  return fieldProfiles[fieldId] || fieldProfiles.business;
}

function getLevelProfile(level) {
  return levelProfiles.find((item) => item.level === clampLevel(level)) || levelProfiles[0];
}

function makeLessonId(fieldId, level, blueprintId) {
  return `${fieldId}-l${clampLevel(level)}-${blueprintId}`;
}

function buildGrammar(field, level) {
  const shared = [
    level.grammar,
    `In ${field.labelEn}, I need to discuss ${field.item} clearly and politely.`,
    `Could you please update me on the ${field.item} by 4 PM?`
  ];
  if (level.level >= 5) shared.push(`For context, this relates to ${field.project} and ${field.metric}.`);
  if (level.level >= 7) shared.push(`Based on ${field.metric}, I recommend improving the ${field.project}.`);
  if (level.level >= 9) shared.push(`The key implication is that ${field.project} may affect ${field.metric}.`);
  return shared;
}

function buildPhrases(field, level) {
  const phrases = [
    { en: `I work as a ${field.role}.`, vi: `Tôi làm ${field.roleVi}.` },
    { en: `I handle ${field.context}.`, vi: `Tôi phụ trách ${field.contextVi}.` },
    { en: `Could you please update me on the ${field.item}?`, vi: `Bạn vui lòng cập nhật cho tôi về ${field.itemVi} được không?` }
  ];
  if (level.level >= 4) phrases.push({ en: `I’ll send a short update about the ${field.project} by the end of the day.`, vi: `Tôi sẽ gửi cập nhật ngắn về ${field.projectVi} trước cuối ngày.` });
  if (level.level >= 6) phrases.push({ en: `To summarize, we agreed to review ${field.metric} before choosing the next step.`, vi: `Tóm lại, chúng ta thống nhất xem lại ${field.metricVi} trước khi chọn bước tiếp theo.` });
  if (level.level >= 8) phrases.push({ en: `Would it be possible to align ${field.stakeholder} and the team before we confirm the timeline?`, vi: `Liệu có thể thống nhất với ${field.stakeholder} và đội nhóm trước khi xác nhận timeline không?` });
  if (level.level >= 10) phrases.push({ en: `Despite the short timeline, we should prioritize the option that protects ${field.metric}.`, vi: `Dù timeline ngắn, chúng ta nên ưu tiên phương án bảo vệ ${field.metricVi}.` });
  return phrases;
}

function rotateItems(items, start, count) {
  if (!items.length) return [];
  return Array.from({ length: count }, (_, index) => items[(start + index) % items.length]);
}

function buildVocabulary(field, level, blueprint) {
  const fieldWords = fieldVocabularyBank[field.id] || fieldVocabularyBank.business;
  const start = (level.level + blueprint.id.length) % fieldWords.length;
  const selectedFieldWords = rotateItems(fieldWords, start, 5).map((item) => ({ ...item, group: "Field vocabulary", groupVi: "Từ vựng theo lĩnh vực" }));
  const powerWords = (levelPowerWords[level.level - 1] || levelPowerWords[0]).map((item) => ({ ...item, group: `Level ${level.level} power words`, groupVi: `Từ trọng tâm Level ${level.level}` }));
  const skillWords = (blueprintVocabularyBank[blueprint.id] || []).map((item) => ({ ...item, group: blueprint.skill, groupVi: "Từ theo kỹ năng" }));
  return [...selectedFieldWords, ...powerWords, ...skillWords];
}

function buildScenario(field, level, blueprint) {
  const scenarioByLevel = level.level <= 3
    ? {
        en: `You need to ask a teammate for a simple update about the ${field.item}. Keep your message short, friendly, and clear.`,
        vi: `Bạn cần hỏi đồng nghiệp một cập nhật đơn giản về ${field.itemVi}. Hãy viết ngắn, thân thiện và rõ.`
      }
    : level.level <= 6
      ? {
          en: `Your team is preparing the ${field.project}. You must give context, request one update, and confirm the next step before the deadline.`,
          vi: `Đội của bạn đang chuẩn bị ${field.projectVi}. Bạn cần nêu bối cảnh, yêu cầu một cập nhật và xác nhận bước tiếp theo trước hạn.`
        }
      : level.level <= 8
        ? {
            en: `A stakeholder is unsure about the ${field.project}. Use one metric, one recommendation, and one risk-control step to explain your position.`,
            vi: `Một bên liên quan còn phân vân về ${field.projectVi}. Hãy dùng một chỉ số, một đề xuất và một bước kiểm soát rủi ro để trình bày quan điểm.`
          }
        : {
            en: `You are briefing senior stakeholders about the ${field.project}. Balance speed, quality, customer expectations, and measurable impact in a concise executive message.`,
            vi: `Bạn đang trình bày cho quản lý cấp cao về ${field.projectVi}. Cần cân bằng tốc độ, chất lượng, kỳ vọng khách hàng và tác động đo lường được trong một thông điệp ngắn gọn.`
          };

  return {
    ...scenarioByLevel,
    focusEn: `${blueprint.titleEn}: ${blueprint.goal}.`,
    focusVi: `${blueprint.titleVi}: ${blueprint.goalVi}.`
  };
}

function buildMiniDialogue(field, level, blueprint) {
  const request = level.level <= 4
    ? `Could you please update me on the ${field.item}?`
    : `Could you share the latest status of the ${field.item} and flag any risk before 4 PM?`;
  const response = level.level <= 4
    ? `Sure. I’ll send a short update today.`
    : `Sure. The main risk is timing, but I’ll include a recommendation and the next action item.`;
  const close = level.level <= 6
    ? `Great. I’ll use it for the ${field.project}.`
    : `Thanks. I’ll align it with ${field.metric} and send a concise summary to ${field.stakeholder}.`;

  return [
    { speaker: "You", en: request, vi: level.level <= 4 ? `Bạn vui lòng cập nhật cho tôi về ${field.itemVi} được không?` : `Bạn có thể chia sẻ tình trạng mới nhất của ${field.itemVi} và báo rủi ro trước 4 giờ chiều không?` },
    { speaker: "Teammate", en: response, vi: level.level <= 4 ? `Được. Tôi sẽ gửi cập nhật ngắn hôm nay.` : `Được. Rủi ro chính là thời gian, nhưng tôi sẽ kèm đề xuất và việc cần làm tiếp theo.` },
    { speaker: "You", en: close, vi: level.level <= 6 ? `Tốt. Tôi sẽ dùng thông tin đó cho ${field.projectVi}.` : `Cảm ơn. Tôi sẽ liên kết với ${field.metricVi} và gửi bản tóm tắt ngắn cho ${field.stakeholder}.` }
  ];
}

function buildPracticeTasks(field, level, blueprint) {
  return [
    {
      titleEn: "Listen & repeat",
      titleVi: "Nghe và lặp lại",
      en: `Listen to the vocabulary and repeat each word twice. Then read the sample sentence about ${field.item}.`,
      vi: `Nghe từ vựng và lặp lại mỗi từ 2 lần. Sau đó đọc câu ví dụ về ${field.itemVi}.`
    },
    {
      titleEn: "Speak",
      titleVi: "Nói",
      en: `Record yourself giving a ${level.output} about the ${field.project}. Use at least three new vocabulary items.`,
      vi: `Tự ghi âm phần nói ${level.output} về ${field.projectVi}. Dùng ít nhất 3 từ vựng mới.`
    },
    {
      titleEn: "Write",
      titleVi: "Viết",
      en: `Write a short workplace message using: context, request, deadline, and next step. Topic: ${blueprint.titleEn} in ${field.labelEn}.`,
      vi: `Viết một tin nhắn công việc ngắn có: bối cảnh, yêu cầu, hạn chót và bước tiếp theo. Chủ đề: ${blueprint.titleVi} trong lĩnh vực ${field.label}.`
    }
  ];
}

function buildExpansionNotes(field, level, blueprint) {
  const notes = [
    {
      en: `Use one clear purpose: ask, update, recommend, or confirm. Do not mix too many goals in one message.`,
      vi: `Dùng một mục đích rõ: hỏi, cập nhật, đề xuất hoặc xác nhận. Không trộn quá nhiều mục tiêu trong một tin nhắn.`
    },
    {
      en: `For ${field.labelEn}, connect your English to a real work object: ${field.item}, ${field.project}, or ${field.metric}.`,
      vi: `Với ${field.label}, hãy gắn tiếng Anh với một đối tượng công việc thật: ${field.itemVi}, ${field.projectVi} hoặc ${field.metricVi}.`
    },
    {
      en: level.level >= 7 ? `At this level, add evidence: data, risk, trade-off, and recommendation.` : `At this level, focus on accuracy, polite tone, and simple sentence order.`,
      vi: level.level >= 7 ? `Ở level này, hãy thêm bằng chứng: dữ liệu, rủi ro, đánh đổi và đề xuất.` : `Ở level này, hãy tập trung vào độ chính xác, giọng lịch sự và trật tự câu đơn giản.`
    }
  ];
  return notes;
}

function buildQuestions(field, level, blueprint) {
  const difficultyQuestion = level.level >= 7
    ? `Which sentence gives the clearest recommendation for ${field.labelEn}?`
    : `Which sentence is most professional in ${field.labelEn}?`;

  const recommendationOptions = level.level >= 7
    ? [
        `Based on ${field.metric}, I recommend improving the ${field.project}.`,
        `Maybe do something with ${field.project}.`,
        `This is not important.`
      ]
    : [
        `I do some things with ${field.item}.`,
        `I’m responsible for managing ${field.item} and sharing updates with the team.`,
        `This ${field.item} is not my problem.`
      ];

  const vocab = buildVocabulary(field, level, blueprint);
  const keyWord = vocab[0] || { term: field.item, vi: field.itemVi, sample: `Please update me on the ${field.item}.` };
  const secondWord = vocab[1] || { term: field.project, vi: field.projectVi };

  return [
    {
      q: difficultyQuestion,
      options: recommendationOptions,
      answer: level.level >= 7 ? 0 : 1,
      explain: level.level >= 7 ? "Câu đúng có căn cứ, hành động và ngữ cảnh công việc." : "Câu đúng nêu rõ trách nhiệm và dùng giọng chuyên nghiệp."
    },
    {
      q: `Choose the best question for ${blueprint.titleEn.toLowerCase()} in ${field.labelEn}.`,
      options: [
        `Could you please update me on the ${field.item} by 4 PM?`,
        `Why is everything late?`,
        `Do it now.`
      ],
      answer: 0,
      explain: "Câu đúng lịch sự, có việc cụ thể và hạn thời gian rõ."
    },
    {
      q: `What does "${keyWord.term}" mean in Vietnamese?`,
      options: [
        keyWord.vi,
        secondWord.vi || field.projectVi,
        "không liên quan đến công việc"
      ],
      answer: 0,
      explain: `"${keyWord.term}" nghĩa là "${keyWord.vi}". Hãy bấm loa để luyện cách đọc.`
    },
    {
      q: `Which sentence uses "${keyWord.term}" naturally?`,
      options: [
        keyWord.sample || `Please update me on the ${keyWord.term}.`,
        `${keyWord.term} very yes today.`,
        `I am ${keyWord.term} the yesterday quickly.`
      ],
      answer: 0,
      explain: "Câu đúng dùng từ vựng trong một ngữ cảnh công việc tự nhiên."
    },
    {
      q: `Translate: "Tôi đề xuất cải thiện ${field.projectVi}."`,
      options: [
        `I recommend improving the ${field.project}.`,
        `I recommend improve ${field.project}.`,
        `I am recommend to improved ${field.project}.`
      ],
      answer: 0,
      explain: "Sau recommend có thể dùng V-ing: recommend improving..."
    },
    {
      q: `At Level ${level.level}, what should your output usually include?`,
      options: [
        `${level.output}, with clear purpose and polite tone`,
        "only emojis",
        "random sentences without context"
      ],
      answer: 0,
      explain: "Level càng cao càng cần đầu ra rõ mục đích, bối cảnh, giọng điệu và cấu trúc."
    }
  ];
}

function buildLessonExample(field, level, blueprint) {
  if (level.level <= 2) {
    return {
      en: `Hi, I’m a ${field.role}. I work with ${field.item}. I need a short update today.`,
      vi: `Xin chào, tôi là ${field.roleVi}. Tôi làm việc với ${field.itemVi}. Hôm nay tôi cần một cập nhật ngắn.`
    };
  }
  if (level.level <= 4) {
    return {
      en: `Hi team, I’m working on the ${field.project}. Could you please update me on the ${field.item} by 4 PM? I’ll share the next step after that.`,
      vi: `Chào team, tôi đang làm ${field.projectVi}. Bạn vui lòng cập nhật cho tôi về ${field.itemVi} trước 4 giờ chiều được không? Sau đó tôi sẽ chia sẻ bước tiếp theo.`
    };
  }
  if (level.level <= 6) {
    return {
      en: `For context, our ${field.project} depends on ${field.item}. To summarize, we need a clear update from ${field.stakeholder}, then we can confirm the action items and timeline.`,
      vi: `Để nắm bối cảnh, ${field.projectVi} phụ thuộc vào ${field.itemVi}. Tóm lại, chúng ta cần cập nhật rõ từ ${field.stakeholder}, sau đó có thể xác nhận việc cần làm và timeline.`
    };
  }
  if (level.level <= 8) {
    return {
      en: `The data shows that ${field.metric} is the biggest priority for the ${field.project}. Based on these findings, I recommend testing one improvement this week and reviewing the impact next Monday.`,
      vi: `Dữ liệu cho thấy ${field.metricVi} là ưu tiên lớn nhất cho ${field.projectVi}. Dựa trên phát hiện này, tôi đề xuất thử một cải tiến trong tuần này và xem lại tác động vào thứ Hai tới.`
    };
  }
  return {
    en: `Despite the tight timeline, the key implication is clear: the ${field.project} should protect ${field.metric} while keeping ${field.customer} expectations realistic. I would propose a phased rollout, a concise update to ${field.stakeholder}, and a follow-up review within 48 hours.`,
    vi: `Dù timeline gấp, hàm ý chính rất rõ: ${field.projectVi} cần bảo vệ ${field.metricVi} đồng thời giữ kỳ vọng của ${field.customer} ở mức thực tế. Tôi đề xuất triển khai theo giai đoạn, cập nhật ngắn gọn cho ${field.stakeholder}, và review tiếp trong vòng 48 giờ.`
  };
}

function buildLessons(fieldId, levelNumber) {
  const field = getFieldProfile(fieldId);
  const level = getLevelProfile(levelNumber);
  return lessonBlueprints.map((blueprint, index) => {
    const example = buildLessonExample(field, level, blueprint);
    return {
      id: makeLessonId(field.id, level.level, blueprint.id),
      level: `Level ${level.level} • ${level.cefr}`,
      titleEn: `${field.labelEn}: ${blueprint.titleEn}`,
      titleVi: `${field.label}: ${blueprint.titleVi}`,
      skill: blueprint.skill,
      minutes: level.minutes + Math.min(index * 2, 10),
      image: field.image,
      goalEn: `At ${level.name} level, you will ${blueprint.goal} in ${field.context}.`,
      goalVi: `Ở ${level.name}, bạn sẽ ${blueprint.goalVi} trong bối cảnh ${field.contextVi}.`,
      grammar: buildGrammar(field, level),
      phrases: buildPhrases(field, level),
      vocabulary: buildVocabulary(field, level, blueprint),
      scenario: buildScenario(field, level, blueprint),
      miniDialogue: buildMiniDialogue(field, level, blueprint),
      practiceTasks: buildPracticeTasks(field, level, blueprint),
      expansionNotes: buildExpansionNotes(field, level, blueprint),
      exampleEn: example.en,
      exampleVi: example.vi,
      exerciseIntro: `Hoàn thành bài tập ${field.label} ở Level ${level.level}: mục tiêu là ${level.taskVi}.`,
      questions: buildQuestions(field, level, blueprint)
    };
  });
}

const initialField = localStorage.getItem(FIELD_KEY) || "business";
const initialLevel = clampLevel(localStorage.getItem(LEVEL_KEY) || 1);
let lessons = buildLessons(initialField, initialLevel);

const state = {
  currentField: initialField,
  currentLevel: initialLevel,
  currentLessonId: lessons[0].id,
  lang: "both",
  progress: loadProgress(),
  currentVibeIndex: 0,
  vibeStartedAt: Date.now(),
  quizLessonId: lessons[0].id,
  player: null,
  isMusicReady: false,
  isMusicPlaying: false,
  currentTrackIndex: 0,
  audioUnlocked: false,
  youtubeApiRequested: false,
  youtubeApiReady: false
};

function defaultProgress() {
  return {
    completed: {},
    scores: {},
    attempts: {},
    streak: 0,
    lastStudyDate: null,
    dailyGoal: 1,
    studyHistory: [],
    createdAt: new Date().toISOString()
  };
}

function loadProgress() {
  try {
    return { ...defaultProgress(), ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
  } catch (error) {
    console.warn("Cannot load progress", error);
    return defaultProgress();
  }
}

function saveProgress() {
  state.progress.currentField = state.currentField;
  state.progress.currentLevel = state.currentLevel;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak() {
  const today = todayString();
  const last = state.progress.lastStudyDate;
  if (last === today) return;

  if (!last) {
    state.progress.streak = 1;
  } else {
    const lastDate = new Date(`${last}T00:00:00`);
    const todayDate = new Date(`${today}T00:00:00`);
    const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    state.progress.streak = diffDays === 1 ? (state.progress.streak || 0) + 1 : 1;
  }
  state.progress.lastStudyDate = today;
}

function recordStudyEvent({ type, lessonTitle, score }) {
  state.progress.studyHistory = state.progress.studyHistory || [];
  state.progress.studyHistory.unshift({
    type,
    lessonTitle,
    score,
    field: getFieldProfile(state.currentField).label,
    level: state.currentLevel,
    at: new Date().toISOString()
  });
  state.progress.studyHistory = state.progress.studyHistory.slice(0, 120);
}

function stripHtml(value = "") {
  const template = document.createElement("template");
  template.innerHTML = String(value).replaceAll("<br>", " ");
  return (template.content.textContent || "").replace(/\s+/g, " ").trim();
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function speakButton(text, label = "Listen in American English") {
  const cleanText = stripHtml(text);
  if (!cleanText) return "";
  return `<button class="speak-btn" type="button" data-speak="${escapeHtml(cleanText)}" aria-label="${label}" title="Nghe giọng Mỹ">🔊</button>`;
}

function bilingual(en, vi, tag = "span") {
  return `<${tag} class="en speakable-text">${en} ${speakButton(en)}</${tag}><${tag} class="vi">${vi}</${tag}>`;
}

function chooseAmericanVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const americanVoices = voices.filter((voice) => /en-US/i.test(voice.lang));
  const preferredFemale = /(Samantha|Jenny|Aria|Zira|Joanna|Salli|Ava|Susan|Female|Google US English|Microsoft.*Natural)/i;
  return americanVoices.find((voice) => preferredFemale.test(voice.name))
    || americanVoices[0]
    || voices.find((voice) => /^en/i.test(voice.lang))
    || null;
}

function warmSpeechVoices() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
  window.setTimeout(() => window.speechSynthesis.getVoices(), 250);
}

function updateAudioReadyUI() {
  const button = document.getElementById("unlockAudioBtn");
  if (!button) return;
  if (state.audioUnlocked) {
    button.textContent = "✓ Âm thanh đã sẵn sàng";
    button.classList.add("audio-ready-badge");
  } else {
    button.textContent = "Bật âm thanh trên điện thoại";
    button.classList.remove("audio-ready-badge");
  }
}

function speakAmericanEnglish(text, { warmup = false } = {}) {
  if (!("speechSynthesis" in window)) {
    alert("Trình duyệt này chưa hỗ trợ đọc văn bản. Hãy thử Safari, Chrome hoặc Edge bản mới.");
    return;
  }
  const cleanText = String(text || "").replace(/\s+/g, " ").trim();
  if (!cleanText) return;

  const speakNow = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-US";
    const voice = chooseAmericanVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = warmup ? 0.95 : 0.86;
    utterance.pitch = 0.78;
    utterance.volume = warmup ? 0.18 : 1;
    utterance.onerror = () => {
      setMusicStatus("Thiết bị đang chặn đọc âm thanh. Hãy bấm 'Bật âm thanh trên điện thoại' rồi thử lại.");
    };
    window.speechSynthesis.speak(utterance);
  };

  warmSpeechVoices();
  // Mobile Safari/Chrome thường cần thao tác người dùng và một nhịp delay ngắn.
  window.setTimeout(speakNow, warmup ? 0 : 35);
}

function unlockMobileAudio() {
  state.audioUnlocked = true;
  updateAudioReadyUI();
  warmSpeechVoices();
  speakAmericanEnglish("Audio is ready.", { warmup: true });
  ensureYouTubeApi();
  setMusicStatus("Âm thanh đã sẵn sàng. Bấm ▶ để phát nhạc hoặc bấm 🔊 ở từng câu để nghe đọc.");
}

function setupSpeechControls() {
  if ("speechSynthesis" in window) {
    warmSpeechVoices();
    window.speechSynthesis.onvoiceschanged = () => chooseAmericanVoice();
  }

  document.getElementById("unlockAudioBtn")?.addEventListener("click", unlockMobileAudio);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-speak]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    state.audioUnlocked = true;
    updateAudioReadyUI();
    speakAmericanEnglish(button.dataset.speak);
  });
}

function getLesson(id) {
  return lessons.find((lesson) => lesson.id === id) || lessons[0];
}

function rebuildLessons() {
  lessons = buildLessons(state.currentField, state.currentLevel);
  state.currentLessonId = lessons[0].id;
  state.quizLessonId = lessons[0].id;
  localStorage.setItem(FIELD_KEY, state.currentField);
  localStorage.setItem(LEVEL_KEY, String(state.currentLevel));
  saveProgress();
}

function toggleReadme(show) {
  const view = document.getElementById("readmeView");
  if (!view) return;
  view.classList.toggle("hidden", !show);
  view.setAttribute("aria-hidden", show ? "false" : "true");
  document.body.classList.toggle("readme-open", show);
  if (show) view.scrollIntoView({ behavior: "smooth", block: "start" });
  if (!show) document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupReadmeControls() {
  ["openReadmeBtn", "openReadmeInlineBtn", "openReadmeNavBtn"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", () => toggleReadme(true));
  });
  document.getElementById("readmeBackBtn")?.addEventListener("click", () => toggleReadme(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") toggleReadme(false);
  });
}

function updateFieldBadge() {
  const field = getFieldProfile(state.currentField);
  const level = getLevelProfile(state.currentLevel);
  const badge = document.getElementById("currentSelectionBadge");
  const title = document.getElementById("studyPickerTitle");
  const text = document.getElementById("studyPickerText");
  const toggleText = document.getElementById("studyMenuToggleText");
  if (badge) badge.textContent = `${field.label} • Level ${level.level} • ${level.name}`;
  if (title) title.textContent = `Hôm nay học: ${field.label} • Level ${level.level}`;
  if (text) text.textContent = `Giáo án đang dùng lĩnh vực ${field.label} ở ${level.name} (${level.cefr}). Chọn box để đổi lĩnh vực hoặc level.`;
  if (toggleText) toggleText.textContent = `Đổi lĩnh vực/level: ${field.label} • Level ${level.level}`;
}

function toggleStudyMenu(show) {
  const panel = document.getElementById("fieldOptions");
  const button = document.getElementById("studyMenuToggle");
  if (!panel || !button) return;
  const shouldShow = typeof show === "boolean" ? show : panel.classList.contains("hidden");
  panel.classList.toggle("hidden", !shouldShow);
  button.setAttribute("aria-expanded", shouldShow ? "true" : "false");
}

function renderFieldOptions() {
  const panel = document.getElementById("fieldOptions");
  if (!panel) return;
  panel.innerHTML = Object.values(fieldProfiles).map((field) => {
    const isActiveField = field.id === state.currentField;
    return `
      <article class="study-field ${isActiveField ? "open active" : ""}" data-field-wrapper="${field.id}">
        <button class="study-field-toggle" type="button" data-toggle-field="${field.id}" aria-expanded="${isActiveField ? "true" : "false"}">
          <span>
            <strong>${field.label}</strong>
            <small>${field.labelEn} • ${field.contextVi}</small>
          </span>
          <span aria-hidden="true">▾</span>
        </button>
        <div class="nested-levels">
          ${levelProfiles.map((level) => `
            <button class="level-chip ${isActiveField && level.level === state.currentLevel ? "active" : ""}" type="button" data-field-id="${field.id}" data-level="${level.level}">
              <strong>Level ${level.level}</strong>
              <span>${level.name} • ${level.cefr}</span>
            </button>
          `).join("")}
        </div>
      </article>
    `;
  }).join("");

  panel.querySelectorAll("[data-toggle-field]").forEach((button) => {
    button.addEventListener("click", () => {
      const wrapper = panel.querySelector(`[data-field-wrapper="${button.dataset.toggleField}"]`);
      const expanded = wrapper?.classList.toggle("open");
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  });

  panel.querySelectorAll("[data-field-id][data-level]").forEach((button) => {
    button.addEventListener("click", () => selectFieldLevel(button.dataset.fieldId, button.dataset.level));
  });
}

function selectFieldLevel(fieldId, level) {
  state.currentField = fieldId;
  state.currentLevel = clampLevel(level);
  rebuildLessons();
  renderQuizSelectors();
  renderQuiz();
  renderAll();
  toggleStudyMenu(false);
  document.getElementById("lessons")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectField(fieldId) {
  selectFieldLevel(fieldId, state.currentLevel);
}

function selectLevel(level) {
  selectFieldLevel(state.currentField, level);
}

function setupFieldControls() {
  document.getElementById("studyMenuToggle")?.addEventListener("click", () => toggleStudyMenu());
  renderFieldOptions();
  updateFieldBadge();
}

function updateLevelBadge() {
  updateFieldBadge();
}

function renderLevelOptions() {
  renderFieldOptions();
}

function setupLevelControls() {
  updateFieldBadge();
}

function dailySeed() {
  const salt = Number(localStorage.getItem(DAILY_TREND_KEY) || 0);
  return todayString().split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) + state.currentLevel * 17 + state.currentField.length * 13 + salt;
}

function renderDailyUpdate() {
  const field = getFieldProfile(state.currentField);
  const level = getLevelProfile(state.currentLevel);
  const seed = dailySeed();
  const trend = trendSeeds[seed % trendSeeds.length];
  const title = document.getElementById("dailyTrendTitle");
  const text = document.getElementById("dailyTrendText");
  const prompt = document.getElementById("dailyPromptText");
  const links = document.getElementById("sourceLinks");
  if (title) title.textContent = `Hôm nay: ${field.label} • Level ${level.level} • ${trend}`;
  if (text) text.textContent = `Website tạo gợi ý mới theo ngày, lĩnh vực và level. Chủ đề hôm nay tập trung vào ${field.contextVi}.`;
  if (prompt) {
    prompt.textContent = `Act as a ${field.role}. Create a Level ${level.level} ${level.output} about ${field.project}. Use ${level.complexity}, include one polite request, one key metric (${field.metric}), and one next step.`;
  }
  if (links) {
    links.innerHTML = sourceResources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener">${source.title}</a>`).join("");
  }
}

function setupDailyUpdate() {
  document.getElementById("refreshDailyBtn")?.addEventListener("click", () => {
    const current = Number(localStorage.getItem(DAILY_TREND_KEY) || 0);
    localStorage.setItem(DAILY_TREND_KEY, String(current + 1));
    renderDailyUpdate();
  });
  renderDailyUpdate();
}

function calculateExerciseScore(lesson, form, prefix = "lesson") {
  let correct = 0;
  lesson.questions.forEach((question, index) => {
    const value = form.querySelector(`input[name="${prefix}-${lesson.id}-${index}"]:checked`)?.value;
    if (Number(value) === question.answer) correct += 1;
  });
  return Math.round((correct / lesson.questions.length) * 100);
}

function renderLessonCards() {
  const container = document.getElementById("lessonCards");
  if (!container) return;
  container.innerHTML = lessons.map((lesson, index) => {
    const score = state.progress.scores[lesson.id] ?? 0;
    const done = Boolean(state.progress.completed[lesson.id]);
    return `
      <button class="lesson-card ${lesson.id === state.currentLessonId ? "active" : ""}" type="button" data-lesson-id="${lesson.id}">
        <span class="lesson-number">${String(index + 1).padStart(2, "0")}</span>
        <span>
          <h4><span class="en">${lesson.titleEn}</span><span class="vi">${lesson.titleVi}</span></h4>
          <p>${lesson.level} • ${lesson.minutes} phút</p>
        </span>
        <span class="status-pill ${done ? "done" : ""}">${done ? "✓ Done" : `${score}%`}</span>
      </button>
    `;
  }).join("");

  container.querySelectorAll(".lesson-card").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentLessonId = button.dataset.lessonId;
      renderAll();
      document.getElementById("lessonDetail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderLessonDetail() {
  const lesson = getLesson(state.currentLessonId);
  const detail = document.getElementById("lessonDetail");
  if (!detail) return;
  const previousScore = state.progress.scores[lesson.id] ?? 0;
  const isDone = Boolean(state.progress.completed[lesson.id]);
  const level = getLevelProfile(state.currentLevel);

  detail.innerHTML = `
    <article>
      <div class="lesson-hero">
        <div>
          <span class="eyebrow">${lesson.skill} • ${lesson.level} • ${lesson.minutes} phút</span>
          <h2>${bilingual(lesson.titleEn, lesson.titleVi)}</h2>
          <p>${bilingual(lesson.goalEn, lesson.goalVi)}</p>
          <div class="badge-row">
            <span class="badge">Điểm hiện tại: <strong>${previousScore}%</strong></span>
            <span class="badge">Trạng thái: <strong>${isDone ? "Đã hoàn thành" : "Cần làm bài tập"}</strong></span>
            <span class="badge">Yêu cầu hoàn thành: <strong>≥ 60%</strong></span>
            <span class="badge">Output: <strong>${level.output}</strong></span>
          </div>
        </div>
        <img src="${lesson.image}" alt="${lesson.titleVi}" loading="lazy" />
      </div>

      <div class="content-grid">
        <div class="info-card">
          <h3>Mẫu câu chính</h3>
          <ul>${lesson.grammar.map((item) => `<li><span class="en-line">${item}</span> ${speakButton(item)}</li>`).join("")}</ul>
        </div>
        <div class="info-card">
          <h3>Cụm từ nên nhớ</h3>
          <div class="phrase-list">
            ${lesson.phrases.map((phrase) => `
              <div class="phrase"><strong>${phrase.en} ${speakButton(phrase.en)}</strong><span class="vi">${phrase.vi}</span></div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="info-card vocabulary-card">
        <div class="card-heading-row">
          <div>
            <h3>Từ vựng mới + cách đọc</h3>
            <p class="lesson-note">Bấm loa để nghe từng từ/câu ví dụ bằng giọng English - American. Phần phiên âm giúp bạn nhìn cách đọc trước khi nghe.</p>
          </div>
          <span class="badge">${lesson.vocabulary.length} từ/cụm từ</span>
        </div>
        <div class="vocab-grid">
          ${lesson.vocabulary.map((word) => `
            <article class="vocab-item">
              <div class="vocab-topline">
                <strong>${word.term}</strong>
                ${speakButton(`${word.term}. ${word.sample}`)}
              </div>
              <span class="ipa">${word.ipa}</span>
              <span class="vi vocab-meaning">${word.vi}</span>
              <small>${word.group}</small>
              <p class="en-line">${word.sample} ${speakButton(word.sample)}</p>
            </article>
          `).join("")}
        </div>
      </div>

      <div class="content-grid expanded-learning-grid">
        <div class="info-card">
          <h3>Tình huống học hôm nay</h3>
          <p>${bilingual(lesson.scenario.en, lesson.scenario.vi)}</p>
          <p>${bilingual(lesson.scenario.focusEn, lesson.scenario.focusVi)}</p>
        </div>
        <div class="info-card">
          <h3>Mini dialogue</h3>
          <div class="dialogue-list">
            ${lesson.miniDialogue.map((line) => `
              <div class="dialogue-line">
                <strong>${line.speaker}</strong>
                <p>${bilingual(line.en, line.vi)}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="info-card">
        <h3>Ví dụ song ngữ theo lĩnh vực</h3>
        <p>${bilingual(lesson.exampleEn.replaceAll("\n", "<br>"), lesson.exampleVi.replaceAll("\n", "<br>"))}</p>
      </div>

      <div class="content-grid expanded-learning-grid">
        <div class="info-card practice-card">
          <h3>Luyện thêm: nghe • nói • viết</h3>
          <div class="practice-list">
            ${lesson.practiceTasks.map((task) => `
              <article class="practice-item">
                <strong><span class="en">${task.titleEn}</span><span class="vi">${task.titleVi}</span></strong>
                <p>${bilingual(task.en, task.vi)}</p>
              </article>
            `).join("")}
          </div>
        </div>
        <div class="info-card">
          <h3>Ghi nhớ để nâng level</h3>
          <ul>${lesson.expansionNotes.map((note) => `<li>${bilingual(note.en, note.vi)}</li>`).join("")}</ul>
        </div>
      </div>

      <div class="exercise-card">
        <h3>Bài tập bắt buộc</h3>
        <p class="lesson-note">${lesson.exerciseIntro} Làm xong bấm <strong>Nộp bài</strong>. Đạt từ 60% trở lên sẽ được tính là hoàn thành bài.</p>
        <form class="exercise-form" id="lessonExerciseForm">
          ${lesson.questions.map((question, index) => `
            <div class="exercise-question">
              <p><strong>Câu ${index + 1}.</strong> <span class="en-line">${question.q}</span> ${speakButton(question.q)}</p>
              ${question.options.map((option, optionIndex) => `
                <label class="option-line">
                  <input type="radio" name="lesson-${lesson.id}-${index}" value="${optionIndex}" required />
                  <span>${option} ${speakButton(option)}</span>
                </label>
              `).join("")}
            </div>
          `).join("")}
          <div class="lesson-footer-actions">
            <button class="submit-btn" type="submit">Nộp bài và chấm điểm</button>
            <span class="lesson-note">Gợi ý: học 3 cụm từ, sau đó tự viết ${level.output}.</span>
          </div>
        </form>
        <div id="lessonFeedback"></div>
      </div>
    </article>
  `;

  document.getElementById("lessonExerciseForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const score = calculateExerciseScore(lesson, form, "lesson");
    const oldScore = state.progress.scores[lesson.id] ?? 0;
    state.progress.scores[lesson.id] = Math.max(oldScore, score);
    state.progress.attempts[lesson.id] = (state.progress.attempts[lesson.id] ?? 0) + 1;
    if (score >= 60) state.progress.completed[lesson.id] = true;
    updateStreak();
    recordStudyEvent({ type: "lesson", lessonTitle: lesson.titleVi, score });
    saveProgress();

    const explanations = lesson.questions.map((question, index) => `<li><strong>Câu ${index + 1}:</strong> ${question.explain}</li>`).join("");
    document.getElementById("lessonFeedback").innerHTML = `
      <div class="feedback ${score < 60 ? "warn" : ""}">
        <strong>Điểm của bạn: ${score}%</strong><br>
        ${score >= 60 ? "Tốt! Bài này đã được tính hoàn thành." : "Bạn cần đạt ít nhất 60%. Hãy xem lại mẫu câu rồi làm lại nhé."}
        <ul>${explanations}</ul>
      </div>
    `;
    renderLessonCards();
    renderProgress();
  });
}

function renderQuizSelectors() {
  const select = document.getElementById("quizLessonSelect");
  if (!select) return;
  select.innerHTML = lessons.map((lesson) => `<option value="${lesson.id}">${lesson.titleVi} / ${lesson.titleEn}</option>`).join("");
  select.value = state.quizLessonId;
  select.onchange = (event) => {
    state.quizLessonId = event.target.value;
  };
}

function renderQuiz() {
  const lesson = getLesson(state.quizLessonId);
  const area = document.getElementById("quizArea");
  if (!area) return;
  area.innerHTML = `
    <form id="quizForm">
      ${lesson.questions.map((question, index) => `
        <div class="quiz-question">
          <h4>${index + 1}. <span class="en-line">${question.q}</span> ${speakButton(question.q)}</h4>
          ${question.options.map((option, optionIndex) => `
            <label class="option-line">
              <input type="radio" name="quiz-${lesson.id}-${index}" value="${optionIndex}" required />
              <span>${option} ${speakButton(option)}</span>
            </label>
          `).join("")}
        </div>
      `).join("")}
      <div class="quiz-submit-row">
        <button class="submit-btn" type="submit">Chấm điểm môn này</button>
        <span class="lesson-note">Điểm cao nhất sẽ được lưu vào bảng tiến bộ.</span>
      </div>
    </form>
    <div id="quizFeedback"></div>
  `;

  document.getElementById("quizForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const score = calculateExerciseScore(lesson, event.currentTarget, "quiz");
    const correct = Math.round((score / 100) * lesson.questions.length);
    const oldScore = state.progress.scores[lesson.id] ?? 0;
    state.progress.scores[lesson.id] = Math.max(oldScore, score);
    state.progress.attempts[lesson.id] = (state.progress.attempts[lesson.id] ?? 0) + 1;
    if (score >= 60) state.progress.completed[lesson.id] = true;
    updateStreak();
    recordStudyEvent({ type: "quiz", lessonTitle: lesson.titleVi, score });
    saveProgress();
    document.getElementById("quizFeedback").innerHTML = `
      <div class="feedback ${score < 60 ? "warn" : ""}">
        <strong>${lesson.titleVi}: ${score}%</strong><br>
        Đúng ${correct}/${lesson.questions.length} câu. ${score >= 60 ? "Đạt yêu cầu." : "Chưa đạt yêu cầu, hãy làm lại sau khi ôn mẫu câu."}
      </div>
    `;
    renderLessonCards();
    renderProgress();
  });
}

function renderProgress() {
  const completed = lessons.filter((lesson) => state.progress.completed[lesson.id]).length;
  const percent = Math.round((completed / lessons.length) * 100);
  const scores = lessons.map((lesson) => state.progress.scores[lesson.id] ?? 0);
  const attemptedScores = scores.filter((score) => score > 0);
  const average = attemptedScores.length ? Math.round(attemptedScores.reduce((sum, score) => sum + score, 0) / attemptedScores.length) : 0;
  const field = getFieldProfile(state.currentField);
  const level = getLevelProfile(state.currentLevel);

  document.getElementById("overallBadge").textContent = `${percent}%`;
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressRing").style.setProperty("--progress", `${percent * 3.6}deg`);
  document.getElementById("completedCount").textContent = completed;
  document.getElementById("averageScore").textContent = average;
  document.getElementById("studyStreak").textContent = state.progress.streak ?? 0;

  const title = completed === 0 ? "Bạn chưa bắt đầu" : completed === lessons.length ? "Hoàn thành giáo trình!" : `Bạn đã hoàn thành ${completed}/${lessons.length} bài`;
  const subtitle = completed === lessons.length
    ? "Hãy làm lại quiz sau 7 ngày để duy trì phản xạ."
    : `Mục tiêu hôm nay: ${state.progress.dailyGoal || 1} bài. Lĩnh vực: ${field.label}. Level: ${level.level} (${level.cefr}).`;
  document.getElementById("progressTitle").textContent = `${field.label} • Level ${level.level}: ${title}`;
  document.getElementById("progressSubtitle").textContent = subtitle;

  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML = lessons.map((lesson) => {
    const score = state.progress.scores[lesson.id] ?? 0;
    const attempts = state.progress.attempts[lesson.id] ?? 0;
    return `
      <div class="score-card">
        <div class="score-card-top">
          <h3>${lesson.titleVi}</h3>
          <span class="score-value">${score}%</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="--width:${score}%"></div></div>
        <span class="lesson-note">${lesson.skill} • ${attempts} lần làm bài • ${score >= 60 ? "Đạt" : "Chưa đạt"}</span>
      </div>
    `;
  }).join("");
}

function renderStats() {
  const totalQuestions = lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0);
  document.getElementById("heroLessonCount").textContent = lessons.length;
  document.getElementById("heroQuestionCount").textContent = totalQuestions;
  document.getElementById("courseMapTitle").textContent = `8 bài học ${getFieldProfile(state.currentField).label} • Level ${state.currentLevel}`;
  document.getElementById("courseMapText").textContent = `Giáo án, ví dụ, bài tập và quiz đang được cá nhân hóa theo lĩnh vực ${getFieldProfile(state.currentField).label} và ${getLevelProfile(state.currentLevel).name}.`;
}

function setupLanguageControls() {
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.langOption === "en" ? "en" : "both";
      document.body.dataset.lang = state.lang;
      document.documentElement.lang = state.lang === "en" ? "en" : "vi";
      document.querySelectorAll("[data-lang-option]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderAll();
    });
  });
}

function setupDailyGoal() {
  const select = document.getElementById("dailyGoalSelect");
  if (!select) return;
  select.value = String(state.progress.dailyGoal || 1);
  select.addEventListener("change", (event) => {
    state.progress.dailyGoal = Number(event.target.value);
    saveProgress();
    renderProgress();
  });
}

function setupReset() {
  document.getElementById("resetProgressBtn")?.addEventListener("click", () => {
    const ok = confirm("Bạn muốn xóa toàn bộ tiến độ học trên trình duyệt này?");
    if (!ok) return;
    state.progress = defaultProgress();
    saveProgress();
    renderAll();
  });
}

function loadVibeState() {
  try {
    const saved = JSON.parse(localStorage.getItem(VIBE_KEY));
    if (saved && Number.isInteger(saved.index) && saved.startedAt) {
      const elapsed = Date.now() - saved.startedAt;
      if (elapsed < ONE_HOUR) {
        state.currentVibeIndex = saved.index % vibes.length;
        state.vibeStartedAt = saved.startedAt;
        return;
      }
    }
  } catch (error) {
    console.warn("Cannot load vibe", error);
  }
  state.currentVibeIndex = Math.floor(Date.now() / ONE_HOUR) % vibes.length;
  state.vibeStartedAt = Date.now();
  saveVibeState();
}

function saveVibeState() {
  localStorage.setItem(VIBE_KEY, JSON.stringify({ index: state.currentVibeIndex, startedAt: state.vibeStartedAt }));
}

function applyVibe(index = state.currentVibeIndex, manual = false) {
  const vibe = vibes[index % vibes.length];
  state.currentVibeIndex = index % vibes.length;
  if (manual) state.vibeStartedAt = Date.now();
  document.documentElement.style.setProperty("--vibe-gradient", vibe.gradient);
  document.documentElement.style.setProperty("--vibe-image", `url('${vibe.image}')`);
  document.getElementById("vibeImage").src = vibe.image;
  document.getElementById("vibeTitle").textContent = vibe.title;
  document.getElementById("vibeText").textContent = vibe.text;
  saveVibeState();
}

function nextVibe(manual = false) {
  applyVibe((state.currentVibeIndex + 1) % vibes.length, manual);
}

function setupVibes() {
  loadVibeState();
  applyVibe(state.currentVibeIndex, false);
  document.getElementById("changeVibeBtn")?.addEventListener("click", () => nextVibe(true));

  setInterval(() => {
    const elapsed = Date.now() - state.vibeStartedAt;
    if (elapsed >= ONE_HOUR) {
      state.vibeStartedAt = Date.now();
      nextVibe(false);
    }
    const remaining = Math.max(0, ONE_HOUR - (Date.now() - state.vibeStartedAt));
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    document.getElementById("vibeCountdown").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, 1000);
}

function getCurrentTrack() {
  return tracks[state.currentTrackIndex] || tracks[0];
}

function setMusicStatus(message) {
  const status = document.getElementById("musicStatus");
  if (status) status.textContent = message;
}

function syncOpenYouTubeLink(track = getCurrentTrack()) {
  const link = document.getElementById("openYouTubeLink");
  if (!link || !track) return;
  link.href = `https://www.youtube.com/watch?v=${track.videoId}`;
  link.setAttribute("aria-label", `Mở ${track.title} trên YouTube`);
}

function renderFallbackPlayer(track = getCurrentTrack(), { autoplay = false } = {}) {
  const container = document.getElementById("youtubePlayer");
  if (!container || !track) return;
  syncOpenYouTubeLink(track);
  const params = new URLSearchParams({
    controls: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1"
  });
  if (autoplay && state.audioUnlocked) params.set("autoplay", "1");
  const src = `https://www.youtube-nocookie.com/embed/${track.videoId}?${params.toString()}`;
  container.innerHTML = `<iframe title="${escapeHtml(track.title)}" src="${src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>`;
  setMusicStatus(`${track.title} đã hiển thị. Trên điện thoại, nếu chưa nghe được hãy bấm Play trong khung hoặc mở YouTube.`);
}

function renderYouTubeBlockedFallback(track = getCurrentTrack()) {
  const container = document.getElementById("youtubePlayer");
  if (!container || !track) return;
  syncOpenYouTubeLink(track);
  container.innerHTML = `
    <div class="yt-fallback-card">
      <div>
        <strong>${escapeHtml(track.title)}</strong><br>
        Trình duyệt điện thoại đang chặn YouTube iframe. Hãy bấm “Mở YouTube” để phát nhạc.
      </div>
      <a class="secondary-btn compact-btn" href="https://www.youtube.com/watch?v=${track.videoId}" target="_blank" rel="noopener">Mở YouTube</a>
    </div>
  `;
}

function createYouTubePlayer() {
  const container = document.getElementById("youtubePlayer");
  if (!container || !window.YT || !window.YT.Player) return false;
  const initialTrack = getCurrentTrack();
  syncOpenYouTubeLink(initialTrack);

  try {
    state.player = new YT.Player("youtubePlayer", {
      height: "220",
      width: "100%",
      videoId: initialTrack.videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        disablekb: 0,
        fs: 0,
        loop: 1,
        playlist: initialTrack.videoId,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        enablejsapi: 1
      },
      events: {
        onReady: (event) => {
          state.isMusicReady = true;
          event.target.setVolume(Number(document.getElementById("volumeSlider")?.value || 35));
          setMusicStatus(`${initialTrack.title} đã sẵn sàng. Trên điện thoại hãy bấm “Bật âm thanh” rồi bấm ▶.`);
          updateMusicButton();
        },
        onError: () => {
          state.isMusicReady = false;
          renderYouTubeBlockedFallback(getCurrentTrack());
        },
        onStateChange: (event) => {
          const track = getCurrentTrack();
          if (event.data === YT.PlayerState.PLAYING) {
            state.isMusicPlaying = true;
            setMusicStatus(`Đang phát: ${track.title}`);
          }
          if (event.data === YT.PlayerState.PAUSED) {
            state.isMusicPlaying = false;
            setMusicStatus(`${track.title} đã tạm dừng.`);
          }
          if (event.data === YT.PlayerState.ENDED) {
            pickRandomTrack();
          }
          updateMusicButton();
        }
      }
    });
    return true;
  } catch (error) {
    console.warn("Cannot create YouTube player", error);
    renderFallbackPlayer(initialTrack);
    return false;
  }
}

function ensureYouTubeApi() {
  if (window.YT && window.YT.Player) {
    state.youtubeApiReady = true;
    if (!state.player) createYouTubePlayer();
    return;
  }

  window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
    state.youtubeApiReady = true;
    createYouTubePlayer();
  };

  if (state.youtubeApiRequested || document.querySelector('script[data-youtube-api="true"]')) return;
  state.youtubeApiRequested = true;
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  tag.async = true;
  tag.dataset.youtubeApi = "true";
  tag.onerror = () => {
    setMusicStatus("Không tải được YouTube API. Đang dùng player dự phòng.");
    renderFallbackPlayer(getCurrentTrack());
  };
  document.head.appendChild(tag);
}

function loadTrack(index, { autoplay = false } = {}) {
  const normalizedIndex = ((Number(index) || 0) + tracks.length) % tracks.length;
  const track = tracks[normalizedIndex];
  const select = document.getElementById("trackSelect");
  state.currentTrackIndex = normalizedIndex;
  if (select) select.value = String(normalizedIndex);
  syncOpenYouTubeLink(track);

  if (state.player && state.isMusicReady && track) {
    state.player.loadVideoById(track.videoId);
    state.player.setVolume(Number(document.getElementById("volumeSlider")?.value || 35));
    if (autoplay && state.audioUnlocked) {
      state.player.playVideo();
      state.isMusicPlaying = true;
    } else {
      state.player.pauseVideo();
      state.isMusicPlaying = false;
    }
    setMusicStatus(`${track.title} đã sẵn sàng. ${autoplay && state.audioUnlocked ? "Đang phát nếu trình duyệt cho phép." : "Bấm ▶ để phát."}`);
    updateMusicButton();
    return;
  }

  renderFallbackPlayer(track, { autoplay });
  state.isMusicPlaying = false;
  updateMusicButton();
  ensureYouTubeApi();
}

function pickRandomTrack() {
  state.audioUnlocked = true;
  updateAudioReadyUI();
  let nextIndex = Math.floor(Math.random() * tracks.length);
  if (tracks.length > 1 && nextIndex === state.currentTrackIndex) {
    nextIndex = (nextIndex + 1) % tracks.length;
  }
  loadTrack(nextIndex, { autoplay: true });
}

function setupMusicSelect() {
  const select = document.getElementById("trackSelect");
  if (!select) return;
  select.innerHTML = tracks.map((track, index) => `<option value="${index}">${track.title}</option>`).join("");
  select.value = String(state.currentTrackIndex);
  syncOpenYouTubeLink(getCurrentTrack());

  select.addEventListener("change", (event) => {
    loadTrack(Number(event.target.value), { autoplay: false });
  });

  document.getElementById("randomTrackBtn")?.addEventListener("click", pickRandomTrack);

  document.getElementById("musicToggleBtn")?.addEventListener("click", () => {
    state.audioUnlocked = true;
    updateAudioReadyUI();
    const track = getCurrentTrack();

    if (!state.player || !state.isMusicReady) {
      renderFallbackPlayer(track, { autoplay: true });
      ensureYouTubeApi();
      setMusicStatus(`${track.title} đã mở. Nếu chưa phát trên điện thoại, bấm Play trực tiếp trong khung YouTube.`);
      return;
    }

    if (state.isMusicPlaying) {
      state.player.pauseVideo();
      state.isMusicPlaying = false;
      setMusicStatus(`${track.title} đã tạm dừng.`);
    } else {
      state.player.playVideo();
      state.player.setVolume(Number(document.getElementById("volumeSlider")?.value || 35));
      state.isMusicPlaying = true;
      setMusicStatus(`Đang phát: ${track.title}`);
    }
    updateMusicButton();
  });

  document.getElementById("volumeSlider")?.addEventListener("input", (event) => {
    if (state.player && state.isMusicReady) state.player.setVolume(Number(event.target.value));
  });

  document.getElementById("openYouTubeLink")?.addEventListener("click", () => {
    state.audioUnlocked = true;
    updateAudioReadyUI();
  });

  setMusicStatus("Trên điện thoại: bấm “Bật âm thanh” một lần, sau đó bấm ▶ hoặc mở YouTube.");
  renderFallbackPlayer(getCurrentTrack());
  ensureYouTubeApi();

  window.setTimeout(() => {
    if (!state.isMusicReady && !state.player) renderFallbackPlayer(getCurrentTrack());
  }, 3500);
}

function updateMusicButton() {
  const button = document.getElementById("musicToggleBtn");
  if (button) button.textContent = state.isMusicPlaying ? "⏸" : "▶";
}

function renderAll() {
  renderStats();
  renderFieldOptions();
  updateFieldBadge();
  renderLevelOptions();
  updateLevelBadge();
  renderDailyUpdate();
  renderLessonCards();
  renderLessonDetail();
  renderProgress();
}

function init() {
  setupReadmeControls();
  setupSpeechControls();
  setupFieldControls();
  setupLevelControls();
  setupDailyUpdate();
  setupLanguageControls();
  setupDailyGoal();
  setupReset();
  setupVibes();
  setupMusicSelect();
  renderQuizSelectors();
  document.getElementById("startQuizBtn")?.addEventListener("click", renderQuiz);
  renderQuiz();
  renderAll();
}

document.addEventListener("DOMContentLoaded", init);
