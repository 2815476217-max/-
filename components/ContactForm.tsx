"use client";

import type { FormEvent } from "react";

export function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`[Site to Life] ${form.get("type") || "合作联系"} — ${form.get("name")}`);
    const body = encodeURIComponent(
      `姓名：${form.get("name")}\n邮箱：${form.get("email")}\n机构或学校：${form.get("organisation")}\n合作类型：${form.get("type")}\n\n${form.get("message")}`,
    );
    window.location.href = `mailto:2815476217@qq.com?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label><span>姓名</span><input name="name" required autoComplete="name" /></label>
      <label><span>邮箱</span><input name="email" required type="email" autoComplete="email" /></label>
      <label><span>机构或学校</span><input name="organisation" autoComplete="organization" /></label>
      <label>
        <span>合作类型</span>
        <select name="type" defaultValue="设计合作">
          <option>设计合作</option>
          <option>研究交流</option>
          <option>实习或工作机会</option>
          <option>展览或出版</option>
          <option>其他</option>
        </select>
      </label>
      <label className="contact-message"><span>留言</span><textarea name="message" required rows={6} /></label>
      <button className="contact-submit" type="submit">
        <span>一起让场所重新生长</span>
        <span>发送邮件 ↗</span>
      </button>
    </form>
  );
}
