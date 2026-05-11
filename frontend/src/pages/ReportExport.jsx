import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/store/useStore";
import ModuleRoadmap from "@/components/ModuleRoadmap";
import { Trash2, FileText, Download } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { COMMAND_KPIS } from "@/data/dashboardData";

const REPORT_TEMPLATES = [
  { id: "cio_snapshot", label: "CIO Executive Snapshot", source: "Command Center", target: "export-command-center" },
  { id: "maturity_assessment", label: "Maturity Assessment", source: "Maturity Engine", target: "export-maturity" },
  { id: "mttr_optimization", label: "MTTR Optimization", source: "Incident Module", target: "export-incidents" },
  { id: "roi_case", label: "AI ROI Financial Case", source: "ROI Calculator", target: "export-roi" },
  { id: "governance", label: "Governance Posture", source: "Governance Center", target: "export-governance" },
];

export default function ReportExport() {
  const reports = useStore((s) => s.reports);
  const removeReport = useStore((s) => s.removeReport);
  const addReport = useStore((s) => s.addReport);
  const org = useStore((s) => s.organization);
  const [title, setTitle] = useState("Quarterly Transformation Review");
  const [audience, setAudience] = useState("board");
  const [template, setTemplate] = useState(REPORT_TEMPLATES[0].id);

  const generateBriefingPdf = () => {
    const tmpl = REPORT_TEMPLATES.find((t) => t.id === template);
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const w = pdf.internal.pageSize.getWidth();
    const h = pdf.internal.pageSize.getHeight();
    // Cover
    pdf.setFillColor(10, 10, 14);
    pdf.rect(0, 0, w, h, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(36);
    pdf.text("AIOps Transformation OS", 36, 100);
    pdf.setFontSize(22);
    pdf.text(title, 36, 140);
    pdf.setFontSize(13);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Audience · ${audience.toUpperCase()}`, 36, 168);
    pdf.text(`Source · ${tmpl?.source}`, 36, 186);
    pdf.text(org.name + " · " + org.industry, 36, 204);
    pdf.setTextColor(160, 160, 170);
    pdf.text(`Generated · ${new Date().toLocaleString()}`, 36, h - 60);
    pdf.text("Confidential · For internal distribution", 36, h - 44);

    // Page 2 — Executive Summary
    pdf.addPage();
    pdf.setTextColor(20, 20, 20);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("Executive Summary", 36, 60);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    const summary = [
      `${org.name} is operating in the Predictive tier of AIOps maturity (72/100), up 9 points YoY.`,
      "Operational health remains strong (91%) with SLA compliance at 99.84% across tier-1 services.",
      "MTTR has reduced 64% year-over-year, driven by automation coverage expanding from 18% to 46%.",
      "Two-quarters of focused execution will unlock the Autonomous tier and an estimated $7.4M in annual savings.",
    ];
    let y = 90;
    summary.forEach((line) => {
      const lines = pdf.splitTextToSize(line, w - 72);
      lines.forEach((l) => {
        pdf.text("• " + l, 36, y);
        y += 16;
      });
      y += 4;
    });

    // Page 3 — KPIs
    pdf.addPage();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Key Performance Indicators", 36, 60);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    y = 90;
    COMMAND_KPIS.forEach((k) => {
      pdf.text(`${k.label}`, 36, y);
      pdf.text(`${k.value}${k.suffix || ""}`, 280, y);
      pdf.text(`${k.trend}`, 360, y);
      pdf.setTextColor(120, 120, 120);
      pdf.text(`${k.segment}`, 420, y);
      pdf.setTextColor(20, 20, 20);
      y += 18;
    });

    // Recommendation page
    pdf.addPage();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Recommendations", 36, 60);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    const recs = [
      "1. Close-loop remediation for top 6 incident patterns (estimated $2.1M annualized savings).",
      "2. Expand OpenTelemetry coverage to remaining tier-2 services (Q+1).",
      "3. Mature FinOps to chargeback model across all business units (Q+2).",
      "4. Stand up AI governance board + policy-as-code enforcement (Q+1).",
      "5. Pilot autonomous remediation in shadow-mode for 90 days before production cutover.",
    ];
    y = 90;
    recs.forEach((line) => {
      const lines = pdf.splitTextToSize(line, w - 72);
      lines.forEach((l) => {
        pdf.text(l, 36, y);
        y += 16;
      });
      y += 4;
    });

    pdf.save(`${title.replace(/\s+/g, "-").toLowerCase()}.pdf`);
    addReport({ title, subtitle: tmpl?.source, audience });
    toast.success("Briefing generated", { description: "PDF saved" });
  };

  return (
    <div data-testid="page-reports">
      <PageHeader
        overline="Executive Report Export"
        title="Consulting-grade transformation reports"
        subtitle="Generate boardroom-ready briefings, CIO snapshots, governance reports, and transformation summaries — fully offline."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard title="New Briefing" description="Compose & generate" className="lg:col-span-2" testId="card-briefing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="overline text-muted-foreground">Briefing title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" data-testid="report-title-input" />
            </div>
            <div>
              <Label className="overline text-muted-foreground">Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger className="mt-1.5" data-testid="report-audience-select"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="board">Board of directors</SelectItem>
                  <SelectItem value="cio">CIO leadership</SelectItem>
                  <SelectItem value="ops">Operations council</SelectItem>
                  <SelectItem value="audit">Audit / risk committee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label className="overline text-muted-foreground">Source template</Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger className="mt-1.5" data-testid="report-template-select"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {REPORT_TEMPLATES.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border border-primary/30 bg-primary/[0.04] p-4 mt-5">
            <p className="overline text-primary mb-1">Preview content</p>
            <ul className="text-xs text-foreground/80 space-y-1.5">
              <li>· Cover — {org.name} · {org.industry}</li>
              <li>· Executive Summary — maturity, MTTR, SLA, savings narrative</li>
              <li>· KPI Snapshot — all 8 enterprise KPIs</li>
              <li>· Recommendations — top 5 transformation levers</li>
            </ul>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <Button onClick={generateBriefingPdf} data-testid="generate-pdf-btn">
              <FileText className="h-4 w-4 mr-2" /> Generate boardroom PDF
              <Download className="h-4 w-4 ml-2 opacity-80" />
            </Button>
            <span className="text-xs text-muted-foreground">All processing is local · no data leaves the browser</span>
          </div>
        </SectionCard>

        <SectionCard title="Templates" description="Boardroom-ready outputs" testId="card-templates">
          <ul className="space-y-3">
            {REPORT_TEMPLATES.map((t) => (
              <li key={t.id} className="rounded-md border border-border p-3">
                <p className="font-heading text-sm">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.source}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Generated Reports" description="History · last 25" testId="card-history">
        {reports.length === 0 ? (
          <div className="text-center py-10 text-sm text-muted-foreground" data-testid="empty-reports">
            No reports yet. Generate your first briefing above.
          </div>
        ) : (
          <ul className="space-y-2">
            {reports.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-md border border-border p-3" data-testid={`report-${r.id}`}>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {new Date(r.createdAt).toLocaleString()} · {r.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge tone="ok">Saved locally</StatusBadge>
                  <Button variant="ghost" size="icon" onClick={() => removeReport(r.id)} data-testid={`delete-report-${r.id}`}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <ModuleRoadmap moduleId="reports" />
    </div>
  );
}
