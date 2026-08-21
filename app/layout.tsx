import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const description = "冯驿岚，环境与景观设计师。以轻介入、在地记忆与可持续策略，让场所重新参与当代生活。";
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
    title: {
      default: "SITE TO LIFE — 冯驿岚 FYL",
      template: "%s — FYL",
    },
    description,
    keywords: ["冯驿岚", "Feng Yilan", "环境设计", "景观设计", "作品集", "场所再生", "工业遗产"],
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      title: "SITE TO LIFE — 冯驿岚 FYL",
      description,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "SITE TO LIFE — Feng Yilan portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "SITE TO LIFE — 冯驿岚 FYL",
      description,
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1747FF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
