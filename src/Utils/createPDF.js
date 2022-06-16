import { jsPDF } from "jspdf";
import wheat from "../Assets/Png/wheat.png";

export default function createPDF(
  indicators,
  standards,
  conclusion,
  dateString
) {
  const doc = new jsPDF();

  doc.addImage(wheat, "PNG", 75, 10, 12, 19.5);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("GQC", 92, 25);
  doc.addImage(wheat, "PNG", 122.5, 10, 12, 19.5);

  doc.setFontSize(42);
  doc.text("Report details", 58, 45);

  let marginTop = 70;

  doc.setFontSize(32);
  doc.text("Indicators", 20, marginTop);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  const dataSetKeys = Object.keys(indicators);
  dataSetKeys.forEach((key) => {
    marginTop += 10;
    doc.text(`${key}`, 30, marginTop);
    doc.text(`${indicators[key]}`, 200, marginTop, null, null, "right");

    if (marginTop >= 285) {
      marginTop = 10;
      doc.addPage("a4", "1");
    }
  });

  marginTop += 20;
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("Standard", 20, marginTop);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  const dataStandardKeys = Object.keys(standards);
  dataStandardKeys.forEach((key) => {
    marginTop += 10;
    doc.text(`${key}`, 30, marginTop);
    doc.text(`${standards[key]}`, 200, marginTop, null, null, "right");

    if (marginTop >= 285) {
      marginTop = 10;
      doc.addPage("a4", "1");
    }
  });

  marginTop += 20;
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("Conclusion", 20, marginTop);

  if (marginTop >= 285) {
    marginTop = 10;
    doc.addPage("a4", "1");
  }

  marginTop += 10;
  doc.setFontSize(18);
  doc.setFont("helvetica", "normal");
  doc.text(doc.splitTextToSize(conclusion, 165, null), 30, marginTop);

  if (marginTop >= 285) {
    marginTop = 10;
    doc.addPage("a4", "1");
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Report by", 20, 285);

  doc.text(`Report from ${dateString}`, 200, 285, null, null, "right");

  doc.save("Test.pdf");
}
