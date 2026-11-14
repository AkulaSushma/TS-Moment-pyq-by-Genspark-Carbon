#!/usr/bin/env python3
"""
Generates all 8 Publication-Grade PDF Books and 8 Editable DOCX Books (Volumes A–H)
directly from the single verified knowledge base JSON (/tmp/kb_dump.json).
Output directory: /home/user/webapp/public/exports/
"""

import json
import os
from xml.sax.saxutils import escape as xml_esc

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.graphics.shapes import Drawing, Rect, Line, Circle, String

import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

OUT_DIR = "/home/user/webapp/public/exports"
os.makedirs(OUT_DIR, exist_ok=True)

with open("/tmp/kb_dump.json", "r", encoding="utf-8") as f:
    KB = json.load(f)

DAYS = KB["curriculumDays"]
PEOPLE = KB["personalities"]
COMMITTEES = KB["committees"]
CHAINS = KB["relationshipChains"]
TRAPS = KB["whoIsWhoTraps"]
CONFUSIONS = KB["confusionPairs"]
QUESTIONS = KB["questions"]
PYQ_META = KB["pyqAnalytics"]
SYLLABUS = KB["syllabusIntelligence"]
SOURCES = KB["sourcesLibrary"]
DISCREPANCIES = KB["historicalDiscrepancies"]
MAPS = KB["historicalMaps"]
CATALOG = KB["exportsCatalog"]

# ---------------- REPORTLAB PDF HELPERS ----------------
OCHRE = colors.HexColor("#7c2d12")
INK = colors.HexColor("#1c1917")
SLATE = colors.HexColor("#44403c")
CREAM = colors.HexColor("#fef3c7")
LIGHT_BG = colors.HexColor("#faf7f0")
EMERALD = colors.HexColor("#065f46")
CRIMSON = colors.HexColor("#9f1239")
INDIGO = colors.HexColor("#1e3a8a")

base_styles = getSampleStyleSheet()
STYLES = {
    "CoverSuper": ParagraphStyle("CoverSuper", parent=base_styles["Normal"], fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=OCHRE, spaceAfter=6),
    "CoverTitle": ParagraphStyle("CoverTitle", parent=base_styles["Title"], fontName="Times-Bold", fontSize=24, leading=30, textColor=INK, alignment=0, spaceAfter=10),
    "CoverSub": ParagraphStyle("CoverSub", parent=base_styles["Normal"], fontName="Helvetica", fontSize=11.5, leading=17, textColor=SLATE, spaceAfter=14),
    "H1": ParagraphStyle("H1", parent=base_styles["Heading1"], fontName="Times-Bold", fontSize=16, leading=21, textColor=OCHRE, spaceBefore=12, spaceAfter=6),
    "H2": ParagraphStyle("H2", parent=base_styles["Heading2"], fontName="Helvetica-Bold", fontSize=12, leading=16, textColor=INDIGO, spaceBefore=9, spaceAfter=4),
    "H3": ParagraphStyle("H3", parent=base_styles["Heading3"], fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=INK, spaceBefore=6, spaceAfter=3),
    "Body": ParagraphStyle("Body", parent=base_styles["Normal"], fontName="Helvetica", fontSize=9.5, leading=14, textColor=INK, spaceAfter=5),
    "Small": ParagraphStyle("Small", parent=base_styles["Normal"], fontName="Helvetica", fontSize=8.5, leading=12, textColor=SLATE, spaceAfter=3),
    "Callout": ParagraphStyle("Callout", parent=base_styles["Normal"], fontName="Helvetica-Bold", fontSize=9.2, leading=13.5, textColor=OCHRE, backColor=CREAM, borderPadding=6, spaceBefore=4, spaceAfter=6),
    "Cell": ParagraphStyle("Cell", parent=base_styles["Normal"], fontName="Helvetica", fontSize=8.3, leading=11.5, textColor=INK),
    "CellBold": ParagraphStyle("CellBold", parent=base_styles["Normal"], fontName="Helvetica-Bold", fontSize=8.3, leading=11.5, textColor=INK),
    "CellHeader": ParagraphStyle("CellHeader", parent=base_styles["Normal"], fontName="Helvetica-Bold", fontSize=8.5, leading=11.5, textColor=colors.white),
}

def P(txt, style="Body"):
    s = str(txt or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\n", "<br/>")
    return Paragraph(s, STYLES[style])

def make_timeline_drawing():
    d = Drawing(480, 68)
    d.add(Rect(0, 0, 480, 68, fillColor=colors.HexColor("#fffbeb"), strokeColor=OCHRE, strokeWidth=1))
    d.add(Line(24, 34, 456, 34, strokeColor=OCHRE, strokeWidth=2))
    milestones = [
        (30, "1919", "Mulki"),
        (90, "1948", "Op Polo"),
        (150, "1952", "City Coll"),
        (210, "1956", "Gentlemen"),
        (270, "1969", "Agitation"),
        (330, "1973/75", "371-D/PO"),
        (390, "2001", "TRS"),
        (450, "2 Jun 14", "29th State"),
    ]
    for x, yr, lbl in milestones:
        d.add(Circle(x, 34, 4.5, fillColor=OCHRE, strokeColor=colors.white, strokeWidth=1))
        d.add(String(x, 47, yr, fontName="Helvetica-Bold", fontSize=7.5, fillColor=OCHRE, textAnchor="middle"))
        d.add(String(x, 16, lbl, fontName="Helvetica", fontSize=7, fillColor=INK, textAnchor="middle"))
    return d

def build_pdf(filepath, doc_meta, toc_items, story_elements):
    def header_footer(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica-Bold", 7.5)
        canvas.setFillColor(SLATE)
        canvas.drawString(18 * mm, A4[1] - 11 * mm, f"TELANGANA MOVEMENT LEARNING INTELLIGENCE SYSTEM (1948-2014)  |  {doc_meta['title']}")
        canvas.setStrokeColor(colors.HexColor("#d6d3d1"))
        canvas.line(18 * mm, A4[1] - 13 * mm, A4[0] - 18 * mm, A4[1] - 13 * mm)
        canvas.line(18 * mm, 14 * mm, A4[0] - 18 * mm, 14 * mm)
        canvas.setFont("Helvetica", 7.5)
        canvas.drawString(18 * mm, 9.5 * mm, "Verified against Official 2026 TGPRB SI (Rc 225) & PC (Rc 189) Notifications, MHA CCSAP Report & India Code Act 6 of 2014")
        canvas.drawRightString(A4[0] - 18 * mm, 9.5 * mm, f"Page {doc.page}")
        canvas.restoreState()

    pdf = SimpleDocTemplate(
        filepath,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title=doc_meta["title"],
        author="Telangana Movement Learning Intelligence System",
    )

    full = []
    # Title Page
    full.append(Spacer(1, 14 * mm))
    full.append(P("TELANGANA MOVEMENT & STATE FORMATION (1948–2014) • VERIFIED PUBLICATION SERIES", "CoverSuper"))
    full.append(P(doc_meta["title"], "CoverTitle"))
    full.append(P(doc_meta["subtitle"], "CoverSub"))
    full.append(HRFlowable(width="100%", thickness=2, color=OCHRE, spaceBefore=4, spaceAfter=10))
    full.append(make_timeline_drawing())
    full.append(Spacer(1, 8 * mm))

    meta_rows = [
        [P("Primary Target Examinations", "CellBold"), P("Telangana Police SCT Sub-Inspector (SI — Rc No. 225/2026) & SCT Police Constable (PC — Rc No. 189/2026)", "Cell")],
        [P("SI Official Syllabus Wording", "CellBold"), P(SYLLABUS["exams"]["SI"]["fwePattern"]["verbatimSyllabus"], "Cell")],
        [P("PC Official Syllabus Wording", "CellBold"), P(SYLLABUS["exams"]["PC"]["fwePattern"]["verbatimSyllabus"], "Cell")],
        [P("Knowledge Verification Audit", "CellBold"), P(f"9 Official TSLPRB Papers (2016–2023) | {len(SOURCES)} Primary/Academic Sources | Verified 2026-11-14", "Cell")],
        [P("Learning Methodology", "CellBold"), P("UNDERSTAND -> CONNECT -> VISUALIZE -> RECALL -> PRACTISE -> REVISE -> MASTER", "Cell")],
    ]
    t = Table(meta_rows, colWidths=[48 * mm, 126 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), CREAM),
        ("BACKGROUND", (1, 0), (1, -1), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#d6d3d1")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("PADDING", (0, 0), (-1, -1), 5),
    ]))
    full.append(t)
    full.append(Spacer(1, 8 * mm))
    full.append(P("TABLE OF CONTENTS", "H2"))
    for idx, item in enumerate(toc_items, 1):
        full.append(P(f"{idx}. {item}", "Body"))
    full.append(PageBreak())
    full.extend(story_elements)
    pdf.build(full, onFirstPage=header_footer, onLaterPages=header_footer)

# ---------------- PYTHON-DOCX HELPERS ----------------
def create_docx_shell(doc_meta, toc_items):
    d = docx.Document()
    for s in d.sections:
        s.top_margin = Inches(0.75)
        s.bottom_margin = Inches(0.75)
        s.left_margin = Inches(0.75)
        s.right_margin = Inches(0.75)
        hdr = s.header.paragraphs[0]
        hdr.text = f"Telangana Movement (1948–2014) | {doc_meta['title']}"
        hdr.style.font.size = Pt(8.5)
        ftr = s.footer.paragraphs[0]
        ftr.text = "Verified Single-Source Knowledge Base • TGPRB 2026 SI & Constable Examination Series"
        ftr.style.font.size = Pt(8.5)

    p0 = d.add_paragraph()
    r0 = p0.add_run("TELANGANA MOVEMENT LEARNING INTELLIGENCE SYSTEM (1948–2014)")
    r0.bold = True
    r0.font.size = Pt(10)
    r0.font.color.rgb = RGBColor(124, 45, 18)

    h = d.add_heading(doc_meta["title"], level=0)
    for r in h.runs:
        r.font.color.rgb = RGBColor(28, 25, 23)

    sub = d.add_paragraph(doc_meta["subtitle"])
    sub.runs[0].italic = True

    tbl = d.add_table(rows=4, cols=2)
    tbl.style = "Table Grid"
    meta_pairs = [
        ("Target Examinations", "TGPRB SCT Sub-Inspector (Rc 225/2026) & Police Constable (Rc 189/2026)"),
        ("SI Official Syllabus", SYLLABUS["exams"]["SI"]["fwePattern"]["verbatimSyllabus"]),
        ("PC Official Syllabus", SYLLABUS["exams"]["PC"]["fwePattern"]["verbatimSyllabus"]),
        ("Verification Date", "2026-11-14 (Single Central Verified Knowledge Base)"),
    ]
    for i, (k, v) in enumerate(meta_pairs):
        tbl.rows[i].cells[0].text = k
        tbl.rows[i].cells[1].text = v

    d.add_heading("Table of Contents", level=1)
    for i, item in enumerate(toc_items, 1):
        d.add_paragraph(f"{i}. {item}")
    d.add_page_break()
    return d

def add_styled_table_pdf(headers, rows, col_widths):
    data = [[P(h, "CellHeader") for h in headers]]
    for r in rows:
        data.append([P(c, "Cell") for c in r])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), OCHRE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT_BG]),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#c7b9a5")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("PADDING", (0, 0), (-1, -1), 4.5),
    ]))
    return t

def add_styled_table_docx(d, headers, rows):
    tbl = d.add_table(rows=1 + len(rows), cols=len(headers))
    tbl.style = "Table Grid"
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    for j, h in enumerate(headers):
        cell = tbl.rows[0].cells[j]
        cell.text = str(h)
        if cell.paragraphs and cell.paragraphs[0].runs:
            cell.paragraphs[0].runs[0].bold = True
    for i, r in enumerate(rows, 1):
        for j, val in enumerate(r):
            tbl.rows[i].cells[j].text = str(val)
    d.add_paragraph()

# ==============================================================================
# GENERATE ALL 8 VOLUMES (A TO H) IN BOTH PDF AND EDITABLE DOCX
# ==============================================================================

# --- VOLUME A: COMPLETE MASTER NOTES ---
meta_a = CATALOG[0]
toc_a = [f"Day {d['dayNumber']}: {d['title']} ({d['yearSpan']})" for d in DAYS] + ["Global Primary & Academic Source Registry"]
story_a = []
doc_a = create_docx_shell(meta_a, toc_a)

for d in DAYS:
    story_a.append(P(f"DAY {d['dayNumber']} ({d['yearSpan']}): {d['title']}", "H1"))
    story_a.append(P(f"SI Relevance: {d['siSyllabusMapping']}  |  PC Relevance: {d['pcSyllabusMapping']}", "Small"))
    story_a.append(P(f"A. Big Picture: {d['bigPicture']}", "Callout"))
    story_a.append(P(f"B. Historical Background: {d['historicalBackground']}", "Body"))
    w = d["whyItHappened"]
    story_a.append(P("C. Multi-Dimensional Causes:", "H2"))
    story_a.append(add_styled_table_pdf(
        ["Political", "Economic", "Administrative/Legal", "Social & Cultural"],
        [[w["political"], w["economic"], w["administrative"], w["socialCultural"]]],
        [43.5 * mm] * 4
    ))
    story_a.append(Spacer(1, 3 * mm))
    story_a.append(P("D. Verified Chronological Sequence:", "H2"))
    c_rows = [[ev["date"], ev["eventTitle"], ev["place"], ev["detail"]] for ev in d["chronologicalNarrative"]]
    story_a.append(add_styled_table_pdf(["Date", "Milestone", "Place", "Historical Explanation"], c_rows, [28 * mm, 38 * mm, 26 * mm, 82 * mm]))
    ce = d["causeEffect"]
    story_a.append(P(f"G. Causal Chain: BACKGROUND ({ce['background']}) -> PROBLEM ({ce['problem']}) -> DEMAND ({ce['demand']}) -> ACTION ({ce['action']}) -> RESPONSE ({ce['response']}) -> RESULT ({ce['result']}) -> NEXT ({ce['nextDevelopment']})", "Body"))
    story_a.append(P(f"K. Memory Lock: {d['memoryLocks']['mnemonic']} | \"{d['memoryLocks']['shortSentence']}\"", "Callout"))
    story_a.append(PageBreak())

    # DOCX mirror
    doc_a.add_heading(f"Day {d['dayNumber']} ({d['yearSpan']}): {d['title']}", level=1)
    doc_a.add_paragraph(f"SI Mapping: {d['siSyllabusMapping']}\nPC Mapping: {d['pcSyllabusMapping']}")
    doc_a.add_heading("A. Big Picture", level=2)
    doc_a.add_paragraph(d["bigPicture"])
    doc_a.add_heading("B. Historical Background", level=2)
    doc_a.add_paragraph(d["historicalBackground"])
    doc_a.add_heading("C. Why Did It Happen?", level=2)
    add_styled_table_docx(doc_a, ["Political", "Economic", "Administrative", "Social/Cultural"], [[w["political"], w["economic"], w["administrative"], w["socialCultural"]]])
    doc_a.add_heading("D. Chronological Developments", level=2)
    add_styled_table_docx(doc_a, ["Date", "Milestone", "Place", "Explanation"], c_rows)
    doc_a.add_heading("G. Causal Chain & Memory Lock", level=2)
    doc_a.add_paragraph(f"Mnemonic: {d['memoryLocks']['mnemonic']}\nSummary: {d['memoryLocks']['shortSentence']}")
    doc_a.add_page_break()

story_a.append(P("GLOBAL VERIFIED SOURCE REGISTRY", "H1"))
s_rows = [[s["id"], s["levelLabel"], s["title"], s["issueDate"], s["url"]] for s in SOURCES]
story_a.append(add_styled_table_pdf(["ID", "Tier", "Document Title", "Date", "URL"], s_rows, [16 * mm, 32 * mm, 64 * mm, 20 * mm, 42 * mm]))
doc_a.add_heading("Global Verified Source Registry", level=1)
add_styled_table_docx(doc_a, ["ID", "Tier", "Document Title", "Date", "URL"], s_rows)

build_pdf(f"{OUT_DIR}/{meta_a['slug']}.pdf", meta_a, toc_a, story_a)
doc_a.save(f"{OUT_DIR}/{meta_a['slug']}.docx")

# --- VOLUME B: TEN-DAY INTELLIGENT STUDY GUIDE ---
meta_b = CATALOG[1]
toc_b = ["Adaptive Spaced-Repetition Architecture & 90% Target Calibration", "Day-by-Day 10-Day Execution Plan & Active Recall Checkpoints"]
story_b = []
doc_b = create_docx_shell(meta_b, toc_b)

story_b.append(P("1. ADAPTIVE SPACED-REPETITION & 90% TARGET CALIBRATION", "H1"))
story_b.append(P("To reach >= 90% accuracy within 10 days without confusion, passive reading is forbidden. Every day follows a strict 150-minute cognitive cycle: 50m Concept & Causal Chain -> 25m Person/Committee Graph -> 25m Active Recall (before seeing answers) -> 30m Verified PYQ & Model Drill with Confidence Calibration -> 20m Previous-Days Spaced Retrieval (Intervals: Same Day, +1d, +3d, +7d, Day-10 Final).", "Body"))
doc_b.add_heading("1. Adaptive Spaced-Repetition & 90% Target Calibration", level=1)
doc_b.add_paragraph("Daily 150-minute cognitive block: 50m Causal Concept -> 25m Identity/Committee Graph -> 25m Active Recall -> 30m Calibrated PYQ Drill -> 20m Spaced Review (+1d, +3d, +7d, Day-10).")

sched_rows = []
for d in DAYS:
    sched_rows.append([f"Day {d['dayNumber']}", d["yearSpan"], d["title"], "; ".join(d["learningObjectives"]), d["revisionAssignment"]])
story_b.append(P("2. MASTER 10-DAY SCHEDULE OVERVIEW", "H1"))
story_b.append(add_styled_table_pdf(["Day", "Era", "Core Focus", "Learning Objectives", "End-of-Day Assignment"], sched_rows, [14 * mm, 24 * mm, 40 * mm, 60 * mm, 36 * mm]))
doc_b.add_heading("2. Master 10-Day Schedule Overview", level=1)
add_styled_table_docx(doc_b, ["Day", "Era", "Core Focus", "Learning Objectives", "Assignment"], sched_rows)

story_b.append(P("3. DAILY ACTIVE RECALL CHECKPOINTS (TEST BEFORE PEEKING!)", "H1"))
doc_b.add_heading("3. Daily Active Recall Checkpoints", level=1)
ar_rows = []
for d in DAYS:
    for ar in d["activeRecall"]:
        ar_rows.append([f"Day {d['dayNumber']}", ar["prompt"], ar["hint"], ar["answer"]])
story_b.append(add_styled_table_pdf(["Day", "Active Recall Question", "Cue/Hint", "Verified Answer"], ar_rows, [14 * mm, 64 * mm, 32 * mm, 64 * mm]))
add_styled_table_docx(doc_b, ["Day", "Active Recall Question", "Hint", "Verified Answer"], ar_rows)

build_pdf(f"{OUT_DIR}/{meta_b['slug']}.pdf", meta_b, toc_b, story_b)
doc_b.save(f"{OUT_DIR}/{meta_b['slug']}.docx")

# --- VOLUME C: HIGH-PRIORITY EXAM & PYQ INTELLIGENCE NOTES ---
meta_c = CATALOG[2]
toc_c = ["2026 Official SI vs Constable Notification Audit", "9 Actual TSLPRB Papers Analyzed & Date Cutoff Compliance", "Class A & B Repetition Clusters", "Source Discrepancy Resolution Log"]
story_c = []
doc_c = create_docx_shell(meta_c, toc_c)

story_c.append(P("1. OFFICIAL 2026 TGPRB SI vs CONSTABLE NOTIFICATION MAPPING", "H1"))
story_c.append(P(SYLLABUS["importantDateRestrictionNote"], "Callout"))
story_c.append(P(SYLLABUS["unresolvedAbbreviationNote"], "Body"))
story_c.append(P(SYLLABUS["exams"]["PC"]["distinctionWarning"], "Body"))
doc_c.add_heading("1. Official 2026 TGPRB SI vs Constable Notification Mapping", level=1)
doc_c.add_paragraph(SYLLABUS["importantDateRestrictionNote"])
doc_c.add_paragraph(SYLLABUS["unresolvedAbbreviationNote"])
doc_c.add_paragraph(SYLLABUS["exams"]["PC"]["distinctionWarning"])

p_rows = [[p["code"], p["title"], p["dateHeld"], p["status"]] for p in PYQ_META["papersList"]]
story_c.append(P("2. ACTUAL OFFICIAL TSLPRB PAPERS ANALYZED (9 PAPERS)", "H1"))
story_c.append(add_styled_table_pdf(["Code", "Examination Title", "Date Conducted", "Verification Status"], p_rows, [28 * mm, 76 * mm, 30 * mm, 40 * mm]))
doc_c.add_heading("2. Actual Official TSLPRB Papers Analyzed (9 Papers)", level=1)
add_styled_table_docx(doc_c, ["Code", "Examination Title", "Date Conducted", "Verification Status"], p_rows)

f_rows = [[ef["cluster"], ef["classification"], ef["evidence"]] for ef in PYQ_META["evidenceFindings"]]
story_c.append(P("3. EVIDENCE-BASED REPETITION CLUSTERS (CLASS A & CLASS B)", "H1"))
story_c.append(add_styled_table_pdf(["Repeated Topic Cluster", "Classification", "Empirical PYQ Evidence"], f_rows, [52 * mm, 40 * mm, 82 * mm]))
doc_c.add_heading("3. Evidence-Based Repetition Clusters", level=1)
add_styled_table_docx(doc_c, ["Repeated Topic Cluster", "Classification", "Empirical PYQ Evidence"], f_rows)

d_rows = [[x["id"], x["topic"], x["bestSupportedConclusion"], x["examGuidance"]] for x in DISCREPANCIES]
story_c.append(P("4. HISTORICAL SOURCE DISCREPANCY AUDIT", "H1"))
story_c.append(add_styled_table_pdf(["ID", "Disputed Point", "Verified Primary Conclusion", "MCQ Rule"], d_rows, [18 * mm, 38 * mm, 64 * mm, 54 * mm]))
doc_c.add_heading("4. Historical Source Discrepancy Audit", level=1)
add_styled_table_docx(doc_c, ["ID", "Disputed Point", "Verified Primary Conclusion", "MCQ Rule"], d_rows)

build_pdf(f"{OUT_DIR}/{meta_c['slug']}.pdf", meta_c, toc_c, story_c)
doc_c.save(f"{OUT_DIR}/{meta_c['slug']}.docx")

# --- VOLUME D: PERSON & COMMITTEE RELATIONSHIP ATLAS ---
meta_d = CATALOG[3]
toc_d = ["16 Structured 15-Point Personality Identity Cards", "13 Major Committees, Commissions, Formulas & G.O.s", "Who Is Who? — Never Confuse These Personalities Again", "Person -> Committee -> Outcome Relationship Chains"]
story_d = []
doc_d = create_docx_shell(meta_d, toc_d)

story_d.append(P("1. STRUCTURED 15-POINT PERSONALITY IDENTITY CARDS", "H1"))
doc_d.add_heading("1. Structured 15-Point Personality Identity Cards", level=1)
for p in PEOPLE:
    story_d.append(P(f"{p['fullName']} ({p['preferredName']}) — {p['phase']} / Day {p['dayNumber']}", "H2"))
    rows_p = [
        ["Period & Background", f"{p['period']} | {p['background']}"],
        ["Main Role & Posts", f"{p['mainRole']} | Posts: {', '.join(p['govtOrOrgPosts'])}"],
        ["Committees & Exact Role", f"{', '.join(p['committees'])} — {p['roleInCommittee']} | Other: {', '.join(p['otherAssociations'])}"],
        ["Events & Places", f"Events: {'; '.join(p['majorEvents'])} | Places: {', '.join(p['places'])}"],
        ["Contribution & Exam Clue", f"{p['contribution']} | MCQ CLUE: {p['examClue']}"],
        ["Confused With & Cue", f"CONFUSED WITH: {' / '.join(p['commonlyConfusedWith'])} | VISUAL CUE: {p['visualMemoryCue']}"],
    ]
    story_d.append(add_styled_table_pdf(["Attribute", "Verified Details"], rows_p, [42 * mm, 132 * mm]))
    story_d.append(Spacer(1, 2.5 * mm))
    doc_d.add_heading(f"{p['fullName']} ({p['preferredName']})", level=2)
    add_styled_table_docx(doc_d, ["Attribute", "Verified Details"], rows_p)

story_d.append(PageBreak())
story_d.append(P("2. COMMITTEE, COMMISSION, FORMULA & G.O. ATLAS", "H1"))
doc_d.add_heading("2. Committee, Commission, Formula & G.O. Atlas", level=1)
c_atlas_rows = [
    [c["name"], c["chairman"], f"Appt: {c['appointmentDate']}\nSub: {c['submissionDate']}", c["mandate"], "; ".join(c["recommendations"][:3]), c["aftermath"]]
    for c in COMMITTEES
]
story_d.append(add_styled_table_pdf(["Committee/Mechanism", "Chair/Authority", "Dates", "Mandate", "Key Findings/Clauses", "Aftermath"], c_atlas_rows, [30 * mm, 26 * mm, 24 * mm, 30 * mm, 34 * mm, 30 * mm]))
add_styled_table_docx(doc_d, ["Committee/Mechanism", "Chair", "Dates", "Mandate", "Key Findings", "Aftermath"], c_atlas_rows)

story_d.append(P("3. WHO IS WHO? — NEVER CONFUSE THESE PERSONALITIES AGAIN", "H1"))
doc_d.add_heading("3. Who Is Who? — Never Confuse These Personalities Again", level=1)
for tr in TRAPS:
    story_d.append(P(f"{tr['groupTitle']} — {tr['trapSummary']}", "H3"))
    tr_rows = [[m["name"], m["year"], m["role"]] for m in tr["members"]]
    story_d.append(add_styled_table_pdf(["Name", "Year", "Distinct Historical Role"], tr_rows, [48 * mm, 24 * mm, 102 * mm]))
    doc_d.add_heading(tr["groupTitle"], level=2)
    add_styled_table_docx(doc_d, ["Name", "Year", "Distinct Historical Role"], tr_rows)

ch_rows = [[ch["person"], ch["committee"], ch["position"], ch["year"], ch["place"], ch["outcome"]] for ch in CHAINS]
story_d.append(P("4. CLICKABLE RELATIONSHIP GRAPH TABLE", "H1"))
story_d.append(add_styled_table_pdf(["Person", "Committee/Pact", "Role", "Year", "Place", "Outcome"], ch_rows, [30 * mm, 32 * mm, 24 * mm, 20 * mm, 24 * mm, 44 * mm]))
doc_d.add_heading("4. Master Person-Committee-Outcome Chains", level=1)
add_styled_table_docx(doc_d, ["Person", "Committee", "Role", "Year", "Place", "Outcome"], ch_rows)

build_pdf(f"{OUT_DIR}/{meta_d['slug']}.pdf", meta_d, toc_d, story_d)
doc_d.save(f"{OUT_DIR}/{meta_d['slug']}.docx")

# --- VOLUME E: CHRONOLOGY REVISION BOOK (1948-2014) ---
meta_e = CATALOG[4]
toc_e = ["Pre-1948 Roots vs Official 3-Phase Chronology", "Unbroken Chronological Ledger (1948 – 2 June 2014)", "Historical Boundary Evolution (1948 vs 1956 vs 2014)"]
story_e = [P("UNBROKEN MASTER TIMELINE LEDGER (1948 – 2 JUNE 2014)", "H1"), make_timeline_drawing(), Spacer(1, 4 * mm)]
doc_e = create_docx_shell(meta_e, toc_e)
doc_e.add_heading("Unbroken Master Timeline Ledger (1948 – 2 June 2014)", level=1)

tl_rows = []
for d in DAYS:
    for ev in d["chronologicalNarrative"]:
        phase_tag = "PRE-1948 ROOT" if ev.get("isPre1948Background") else d["phase"]
        tl_rows.append([ev["date"], phase_tag, ev["eventTitle"], ev["place"], ev["detail"]])

story_e.append(add_styled_table_pdf(["Exact Date", "Phase", "Historical Event", "Location", "Significance & Outcome"], tl_rows, [26 * mm, 22 * mm, 36 * mm, 24 * mm, 66 * mm]))
add_styled_table_docx(doc_e, ["Exact Date", "Phase", "Historical Event", "Location", "Significance & Outcome"], tl_rows)

story_e.append(P("HISTORICAL GEOGRAPHY & BOUNDARY EVOLUTION", "H1"))
doc_e.add_heading("Historical Geography & Boundary Evolution", level=1)
for mp in MAPS:
    story_e.append(P(f"{mp['era']}: {mp['title']} ({mp['boundaryWarning']})", "H2"))
    m_rows = [[r["name"], ", ".join(r["districts"]), r["fate1956"]] for r in mp["regions"]]
    story_e.append(add_styled_table_pdf(["Sub-Region / Zone", "Districts", "Constitutional Outcome"], m_rows, [45 * mm, 75 * mm, 54 * mm]))
    doc_e.add_heading(f"{mp['era']}: {mp['title']}", level=2)
    add_styled_table_docx(doc_e, ["Sub-Region / Zone", "Districts", "Constitutional Outcome"], m_rows)

build_pdf(f"{OUT_DIR}/{meta_e['slug']}.pdf", meta_e, toc_e, story_e)
doc_e.save(f"{OUT_DIR}/{meta_e['slug']}.docx")

# --- VOLUME F: RAPID REVISION & CONFUSION-ELIMINATOR SHEETS ---
meta_f = CATALOG[5]
toc_f = ["60-Second Rapid Revision Sheets (Days 1–10)", "All 12 Side-by-Side Confusion-Eliminator Matrices"]
story_f = [P("PART 1: 60-SECOND RAPID REVISION SHEETS (ALL 10 DAYS)", "H1")]
doc_f = create_docx_shell(meta_f, toc_f)
doc_f.add_heading("Part 1: 60-Second Rapid Revision Sheets (All 10 Days)", level=1)

for d in DAYS:
    story_f.append(P(f"Day {d['dayNumber']}: {d['title']} ({d['yearSpan']})", "H2"))
    for bullet in d["oneMinuteRevision"]:
        story_f.append(P(f"• {bullet}", "Body"))
    story_f.append(P(f"Memory Lock: {d['memoryLocks']['mnemonic']}", "Callout"))
    doc_f.add_heading(f"Day {d['dayNumber']}: {d['title']}", level=2)
    for bullet in d["oneMinuteRevision"]:
        doc_f.add_paragraph(f"• {bullet}")
    doc_f.add_paragraph(f"Memory Lock: {d['memoryLocks']['mnemonic']}")

story_f.append(PageBreak())
story_f.append(P("PART 2: ALL 12 SIDE-BY-SIDE CONFUSION-ELIMINATOR MATRICES", "H1"))
doc_f.add_heading("Part 2: All 12 Side-by-Side Confusion-Eliminator Matrices", level=1)

for cp in CONFUSIONS:
    story_f.append(P(f"{cp['id']}: {cp['title']}", "H2"))
    story_f.append(P(f"Trap Alert: {cp['trapAlert']}", "Small"))
    headers = ["DIMENSION"] + cp["entities"]
    rows = [[r["dimension"]] + r["values"] for r in cp["matrix"]]
    ncols = len(headers)
    w_first = 30 * mm
    w_rest = (174 * mm - w_first) / (ncols - 1)
    story_f.append(add_styled_table_pdf(headers, rows, [w_first] + [w_rest] * (ncols - 1)))
    story_f.append(P(f"Mnemonic Lock: {cp['mnemonicLock']}", "Callout"))
    doc_f.add_heading(f"{cp['id']}: {cp['title']}", level=2)
    add_styled_table_docx(doc_f, headers, rows)

build_pdf(f"{OUT_DIR}/{meta_f['slug']}.pdf", meta_f, toc_f, story_f)
doc_f.save(f"{OUT_DIR}/{meta_f['slug']}.docx")

# --- VOLUME G: VERIFIED PYQ & PRACTICE QUESTION BANK ---
meta_g = CATALOG[6]
toc_g = ["Section 1: Verified Official TSLPRB Previous Year Questions (2016–2023)", "Section 2: Clearly Labelled Adapted & Analytical Model Practice Questions"]
story_g = []
doc_g = create_docx_shell(meta_g, toc_g)

pyq_only = [q for q in QUESTIONS if q["origin"] == "VERIFIED_PYQ"]
mod_only = [q for q in QUESTIONS if q["origin"] != "VERIFIED_PYQ"]

def append_question_block(q_list, heading_title, story_list, word_doc):
    story_list.append(P(heading_title, "H1"))
    word_doc.add_heading(heading_title, level=1)
    for idx, q in enumerate(q_list, 1):
        hdr = f"Q{idx}. [{q['officialQuestionCode']} | {q['examName']} ({q['examYear']}) | {q['format']}]"
        story_list.append(P(hdr, "H3"))
        story_list.append(P(q["stem"], "Body"))
        for oi, opt in enumerate(q["options"], 1):
            story_list.append(P(f"   ({oi}) {opt}", "Body"))
        ans_num = q["correctIndex"] + 1
        story_list.append(P(f"Correct Answer: ({ans_num}) {q['options'][q['correctIndex']]}  |  Explanation: {q['explanation']}", "Callout"))
        why_txt = " | ".join([f"Opt {i+1}: {w}" for i, w in enumerate(q["whyOthersWrong"])])
        story_list.append(P(f"Option Audit: {why_txt}  [Source: {q['questionSource']}; Key: {q['keySource']}]", "Small"))

        word_doc.add_heading(hdr, level=3)
        word_doc.add_paragraph(q["stem"])
        for oi, opt in enumerate(q["options"], 1):
            word_doc.add_paragraph(f"({oi}) {opt}")
        word_doc.add_paragraph(f"Answer: ({ans_num}) — {q['explanation']}")
        word_doc.add_paragraph(f"Distractor Audit: {why_txt}")

append_question_block(pyq_only, f"SECTION 1: VERIFIED TSLPRB PREVIOUS YEAR QUESTIONS ({len(pyq_only)} PYQs)", story_g, doc_g)
story_g.append(PageBreak())
doc_g.add_page_break()
append_question_block(mod_only, f"SECTION 2: ADAPTED & ANALYTICAL MODEL QUESTIONS — CLEARLY LABELLED NON-PYQ ({len(mod_only)} Qs)", story_g, doc_g)

build_pdf(f"{OUT_DIR}/{meta_g['slug']}.pdf", meta_g, toc_g, story_g)
doc_g.save(f"{OUT_DIR}/{meta_g['slug']}.docx")

# --- VOLUME H: FINAL MOCK TESTS (SEPARATE SI & CONSTABLE SETS) ---
meta_h = CATALOG[7]
toc_h = [
    "Mock Test 1: TGPRB 2026 SCT Sub-Inspector (SI) Subject Mock (Explicit 3-Phase Syllabus, 20% PWT / 25% FWE Negative Marking)",
    "Mock Test 2: TGPRB 2026 SCT Police Constable (PC) Subject Mock ('Contents Pertaining to Telangana', 20% PWT Negative Marking)",
    "Complete OMR Answer Keys & Scoring Sheets"
]
story_h = []
doc_h = create_docx_shell(meta_h, toc_h)

si_mock = [q for q in QUESTIONS if q["examSuitability"] != "PC_ONLY"][:25]
pc_mock = [q for q in QUESTIONS if q["examSuitability"] != "SI_ONLY"][:25]

def render_mock_paper(title_str, instructions_str, q_set, story_list, word_doc):
    story_list.append(P(title_str, "H1"))
    story_list.append(P(instructions_str, "Callout"))
    word_doc.add_heading(title_str, level=1)
    word_doc.add_paragraph(instructions_str)
    for idx, q in enumerate(q_set, 1):
        story_list.append(P(f"{idx}. {q['stem']}", "Body"))
        opts_line = "    ".join([f"({i+1}) {o}" for i, o in enumerate(q["options"])])
        story_list.append(P(opts_line, "Small"))
        story_list.append(Spacer(1, 1.5 * mm))
        word_doc.add_paragraph(f"{idx}. {q['stem']}\n" + "\n".join([f"   ({i+1}) {o}" for i, o in enumerate(q["options"])]))

render_mock_paper(
    "MOCK TEST 1: SCT SUB-INSPECTOR (SI) — 2026 SYLLABUS ALIGNED (25 QUESTIONS)",
    "Official Alignment: Rc No. 225/2026 (Phases I, II & III: 1948–2014). Time: 25 Mins | Full Marks: 25 | Negative Marking: -0.20 (PWT) or -0.25 (FWE) per wrong bubble.",
    si_mock, story_h, doc_h
)
story_h.append(PageBreak())
doc_h.add_page_break()

render_mock_paper(
    "MOCK TEST 2: SCT POLICE CONSTABLE (PC) — 2026 SYLLABUS ALIGNED (25 QUESTIONS)",
    "Official Alignment: Rc No. 189/2026 ('Contents pertaining to the State of Telangana' — SI-only technical questions excluded). Time: 25 Mins | Full Marks: 25 | Negative Marking: -0.20 (PWT).",
    pc_mock, story_h, doc_h
)
story_h.append(PageBreak())
doc_h.add_page_break()

story_h.append(P("OFFICIAL MOCK OMR ANSWER KEYS & EXPLANATIONS", "H1"))
doc_h.add_heading("Official Mock OMR Answer Keys & Explanations", level=1)
key_rows = []
for idx in range(25):
    qs = si_mock[idx]
    qp = pc_mock[idx]
    key_rows.append([
        f"Q.{idx+1}",
        f"({qs['correctIndex']+1}) {qs['options'][qs['correctIndex']][:38]}",
        f"({qp['correctIndex']+1}) {qp['options'][qp['correctIndex']][:38]}",
    ])
story_h.append(add_styled_table_pdf(["Q.No", "SI Mock Test 1 Key", "Constable Mock Test 2 Key"], key_rows, [20 * mm, 77 * mm, 77 * mm]))
add_styled_table_docx(doc_h, ["Q.No", "SI Mock Test 1 Key", "Constable Mock Test 2 Key"], key_rows)

build_pdf(f"{OUT_DIR}/{meta_h['slug']}.pdf", meta_h, toc_h, story_h)
doc_h.save(f"{OUT_DIR}/{meta_h['slug']}.docx")

print("Generated files:")
for fn in sorted(os.listdir(OUT_DIR)):
    sz = os.path.getsize(os.path.join(OUT_DIR, fn))
    print(f"  {fn:65s} {sz/1024:8.1f} KB")
