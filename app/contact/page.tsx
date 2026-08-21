import type { Metadata } from "next";
import { ContactForm } from "../../components/ContactForm";
import { FixedNavigation } from "../../components/FixedNavigation";

export const metadata: Metadata = {
  title: "联系",
  description: "联系环境设计师冯驿岚，讨论设计合作、研究交流、展览与出版。",
};

export default function ContactPage() {
  return (
    <main className="page-shell contact-page">
      <FixedNavigation />
      <header className="contact-heading">
        <span className="eyebrow">联系 / 上海</span>
        <h1>让下一次对话，<br />从一处真实场所开始。</h1>
        <div className="contact-details">
          <a href="mailto:2815476217@qq.com">邮箱　2815476217@qq.com ↗</a>
          <a href="tel:+8618773651385">电话　+86 18773651385</a>
          <span>微信　fffyl1007</span>
          <span>地址　上海市杨浦区</span>
        </div>
      </header>
      <ContactForm />
      <footer className="contact-footer">
        <span>冯驿岚 / FYL</span>
        <span>N 31°13′17″ / E 121°28′</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
