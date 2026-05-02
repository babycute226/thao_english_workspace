/* Work English 2026 - Static self-study app
   Features: bilingual content, exercises, quiz scoring, local progress, hourly vibe changes, YouTube background music controls.
*/

const BASE_STORAGE_KEY = "workEnglish2026Progress";
const VIBE_KEY = "workEnglish2026Vibe";
const LESSONS_KEY = "workEnglish2026Lessons";
const LESSONS_META_KEY = "workEnglish2026LessonsMeta";
const SCHEDULE_KEY = "workEnglish2026StudySchedule";
const FIREBASE_CONFIG_KEY = "workEnglish2026FirebaseConfig";
const LOCAL_LOGIN_LOGS_KEY = "workEnglish2026LoginLogs";
const ONE_HOUR = 60 * 60 * 1000;
const FIREBASE_SDK_VERSION = "12.12.1";
const ADMIN_EMAIL = "babycute226@gmail.com";
const SESSION_KEY = "workEnglish2026ActiveSession";


const industryFields = [
  {
    id: "food",
    vi: "Ẩm thực",
    en: "Food & Beverage",
    icon: "🍜",
    context: "nhà hàng, món ăn, nguyên liệu, phản hồi khách hàng",
    roles: ["server", "barista", "kitchen coordinator", "F&B supervisor"],
    nouns: ["menu update", "ingredient shortage", "customer feedback", "daily special"],
    actions: ["recommend a dish", "explain ingredients", "handle a complaint", "confirm an order"],
    vocab: ["reservation", "allergy", "signature dish", "portion", "recommendation"]
  },
  {
    id: "accounting",
    vi: "Kế toán",
    en: "Accounting",
    icon: "🧾",
    context: "hóa đơn, công nợ, thanh toán, báo cáo tài chính",
    roles: ["accountant", "finance assistant", "billing coordinator", "payables specialist"],
    nouns: ["invoice", "payment schedule", "expense report", "monthly closing"],
    actions: ["check an invoice", "confirm a payment", "explain a variance", "request missing documents"],
    vocab: ["invoice", "receipt", "balance", "variance", "reimbursement"]
  },
  {
    id: "analyst",
    vi: "Analyst",
    en: "Data / Business Analyst",
    icon: "📊",
    context: "phân tích dữ liệu, insight, dashboard, báo cáo",
    roles: ["business analyst", "data analyst", "reporting specialist", "operations analyst"],
    nouns: ["dashboard", "trend analysis", "conversion rate", "weekly report"],
    actions: ["summarize a trend", "explain a metric", "compare two periods", "recommend a next step"],
    vocab: ["trend", "insight", "metric", "baseline", "forecast"]
  },
  {
    id: "travel",
    vi: "Du lịch",
    en: "Travel",
    icon: "✈️",
    context: "tour, lịch trình, booking, chăm sóc khách đi du lịch",
    roles: ["travel consultant", "tour coordinator", "booking agent", "itinerary planner"],
    nouns: ["itinerary", "flight change", "tour package", "travel insurance"],
    actions: ["explain an itinerary", "suggest an option", "confirm a booking", "handle a schedule change"],
    vocab: ["itinerary", "departure", "transfer", "availability", "upgrade"]
  },
  {
    id: "hotel",
    vi: "Khách sạn",
    en: "Hotel & Hospitality",
    icon: "🏨",
    context: "check-in, phòng, yêu cầu khách, xử lý phàn nàn",
    roles: ["front desk agent", "guest relations officer", "reservation staff", "hotel supervisor"],
    nouns: ["room request", "late check-out", "booking confirmation", "guest complaint"],
    actions: ["confirm a reservation", "offer an upgrade", "apologize for an issue", "explain hotel policy"],
    vocab: ["reservation", "amenities", "late check-out", "complimentary", "occupancy"]
  },
  {
    id: "business",
    vi: "Kinh doanh",
    en: "Business / Sales",
    icon: "💼",
    context: "bán hàng, khách hàng, đề xuất, đàm phán",
    roles: ["sales executive", "account manager", "business developer", "partnership coordinator"],
    nouns: ["proposal", "client meeting", "pricing plan", "follow-up call"],
    actions: ["pitch a solution", "negotiate next steps", "handle objections", "follow up professionally"],
    vocab: ["proposal", "pipeline", "objection", "deal", "next step"]
  },
  {
    id: "marketing",
    vi: "Marketing",
    en: "Marketing",
    icon: "📣",
    context: "campaign, nội dung, thương hiệu, hiệu quả quảng cáo",
    roles: ["marketing executive", "content marketer", "brand assistant", "campaign planner"],
    nouns: ["campaign brief", "social media post", "target audience", "brand message"],
    actions: ["write a brief", "explain campaign results", "suggest content ideas", "align the brand message"],
    vocab: ["campaign", "audience", "conversion", "engagement", "positioning"]
  }
];

const adaptiveLevels = [
  { code: "A2", label: "Foundation", minAverage: 0 },
  { code: "B1", label: "Work Ready", minAverage: 60 },
  { code: "B2", label: "Professional", minAverage: 82 }
];

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
    text: "Tập trung cho email, báo cáo, viết prompt AI và chuẩn bị thuyết trình.",
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

let lessons = [
  {
    id: "intro-networking",
    level: "A2-B1",
    titleEn: "Professional Introductions & Networking",
    titleVi: "Giới thiệu bản thân và networking",
    skill: "Speaking",
    minutes: 18,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80",
    goalEn: "Introduce your role, describe responsibilities, and start a work conversation naturally.",
    goalVi: "Giới thiệu vị trí, mô tả trách nhiệm và mở đầu cuộc trò chuyện công việc tự nhiên.",
    grammar: [
      "I work as a/an + job title. / I’m responsible for + V-ing.",
      "I’m currently working on + project/task.",
      "Nice to meet you. I’ve heard a lot about your team."
    ],
    phrases: [
      { en: "I’m responsible for coordinating client requests.", vi: "Tôi phụ trách điều phối các yêu cầu của khách hàng." },
      { en: "My main focus this quarter is improving team workflow.", vi: "Trọng tâm chính của tôi trong quý này là cải thiện quy trình làm việc của nhóm." },
      { en: "Could you tell me more about your role?", vi: "Bạn có thể chia sẻ thêm về vai trò của bạn không?" }
    ],
    exampleEn: "Hi, I’m Linh. I work as a project coordinator at a logistics company. I’m responsible for tracking timelines and updating clients. I’m currently working on a process automation project.",
    exampleVi: "Xin chào, tôi là Linh. Tôi làm điều phối dự án tại một công ty logistics. Tôi phụ trách theo dõi tiến độ và cập nhật cho khách hàng. Hiện tôi đang làm một dự án tự động hóa quy trình.",
    exerciseIntro: "Hoàn thành câu giới thiệu phù hợp với bối cảnh đi làm.",
    questions: [
      { q: "You meet a new colleague. Which sentence sounds most professional?", options: ["I do many things, maybe admin.", "I’m responsible for managing weekly reports.", "My job is boring but okay."], answer: 1, explain: "'I’m responsible for...' rõ ràng và chuyên nghiệp." },
      { q: "Choose the best follow-up question for networking.", options: ["How much money do you make?", "Could you tell me more about your current project?", "Why are you here?"], answer: 1, explain: "Câu hỏi về dự án mở cuộc trò chuyện lịch sự." },
      { q: "Translate: 'Tôi hiện đang làm dự án cải thiện trải nghiệm khách hàng.'", options: ["I currently work on improving customer experience project.", "I’m currently working on a customer experience improvement project.", "I current working customer project."], answer: 1, explain: "Cấu trúc đúng: I’m currently working on + noun phrase." }
    ]
  },
  {
    id: "email-chat",
    level: "B1",
    titleEn: "Clear Email & Workplace Chat",
    titleVi: "Viết email và chat công việc rõ ràng",
    skill: "Writing",
    minutes: 22,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    goalEn: "Write concise messages with purpose, context, request, deadline, and polite tone.",
    goalVi: "Viết tin nhắn ngắn gọn có mục đích, bối cảnh, yêu cầu, hạn chót và giọng điệu lịch sự.",
    grammar: [
      "Could you please + verb...? / Would you be able to + verb...?",
      "Just to clarify, ... / For context, ...",
      "Please let me know by + time/date."
    ],
    phrases: [
      { en: "For context, the client needs the updated file before Friday.", vi: "Để bạn nắm bối cảnh, khách hàng cần file cập nhật trước thứ Sáu." },
      { en: "Could you please review the attached draft?", vi: "Bạn vui lòng xem bản nháp đính kèm được không?" },
      { en: "Please let me know if anything is unclear.", vi: "Hãy cho tôi biết nếu có điểm nào chưa rõ." }
    ],
    exampleEn: "Subject: Review request for Q2 proposal\nHi An, for context, the client asked for a shorter version of the Q2 proposal. Could you please review the attached draft and share comments by 3 PM tomorrow? Thanks a lot.",
    exampleVi: "Tiêu đề: Nhờ xem đề xuất Q2\nChào An, để bạn nắm bối cảnh, khách hàng muốn bản đề xuất Q2 ngắn hơn. Bạn vui lòng xem bản nháp đính kèm và gửi góp ý trước 3 giờ chiều mai được không? Cảm ơn nhiều.",
    exerciseIntro: "Chọn câu phù hợp để viết email/chat công việc chuyên nghiệp.",
    questions: [
      { q: "Best subject line for asking a teammate to review a file?", options: ["Hi", "Urgent!!!!!", "Review request: Q2 proposal by Thursday"], answer: 2, explain: "Subject tốt nêu hành động, nội dung và hạn chót." },
      { q: "Which phrase is polite and clear?", options: ["Send me now.", "Could you please send it by 4 PM?", "Why haven’t you sent it?"], answer: 1, explain: "Could you please + deadline lịch sự và rõ ràng." },
      { q: "What should a good work message usually include?", options: ["Purpose, context, request, deadline", "Only emojis", "Long personal stories"], answer: 0, explain: "Tin nhắn công việc nên đủ bối cảnh nhưng ngắn gọn." }
    ]
  },
  {
    id: "hybrid-meetings",
    level: "B1-B2",
    titleEn: "Hybrid Meetings & Turn-taking",
    titleVi: "Họp hybrid và cách vào lượt nói",
    skill: "Listening/Speaking",
    minutes: 24,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    goalEn: "Join meetings confidently, interrupt politely, summarize decisions, and confirm action items.",
    goalVi: "Tham gia họp tự tin, ngắt lời lịch sự, tóm tắt quyết định và xác nhận việc cần làm.",
    grammar: [
      "Can I jump in here? / May I add one point?",
      "To summarize, we agreed to + verb...",
      "Action item: person + will + verb + by deadline."
    ],
    phrases: [
      { en: "Can I jump in here for a second?", vi: "Tôi có thể chen vào một chút được không?" },
      { en: "To summarize, we agreed to test the new workflow next week.", vi: "Tóm lại, chúng ta đã thống nhất thử quy trình mới vào tuần sau." },
      { en: "I’ll send the recap by end of day.", vi: "Tôi sẽ gửi phần tóm tắt trước cuối ngày." }
    ],
    exampleEn: "Can I add one point? If we launch on Monday, support needs the FAQ by Friday. To summarize, Mai will update the FAQ, and I’ll send the recap by end of day.",
    exampleVi: "Tôi xin bổ sung một ý. Nếu ra mắt vào thứ Hai, đội hỗ trợ cần FAQ trước thứ Sáu. Tóm lại, Mai sẽ cập nhật FAQ, và tôi sẽ gửi recap trước cuối ngày.",
    exerciseIntro: "Luyện chọn câu dùng trong họp hybrid để không bị ngắt mạch giao tiếp.",
    questions: [
      { q: "You want to interrupt politely. Choose the best phrase.", options: ["Stop talking.", "Can I jump in here for a second?", "You are wrong."], answer: 1, explain: "Đây là cách vào lượt nói lịch sự trong họp." },
      { q: "Which sentence confirms an action item clearly?", options: ["Someone should do it later.", "Lan will send the updated deck by Friday.", "Maybe we can see."], answer: 1, explain: "Action item rõ người làm, việc cần làm và hạn chót." },
      { q: "Translate: 'Tóm lại, chúng ta đã thống nhất thử quy trình mới.'", options: ["To summarize, we agreed to test the new workflow.", "Summarize, we agree test new workflow.", "We summary workflow agree."], answer: 0, explain: "Cấu trúc: To summarize, we agreed to + verb." }
    ]
  },
  {
    id: "ai-prompts",
    level: "B1-B2",
    titleEn: "AI Prompting in English",
    titleVi: "Viết prompt AI bằng tiếng Anh",
    skill: "Digital English",
    minutes: 26,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    goalEn: "Write effective English prompts with role, task, context, format, constraints, and quality checks.",
    goalVi: "Viết prompt tiếng Anh hiệu quả với vai trò, nhiệm vụ, bối cảnh, định dạng, ràng buộc và tiêu chí kiểm tra chất lượng.",
    grammar: [
      "Act as a/an + role. Your task is to + verb...",
      "Use the following context: ...",
      "Return the answer as + format. Ask clarifying questions only if needed."
    ],
    phrases: [
      { en: "Act as a customer success manager and rewrite this email in a warmer tone.", vi: "Hãy đóng vai quản lý chăm sóc khách hàng và viết lại email này với giọng thân thiện hơn." },
      { en: "Return the answer as a table with three columns: issue, impact, next step.", vi: "Trả lời dưới dạng bảng gồm ba cột: vấn đề, tác động, bước tiếp theo." },
      { en: "Check your answer for missing assumptions before finalizing.", vi: "Kiểm tra câu trả lời xem có thiếu giả định nào trước khi hoàn tất không." }
    ],
    exampleEn: "Act as a project manager. Summarize the meeting notes below into five action items. Use concise business English. Return a table with owner, action, deadline, and risk. Flag any missing information.",
    exampleVi: "Hãy đóng vai quản lý dự án. Tóm tắt ghi chú cuộc họp bên dưới thành năm việc cần làm. Dùng tiếng Anh công việc ngắn gọn. Trả về bảng gồm người phụ trách, hành động, hạn chót và rủi ro. Đánh dấu thông tin còn thiếu.",
    exerciseIntro: "Chọn prompt rõ ràng nhất cho môi trường công việc năm 2026.",
    questions: [
      { q: "Which prompt is strongest?", options: ["Make it better.", "Act as a sales manager. Rewrite this follow-up email in a concise, friendly tone. Keep it under 120 words and include a clear next step.", "Do email."], answer: 1, explain: "Prompt tốt có vai trò, nhiệm vụ, giọng điệu, giới hạn và đầu ra." },
      { q: "What is a useful quality check in a prompt?", options: ["Ignore missing details.", "Check for assumptions and ask if key information is missing.", "Always make the answer longer."], answer: 1, explain: "Kiểm tra giả định giúp giảm lỗi khi dùng AI." },
      { q: "Translate: 'Trả lời dưới dạng bảng.'", options: ["Return the answer as a table.", "Answer table make.", "Give tablely answer."], answer: 0, explain: "Cụm chuẩn: Return the answer as a table." }
    ]
  },
  {
    id: "presentations-data",
    level: "B1-B2",
    titleEn: "Presentations & Data Storytelling",
    titleVi: "Thuyết trình và kể chuyện bằng dữ liệu",
    skill: "Presentation",
    minutes: 30,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
    goalEn: "Explain trends, compare numbers, and guide your audience through a clear recommendation.",
    goalVi: "Giải thích xu hướng, so sánh số liệu và dẫn dắt người nghe đến một đề xuất rõ ràng.",
    grammar: [
      "The data shows that + clause.",
      "Compared with last quarter, ... increased/decreased by ...",
      "Based on these findings, I recommend + V-ing."
    ],
    phrases: [
      { en: "The data shows that response time improved by 18%.", vi: "Dữ liệu cho thấy thời gian phản hồi đã cải thiện 18%." },
      { en: "Compared with last quarter, customer complaints decreased slightly.", vi: "So với quý trước, khiếu nại của khách hàng giảm nhẹ." },
      { en: "Based on these findings, I recommend automating the first response.", vi: "Dựa trên các phát hiện này, tôi đề xuất tự động hóa phản hồi đầu tiên." }
    ],
    exampleEn: "The data shows that onboarding time decreased by 12% after we simplified the checklist. However, support tickets increased in week one. Based on these findings, I recommend adding a short video guide.",
    exampleVi: "Dữ liệu cho thấy thời gian onboarding giảm 12% sau khi chúng ta đơn giản hóa checklist. Tuy nhiên, ticket hỗ trợ tăng trong tuần đầu. Dựa trên các phát hiện này, tôi đề xuất thêm video hướng dẫn ngắn.",
    exerciseIntro: "Chọn câu thuyết trình số liệu rõ và có khuyến nghị.",
    questions: [
      { q: "Which sentence explains data professionally?", options: ["Number good.", "The data shows that sales increased by 12%.", "This is wow."], answer: 1, explain: "Câu này có cấu trúc rõ: data shows + result." },
      { q: "Best recommendation phrase?", options: ["Based on these findings, I recommend testing a new onboarding flow.", "Do this maybe no reason.", "I like it."], answer: 0, explain: "Câu có căn cứ và hành động cụ thể." },
      { q: "'Decrease slightly' means...", options: ["tăng mạnh", "giảm nhẹ", "không thay đổi"], answer: 1, explain: "Decrease = giảm; slightly = nhẹ." }
    ]
  },
  {
    id: "customer-negotiation",
    level: "B1-B2",
    titleEn: "Customer Service & Negotiation",
    titleVi: "Chăm sóc khách hàng và đàm phán",
    skill: "Service English",
    minutes: 28,
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80",
    goalEn: "Handle complaints, show empathy, propose options, and negotiate next steps without sounding defensive.",
    goalVi: "Xử lý phàn nàn, thể hiện đồng cảm, đề xuất lựa chọn và đàm phán bước tiếp theo mà không tạo cảm giác phòng thủ.",
    grammar: [
      "I understand how frustrating this must be.",
      "What I can do is + verb...",
      "Would it work for you if we + verb...?"
    ],
    phrases: [
      { en: "I understand how frustrating this delay must be.", vi: "Tôi hiểu sự chậm trễ này gây khó chịu như thế nào." },
      { en: "What I can do is prioritize your request today.", vi: "Điều tôi có thể làm là ưu tiên yêu cầu của bạn hôm nay." },
      { en: "Would it work for you if we sent a replacement tomorrow?", vi: "Bạn thấy ổn không nếu ngày mai chúng tôi gửi sản phẩm thay thế?" }
    ],
    exampleEn: "I understand how frustrating this must be. What I can do is check the shipment status now and send you an update within 30 minutes. If the package is delayed again, we can offer a replacement or a refund.",
    exampleVi: "Tôi hiểu việc này gây khó chịu như thế nào. Điều tôi có thể làm là kiểm tra tình trạng vận chuyển ngay và gửi cập nhật cho bạn trong vòng 30 phút. Nếu gói hàng tiếp tục trễ, chúng tôi có thể đề xuất gửi thay thế hoặc hoàn tiền.",
    exerciseIntro: "Chọn cách phản hồi khách hàng thể hiện đồng cảm và giải pháp.",
    questions: [
      { q: "A customer is angry about a delay. Best opening?", options: ["Calm down.", "I understand how frustrating this delay must be.", "It’s not my fault."], answer: 1, explain: "Cần thừa nhận cảm xúc trước khi giải quyết." },
      { q: "Which phrase offers a solution?", options: ["What I can do is check the status now.", "You should wait.", "No idea."], answer: 0, explain: "What I can do is... thể hiện hành động cụ thể." },
      { q: "'Would it work for you if...' is used to...", options: ["đưa đề xuất lịch sự", "kết thúc cuộc gọi ngay", "từ chối thẳng"], answer: 0, explain: "Đây là cách hỏi xem phương án có phù hợp không." }
    ]
  },
  {
    id: "feedback-leadership",
    level: "B2",
    titleEn: "Feedback, Leadership & Psychological Safety",
    titleVi: "Góp ý, lãnh đạo và an toàn tâm lý",
    skill: "Leadership Communication",
    minutes: 30,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
    goalEn: "Give constructive feedback, ask for input, and disagree respectfully in a team setting.",
    goalVi: "Đưa góp ý mang tính xây dựng, hỏi ý kiến và bất đồng quan điểm một cách tôn trọng trong nhóm.",
    grammar: [
      "One thing that worked well was...",
      "One area we could improve is...",
      "I see your point, and I’d like to add another perspective."
    ],
    phrases: [
      { en: "One thing that worked well was the clear timeline.", vi: "Một điểm đã làm tốt là timeline rõ ràng." },
      { en: "One area we could improve is stakeholder communication.", vi: "Một điểm chúng ta có thể cải thiện là giao tiếp với các bên liên quan." },
      { en: "I see your point, and I’d like to add another perspective.", vi: "Tôi hiểu ý bạn, và tôi muốn bổ sung một góc nhìn khác." }
    ],
    exampleEn: "One thing that worked well was the fast response from the team. One area we could improve is documenting decisions earlier. I see your point about speed, and I’d like to add another perspective about quality control.",
    exampleVi: "Một điểm làm tốt là đội phản hồi nhanh. Một điểm có thể cải thiện là ghi lại quyết định sớm hơn. Tôi hiểu ý bạn về tốc độ, và tôi muốn bổ sung góc nhìn về kiểm soát chất lượng.",
    exerciseIntro: "Chọn câu góp ý chuyên nghiệp, rõ ràng, không công kích cá nhân.",
    questions: [
      { q: "Which feedback sentence is constructive?", options: ["You always make mistakes.", "One area we could improve is documenting decisions earlier.", "This is bad."], answer: 1, explain: "Câu tập trung vào hành vi/quy trình, không công kích cá nhân." },
      { q: "How to disagree respectfully?", options: ["You don’t understand.", "I see your point, and I’d like to add another perspective.", "No, impossible."], answer: 1, explain: "Thừa nhận ý người khác trước khi thêm góc nhìn." },
      { q: "'Stakeholder communication' means...", options: ["giao tiếp với các bên liên quan", "thiết kế logo", "lập hóa đơn"], answer: 0, explain: "Stakeholders là các bên liên quan trong dự án/công việc." }
    ]
  },
  {
    id: "career-growth",
    level: "B1-B2",
    titleEn: "Career Growth, Interviews & Learning Plan",
    titleVi: "Phát triển nghề nghiệp, phỏng vấn và kế hoạch học",
    skill: "Career English",
    minutes: 25,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    goalEn: "Talk about achievements, learning goals, transferable skills, and your next career step.",
    goalVi: "Nói về thành tựu, mục tiêu học tập, kỹ năng chuyển đổi và bước phát triển nghề nghiệp tiếp theo.",
    grammar: [
      "I have experience in + V-ing/noun.",
      "One achievement I’m proud of is...",
      "My next goal is to + verb..."
    ],
    phrases: [
      { en: "I have experience in coordinating cross-functional projects.", vi: "Tôi có kinh nghiệm điều phối các dự án liên phòng ban." },
      { en: "One achievement I’m proud of is reducing manual reporting time by 30%.", vi: "Một thành tựu tôi tự hào là giảm 30% thời gian làm báo cáo thủ công." },
      { en: "My next goal is to improve my English presentation skills.", vi: "Mục tiêu tiếp theo của tôi là cải thiện kỹ năng thuyết trình bằng tiếng Anh." }
    ],
    exampleEn: "I have experience in coordinating cross-functional projects. One achievement I’m proud of is reducing manual reporting time by 30%. My next goal is to lead a regional project and improve my English presentation skills.",
    exampleVi: "Tôi có kinh nghiệm điều phối các dự án liên phòng ban. Một thành tựu tôi tự hào là giảm 30% thời gian làm báo cáo thủ công. Mục tiêu tiếp theo của tôi là dẫn dắt một dự án khu vực và cải thiện kỹ năng thuyết trình bằng tiếng Anh.",
    exerciseIntro: "Chọn cách nói về thành tựu và mục tiêu nghề nghiệp rõ ràng.",
    questions: [
      { q: "Which sentence describes an achievement best?", options: ["I worked hard.", "I reduced manual reporting time by 30%.", "I did many tasks."], answer: 1, explain: "Thành tựu mạnh nên có kết quả đo được." },
      { q: "Best phrase for career goal?", options: ["My next goal is to improve my English presentation skills.", "Goal English maybe.", "I want everything."], answer: 0, explain: "Câu có mục tiêu rõ và hành động cụ thể." },
      { q: "'Cross-functional' means...", options: ["liên phòng ban/chức năng", "rảnh rỗi", "tự động hoàn toàn"], answer: 0, explain: "Cross-functional là làm việc giữa nhiều bộ phận/chức năng." }
    ]
  }
];


const BUILT_IN_LESSONS = JSON.parse(JSON.stringify(lessons));
lessons = loadLessonsFromLocal();

const defaultSchedule = { days: ["TU", "TH", "SA"], time: "22:00", enabled: false, lastNotifiedKey: null };
const weekdays = [
  { code: "MO", label: "T2", name: "Thứ 2" },
  { code: "TU", label: "T3", name: "Thứ 3" },
  { code: "WE", label: "T4", name: "Thứ 4" },
  { code: "TH", label: "T5", name: "Thứ 5" },
  { code: "FR", label: "T6", name: "Thứ 6" },
  { code: "SA", label: "T7", name: "Thứ 7" },
  { code: "SU", label: "CN", name: "Chủ nhật" }
];

const state = {
  currentLessonId: lessons[0]?.id || "",
  lang: "both",
  progress: loadProgress("guest"),
  currentVibeIndex: 0,
  vibeStartedAt: Date.now(),
  quizLessonId: lessons[0]?.id || "",
  player: null,
  isMusicReady: false,
  isMusicPlaying: false,
  voices: [],
  user: null,
  authMode: "guest",
  firebase: null,
  loginLogs: loadLocalLoginLogs(),
  schedule: loadSchedule(),
  lessonMeta: loadLessonMeta(),
  cloudSaveTimer: null
};

function defaultProgress() {
  return {
    completed: {},
    scores: {},
    attempts: {},
    streak: 0,
    lastStudyDate: null,
    dailyGoal: 1,
    studyLog: [],
    selectedFields: [],
    dailyResults: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function storageKeyFor(uid = "guest") {
  return `${BASE_STORAGE_KEY}:${uid || "guest"}`;
}

function getActiveUid() {
  return state?.user?.uid || "guest";
}

function loadProgress(uid = "guest") {
  try {
    const scoped = localStorage.getItem(storageKeyFor(uid));
    const legacy = uid === "guest" ? localStorage.getItem(BASE_STORAGE_KEY) : null;
    return { ...defaultProgress(), ...(JSON.parse(scoped || legacy) || {}) };
  } catch (error) {
    console.warn("Cannot load progress", error);
    return defaultProgress();
  }
}

function saveProgress() {
  state.progress.updatedAt = new Date().toISOString();
  localStorage.setItem(storageKeyFor(getActiveUid()), JSON.stringify(state.progress));
  scheduleCloudProgressSave();
}

function todayString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function updateStreak() {
  const today = todayString();
  const last = state.progress.lastStudyDate;
  if (last === today) return;

  if (!last) {
    state.progress.streak = 1;
  } else {
    const lastDate = new Date(last + "T00:00:00");
    const todayDate = new Date(today + "T00:00:00");
    const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    state.progress.streak = diffDays === 1 ? state.progress.streak + 1 : 1;
  }
  state.progress.lastStudyDate = today;
}

function getProgressMetrics() {
  const scores = lessons.map((lesson) => state.progress.scores?.[lesson.id] ?? 0);
  const attempted = scores.filter((score) => score > 0);
  const average = attempted.length ? Math.round(attempted.reduce((sum, score) => sum + score, 0) / attempted.length) : 0;
  const completed = lessons.filter((lesson) => state.progress.completed?.[lesson.id]).length;
  const totalAttempts = Object.values(state.progress.attempts || {}).reduce((sum, value) => sum + Number(value || 0), 0);
  return { average, completed, totalAttempts };
}

function recordStudyActivity({ lesson, score, type = "exercise" }) {
  const today = todayString();
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: today,
    timestamp: new Date().toISOString(),
    type,
    lessonId: lesson?.id || state.currentLessonId,
    lessonTitleVi: lesson?.titleVi || "Bài học",
    lessonTitleEn: lesson?.titleEn || "Lesson",
    fieldId: lesson?.fieldId || null,
    fieldVi: lesson?.fieldVi || null,
    score: Number(score || 0)
  };
  const log = Array.isArray(state.progress.studyLog) ? state.progress.studyLog : [];
  state.progress.studyLog = [entry, ...log].slice(0, 300);
  const dayEntries = state.progress.studyLog.filter((item) => item.date === today);
  state.progress.dailyResults = {
    ...(state.progress.dailyResults || {}),
    [today]: {
      count: dayEntries.length,
      bestScore: Math.max(...dayEntries.map((item) => Number(item.score || 0)), 0),
      lastActivityAt: entry.timestamp
    }
  };
}

function getTodayActivities() {
  const today = todayString();
  return (state.progress.studyLog || []).filter((entry) => entry.date === today);
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[char]));
}

function escapeAttr(value = "") {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function stripHtml(value = "") {
  const tmp = document.createElement("div");
  tmp.innerHTML = String(value);
  return tmp.textContent || tmp.innerText || "";
}

function bilingual(en, vi, tag = "span") {
  return `<${tag} class="en">${escapeHtml(en)}</${tag}><${tag} class="vi">${escapeHtml(vi)}</${tag}>`;
}

function getLesson(id) {
  return lessons.find((lesson) => lesson.id === id) || lessons[0];
}

function shouldShowSpeech(text = "") {
  const clean = stripHtml(text);
  const asciiLetters = (clean.match(/[A-Za-z]/g) || []).length;
  const vietnameseLetters = (clean.match(/[À-ỹ]/g) || []).length;
  return asciiLetters >= 5 && asciiLetters >= vietnameseLetters * 1.4;
}

function speakButton(text, label = "Nghe") {
  const clean = stripHtml(text).trim();
  if (!clean || !shouldShowSpeech(clean)) return "";
  return `<button class="speak-btn" type="button" data-speak="${encodeURIComponent(clean)}" aria-label="${escapeAttr(label)}: ${escapeAttr(clean)}" title="Nghe giọng Mỹ">🔊</button>`;
}

function splitSentences(text = "") {
  const clean = stripHtml(text).replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const matches = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [clean];
  return matches.map((item) => item.trim()).filter(Boolean);
}

function renderSentenceBlock(enText, viText = "") {
  const enParts = splitSentences(enText);
  const viParts = splitSentences(viText);
  return `<div class="sentence-stack">${enParts.map((sentence, index) => `
    <div class="sentence-row">
      ${speakButton(sentence, "Nghe câu")}
      <div class="sentence-text">
        <p class="en">${escapeHtml(sentence)}</p>
        ${viParts[index] ? `<p class="vi">${escapeHtml(viParts[index])}</p>` : ""}
      </div>
    </div>
  `).join("")}</div>`;
}

function calculateExerciseScore(lesson, form) {
  let correct = 0;
  lesson.questions.forEach((question, index) => {
    const value = form.querySelector(`input[name="lesson-${lesson.id}-${index}"]:checked`)?.value;
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
      <button class="lesson-card ${lesson.id === state.currentLessonId ? "active" : ""}" type="button" data-lesson-id="${escapeAttr(lesson.id)}">
        <span class="lesson-number">${String(index + 1).padStart(2, "0")}</span>
        <span>
          <h4>${escapeHtml(lesson.titleVi)}</h4>
          <p>${escapeHtml(lesson.titleEn)} • ${escapeHtml(lesson.level)} • ${Number(lesson.minutes || 15)} phút</p>
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
  if (!lesson || !detail) return;
  const previousScore = state.progress.scores[lesson.id] ?? 0;
  const isDone = Boolean(state.progress.completed[lesson.id]);

  detail.innerHTML = `
    <article>
      <div class="lesson-hero">
        <div>
          <span class="eyebrow">${escapeHtml(lesson.skill)} • ${escapeHtml(lesson.level)} • ${Number(lesson.minutes || 15)} phút</span>
          <h2>${bilingual(lesson.titleEn, lesson.titleVi)}</h2>
          <p>${bilingual(lesson.goalEn, lesson.goalVi)}</p>
          <div class="badge-row">
            <span class="badge">Điểm hiện tại: <strong>${previousScore}%</strong></span>
            <span class="badge">Trạng thái: <strong>${isDone ? "Đã hoàn thành" : "Cần làm bài tập"}</strong></span>
            <span class="badge">Yêu cầu hoàn thành: <strong>≥ 60%</strong></span>
          </div>
        </div>
        <img src="${escapeAttr(lesson.image)}" alt="${escapeAttr(lesson.titleVi)}" loading="lazy" />
      </div>

      <div class="content-grid">
        <div class="info-card">
          <h3>Mẫu câu chính <span class="mini-tag">có đọc</span></h3>
          <ul class="speakable-list">${(lesson.grammar || []).map((item) => `<li><span>${escapeHtml(item)}</span>${speakButton(item, "Nghe mẫu câu")}</li>`).join("")}</ul>
        </div>
        <div class="info-card">
          <h3>Cụm từ nên nhớ <span class="mini-tag">US voice</span></h3>
          <div class="phrase-list">
            ${(lesson.phrases || []).map((phrase) => `
              <div class="phrase">
                <div class="speakable-line"><strong>${escapeHtml(phrase.en)}</strong>${speakButton(phrase.en, "Nghe cụm từ")}</div>
                <span>${escapeHtml(phrase.vi)}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="info-card">
        <h3>Ví dụ song ngữ <span class="mini-tag">nghe từng câu</span></h3>
        ${renderSentenceBlock(lesson.exampleEn, lesson.exampleVi)}
      </div>

      <div class="exercise-card">
        <h3>Bài tập bắt buộc</h3>
        <p class="lesson-note">${escapeHtml(lesson.exerciseIntro)} Làm xong bấm <strong>Nộp bài</strong>. Đạt từ 60% trở lên sẽ được tính là hoàn thành bài.</p>
        <form class="exercise-form" id="lessonExerciseForm">
          ${(lesson.questions || []).map((question, index) => `
            <div class="exercise-question">
              <p class="question-title"><strong>Câu ${index + 1}.</strong> <span>${escapeHtml(question.q)}</span>${speakButton(question.q, "Nghe câu hỏi")}</p>
              ${(question.options || []).map((option, optionIndex) => `
                <label class="option-line">
                  <input type="radio" name="lesson-${lesson.id}-${index}" value="${optionIndex}" required />
                  <span>${escapeHtml(option)}</span>
                  ${speakButton(option, "Nghe đáp án")}
                </label>
              `).join("")}
            </div>
          `).join("")}
          <div class="lesson-footer-actions">
            <button class="submit-btn" type="submit">Nộp bài và chấm điểm</button>
            <span class="lesson-note">Gợi ý: bấm 🔊 nghe lại 3 câu mẫu trước khi nộp bài.</span>
          </div>
        </form>
        <div id="lessonFeedback"></div>
      </div>
    </article>
  `;

  document.getElementById("lessonExerciseForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const score = calculateExerciseScore(lesson, form);
    const oldScore = state.progress.scores[lesson.id] ?? 0;
    state.progress.scores[lesson.id] = Math.max(oldScore, score);
    state.progress.attempts[lesson.id] = (state.progress.attempts[lesson.id] ?? 0) + 1;
    if (score >= 60) {
      state.progress.completed[lesson.id] = true;
    }
    updateStreak();
    recordStudyActivity({ lesson, score, type: "lesson-exercise" });
    saveProgress();

    const explanations = lesson.questions.map((question, index) => `<li><strong>Câu ${index + 1}:</strong> ${escapeHtml(question.explain)}</li>`).join("");
    document.getElementById("lessonFeedback").innerHTML = `
      <div class="feedback ${score < 60 ? "warn" : ""}">
        <strong>Điểm của bạn: ${score}%</strong><br>
        ${score >= 60 ? "Tốt! Bài này đã được tính hoàn thành." : "Bạn cần đạt ít nhất 60%. Hãy xem lại mẫu câu rồi làm lại nhé."}
        <ul>${explanations}</ul>
      </div>
    `;
    renderLessonCards();
    renderProgress();
    renderRoadmap();
    renderIndustryPanel();
    updateSharePanel();
  });
}

function renderQuizSelectors() {
  const select = document.getElementById("quizLessonSelect");
  const startBtn = document.getElementById("startQuizBtn");
  if (!select || !startBtn) return;
  select.innerHTML = lessons.map((lesson) => `<option value="${escapeAttr(lesson.id)}">${escapeHtml(lesson.titleVi)} / ${escapeHtml(lesson.titleEn)}</option>`).join("");
  if (!lessons.some((lesson) => lesson.id === state.quizLessonId)) state.quizLessonId = lessons[0]?.id || "";
  select.value = state.quizLessonId;
  select.onchange = (event) => {
    state.quizLessonId = event.target.value;
  };
  startBtn.onclick = renderQuiz;
}

function renderQuiz() {
  const lesson = getLesson(state.quizLessonId);
  const area = document.getElementById("quizArea");
  if (!lesson || !area) return;
  area.innerHTML = `
    <form id="quizForm">
      ${(lesson.questions || []).map((question, index) => `
        <div class="quiz-question">
          <h4 class="question-title">${index + 1}. <span>${escapeHtml(question.q)}</span>${speakButton(question.q, "Nghe câu hỏi")}</h4>
          ${(question.options || []).map((option, optionIndex) => `
            <label class="option-line">
              <input type="radio" name="quiz-${lesson.id}-${index}" value="${optionIndex}" required />
              <span>${escapeHtml(option)}</span>
              ${speakButton(option, "Nghe đáp án")}
            </label>
          `).join("")}
        </div>
      `).join("")}
      <div class="quiz-submit-row">
        <button class="submit-btn" type="submit">Chấm điểm môn này</button>
        <span class="lesson-note">Điểm cao nhất sẽ được lưu vào bảng tiến bộ của user hiện tại.</span>
      </div>
    </form>
    <div id="quizFeedback"></div>
  `;

  document.getElementById("quizForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let correct = 0;
    lesson.questions.forEach((question, index) => {
      const value = event.currentTarget.querySelector(`input[name="quiz-${lesson.id}-${index}"]:checked`)?.value;
      if (Number(value) === question.answer) correct += 1;
    });
    const score = Math.round((correct / lesson.questions.length) * 100);
    const oldScore = state.progress.scores[lesson.id] ?? 0;
    state.progress.scores[lesson.id] = Math.max(oldScore, score);
    state.progress.attempts[lesson.id] = (state.progress.attempts[lesson.id] ?? 0) + 1;
    if (score >= 60) state.progress.completed[lesson.id] = true;
    updateStreak();
    recordStudyActivity({ lesson, score, type: "quiz" });
    saveProgress();
    document.getElementById("quizFeedback").innerHTML = `
      <div class="feedback ${score < 60 ? "warn" : ""}">
        <strong>${escapeHtml(lesson.titleVi)}: ${score}%</strong><br>
        Đúng ${correct}/${lesson.questions.length} câu. ${score >= 60 ? "Đạt yêu cầu." : "Chưa đạt yêu cầu, hãy làm lại sau khi ôn mẫu câu."}
      </div>
    `;
    renderLessonCards();
    renderProgress();
    renderRoadmap();
    renderIndustryPanel();
    updateSharePanel();
  });
}

function renderProgress() {
  const completed = lessons.filter((lesson) => state.progress.completed[lesson.id]).length;
  const percent = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;
  const scores = lessons.map((lesson) => state.progress.scores[lesson.id] ?? 0);
  const attemptedScores = scores.filter((score) => score > 0);
  const average = attemptedScores.length ? Math.round(attemptedScores.reduce((sum, score) => sum + score, 0) / attemptedScores.length) : 0;

  document.getElementById("overallBadge").textContent = `${percent}%`;
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressRing").style.setProperty("--progress", `${percent * 3.6}deg`);
  document.getElementById("completedCount").textContent = completed;
  document.getElementById("averageScore").textContent = average;
  document.getElementById("studyStreak").textContent = state.progress.streak ?? 0;

  const name = state.user?.displayName || state.user?.email || "bạn";
  const title = completed === 0 ? `${name} chưa bắt đầu` : completed === lessons.length ? `${name} đã hoàn thành giáo trình!` : `${name} đã hoàn thành ${completed}/${lessons.length} bài`;
  const subtitle = completed === lessons.length
    ? "Hãy làm lại quiz sau 7 ngày để duy trì phản xạ."
    : `Mục tiêu hôm nay: ${state.progress.dailyGoal || 1} bài. Ưu tiên bài có điểm dưới 80%.`;
  document.getElementById("progressTitle").textContent = title;
  document.getElementById("progressSubtitle").textContent = subtitle;
  const note = document.getElementById("progressStorageNote");
  if (note) {
    note.textContent = state.user
      ? `Tiến độ đang lưu cho user: ${state.user.email}. ${state.firebase?.db ? "Đã bật đồng bộ Firestore." : "Đang lưu cục bộ trên trình duyệt này."}`
      : "Tiến độ đang lưu ở chế độ khách trên trình duyệt hiện tại. Đăng nhập Google/Firebase để đồng bộ theo user.";
  }

  document.getElementById("scoreboard").innerHTML = lessons.map((lesson) => {
    const score = state.progress.scores[lesson.id] ?? 0;
    const attempts = state.progress.attempts[lesson.id] ?? 0;
    return `
      <div class="score-card">
        <div class="score-card-top">
          <h3>${escapeHtml(lesson.titleVi)}</h3>
          <span class="score-value">${score}%</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="--width:${score}%"></div></div>
        <span class="lesson-note">${escapeHtml(lesson.skill)} • ${attempts} lần làm bài • ${score >= 60 ? "Đạt" : "Chưa đạt"}</span>
      </div>
    `;
  }).join("");
}

function renderStats() {
  const totalQuestions = lessons.reduce((sum, lesson) => sum + (lesson.questions?.length || 0), 0);
  document.getElementById("heroLessonCount").textContent = lessons.length;
  document.getElementById("heroQuestionCount").textContent = totalQuestions;
}

function setupLanguageControls() {
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.langOption;
      document.body.dataset.lang = state.lang;
      document.querySelectorAll("[data-lang-option]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
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
    renderRoadmap();
  });
}

function setupReset() {
  const btn = document.getElementById("resetProgressBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const ok = confirm("Bạn muốn xóa toàn bộ tiến độ học của user hiện tại?");
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
  document.getElementById("changeVibeBtn").addEventListener("click", () => nextVibe(true));

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

function setupMusicSelect() {
  const select = document.getElementById("trackSelect");
  select.innerHTML = tracks.map((track, index) => `<option value="${index}">${escapeHtml(track.title)}</option>`).join("");
  select.addEventListener("change", (event) => {
    const track = tracks[Number(event.target.value)];
    if (state.player && track) {
      state.player.loadVideoById(track.videoId);
      state.player.setVolume(Number(document.getElementById("volumeSlider").value));
      state.isMusicPlaying = true;
      updateMusicButton();
    }
  });

  document.getElementById("musicToggleBtn").addEventListener("click", () => {
    if (!state.player || !state.isMusicReady) return;
    if (state.isMusicPlaying) {
      state.player.pauseVideo();
      state.isMusicPlaying = false;
    } else {
      state.player.playVideo();
      state.player.setVolume(Number(document.getElementById("volumeSlider").value));
      state.isMusicPlaying = true;
    }
    updateMusicButton();
  });

  document.getElementById("volumeSlider").addEventListener("input", (event) => {
    if (state.player && state.isMusicReady) state.player.setVolume(Number(event.target.value));
  });
}

function updateMusicButton() {
  document.getElementById("musicToggleBtn").textContent = state.isMusicPlaying ? "⏸" : "▶";
}

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  state.player = new YT.Player("youtubePlayer", {
    height: "118",
    width: "260",
    videoId: tracks[0].videoId,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      playlist: tracks[0].videoId,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: (event) => {
        state.isMusicReady = true;
        event.target.setVolume(Number(document.getElementById("volumeSlider").value));
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          event.target.playVideo();
        }
      }
    }
  });
};

function loadVoices() {
  if (!("speechSynthesis" in window)) {
    document.getElementById("voiceHint").textContent = "Trình duyệt này chưa hỗ trợ Web Speech API.";
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  const usVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en-us"));
  const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
  state.voices = usVoices.length ? usVoices : englishVoices;
  const select = document.getElementById("voiceSelect");
  if (!select) return;
  if (!state.voices.length) {
    select.innerHTML = `<option>Đang tải giọng đọc...</option>`;
    return;
  }
  select.innerHTML = state.voices.map((voice, index) => `<option value="${index}">${escapeHtml(voice.name)} • ${escapeHtml(voice.lang)}</option>`).join("");
  const preferredIndex = state.voices.findIndex((voice) => /google|microsoft|samantha|zira|natural/i.test(voice.name));
  select.value = String(Math.max(0, preferredIndex));
}

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("Trình duyệt này chưa hỗ trợ đọc văn bản. Hãy thử Chrome, Edge hoặc Safari bản mới.");
    return;
  }
  const clean = stripHtml(decodeURIComponent(text)).replace(/\s+/g, " ").trim();
  if (!clean) return;
  const utterance = new SpeechSynthesisUtterance(clean);
  const select = document.getElementById("voiceSelect");
  const voice = state.voices[Number(select?.value || 0)];
  utterance.lang = "en-US";
  utterance.rate = Number(document.getElementById("speechRate")?.value || 0.95);
  utterance.pitch = 1;
  utterance.volume = 1;
  if (voice) utterance.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function setupVoiceControls() {
  loadVoices();
  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  document.getElementById("voiceTestBtn")?.addEventListener("click", () => speakText("Good evening. Let's practice English for work together."));
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-speak]");
    if (!button) return;
    event.preventDefault();
    speakText(button.dataset.speak || "");
  });
}

function loadSchedule() {
  try {
    return { ...defaultSchedule, ...(JSON.parse(localStorage.getItem(SCHEDULE_KEY)) || {}) };
  } catch (error) {
    return { ...defaultSchedule };
  }
}

function saveSchedule() {
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(state.schedule));
}

function setupPlanner() {
  const picker = document.getElementById("studyDayPicker");
  const timeInput = document.getElementById("studyTimeInput");
  if (!picker || !timeInput) return;
  picker.innerHTML = weekdays.map((day) => `
    <label class="day-chip ${state.schedule.days.includes(day.code) ? "selected" : ""}">
      <input type="checkbox" value="${day.code}" ${state.schedule.days.includes(day.code) ? "checked" : ""} />
      <span>${day.label}</span>
    </label>
  `).join("");
  timeInput.value = state.schedule.time || "22:00";
  picker.addEventListener("change", () => {
    state.schedule.days = [...picker.querySelectorAll("input:checked")].map((input) => input.value);
    picker.querySelectorAll(".day-chip").forEach((chip) => chip.classList.toggle("selected", chip.querySelector("input").checked));
    saveSchedule();
    renderRoadmap();
  });
  timeInput.addEventListener("change", () => {
    state.schedule.time = timeInput.value || "22:00";
    saveSchedule();
    renderRoadmap();
  });
  document.getElementById("saveScheduleBtn")?.addEventListener("click", () => {
    state.schedule.days = [...picker.querySelectorAll("input:checked")].map((input) => input.value);
    state.schedule.time = timeInput.value || "22:00";
    saveSchedule();
    renderRoadmap();
    document.getElementById("reminderStatus").textContent = `Đã lưu lịch học: ${describeSchedule()}.`;
  });
  document.getElementById("enableNotifyBtn")?.addEventListener("click", enableBrowserNotifications);
  document.getElementById("downloadIcsBtn")?.addEventListener("click", downloadScheduleIcs);
  renderRoadmap();
  setInterval(checkBrowserReminder, 30 * 1000);
}

function describeSchedule() {
  const names = weekdays.filter((day) => state.schedule.days.includes(day.code)).map((day) => day.label).join(" • ") || "chưa chọn ngày";
  return `${names} lúc ${state.schedule.time || "22:00"}`;
}

function renderRoadmap() {
  const list = document.getElementById("roadmapList");
  const preview = document.getElementById("learningPlanPreview");
  if (!list || !preview) return;
  list.innerHTML = lessons.map((lesson, index) => {
    const score = state.progress.scores[lesson.id] || 0;
    const priority = score >= 80 ? "Ôn duy trì" : score >= 60 ? "Nâng lên 80%" : "Ưu tiên học";
    return `
      <div class="roadmap-item">
        <span class="lesson-number">${index + 1}</span>
        <div>
          <strong>Tuần ${Math.floor(index / Math.max(1, state.progress.dailyGoal || 1)) + 1}: ${escapeHtml(lesson.titleVi)}</strong>
          <p>${escapeHtml(lesson.skill)} • ${Number(lesson.minutes || 15)} phút • Điểm: ${score}% • ${priority}</p>
        </div>
      </div>
    `;
  }).join("");

  const nextLessons = lessons
    .filter((lesson) => (state.progress.scores[lesson.id] || 0) < 80)
    .slice(0, Math.max(1, Number(state.progress.dailyGoal || 1)));
  preview.innerHTML = `
    <h4>Kế hoạch gần nhất</h4>
    <p class="lesson-note">Lịch nhắc: <strong>${describeSchedule()}</strong></p>
    <ol>${nextLessons.map((lesson) => `<li>${escapeHtml(lesson.titleVi)} — mục tiêu đạt ≥ 80%</li>`).join("") || "<li>Ôn lại các bài đã hoàn thành.</li>"}</ol>
  `;
}

async function enableBrowserNotifications() {
  const status = document.getElementById("reminderStatus");
  if (!("Notification" in window)) {
    status.textContent = "Trình duyệt này chưa hỗ trợ Notification API.";
    return;
  }
  const permission = await Notification.requestPermission();
  state.schedule.enabled = permission === "granted";
  saveSchedule();
  status.textContent = permission === "granted"
    ? `Đã bật nhắc trên trình duyệt cho lịch ${describeSchedule()}.`
    : "Bạn chưa cấp quyền thông báo. Có thể tải .ics để dùng Google Calendar.";
}

function checkBrowserReminder() {
  if (!state.schedule.enabled || !("Notification" in window) || Notification.permission !== "granted") return;
  const now = new Date();
  const dayCode = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"][now.getDay()];
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const key = `${todayString()}-${currentTime}`;
  if (state.schedule.days.includes(dayCode) && currentTime === state.schedule.time && state.schedule.lastNotifiedKey !== key) {
    state.schedule.lastNotifiedKey = key;
    saveSchedule();
    new Notification("Đến giờ học Work English", {
      body: "10 giờ tối rồi. Học một bài ngắn, nghe 3 câu và làm quiz nhé.",
      icon: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=256&q=80"
    });
  }
}

function downloadScheduleIcs() {
  const now = new Date();
  const start = new Date(now);
  const [hour, minute] = (state.schedule.time || "22:00").split(":").map(Number);
  start.setHours(hour, minute, 0, 0);
  const y = start.getFullYear();
  const m = String(start.getMonth() + 1).padStart(2, "0");
  const d = String(start.getDate()).padStart(2, "0");
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  const byday = (state.schedule.days.length ? state.schedule.days : defaultSchedule.days).join(",");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Work English 2026//Study Reminder//VI",
    "BEGIN:VEVENT",
    `UID:work-english-2026-${Date.now()}@local`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;TZID=Asia/Ho_Chi_Minh:${y}${m}${d}T${hh}${mm}00`,
    `RRULE:FREQ=WEEKLY;BYDAY=${byday}`,
    "SUMMARY:Học tiếng Anh cho người đi làm",
    "DESCRIPTION:Mở Work English 2026, nghe câu mẫu, làm bài tập và cập nhật tiến độ.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
  downloadTextFile("work-english-study-schedule.ics", ics, "text/calendar");
}

function loadLessonMeta() {
  try {
    return JSON.parse(localStorage.getItem(LESSONS_META_KEY)) || { source: "built-in", updatedAt: null };
  } catch (error) {
    return { source: "built-in", updatedAt: null };
  }
}

function loadLessonsFromLocal() {
  try {
    const saved = JSON.parse(localStorage.getItem(LESSONS_KEY));
    if (saved?.lessons?.length) return mergeLessons(BUILT_IN_LESSONS || lessons, saved.lessons);
  } catch (error) {
    console.warn("Cannot load saved lessons", error);
  }
  return JSON.parse(JSON.stringify(lessons));
}

function normalizeLesson(raw, index = 0) {
  const fallback = BUILT_IN_LESSONS[index % BUILT_IN_LESSONS.length] || BUILT_IN_LESSONS[0];
  const id = raw.id || slugify(raw.titleEn || raw.titleVi || `lesson-${Date.now()}-${index}`);
  return {
    id,
    fieldId: raw.fieldId || fallback.fieldId || null,
    fieldVi: raw.fieldVi || fallback.fieldVi || null,
    level: raw.level || fallback.level || "B1",
    titleEn: raw.titleEn || fallback.titleEn || "New Work English Lesson",
    titleVi: raw.titleVi || fallback.titleVi || "Bài học mới",
    skill: raw.skill || fallback.skill || "Work English",
    minutes: Number(raw.minutes || fallback.minutes || 20),
    image: raw.image || fallback.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    goalEn: raw.goalEn || fallback.goalEn || "Practice a useful workplace English skill.",
    goalVi: raw.goalVi || fallback.goalVi || "Luyện một kỹ năng tiếng Anh hữu ích cho công việc.",
    grammar: Array.isArray(raw.grammar) && raw.grammar.length ? raw.grammar : fallback.grammar,
    phrases: Array.isArray(raw.phrases) && raw.phrases.length ? raw.phrases : fallback.phrases,
    exampleEn: raw.exampleEn || fallback.exampleEn,
    exampleVi: raw.exampleVi || fallback.exampleVi,
    exerciseIntro: raw.exerciseIntro || fallback.exerciseIntro || "Hoàn thành bài tập để lưu tiến độ.",
    questions: Array.isArray(raw.questions) && raw.questions.length ? raw.questions : fallback.questions
  };
}

function mergeLessons(baseLessons, incomingLessons) {
  const map = new Map();
  baseLessons.forEach((lesson, index) => map.set(lesson.id, normalizeLesson(lesson, index)));
  incomingLessons.forEach((lesson, index) => map.set(lesson.id || slugify(lesson.titleEn || lesson.titleVi || `new-${index}`), normalizeLesson(lesson, index)));
  return [...map.values()];
}

function slugify(value = "lesson") {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `lesson-${Date.now()}`;
}

function saveLessonsToLocal(source = "manual") {
  state.lessonMeta = { source, updatedAt: new Date().toISOString(), count: lessons.length };
  localStorage.setItem(LESSONS_KEY, JSON.stringify({ lessons }));
  localStorage.setItem(LESSONS_META_KEY, JSON.stringify(state.lessonMeta));
}

function applyLessonUpdates(incoming, source = "manual") {
  if (!Array.isArray(incoming) || !incoming.length) throw new Error("Không tìm thấy bài học hợp lệ trong JSON.");
  lessons = mergeLessons(BUILT_IN_LESSONS, incoming);
  saveLessonsToLocal(source);
  state.currentLessonId = lessons.some((lesson) => lesson.id === state.currentLessonId) ? state.currentLessonId : lessons[0].id;
  state.quizLessonId = lessons.some((lesson) => lesson.id === state.quizLessonId) ? state.quizLessonId : lessons[0].id;
  renderQuizSelectors();
  renderQuiz();
  renderAll();
  renderUpdatePanel();
}

function setupLessonUpdates() {
  document.getElementById("loadLessonFeedBtn")?.addEventListener("click", loadLessonFeed);
  document.getElementById("importLessonJsonBtn")?.addEventListener("click", importLessonJson);
  document.getElementById("downloadLessonTemplateBtn")?.addEventListener("click", downloadLessonTemplate);
  document.getElementById("resetLessonsBtn")?.addEventListener("click", resetLessons);
  document.getElementById("syncFirestoreLessonsBtn")?.addEventListener("click", loadLessonsFromFirestore);
  renderUpdatePanel();
}

function renderUpdatePanel() {
  const status = document.getElementById("lessonSyncStatus");
  if (!status) return;
  const updated = state.lessonMeta?.updatedAt ? formatDateTime(state.lessonMeta.updatedAt) : "chưa đồng bộ";
  status.innerHTML = `Nguồn hiện tại: <strong>${escapeHtml(state.lessonMeta?.source || "built-in")}</strong> • ${lessons.length} bài • Cập nhật: ${updated}`;
}

async function loadLessonFeed() {
  const status = document.getElementById("lessonSyncStatus");
  const url = document.getElementById("lessonFeedUrl")?.value.trim();
  if (!url) {
    status.textContent = "Hãy nhập URL JSON bài học trước.";
    return;
  }
  try {
    status.textContent = "Đang tải bài học mới...";
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    applyLessonUpdates(Array.isArray(data) ? data : data.lessons, url);
  } catch (error) {
    status.textContent = `Không tải được nguồn bài học: ${error.message}`;
  }
}

function importLessonJson() {
  const status = document.getElementById("lessonSyncStatus");
  const text = document.getElementById("lessonJsonInput")?.value.trim();
  if (!text) {
    status.textContent = "Hãy dán JSON bài học trước.";
    return;
  }
  try {
    const data = JSON.parse(text);
    applyLessonUpdates(Array.isArray(data) ? data : data.lessons, "manual-json");
  } catch (error) {
    status.textContent = `JSON chưa hợp lệ: ${error.message}`;
  }
}

function downloadLessonTemplate() {
  const template = {
    lessons: [
      {
        id: "2026-workplace-small-talk",
        level: "B1",
        titleEn: "Smart Small Talk at Work",
        titleVi: "Small talk thông minh nơi công sở",
        skill: "Speaking",
        minutes: 18,
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
        goalEn: "Start friendly work conversations without sounding too personal.",
        goalVi: "Mở đầu trò chuyện công việc thân thiện mà không quá riêng tư.",
        grammar: ["How has your week been so far?", "Are you working on anything interesting this week?"],
        phrases: [
          { en: "How has your week been so far?", vi: "Tuần này của bạn đến giờ thế nào?" },
          { en: "That sounds like a busy but exciting project.", vi: "Nghe có vẻ là một dự án bận nhưng thú vị." }
        ],
        exampleEn: "How has your week been so far? I heard your team is preparing a new launch. That sounds like a busy but exciting project.",
        exampleVi: "Tuần này của bạn đến giờ thế nào? Tôi nghe nói đội bạn đang chuẩn bị một đợt ra mắt mới. Nghe có vẻ là một dự án bận nhưng thú vị.",
        exerciseIntro: "Chọn câu small talk phù hợp với môi trường công sở.",
        questions: [
          { q: "Which question is suitable for workplace small talk?", options: ["How has your week been so far?", "Why are you always late?", "How much do you earn?"], answer: 0, explain: "Câu này thân thiện và không quá riêng tư." }
        ]
      }
    ]
  };
  downloadTextFile("work-english-lesson-template.json", JSON.stringify(template, null, 2), "application/json");
}

function resetLessons() {
  if (!confirm("Khôi phục toàn bộ bài học về mặc định?")) return;
  lessons = JSON.parse(JSON.stringify(BUILT_IN_LESSONS));
  localStorage.removeItem(LESSONS_KEY);
  state.lessonMeta = { source: "built-in", updatedAt: null, count: lessons.length };
  localStorage.setItem(LESSONS_META_KEY, JSON.stringify(state.lessonMeta));
  state.currentLessonId = lessons[0].id;
  state.quizLessonId = lessons[0].id;
  renderQuizSelectors();
  renderQuiz();
  renderAll();
  renderUpdatePanel();
}

function downloadTextFile(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function loadLocalLoginLogs() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_LOGIN_LOGS_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveLocalLoginLog(log) {
  state.loginLogs = [log, ...state.loginLogs].slice(0, 80);
  localStorage.setItem(LOCAL_LOGIN_LOGS_KEY, JSON.stringify(state.loginLogs));
}

function formatDateTime(value) {
  if (!value) return "—";
  let date = value;
  if (value?.toDate) date = value.toDate();
  if (typeof value === "string") date = new Date(value);
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function getDeviceLabel() {
  const ua = navigator.userAgent || "Browser";
  if (/mobile|android|iphone/i.test(ua)) return "Mobile browser";
  if (/ipad|tablet/i.test(ua)) return "Tablet browser";
  return "Desktop browser";
}

function parseFirebaseConfig(raw = "") {
  const trimmed = raw.trim()
    .replace(/^const\s+firebaseConfig\s*=\s*/i, "")
    .replace(/^export\s+const\s+firebaseConfig\s*=\s*/i, "")
    .replace(/;\s*$/, "");
  try {
    return JSON.parse(trimmed);
  } catch (jsonError) {
    // Firebase Console usually shows a JS object literal, not strict JSON.
    // This parser runs only on text the site owner pastes into their own local app.
    return Function(`"use strict"; return (${trimmed});`)();
  }
}

function isAdminUser(user = state.user) {
  return (user?.email || "").toLowerCase() === ADMIN_EMAIL;
}

function getOrCreateGuestId() {
  const key = "workEnglish2026GuestId";
  let id = localStorage.getItem(key);
  if (!id) {
    id = `guest-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

function saveActiveSession(user, provider) {
  if (!user || provider === "google") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user, provider, savedAt: new Date().toISOString() }));
}

function clearActiveSession() {
  localStorage.removeItem(SESSION_KEY);
}

async function restoreLocalSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (saved?.user && saved?.provider && saved.provider !== "google") {
      await applySignedInUser(saved.user, saved.provider, false);
      setAuthStatus(`Đã khôi phục phiên ${saved.provider === "guest" ? "Guest" : "cục bộ"}.`);
    }
  } catch (error) {
    console.warn("Cannot restore local session", error);
  }
}

function getGreetingParts() {
  const hour = new Date().getHours();
  if (hour < 12) return { en: "Good Morning", vi: "Chào buổi sáng", label: "Morning check-in" };
  if (hour < 18) return { en: "Good Afternoon", vi: "Chào buổi chiều", label: "Afternoon focus" };
  return { en: "Good Evening", vi: "Chào buổi tối", label: "Evening study mode" };
}

function renderWelcomePanel() {
  const panel = document.getElementById("dailyWelcomePanel");
  if (!panel) return;
  if (!state.user) {
    panel.hidden = true;
    return;
  }
  const greeting = getGreetingParts();
  const name = state.user.displayName || state.user.email || "Guest";
  panel.hidden = false;
  document.getElementById("welcomeTimeLabel").textContent = greeting.label;
  document.getElementById("welcomeTitle").textContent = `${greeting.en}, ${name}!`;
  document.getElementById("welcomeSubtitle").textContent = `${greeting.vi}. Hôm nay hãy chọn một lĩnh vực, nghe từng câu tiếng Anh Mỹ và làm quiz ngắn để lưu tiến độ.`;
}

function updatePermissionView() {
  const title = document.getElementById("loginHistoryTitle");
  const note = document.getElementById("loginScopeNote");
  if (!title || !note) return;
  if (isAdminUser()) {
    title.textContent = "Tất cả tài khoản đã đăng nhập";
    note.innerHTML = `<span class="role-admin">Admin ${ADMIN_EMAIL}</span> đang xem toàn bộ login audit. Hãy áp dụng Firebase Rules mẫu để bảo vệ quyền này ở backend.`;
  } else if (state.user) {
    title.textContent = state.user.provider === "guest" ? "Lịch sử Guest trên trình duyệt này" : "Lịch sử đăng nhập của bạn";
    note.innerHTML = `<span class="role-user">User thường</span> chỉ xem được login log của chính mình. Admin duy nhất: ${ADMIN_EMAIL}.`;
  } else {
    title.textContent = "Lịch sử đăng nhập";
    note.textContent = `Hãy đăng nhập Google, tài khoản cục bộ hoặc Guest. Chỉ ${ADMIN_EMAIL} có quyền admin để xem tất cả tài khoản.`;
  }
}

function filterVisibleLoginLogs(logs = []) {
  if (isAdminUser()) return logs;
  if (!state.user) return [];
  return logs.filter((log) => {
    if (state.user.uid && log.uid === state.user.uid) return true;
    if (state.user.email && log.email === state.user.email) return true;
    return state.user.provider === "guest" && String(log.provider).toLowerCase() === "guest";
  });
}

function downloadFirestoreRulesTemplate() {
  const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() { return request.auth != null; }
    function isAdmin() { return signedIn() && request.auth.token.email == '${ADMIN_EMAIL}'; }
    function isOwner(uid) { return signedIn() && request.auth.uid == uid; }

    match /userProgress/{uid} {
      allow read, write: if isOwner(uid) || isAdmin();
    }

    match /loginLogs/{logId} {
      allow create: if signedIn() && request.resource.data.uid == request.auth.uid;
      allow read: if isAdmin() || (signedIn() && resource.data.uid == request.auth.uid);
      allow update, delete: if false;
    }

    match /courseLessons/{lessonId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}`;
  downloadTextFile("work-english-firestore-rules.txt", rules, "text/plain");
}

function setupAuth() {
  const configInput = document.getElementById("firebaseConfigInput");
  const savedConfig = localStorage.getItem(FIREBASE_CONFIG_KEY) || "";
  if (configInput) configInput.value = savedConfig;

  document.getElementById("saveFirebaseConfigBtn")?.addEventListener("click", () => {
    localStorage.setItem(FIREBASE_CONFIG_KEY, document.getElementById("firebaseConfigInput").value.trim());
    setAuthStatus("Đã lưu Firebase config trên trình duyệt này.");
  });
  document.getElementById("connectFirebaseBtn")?.addEventListener("click", connectFirebase);
  document.getElementById("googleLoginBtn")?.addEventListener("click", signInWithGoogle);
  document.getElementById("guestLoginBtn")?.addEventListener("click", startGuestSession);
  document.getElementById("logoutBtn")?.addEventListener("click", logoutUser);
  document.getElementById("refreshLoginLogsBtn")?.addEventListener("click", fetchLoginHistory);
  document.getElementById("downloadRulesBtn")?.addEventListener("click", downloadFirestoreRulesTemplate);
  document.getElementById("localLoginForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("localEmail").value.trim().toLowerCase();
    if (!email) return;
    const user = { uid: `local:${email}`, email, displayName: email.split("@")[0], provider: "local-demo", photoURL: "" };
    applySignedInUser(user, "local-demo");
  });
  restoreLocalSession();
  if (savedConfig) connectFirebase(false);
  renderAuthPanel();
  renderLoginHistory();
}

function setAuthStatus(message) {
  const status = document.getElementById("authStatus");
  if (status) status.textContent = message;
}

function renderAuthPanel() {
  const badge = document.getElementById("authModeBadge");
  const card = document.getElementById("currentUserCard");
  if (!badge || !card) return;
  const providerLabel = !state.user ? "Not logged in" : state.user.provider === "google" ? (isAdminUser() ? "Google Admin" : "Google User") : state.user.provider === "guest" ? "Guest" : (isAdminUser() ? "Local Admin" : "Local User");
  badge.textContent = providerLabel;
  badge.classList.toggle("done", Boolean(state.user));
  if (!state.user) {
    card.innerHTML = "Bạn chưa đăng nhập. Có thể đăng nhập Google, dùng email/password cục bộ hoặc bấm Học với Guest.";
    return;
  }
  card.innerHTML = `
    <div class="user-row">
      <div class="avatar">${state.user.photoURL ? `<img src="${escapeAttr(state.user.photoURL)}" alt="${escapeAttr(state.user.displayName || state.user.email)}" />` : escapeHtml((state.user.displayName || state.user.email || "U").slice(0, 1).toUpperCase())}</div>
      <div>
        <strong>${escapeHtml(state.user.displayName || state.user.email)}</strong>
        <span>${escapeHtml(state.user.email || "")}</span>
        <small>UID: ${escapeHtml(state.user.uid)} ${isAdminUser() ? "• ADMIN" : ""}</small>
      </div>
    </div>
  `;
}

function renderLoginHistory(logs = state.loginLogs) {
  const tbody = document.getElementById("loginHistoryRows");
  if (!tbody) return;
  updatePermissionView();
  const visibleLogs = filterVisibleLoginLogs(logs);
  if (!visibleLogs.length) {
    tbody.innerHTML = `<tr><td colspan="5">Chưa có dữ liệu đăng nhập phù hợp với quyền xem hiện tại.</td></tr>`;
    return;
  }
  tbody.innerHTML = visibleLogs.slice(0, 50).map((log) => `
    <tr>
      <td>${escapeHtml(log.displayName || "—")} ${log.role === "admin" ? "<span class='role-admin'>ADMIN</span>" : ""}</td>
      <td>${escapeHtml(log.email || "—")}</td>
      <td>${escapeHtml(log.provider || "—")}</td>
      <td>${formatDateTime(log.loggedAt || log.loggedAtClient)}</td>
      <td>${escapeHtml(log.device || "Browser")}</td>
    </tr>
  `).join("");
}

async function connectFirebase(showStatus = true) {
  const raw = document.getElementById("firebaseConfigInput")?.value.trim() || localStorage.getItem(FIREBASE_CONFIG_KEY) || "";
  if (!raw) {
    setAuthStatus("Hãy dán firebaseConfig trước khi kết nối.");
    return;
  }
  try {
    const firebaseConfig = parseFirebaseConfig(raw);
    if (showStatus) setAuthStatus("Đang tải Firebase SDK...");
    const [appModule, authModule, firestoreModule] = await Promise.all([
      import(`https://cdn.jsdelivr.net/npm/firebase@${FIREBASE_SDK_VERSION}/app/+esm`),
      import(`https://cdn.jsdelivr.net/npm/firebase@${FIREBASE_SDK_VERSION}/auth/+esm`),
      import(`https://cdn.jsdelivr.net/npm/firebase@${FIREBASE_SDK_VERSION}/firestore/+esm`)
    ]);
    const app = appModule.getApps().length ? appModule.getApps()[0] : appModule.initializeApp(firebaseConfig);
    const auth = authModule.getAuth(app);
    auth.useDeviceLanguage?.();
    const db = firestoreModule.getFirestore(app);
    state.firebase = { app, auth, db, authModule, firestoreModule };
    localStorage.setItem(FIREBASE_CONFIG_KEY, raw);
    setAuthStatus("Đã kết nối Firebase. Bạn có thể đăng nhập Google và đồng bộ dữ liệu.");
    authModule.onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          provider: "google"
        };
        await applySignedInUser(user, "google", false);
      }
    });
    await fetchLoginHistory();
  } catch (error) {
    console.error(error);
    setAuthStatus(`Không kết nối được Firebase: ${error.message}`);
  }
}

async function signInWithGoogle() {
  try {
    if (!state.firebase?.auth) await connectFirebase();
    if (!state.firebase?.auth) return;
    const { authModule, auth } = state.firebase;
    const provider = new authModule.GoogleAuthProvider();
    const result = await authModule.signInWithPopup(auth, provider);
    if (result?.user) {
      await applySignedInUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || result.user.email,
        photoURL: result.user.photoURL,
        provider: "google"
      }, "google", true);
    }
  } catch (error) {
    console.error(error);
    setAuthStatus(`Không đăng nhập Google được: ${error.message}`);
  }
}

async function startGuestSession() {
  const guestId = getOrCreateGuestId();
  const user = {
    uid: "guest",
    guestId,
    email: "guest@local",
    displayName: "Guest",
    provider: "guest",
    photoURL: ""
  };
  await applySignedInUser(user, "guest", true);
}

async function logoutUser() {
  try {
    if (state.firebase?.auth) await state.firebase.authModule.signOut(state.firebase.auth);
  } catch (error) {
    console.warn(error);
  }
  state.user = null;
  state.authMode = "guest";
  clearActiveSession();
  state.progress = loadProgress("guest");
  setAuthStatus("Đã đăng xuất. Website quay lại chế độ chưa đăng nhập. Bạn vẫn có thể bấm Học với Guest.");
  renderAuthPanel();
  renderLoginHistory();
  renderAll();
}

async function applySignedInUser(user, provider = "local-demo", shouldRecord = true) {
  state.user = { ...user, provider };
  state.authMode = provider;
  saveActiveSession(state.user, provider);
  const localProgress = loadProgress(state.user.uid);
  const cloudProgress = provider === "google" ? await loadCloudProgress(state.user.uid) : null;
  state.progress = cloudProgress || localProgress;
  localStorage.setItem(storageKeyFor(state.user.uid), JSON.stringify(state.progress));
  const log = {
    uid: state.user.uid,
    email: state.user.email,
    displayName: state.user.displayName || state.user.email,
    provider,
    role: isAdminUser(state.user) ? "admin" : "user",
    loggedAtClient: new Date().toISOString(),
    device: getDeviceLabel()
  };
  if (shouldRecord) await recordLogin(log);
  await fetchLoginHistory();
  renderAuthPanel();
  renderWelcomePanel();
  renderIndustryPanel();
  renderLoginHistory();
  renderAll();
  const modeText = provider === "google" ? "Đã đăng nhập Google và tải tiến độ của user." : provider === "guest" ? "Đã vào chế độ Guest. Tiến độ lưu riêng trên trình duyệt này." : "Đã đăng nhập cục bộ. Tiến độ tách riêng theo email này.";
  setAuthStatus(modeText);
}

async function recordLogin(log) {
  saveLocalLoginLog(log);
  if (state.firebase?.db && state.user?.provider === "google") {
    try {
      const { db, firestoreModule } = state.firebase;
      await firestoreModule.addDoc(firestoreModule.collection(db, "loginLogs"), {
        ...log,
        loggedAt: firestoreModule.serverTimestamp()
      });
      await fetchLoginHistory();
    } catch (error) {
      console.warn("Cannot write login log", error);
      renderLoginHistory();
    }
  } else {
    renderLoginHistory();
  }
}

async function fetchLoginHistory() {
  if (!state.firebase?.db || !state.user || state.user.provider !== "google") {
    renderLoginHistory(state.loginLogs);
    return;
  }
  try {
    const { db, firestoreModule } = state.firebase;
    const base = firestoreModule.collection(db, "loginLogs");
    const q = isAdminUser()
      ? firestoreModule.query(base, firestoreModule.orderBy("loggedAt", "desc"), firestoreModule.limit(80))
      : firestoreModule.query(base, firestoreModule.where("uid", "==", state.user.uid), firestoreModule.limit(50));
    const snap = await firestoreModule.getDocs(q);
    const cloudLogs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const sortedLogs = cloudLogs.sort((a, b) => {
      const da = a.loggedAt?.toDate ? a.loggedAt.toDate() : new Date(a.loggedAtClient || 0);
      const dbb = b.loggedAt?.toDate ? b.loggedAt.toDate() : new Date(b.loggedAtClient || 0);
      return dbb - da;
    });
    state.loginLogs = sortedLogs.length ? sortedLogs : state.loginLogs;
    renderLoginHistory(state.loginLogs);
  } catch (error) {
    console.warn("Cannot fetch login logs", error);
    renderLoginHistory(state.loginLogs);
  }
}

function scheduleCloudProgressSave() {
  clearTimeout(state.cloudSaveTimer);
  state.cloudSaveTimer = setTimeout(saveCloudProgress, 500);
}

async function saveCloudProgress() {
  if (!state.user || state.user.provider !== "google" || !state.firebase?.db) return;
  try {
    const { db, firestoreModule } = state.firebase;
    await firestoreModule.setDoc(
      firestoreModule.doc(db, "userProgress", state.user.uid),
      {
        uid: state.user.uid,
        email: state.user.email,
        displayName: state.user.displayName,
        progress: state.progress,
        updatedAt: firestoreModule.serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    console.warn("Cannot save cloud progress", error);
  }
}

async function loadCloudProgress(uid) {
  if (!uid || !state.firebase?.db) return null;
  try {
    const { db, firestoreModule } = state.firebase;
    const snap = await firestoreModule.getDoc(firestoreModule.doc(db, "userProgress", uid));
    if (snap.exists()) return { ...defaultProgress(), ...(snap.data().progress || {}) };
  } catch (error) {
    console.warn("Cannot load cloud progress", error);
  }
  return null;
}

function getAdaptiveLevel() {
  const { average, completed, totalAttempts } = getProgressMetrics();
  if (average >= 82 && completed >= 3) return adaptiveLevels[2];
  if (average >= 60 || totalAttempts >= 2) return adaptiveLevels[1];
  return adaptiveLevels[0];
}

function setupIndustryPicker() {
  const grid = document.getElementById("industryButtons");
  if (!grid) return;
  grid.innerHTML = industryFields.map((field) => `
    <button class="industry-btn" type="button" data-field-id="${escapeAttr(field.id)}">
      <strong>${field.icon} ${escapeHtml(field.vi)}</strong>
      <span>${escapeHtml(field.en)} • ${escapeHtml(field.context)}</span>
    </button>
  `).join("");
  grid.querySelectorAll("[data-field-id]").forEach((button) => {
    button.addEventListener("click", () => createAdaptiveLesson(button.dataset.fieldId));
  });
  renderIndustryPanel();
}

function renderIndustryPanel() {
  const badge = document.getElementById("adaptiveLevelBadge");
  const result = document.getElementById("dailyLessonResult");
  if (!badge || !result) return;
  const level = getAdaptiveLevel();
  const metrics = getProgressMetrics();
  badge.textContent = `${level.code} • ${level.label}`;
  badge.classList.toggle("done", metrics.average >= 60);
  if (!state.user) {
    result.innerHTML = `
      <strong>Hãy đăng nhập Google, dùng tài khoản cục bộ hoặc chọn Guest trước.</strong>
      <p class="lesson-note">Sau khi có user, bài học ngẫu nhiên sẽ lưu đúng vào tiến độ của user đó.</p>
    `;
    return;
  }
  const recent = (state.progress.selectedFields || []).slice(-3).map((id) => industryFields.find((field) => field.id === id)?.vi).filter(Boolean);
  result.innerHTML = `
    <strong>Xin chào ${escapeHtml(state.user.displayName || state.user.email || "Guest")} — level hôm nay: ${level.code}.</strong>
    <p class="lesson-note">Điểm trung bình: ${metrics.average}% • Đã hoàn thành: ${metrics.completed} bài • Lĩnh vực gần đây: ${recent.join(", ") || "chưa có"}.</p>
    <p class="lesson-note">Chọn một lĩnh vực ở trên để tạo bài học mới theo đúng trình độ hiện tại.</p>
  `;
}

function sampleFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createAdaptiveLesson(fieldId) {
  const result = document.getElementById("dailyLessonResult");
  if (!state.user) {
    result.innerHTML = `<strong>Bạn cần đăng nhập Google, tài khoản cục bộ hoặc chọn Guest trước khi tạo bài học.</strong>`;
    document.getElementById("auth-zone")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const field = industryFields.find((item) => item.id === fieldId) || industryFields[0];
  const level = getAdaptiveLevel();
  const role = sampleFrom(field.roles);
  const noun = sampleFrom(field.nouns);
  const action = sampleFrom(field.actions);
  const vocab = [...field.vocab].sort(() => Math.random() - 0.5).slice(0, 3);
  const today = todayString();
  const unique = Math.random().toString(36).slice(2, 7);
  const levelDetail = level.code === "A2"
    ? {
        minutes: 14,
        goalEn: `Use simple, polite sentences to ${action} in a ${field.en.toLowerCase()} situation.`,
        goalVi: `Dùng câu đơn giản, lịch sự để ${action} trong tình huống ${field.vi.toLowerCase()}.`,
        grammar: ["I would like to + verb...", "Could you please + verb...?", "Let me check that for you."],
        phrase1: `Could you please confirm the ${noun}?`,
        phrase2: `Let me check the ${noun} and get back to you.`,
        phrase3: `I would like to ${action} for the customer.`,
        question: `Which sentence is polite and clear for ${field.en}?`,
        answer: `Could you please confirm the ${noun}?`
      }
    : level.code === "B1"
      ? {
          minutes: 20,
          goalEn: `Explain a work situation, ask for details, and propose a next step in ${field.en.toLowerCase()}.`,
          goalVi: `Giải thích tình huống, hỏi thêm thông tin và đề xuất bước tiếp theo trong lĩnh vực ${field.vi.toLowerCase()}.`,
          grammar: ["For context, ...", "The main issue is that ...", "The next step is to + verb..."],
          phrase1: `For context, we need to review the ${noun} before making a decision.`,
          phrase2: `The main issue is that the ${noun} needs one more confirmation.`,
          phrase3: `The next step is to ${action} and update the team.`,
          question: `Which sentence gives clear context and a next step?`,
          answer: `For context, we need to review the ${noun} before making a decision.`
        }
      : {
          minutes: 26,
          goalEn: `Lead a professional discussion, compare options, and recommend an action in ${field.en.toLowerCase()}.`,
          goalVi: `Dẫn dắt thảo luận chuyên nghiệp, so sánh lựa chọn và đề xuất hành động trong lĩnh vực ${field.vi.toLowerCase()}.`,
          grammar: ["Based on the data, I recommend + V-ing...", "One trade-off is...", "Could we align on the next step?"],
          phrase1: `Based on the current situation, I recommend reviewing the ${noun} before we proceed.`,
          phrase2: `One trade-off is speed versus accuracy in this ${field.en.toLowerCase()} decision.`,
          phrase3: `Could we align on the next step and assign an owner today?`,
          question: `Which sentence sounds most professional for a higher-level discussion?`,
          answer: `Based on the current situation, I recommend reviewing the ${noun} before we proceed.`
        };
  const lesson = {
    id: `daily-${field.id}-${level.code.toLowerCase()}-${today}-${unique}`,
    fieldId: field.id,
    fieldVi: field.vi,
    level: level.code,
    titleEn: `${field.en}: ${level.label} Practice`,
    titleVi: `${field.vi}: Bài ngẫu nhiên ${level.code}`,
    skill: `${field.en} English`,
    minutes: levelDetail.minutes,
    image: getFieldImage(field.id),
    goalEn: levelDetail.goalEn,
    goalVi: levelDetail.goalVi,
    grammar: levelDetail.grammar,
    phrases: [
      { en: levelDetail.phrase1, vi: translateAdaptivePhrase(levelDetail.phrase1, field.vi) },
      { en: levelDetail.phrase2, vi: translateAdaptivePhrase(levelDetail.phrase2, field.vi) },
      { en: levelDetail.phrase3, vi: translateAdaptivePhrase(levelDetail.phrase3, field.vi) }
    ],
    exampleEn: `Today you are a ${role}. You need to ${action}. Use these key words: ${vocab.join(", ")}. ${levelDetail.phrase1} ${levelDetail.phrase3}`,
    exampleVi: `Hôm nay bạn đóng vai ${role} trong lĩnh vực ${field.vi}. Bạn cần ${action}. Từ khóa nên nhớ: ${vocab.join(", ")}. Hãy luyện nghe và nói lại từng câu.`,
    exerciseIntro: `Luyện tình huống ${field.vi} ở mức ${level.code}.`,
    questions: [
      {
        q: levelDetail.question,
        options: [levelDetail.answer, "Do it now. I do not care.", "Maybe yes maybe no, everything is fine."],
        answer: 0,
        explain: "Câu đúng có giọng điệu lịch sự, rõ bối cảnh và phù hợp môi trường công việc."
      },
      {
        q: `Which word is useful in ${field.en}?`,
        options: [vocab[0], "banana phone", "randomly sleepy"],
        answer: 0,
        explain: `“${vocab[0]}” là từ vựng phù hợp với lĩnh vực ${field.vi}.`
      },
      {
        q: "What should you do after choosing a next step?",
        options: ["Assign an owner and deadline.", "Ignore the team.", "Delete the message."],
        answer: 0,
        explain: "Trong công việc, bước tiếp theo nên có người phụ trách và hạn hoàn thành."
      }
    ]
  };
  lessons = mergeLessons(lessons, [lesson]);
  state.currentLessonId = lesson.id;
  state.quizLessonId = lesson.id;
  state.progress.selectedFields = [...(state.progress.selectedFields || []), field.id].slice(-20);
  saveLessonsToLocal(`adaptive-${field.id}`);
  saveProgress();
  renderQuizSelectors();
  renderQuiz();
  renderAll();
  result.innerHTML = `
    <strong>Đã tạo bài học: ${escapeHtml(lesson.titleVi)}</strong>
    <p class="lesson-note">Mức ${level.code} dựa trên điểm trung bình, số lần làm bài và bài đã hoàn thành của user hiện tại.</p>
    <div class="daily-lesson-actions">
      <a class="primary-btn" href="#lessonDetail">Học bài vừa tạo</a>
      <button class="secondary-btn" type="button" onclick="document.getElementById('startQuizBtn').click();document.getElementById('quiz-zone').scrollIntoView({behavior:'smooth'});">Làm quiz bài này</button>
    </div>
  `;
  document.getElementById("lessonDetail")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getFieldImage(fieldId) {
  const images = {
    food: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
    accounting: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    analyst: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
    hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    business: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    marketing: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
  };
  return images[fieldId] || images.business;
}

function translateAdaptivePhrase(sentence, fieldVi) {
  if (/Could you please confirm/i.test(sentence)) return `Bạn vui lòng xác nhận thông tin trong lĩnh vực ${fieldVi} được không?`;
  if (/Let me check/i.test(sentence)) return `Để tôi kiểm tra thông tin ${fieldVi} và phản hồi lại bạn.`;
  if (/I would like/i.test(sentence)) return `Tôi muốn xử lý tình huống ${fieldVi} cho khách hàng.`;
  if (/For context/i.test(sentence)) return `Để bạn nắm bối cảnh, chúng ta cần xem lại thông tin ${fieldVi} trước khi quyết định.`;
  if (/The main issue/i.test(sentence)) return `Vấn đề chính là thông tin ${fieldVi} cần thêm một xác nhận.`;
  if (/The next step/i.test(sentence)) return `Bước tiếp theo là xử lý và cập nhật cho đội nhóm.`;
  if (/Based on/i.test(sentence)) return `Dựa trên tình hình hiện tại, tôi đề xuất xem lại thông tin trước khi tiếp tục.`;
  if (/trade-off/i.test(sentence)) return `Một điểm cần cân nhắc là tốc độ so với độ chính xác.`;
  if (/align/i.test(sentence)) return `Chúng ta có thể thống nhất bước tiếp theo và người phụ trách hôm nay không?`;
  return `Câu mẫu dùng trong lĩnh vực ${fieldVi}.`;
}

async function loadLessonsFromFirestore() {
  const status = document.getElementById("lessonSyncStatus");
  if (!state.firebase?.db) {
    status.textContent = "Bạn cần kết nối Firebase trước khi đồng bộ Firestore.";
    return;
  }
  try {
    status.textContent = "Đang đọc collection courseLessons...";
    const { db, firestoreModule } = state.firebase;
    const snap = await firestoreModule.getDocs(firestoreModule.collection(db, "courseLessons"));
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    applyLessonUpdates(data, "Firestore: courseLessons");
  } catch (error) {
    status.textContent = `Không đồng bộ được Firestore: ${error.message}`;
  }
}

function getShareText() {
  const activities = getTodayActivities();
  const name = state.user?.displayName || state.user?.email || "Guest";
  const best = activities.length ? Math.max(...activities.map((item) => Number(item.score || 0))) : 0;
  const completedNames = [...new Set(activities.map((item) => item.lessonTitleVi).filter(Boolean))].slice(0, 3);
  const fields = [...new Set(activities.map((item) => item.fieldVi).filter(Boolean))].slice(0, 3);
  if (!activities.length) {
    return `${name} đang học Work English 2026. Hôm nay chưa có kết quả mới, nhưng vẫn giữ streak ${state.progress.streak || 0} ngày.`;
  }
  return `${name} vừa học tiếng Anh công việc hôm nay: ${activities.length} hoạt động, điểm tốt nhất ${best}%, streak ${state.progress.streak || 0} ngày. Bài: ${completedNames.join(", ") || "Work English"}${fields.length ? `. Lĩnh vực: ${fields.join(", ")}` : ""}.`;
}

function updateSharePanel() {
  const summary = document.getElementById("shareSummary");
  if (!summary) return;
  const activities = getTodayActivities();
  const text = getShareText();
  if (!activities.length) {
    summary.innerHTML = `<strong>Hôm nay chưa có hoạt động học mới.</strong><br>${escapeHtml(text)}`;
  } else {
    const best = Math.max(...activities.map((item) => Number(item.score || 0)));
    summary.innerHTML = `<strong>Kết quả hôm nay:</strong> ${activities.length} hoạt động • điểm tốt nhất ${best}% • streak ${state.progress.streak || 0} ngày<br><span>${escapeHtml(text)}</span>`;
  }
  const url = encodeURIComponent(window.location.href.split("#")[0]);
  const encodedText = encodeURIComponent(text);
  const facebook = document.getElementById("shareFacebookBtn");
  const linkedin = document.getElementById("shareLinkedinBtn");
  const x = document.getElementById("shareXBtn");
  const zalo = document.getElementById("shareZaloBtn");
  if (facebook) facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`;
  if (linkedin) linkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  if (x) x.href = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
  if (zalo) zalo.href = `https://zalo.me/share?u=${url}`;
}

async function copyShareText() {
  const status = document.getElementById("shareStatus");
  const text = getShareText();
  try {
    await navigator.clipboard.writeText(text);
    if (status) status.textContent = "Đã copy nội dung chia sẻ.";
  } catch (error) {
    if (status) status.textContent = "Không copy tự động được. Hãy chọn và copy nội dung trong ô kết quả.";
  }
}

async function nativeShare() {
  const status = document.getElementById("shareStatus");
  const text = getShareText();
  if (navigator.share) {
    try {
      await navigator.share({ title: "Work English 2026", text, url: window.location.href.split("#")[0] });
      if (status) status.textContent = "Đã mở bảng chia sẻ của thiết bị.";
    } catch (error) {
      if (status) status.textContent = "Bạn đã hủy chia sẻ hoặc thiết bị không cho phép.";
    }
  } else {
    await copyShareText();
  }
}

function setupShareActions() {
  document.getElementById("nativeShareBtn")?.addEventListener("click", nativeShare);
  document.getElementById("copyShareBtn")?.addEventListener("click", copyShareText);
  updateSharePanel();
}

function renderAll() {
  renderStats();
  renderLessonCards();
  renderLessonDetail();
  renderProgress();
  renderRoadmap();
  renderAuthPanel();
  renderWelcomePanel();
  renderIndustryPanel();
  renderLoginHistory();
  updateSharePanel();
  renderUpdatePanel();
}

function init() {
  setupLanguageControls();
  setupDailyGoal();
  setupReset();
  setupVibes();
  setupMusicSelect();
  setupVoiceControls();
  setupPlanner();
  setupIndustryPicker();
  setupShareActions();
  setupAuth();
  setupLessonUpdates();
  renderQuizSelectors();
  renderQuiz();
  renderAll();
}

document.addEventListener("DOMContentLoaded", init);
