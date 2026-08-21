import Link from "next/link";

export function FixedNavigation() {
  return (
    <nav className="fixed-navigation" aria-label="主导航">
      <Link className="nav-corner nav-top-left" href="/" aria-label="冯驿岚，首页">
        <span className="nav-primary">冯驿岚 / FYL</span>
        <span className="nav-secondary">首页</span>
      </Link>
      <Link className="nav-corner nav-top-right" href="/profile">
        <span className="nav-primary">PROFILE / CV</span>
        <span className="nav-secondary">个人档案</span>
      </Link>
      <Link className="nav-corner nav-bottom-left" href="/work">
        <span className="nav-primary">作品目录</span>
        <span className="nav-secondary">四个项目</span>
      </Link>
      <Link className="nav-corner nav-bottom-right" href="/contact">
        <span className="nav-primary">联系</span>
        <span className="nav-secondary">开始对话</span>
      </Link>
      <span className="edge-word edge-top" aria-hidden="true">SITE</span>
      <span className="edge-word edge-right" aria-hidden="true">TO</span>
      <span className="edge-word edge-bottom" aria-hidden="true">LIFE</span>
      <span className="edge-word edge-left" aria-hidden="true">FYL</span>
    </nav>
  );
}
