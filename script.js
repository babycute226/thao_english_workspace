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

function bilingual(en, vi, tag = "span") {
  return `<${tag} class="en">${en}</${tag}><${tag} class="vi">${vi}</${tag}>`;
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

function showFieldGate(show = true) {
  const fieldGate = document.getElementById("fieldGate");
  if (!fieldGate) return;
  fieldGate.classList.toggle("hidden", !show);
  if (show) renderFieldOptions();
}

function updateFieldBadge() {
  const badge = document.getElementById("currentFieldBadge");
  const title = document.getElementById("fieldPickerTitle");
  const field = getFieldProfile(state.currentField);
  if (badge) badge.textContent = `Lĩnh vực hiện tại: ${field.label}`;
  if (title) title.textContent = `Hôm nay học: ${field.label}`;
}

function renderFieldOptions() {
  const grid = document.getElementById("fieldOptions");
  if (!grid) return;
  grid.innerHTML = Object.values(fieldProfiles).map((field) => `
    <button class="field-option ${field.id === state.currentField ? "active" : ""}" type="button" data-field-id="${field.id}">
      <strong>${field.label}</strong>
      <span>${field.labelEn}</span>
      <small>${field.contextVi}</small>
    </button>
  `).join("");
  grid.querySelectorAll(".field-option").forEach((button) => {
    button.addEventListener("click", () => selectField(button.dataset.fieldId));
  });
}

function selectField(fieldId) {
  state.currentField = fieldId;
  rebuildLessons();
  showFieldGate(false);
  renderQuizSelectors();
  renderQuiz();
  renderAll();
  document.getElementById("levelPicker")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupFieldControls() {
  document.getElementById("changeFieldBtn")?.addEventListener("click", () => showFieldGate(true));
  document.getElementById("closeFieldGateBtn")?.addEventListener("click", () => showFieldGate(false));
  renderFieldOptions();
  updateFieldBadge();
}

function updateLevelBadge() {
  const level = getLevelProfile(state.currentLevel);
  const badge = document.getElementById("currentLevelBadge");
  const text = document.getElementById("levelPickerText");
  if (badge) badge.textContent = `Level ${level.level} • ${level.name} • ${level.cefr}`;
  if (text) text.textContent = `Mục tiêu: ${level.taskVi}. Đầu ra gợi ý: ${level.output}. Ngữ pháp trọng tâm: ${level.grammar}.`;
}

function renderLevelOptions() {
  const grid = document.getElementById("levelOptions");
  if (!grid) return;
  grid.innerHTML = levelProfiles.map((level) => `
    <button class="level-option ${level.level === state.currentLevel ? "active" : ""}" type="button" data-level="${level.level}">
      <strong>Level ${level.level}</strong>
      <span>${level.name} • ${level.cefr}</span>
      <small>${level.taskVi}</small>
    </button>
  `).join("");
  grid.querySelectorAll(".level-option").forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.level));
  });
}

function selectLevel(level) {
  state.currentLevel = clampLevel(level);
  rebuildLessons();
  renderLevelOptions();
  renderQuizSelectors();
  renderQuiz();
  renderAll();
  document.getElementById("lessons")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupLevelControls() {
  renderLevelOptions();
  updateLevelBadge();
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
        <h3>Ví dụ song ngữ theo lĩnh vực</h3>
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

function setupMusicSelect() {
  const select = document.getElementById("trackSelect");
  if (!select) return;
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

  document.getElementById("musicToggleBtn")?.addEventListener("click", () => {
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

  document.getElementById("volumeSlider")?.addEventListener("input", (event) => {
    if (state.player && state.isMusicReady) state.player.setVolume(Number(event.target.value));
  });
}

function updateMusicButton() {
  const button = document.getElementById("musicToggleBtn");
  if (button) button.textContent = state.isMusicPlaying ? "⏸" : "▶";
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
        if (event.data === YT.PlayerState.ENDED) event.target.playVideo();
      }
    }
  });
};

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
