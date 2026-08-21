import type { Metadata } from "next";
import { DiagramViewer } from "../../components/DiagramViewer";
import { FixedNavigation } from "../../components/FixedNavigation";

export const metadata: Metadata = {
  title: "关于 / 研究与履历",
  description: "环境设计师冯驿岚的完整个人信息、教育背景、科研经历、设计项目、竞赛奖项与专业技能。",
};

const timeline = [
  ["2023", "进入上海理工大学出版学院景观设计专业"],
  ["2024", "持续参与旧城、社区与公共空间实践，推进设计竞赛与科研工作"],
  ["2025", "担任环境设计1班班长、上海理工大学大学生艺术团团长、上理空间设计协会社长"],
  ["2026", "持续研究公共空间、社区环境、历史文化保护与环境健康"],
];

const nationalAwards = [
  "第十届米兰设计周全国赛区一等奖",
  "第十九届全国高校商业精英挑战赛全国赛区一等奖",
  "2025年第15届中国国际生态设计与工程创新大学生全国赛区金奖",
  "2026第16届世界人居绿色设计国际竞赛全国赛区金奖",
  "2026第16届世界人居绿色设计国际竞赛全国赛区金奖",
  "2025年学院杯中国室内与环境设计大赛全国赛区银奖",
  "第十一届汇创青春环境设计类决赛一等奖",
  "第十一届汇创青春环境设计类决赛二等奖",
  "第十一届汇创青春环境设计类决赛三等奖",
  "第十八届中国之星设计奖全国优秀奖",
  "等21项国家级奖项",
];

const provincialAwards = [
  "上海市奖学金",
  "第十届米兰设计周上海赛区一等奖",
  "第十届米兰设计周上海赛区一等奖",
  "第十七届蓝桥杯上海赛区一等奖",
  "第七届全国大学生艺术展演上海市一等奖",
  "第六届东方创意之星上海赛区铜奖",
  "第十八届中国之星设计奖上海赛区入围奖",
  "等12项省级奖项",
];

const universityAwards = [
  "2025年第一学期学习优秀奖学金一等奖",
  "2024年第二学期学习优秀奖学金一等奖（仅一名）",
  "2024年第一学期学习优秀奖学金二等奖",
  "2023年第二学期学习优秀奖学金二等奖",
  "2025年上海理工大学优秀学生干部、优秀学生",
  "2024年上海理工大学优秀团员、优秀团干部",
  "等18项校级奖项",
];

export default function AboutPage() {
  return (
    <main className="page-shell about-page">
      <FixedNavigation />

      <header className="about-opening">
        <span className="eyebrow">关于我 / 个人履历</span>
        <div className="about-intro">
          <img src="/media/fyl-portrait.webp" alt="冯驿岚肖像" decoding="async" />
          <div>
            <p className="about-lede">设计是我跨越泥泞、完成自我突围与重建的方式。</p>
            <p>
              对我而言，设计是跨越泥泞、完成自我突围与重建的方式。曾在虚拟现实的创作中陷入倦怠，我开始转向更贴近内心的表达，在城市与乡村、工业遗址与历史街巷的改造中，寻找抚平躁动的静谧。
            </p>
            <p>
              从海洋工业遗址的乌托邦构想，到老城巷陌的沉浸式活化；从古桥文脉的转译，到老纱厂纺织空间的重塑，我的设计始终在动态的数字媒介与真实的场地语境间游走，试图在每一次介入中，凝固住属于场地的片刻平静，也让不完美的日常，成为澄澈之境的载体。
            </p>
            <dl className="personal-details">
              <div><dt>姓名</dt><dd>冯驿岚（中共党员）</dd></div>
              <div><dt>信息日期</dt><dd>2024 / 10 / 7</dd></div>
              <div><dt>专业方向</dt><dd>景观设计 / 环境设计</dd></div>
              <div><dt>学校</dt><dd>上海理工大学出版学院</dd></div>
              <div><dt>电话</dt><dd><a href="tel:+8618773651385">+86 18773651385</a></dd></div>
              <div><dt>微信</dt><dd>fffyl1007</dd></div>
              <div><dt>邮箱</dt><dd><a href="mailto:2815476217@qq.com">2815476217@qq.com</a></dd></div>
              <div><dt>所在地</dt><dd>上海市杨浦区</dd></div>
            </dl>
          </div>
        </div>
      </header>

      <section className="stats-section" aria-label="奖项与排名数据">
        <div><strong>21+</strong><span>国家级奖项</span></div>
        <div><strong>12+</strong><span>省级奖项</span></div>
        <div><strong>18+</strong><span>校级奖项</span></div>
        <div><strong>03/277</strong><span>专业综合排名</span></div>
      </section>

      <section className="profile-section">
        <div className="section-index"><span>01</span><h2>教育与<br />个人经历</h2></div>
        <div className="profile-content">
          <article>
            <span>教育经历</span>
            <h3>上海理工大学—出版学院—景观设计</h3>
            <p>2023.09—2027.06</p>
            <dl>
              <div><dt>专业成绩</dt><dd>3.88 / 4.5</dd></div>
              <div><dt>综合排名</dt><dd>3 / 277</dd></div>
              <div><dt>外语水平</dt><dd>CET-4</dd></div>
              <div><dt>相关课程</dt><dd>居住环境改造（98）、城市空间微更新（96）、建筑设计（95）、场地设计原理（100）、景观构造设计（95）</dd></div>
            </dl>
          </article>
          <article>
            <span>个人经历</span>
            <ul>
              <li>环境设计1班班长</li>
              <li>上海理工大学大学生艺术团团长</li>
              <li>上理空间设计协会社长</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="research-section">
        <div className="section-index"><span>02</span><h2>科研<br />经历</h2></div>
        <div className="research-list">
          <article>
            <span className="status manuscript">大修后复审中</span>
            <h3>Poverty, demand, and coping: A longitudinal investigation on the impact of public leisure facilities on the health of rural elderly.</h3>
            <p>PUBLIC HEALTH / SSCI中科院三区</p>
          </article>
          <article>
            <span className="status manuscript">外审中</span>
            <h3>The influence of urban community environment on fertility planning among women of childbearing age in Chinese megacities: an empirical study from Shanghai, China.</h3>
            <p>Journal of Housing and the Built Environment / SSCI中科院三区</p>
          </article>
          <article>
            <span className="status manuscript">外审中</span>
            <h3>Research on the impact of rural environment on the physical health of older adults: Verification based on the data of China Longitudinal Aging Social Survey.</h3>
            <p>ARCHITECTURAL SCIENCE REVIEW / AHCI中科院三区</p>
          </article>
          <article>
            <span className="status published">正式见刊</span>
            <h3>社交媒体平台异质性对青年“断情”现象的影响</h3>
            <p>《研究心理学进展》</p>
          </article>
          <article>
            <span className="status published">正式见刊</span>
            <h3>上海金山古桥的类型特征及其保护利用研究</h3>
            <p>《建筑与环境研究》</p>
          </article>
        </div>
      </section>

      <section className="practice-section">
        <div className="section-index"><span>03</span><h2>设计<br />项目</h2></div>
        <div className="practice-list">
          <article><span>01</span><h3>上海市沪派江南古桥调研项目</h3><p>已产出分区图册、相关论文、竞赛成果、大创成果</p></article>
          <article><span>02</span><h3>上海理工大学湛恩图书馆改造</h3><p>方案已落地</p></article>
          <article><span>03</span><h3>上海市杨浦区控江小区改造设计</h3><p>方案持续推进</p></article>
        </div>
      </section>

      <section className="awards-section">
        <div className="section-index"><span>04</span><h2>竞赛<br />经历</h2></div>
        <div className="awards-columns">
          <article><h3>国家级</h3><ol>{nationalAwards.map((award, index) => <li key={`${award}-${index}`}>{award}</li>)}</ol></article>
          <article><h3>省级</h3><ol>{provincialAwards.map((award, index) => <li key={`${award}-${index}`}>{award}</li>)}</ol></article>
          <article><h3>校级</h3><ol>{universityAwards.map((award, index) => <li key={`${award}-${index}`}>{award}</li>)}</ol></article>
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-index"><span>05</span><h2>时间线<br />经历</h2></div>
        <div className="timeline-list">
          {timeline.map(([year, text]) => <div key={year}><time>{year}</time><p>{text}</p></div>)}
        </div>
      </section>

      <section className="tools-section">
        <span className="eyebrow">06 / 专业技能</span>
        <h2>工具不以百分比定义，<br />而在项目中留下痕迹。</h2>
        <div className="tool-list">
          <span>SketchUp / 空间框架与建模</span>
          <span>AutoCAD / 图纸与细部</span>
          <span>Office / 研究与沟通</span>
          <span>D5 Render / 场景与氛围</span>
          <span>Photoshop / 视觉叙事</span>
          <span>Illustrator / 分析图系统</span>
        </div>
      </section>

      <section className="resume-original-section">
        <div className="resume-original-heading">
          <span>07 / 完整个人履历原稿</span>
        </div>
        <DiagramViewer
          src="/media/boards/fyl-resume-full.webp"
          alt="冯驿岚完整个人履历原稿"
          caption="个人信息 / 教育经历 / 个人经历 / 科研经历 / 竞赛经历 / 专业技能"
        />
      </section>
    </main>
  );
}
