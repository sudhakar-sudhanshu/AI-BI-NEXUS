from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

def create_pdf(text, filename="report.pdf"):
    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()

    content = []

    content.append(Paragraph("AI Generated Report", styles["Title"]))
    content.append(Paragraph(text, styles["BodyText"]))

    doc.build(content)

    return filename