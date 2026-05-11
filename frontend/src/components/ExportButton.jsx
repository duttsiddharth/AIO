import { Button } from "@/components/ui/button";
import { Download, FileText, Camera } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useStore } from "@/store/useStore";

export default function ExportButton({ targetId, title = "AIOps Report", subtitle }) {
  const addReport = useStore((s) => s.addReport);

  const handleExport = async () => {
    const node = document.getElementById(targetId);
    if (!node) {
      toast.error("Nothing to export — section not found");
      return;
    }
    toast.loading("Generating PDF…", { id: "export" });
    try {
      const canvas = await html2canvas(node, {
        backgroundColor: getComputedStyle(document.body).backgroundColor,
        scale: 2,
        logging: false,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 48;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Cover
      pdf.setFillColor(10, 10, 14);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(32);
      pdf.text("AIOps Transformation OS", 36, 90);
      pdf.setFontSize(18);
      pdf.text(title, 36, 130);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.text(subtitle || "Executive Snapshot", 36, 152);
      pdf.setTextColor(160, 160, 170);
      pdf.text(`Generated · ${new Date().toLocaleString()}`, 36, pageHeight - 60);
      pdf.text("Helios Global Operations · Confidential", 36, pageHeight - 44);

      pdf.addPage();
      let position = 30;
      if (imgHeight < pageHeight - 60) {
        pdf.addImage(imgData, "PNG", 24, position, imgWidth, imgHeight);
      } else {
        // multi-page
        const pageImgHeight = pageHeight - 60;
        let remainingHeight = imgHeight;
        let y = position;
        let canvasY = 0;
        while (remainingHeight > 0) {
          const sliceHeight = Math.min(pageImgHeight, remainingHeight);
          pdf.addImage(imgData, "PNG", 24, y - (canvasY * (imgHeight / canvas.height)), imgWidth, imgHeight);
          remainingHeight -= sliceHeight;
          canvasY += sliceHeight;
          if (remainingHeight > 0) {
            pdf.addPage();
            y = 30;
          }
        }
      }
      pdf.save(`${title.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.pdf`);

      addReport({
        title,
        subtitle: subtitle || "Executive Snapshot",
        targetId,
      });
      toast.success("PDF exported", { id: "export" });
    } catch (e) {
      toast.error("Export failed", { id: "export", description: e?.message });
    }
  };

  const handleScreenshot = async () => {
    const node = document.getElementById(targetId);
    if (!node) return toast.error("Nothing to screenshot");
    try {
      const canvas = await html2canvas(node, {
        backgroundColor: getComputedStyle(document.body).backgroundColor,
        scale: 2,
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.png`;
      a.click();
      toast.success("Screenshot saved");
    } catch (e) {
      toast.error("Screenshot failed", { description: e?.message });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleScreenshot} data-testid="export-screenshot-btn">
        <Camera className="h-3.5 w-3.5 mr-1.5" /> PNG
      </Button>
      <Button size="sm" onClick={handleExport} data-testid="export-pdf-btn">
        <FileText className="h-3.5 w-3.5 mr-1.5" /> Export PDF
        <Download className="h-3.5 w-3.5 ml-1.5 opacity-80" />
      </Button>
    </div>
  );
}
