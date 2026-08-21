import { notFound } from "next/navigation";
import { PaperViewer } from "../../../components/PaperViewer";

const papers = {
  "01": { number: "01", journal: "PUBLIC HEALTH", pdf: "/papers/01.pdf" },
  "04": { number: "04", journal: "《研究心理学进展》", pdf: "/papers/04.pdf" },
  "05": { number: "05", journal: "《建筑与环境研究》", pdf: "/papers/05.pdf" },
} as const;

export default async function PaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const paper = papers[id as keyof typeof papers];
  if (!paper) notFound();
  return <PaperViewer paper={paper} />;
}
