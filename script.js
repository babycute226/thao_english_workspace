/* Work English 2026 - Static self-study app
   Features: bilingual content, exercises, quiz scoring, local progress, hourly vibe changes, YouTube background music controls.
*/

const STORAGE_KEY = "workEnglish2026Progress";
const VIBE_KEY = "workEnglish2026Vibe";
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

const lessons = [
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

const state = {
  currentLessonId: lessons[0].id,
  lang: "both",
  progress: loadProgress(),
  currentVibeIndex: 0,
  vibeStartedAt: Date.now(),
  quizLessonId: lessons[0].id,
  player: null,
  isMusicReady: false,
  isMusicPlaying: false
};

function defaultProgress() {
  return {
    completed: {},
    scores: {},
    attempts: {},
    streak: 0,
    lastStudyDate: null,
    dailyGoal: 1,
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
    const lastDate = new Date(last + "T00:00:00");
    const todayDate = new Date(today + "T00:00:00");
    const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    state.progress.streak = diffDays === 1 ? state.progress.streak + 1 : 1;
  }
  state.progress.lastStudyDate = today;
}

function bilingual(en, vi, tag = "span") {
  return `<${tag} class="en">${en}</${tag}><${tag} class="vi">${vi}</${tag}>`;
}

function getLesson(id) {
  return lessons.find((lesson) => lesson.id === id) || lessons[0];
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
  container.innerHTML = lessons.map((lesson, index) => {
    const score = state.progress.scores[lesson.id] ?? 0;
    const done = Boolean(state.progress.completed[lesson.id]);
    return `
      <button class="lesson-card ${lesson.id === state.currentLessonId ? "active" : ""}" type="button" data-lesson-id="${lesson.id}">
        <span class="lesson-number">${String(index + 1).padStart(2, "0")}</span>
        <span>
          <h4>${lesson.titleVi}</h4>
          <p>${lesson.titleEn} • ${lesson.level} • ${lesson.minutes} phút</p>
        </span>
        <span class="status-pill ${done ? "done" : ""}">${done ? "✓ Done" : `${score}%`}</span>
      </button>
    `;
  }).join("");

  container.querySelectorAll(".lesson-card").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentLessonId = button.dataset.lessonId;
      renderAll();
      document.getElementById("lessonDetail").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderLessonDetail() {
  const lesson = getLesson(state.currentLessonId);
  const detail = document.getElementById("lessonDetail");
  const previousScore = state.progress.scores[lesson.id] ?? 0;
  const isDone = Boolean(state.progress.completed[lesson.id]);

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
          </div>
        </div>
        <img src="${lesson.image}" alt="${lesson.titleVi}" loading="lazy" />
      </div>

      <div class="content-grid">
        <div class="info-card">
          <h3>Mẫu câu chính</h3>
          <ul>${lesson.grammar.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
        <div class="info-card">
          <h3>Cụm từ nên nhớ</h3>
          <div class="phrase-list">
            ${lesson.phrases.map((phrase) => `
              <div class="phrase"><strong>${phrase.en}</strong><span>${phrase.vi}</span></div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="info-card">
        <h3>Ví dụ song ngữ</h3>
        <p>${bilingual(lesson.exampleEn.replaceAll("\n", "<br>"), lesson.exampleVi.replaceAll("\n", "<br>"))}</p>
      </div>

      <div class="exercise-card">
        <h3>Bài tập bắt buộc</h3>
        <p class="lesson-note">${lesson.exerciseIntro} Làm xong bấm <strong>Nộp bài</strong>. Đạt từ 60% trở lên sẽ được tính là hoàn thành bài.</p>
        <form class="exercise-form" id="lessonExerciseForm">
          ${lesson.questions.map((question, index) => `
            <div class="exercise-question">
              <p><strong>Câu ${index + 1}.</strong> ${question.q}</p>
              ${question.options.map((option, optionIndex) => `
                <label class="option-line">
                  <input type="radio" name="lesson-${lesson.id}-${index}" value="${optionIndex}" required />
                  <span>${option}</span>
                </label>
              `).join("")}
            </div>
          `).join("")}
          <div class="lesson-footer-actions">
            <button class="submit-btn" type="submit">Nộp bài và chấm điểm</button>
            <span class="lesson-note">Gợi ý: ghi lại 3 câu mẫu vào sổ tay trước khi làm bài.</span>
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
  select.innerHTML = lessons.map((lesson) => `<option value="${lesson.id}">${lesson.titleVi} / ${lesson.titleEn}</option>`).join("");
  select.value = state.quizLessonId;
  select.addEventListener("change", (event) => {
    state.quizLessonId = event.target.value;
  });
  document.getElementById("startQuizBtn").addEventListener("click", renderQuiz);
}

function renderQuiz() {
  const lesson = getLesson(state.quizLessonId);
  const area = document.getElementById("quizArea");
  area.innerHTML = `
    <form id="quizForm">
      ${lesson.questions.map((question, index) => `
        <div class="quiz-question">
          <h4>${index + 1}. ${question.q}</h4>
          ${question.options.map((option, optionIndex) => `
            <label class="option-line">
              <input type="radio" name="quiz-${lesson.id}-${index}" value="${optionIndex}" required />
              <span>${option}</span>
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

  document.getElementById("overallBadge").textContent = `${percent}%`;
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressRing").style.setProperty("--progress", `${percent * 3.6}deg`);
  document.getElementById("completedCount").textContent = completed;
  document.getElementById("averageScore").textContent = average;
  document.getElementById("studyStreak").textContent = state.progress.streak ?? 0;

  const title = completed === 0 ? "Bạn chưa bắt đầu" : completed === lessons.length ? "Hoàn thành giáo trình!" : `Bạn đã hoàn thành ${completed}/${lessons.length} bài`;
  const subtitle = completed === lessons.length
    ? "Hãy làm lại quiz sau 7 ngày để duy trì phản xạ."
    : `Mục tiêu hôm nay: ${state.progress.dailyGoal || 1} bài. Ưu tiên bài có điểm dưới 80%.`;
  document.getElementById("progressTitle").textContent = title;
  document.getElementById("progressSubtitle").textContent = subtitle;

  document.getElementById("scoreboard").innerHTML = lessons.map((lesson) => {
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
  select.value = String(state.progress.dailyGoal || 1);
  select.addEventListener("change", (event) => {
    state.progress.dailyGoal = Number(event.target.value);
    saveProgress();
    renderProgress();
  });
}

function setupReset() {
  document.getElementById("resetProgressBtn").addEventListener("click", () => {
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
  select.innerHTML = tracks.map((track, index) => `<option value="${index}">${track.title}</option>`).join("");
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

function renderAll() {
  renderStats();
  renderLessonCards();
  renderLessonDetail();
  renderProgress();
}

function init() {
  setupLanguageControls();
  setupDailyGoal();
  setupReset();
  setupVibes();
  setupMusicSelect();
  renderQuizSelectors();
  renderQuiz();
  renderAll();
}

document.addEventListener("DOMContentLoaded", init);
