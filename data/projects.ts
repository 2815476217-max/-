export type Project = {
  slug: string;
  number: string;
  title: string;
  englishTitle: string;
  subtitle: string;
  type: string;
  site: string;
  year: string;
  categories: string[];
  keywords: string[];
  color: string;
  ink: string;
  /** Shared cover source for the contents card and detail-page opening. */
  cover: string;
  research: string;
  scene: string;
  boards: string[];
  statement: string;
  context: string;
  problem: string;
  strategy: string[];
  framework: string;
  impact: string;
};

export const projects: Project[] = [
  {
    slug: "blue-habitat",
    number: "01",
    title: "旧屿焕新，蓝海筑居",
    englishTitle: "BLUE HABITAT",
    subtitle: "——海洋工业遗址的乌托邦设计",
    type: "工业遗产 / 海洋研究",
    site: "中国南海",
    year: "2025",
    categories: ["Heritage", "Research"],
    keywords: ["海洋工业遗址", "生态修复", "模块化空间", "海上聚落"],
    color: "#071D5C",
    ink: "#FFFFFF",
    cover: "/media/covers/01-blue-habitat.png",
    research: "/media/01-research.webp",
    scene: "/media/01-scene.webp",
    boards: [
      "/media/boards/01-01.webp",
      "/media/boards/01-02.webp",
      "/media/boards/01-03.webp",
      "/media/boards/01-04.webp",
      "/media/boards/01-05.webp",
    ],
    statement:
      "以南海废弃半潜式油田为载体，将工业设施再利用、生态修复与海上生活叠合为一座自给型聚落。设计不抹去平台的工程记忆，而是让它成为科研、自然体验与公共生活的新地基。",
    context:
      "深水导管架平台处于海陆边界，也处于生产功能退场与海洋生态接管之间。项目把这一悬置状态视为新的空间条件。",
    problem:
      "退役设施面临拆除成本、生态占用与空间闲置；海上活动则缺少可持续、可扩展且能承载长期生活的公共基础设施。",
    strategy: ["保留平台骨架", "建立海上—海下双层系统", "以模块适应生长", "让生态成为结构的一部分"],
    framework:
      "水面是一条可变的空间剖面：上部承载生产、居住与公共交流，下部连接海洋观察、生态修复与沉浸体验。",
    impact:
      "把一次性的工业基础设施转化为可迭代的海洋公共原型，并在开发、修复与生活之间建立新的平衡。",
  },
  {
    slug: "lishan-courtyard",
    number: "02",
    title: "溪山院巷，民生传续",
    englishTitle: "LISHAN COMMONS",
    subtitle: "——文脉赋能下的乡村重塑",
    type: "乡村更新 / 公共服务",
    site: "山西 · 李家山村",
    year: "2025",
    categories: ["Rural", "Public Space", "Research"],
    keywords: ["乡村振兴", "触媒理论", "公共服务", "生态修复"],
    color: "#F0C95C",
    ink: "#111111",
    cover: "/media/covers/02-lishan-commons.png",
    research: "/media/02-research.webp",
    scene: "/media/02-scene.webp",
    boards: [
      "/media/boards/02-01.webp",
      "/media/boards/02-02.webp",
      "/media/boards/02-03.webp",
      "/media/boards/02-04.webp",
      "/media/boards/02-05.webp",
      "/media/boards/02-06.webp",
    ],
    statement:
      "以触媒理论为框架，从医疗、教育、基础服务与公共客厅四类节点入手，逐步连接李家山村分散的生活空间与生态系统。",
    context:
      "山地聚落拥有鲜明的院落肌理，却在公共服务撤离、人口流动与旅游开发之间出现空间断裂。",
    problem:
      "更新资源有限且需求分散。一次性的大建设难以回应村民真实生活，也容易破坏原有聚落尺度。",
    strategy: ["识别高频民生节点", "轻量植入公共功能", "连通雨洪与步行网络", "让服务带动后续更新"],
    framework:
      "点—线—面不是形态图解，而是一套更新节奏：先让节点发生，再用路径串联，最终形成可持续的公共网络。",
    impact:
      "以小尺度、可复制的服务触媒替代一次性改造，让村落的日常运营本身成为更新动力。",
  },
  {
    slug: "gusu-game-lanes",
    number: "04",
    title: "巷陌弈局，姑苏新生",
    englishTitle: "GUSU PLAY LANES",
    subtitle: "——老城垣上的沉浸式桌游聚落",
    type: "古城更新 / 文化体验",
    site: "江苏 · 苏州",
    year: "2025",
    categories: ["Heritage", "Public Space"],
    keywords: ["古城更新", "沉浸式体验", "文化游戏", "公共空间"],
    color: "#667C45",
    ink: "#FFFFFF",
    cover: "/media/covers/04-gusu-play-lanes.png",
    research: "/media/03-research.webp",
    scene: "/media/03-scene.webp",
    boards: [
      "/media/boards/03-01.webp",
      "/media/boards/03-02.webp",
      "/media/boards/03-03.webp",
      "/media/boards/03-04.webp",
    ],
    statement:
      "将古城墙、古建筑与街巷转译为一场可行走的桌游。访客不只是观看历史，而是在路线、任务与公共活动中重新认识场所。",
    context:
      "古城文化资源密集，但景点之间缺少连续体验，居民日常与游客路径也常常彼此割裂。",
    problem:
      "静态陈列难以承载复杂历史，强娱乐化又会削弱场所真实性；更新需要在参与感与专业表达之间保持克制。",
    strategy: ["以城墙建立主叙事", "把街巷转为任务路径", "用卡牌连接场所信息", "以公共活动激活空隙"],
    framework:
      "阵营、任务、积分与游线被嵌入真实空间，数字媒介只负责提示和连接，城市本身仍是体验的主体。",
    impact:
      "让文化解释从单向阅读转为协作探索，同时把游客流量导向更广阔的老城公共空间。",
  },
  {
    slug: "boundless-inclusive-community",
    number: "03",
    title: "方启新境，无界相融",
    englishTitle: "BOUNDLESS INCLUSION",
    subtitle: "——自闭症包容性社区空间设计",
    type: "自闭症儿童友好空间设计 / 包容性社区空间设计",
    site: "城市社区",
    year: "2026",
    categories: ["Public Space", "Research"],
    keywords: ["自闭症儿童", "感官疗愈", "包容性社区", "无界共融"],
    color: "#E28573",
    ink: "#111111",
    cover: "/media/covers/03-boundless-inclusion.png",
    research: "/media/04-research.webp",
    scene: "/media/04-scene.webp",
    boards: [
      "/media/boards/04-01.webp",
      "/media/boards/04-02.webp",
    ],
    statement:
      "以感官疗愈为切入点，为自闭症儿童、家庭与社区居民建立可感知、可停留、可共同参与的日常支持网络，让差异被空间温柔地接纳。",
    context:
      "自闭症儿童的日常活动常受感官刺激、社交边界与环境不确定性的影响。社区空间需要提供更清晰、可选择且可逐步参与的体验路径。",
    problem:
      "现有公共空间多以统一人群和单一行为为尺度，缺少可退避的安静场所、连续的感官过渡，以及让儿童与社区自然相遇的共享界面。",
    strategy: ["梳理感官刺激梯度", "设置可退避的疗愈节点", "以模块串联日常活动", "让社区共同参与支持"],
    framework:
      "以从安静到互动的感官梯度组织空间：儿童可以在可预期的路径中自主选择停留、探索或交流，家庭与邻里则在开放节点中共享日常。",
    impact:
      "空间不以“特殊隔离”为目标，而以日常共处为基础：让儿童获得安全感和自主性，也让家庭、邻里和公共服务在同一社区中形成持续支持。",
  },
].sort((left, right) => Number(left.number) - Number(right.number));

export const categories = ["All", "Heritage", "Rural", "Public Space", "Modular", "Research"];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
