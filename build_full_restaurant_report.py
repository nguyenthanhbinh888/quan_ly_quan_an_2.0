# -*- coding: utf-8 -*-
"""
build_full_restaurant_report.py
Tạo tài liệu Báo cáo đồ án môn học hoàn chỉnh (.docx và .md)
Dự án: HỆ THỐNG QUẢN LÝ QUÁN ĂN VÀ ĐIỂM BÁN HÀNG TRỰC TIẾP (HƯƠNG VIỆT POS & RESTAURANT OPS)
"""

import os
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

import docx
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_margins(cell, top=80, bottom=80, left=120, right=120):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_shading(cell, color_hex="F2F4F7"):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:val="clear" w:color="auto" w:fill="{color_hex}"/>')
    tcPr.append(shd)

def set_table_borders(table, color="BDC3C7", sz="4"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:left w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'  <w:insideH w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideV w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def set_box_borders(table, color="C0392B", sz="8"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:left w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:right w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def add_header_page_number(section):
    header = section.header
    header.is_linked_to_previous = False
    p = header.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    
    run = p.add_run()
    run.font.name = 'Times New Roman'
    run.font.size = Pt(10)
    run.font.color.rgb = RGBColor(120, 120, 120)
    
    fldSimple = parse_xml(r'<w:fldSimple %s w:instr="PAGE"/>' % nsdecls('w'))
    p._p.append(fldSimple)

def add_body_p(doc, text="", bold_prefix="", italic=False, align=WD_ALIGN_PARAGRAPH.JUSTIFY):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Times New Roman'
        r_pre.font.size = Pt(13)
        r_pre.font.bold = True
        r_pre.font.color.rgb = RGBColor(30, 30, 30)
        
    if text:
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(13)
        r.font.italic = italic
        r.font.color.rgb = RGBColor(30, 30, 30)
    return p

def add_bullet_p(doc, text, bold_prefix=""):
    p = doc.add_paragraph(style='List Bullet')
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(3)
    
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Times New Roman'
        r_pre.font.size = Pt(13)
        r_pre.font.bold = True
        r_pre.font.color.rgb = RGBColor(30, 30, 30)
        
    r = p.add_run(text)
    r.font.name = 'Times New Roman'
    r.font.size = Pt(13)
    r.font.color.rgb = RGBColor(30, 30, 30)
    return p

def add_heading_1(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(18)
    p.paragraph_format.space_after = Pt(10)
    p.paragraph_format.keep_with_next = True
    
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(16)
    run.font.bold = True
    run.font.color.rgb = RGBColor(169, 50, 38)
    return p

def add_heading_2(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = RGBColor(120, 40, 31)
    return p

def add_heading_3(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(13)
    run.font.bold = True
    run.font.color.rgb = RGBColor(40, 40, 40)
    return p

def add_heading_4(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.keep_with_next = True
    
    run = p.add_run(text)
    run.font.name = 'Times New Roman'
    run.font.size = Pt(13)
    run.font.bold = True
    run.font.italic = True
    run.font.color.rgb = RGBColor(60, 60, 60)
    return p

def add_table_caption(doc, table_num, table_name):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    
    r1 = p.add_run(f"Bảng {table_num}. ")
    r1.font.name = 'Times New Roman'
    r1.font.size = Pt(12)
    r1.font.italic = True
    
    r2 = p.add_run(table_name)
    r2.font.name = 'Times New Roman'
    r2.font.size = Pt(12)
    return p

def add_figure_caption(doc, fig_num, fig_name):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(12)
    
    r1 = p.add_run(f"Hình {fig_num}. ")
    r1.font.name = 'Times New Roman'
    r1.font.size = Pt(12)
    r1.font.italic = True
    
    r2 = p.add_run(fig_name)
    r2.font.name = 'Times New Roman'
    r2.font.size = Pt(12)
    return p

def add_figure_placeholder(doc, fig_num, fig_name, guide_text="", ascii_diagram="", url=""):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_box_borders(table, color="D98880", sz="6")
    
    cell = table.cell(0, 0)
    set_cell_shading(cell, "FDEDEC")
    set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
    
    cp = cell.paragraphs[0]
    cp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cp.paragraph_format.line_spacing = 1.2
    cp.paragraph_format.space_before = Pt(4)
    cp.paragraph_format.space_after = Pt(4)
    
    r_icon = cp.add_run("📷 [ KHUNG CHÈN ẢNH CHỤP SẢN PHẨM HOẶC SƠ ĐỒ THIẾT KẾ ]\n")
    r_icon.font.name = 'Times New Roman'
    r_icon.font.size = Pt(11)
    r_icon.font.bold = True
    r_icon.font.color.rgb = RGBColor(192, 57, 43)
    
    if url:
        r_url = cp.add_run(f"🌐 Đường dẫn giao diện thực tế: {url}\n")
        r_url.font.name = 'Times New Roman'
        r_url.font.size = Pt(10.5)
        r_url.font.bold = True
        r_url.font.color.rgb = RGBColor(39, 174, 96)
        
    if guide_text:
        r_guide = cp.add_run(f"📌 Thao tác & Vị trí chụp: {guide_text}\n")
        r_guide.font.name = 'Times New Roman'
        r_guide.font.size = Pt(10.5)
        r_guide.font.italic = True
        r_guide.font.color.rgb = RGBColor(100, 100, 100)
        
    if ascii_diagram:
        p_diag = cell.add_paragraph()
        p_diag.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p_diag.paragraph_format.line_spacing = 1.0
        p_diag.paragraph_format.space_before = Pt(4)
        p_diag.paragraph_format.space_after = Pt(4)
        r_diag = p_diag.add_run(ascii_diagram)
        r_diag.font.name = 'Consolas'
        r_diag.font.size = Pt(9)
        r_diag.font.color.rgb = RGBColor(44, 62, 80)
        
    p_note = cell.add_paragraph()
    p_note.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_note.paragraph_format.line_spacing = 1.0
    p_note.paragraph_format.space_before = Pt(4)
    p_note.paragraph_format.space_after = Pt(2)
    r_note = p_note.add_run("(Sinh viên chụp ảnh thực tế từ hệ thống localhost:3000 hoặc xuất file UML dán vào khung này)")
    r_note.font.name = 'Times New Roman'
    r_note.font.size = Pt(9.5)
    r_note.font.italic = True
    r_note.font.color.rgb = RGBColor(127, 140, 141)
    
    add_figure_caption(doc, fig_num, fig_name)

def add_formatted_table(doc, table_num, table_name, headers, rows_data, col_widths=None):
    add_table_caption(doc, table_num, table_name)
    
    num_rows = len(rows_data) + 1
    num_cols = len(headers)
    table = doc.add_table(rows=num_rows, cols=num_cols)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table, color="BDC3C7", sz="4")
    
    hdr_cells = table.rows[0].cells
    for i, h_text in enumerate(headers):
        cell = hdr_cells[i]
        set_cell_shading(cell, "FADBD8")
        set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.line_spacing = 1.2
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(4)
        run = p.add_run(h_text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.color.rgb = RGBColor(120, 40, 31)
        
    for r_idx, row_values in enumerate(rows_data):
        row_cells = table.rows[r_idx + 1].cells
        bg_color = "FFFFFF" if r_idx % 2 == 0 else "FDEDEC"
        for c_idx, val in enumerate(row_values):
            cell = row_cells[c_idx]
            if bg_color != "FFFFFF":
                set_cell_shading(cell, bg_color)
            set_cell_margins(cell, top=80, bottom=80, left=120, right=120)
            p = cell.paragraphs[0]
            if c_idx == 0 or (len(str(val)) < 8 and c_idx != 1):
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            p.paragraph_format.line_spacing = 1.2
            p.paragraph_format.space_before = Pt(4)
            p.paragraph_format.space_after = Pt(4)
            run = p.add_run(str(val))
            run.font.name = 'Times New Roman'
            run.font.size = Pt(12)
            run.font.color.rgb = RGBColor(30, 30, 30)
            
    if col_widths:
        for row in table.rows:
            for idx, width in enumerate(col_widths):
                if idx < len(row.cells):
                    row.cells[idx].width = width
                    
    doc.add_paragraph().paragraph_format.space_after = Pt(6)
    return table

def add_usecase_detail_table(doc, table_num, uc_code, uc_name, actor, desc, trigger, pre_cond, main_flow, alt_flow, post_cond):
    add_table_caption(doc, table_num, f"Mô tả chi tiết use case {uc_name}")
    
    table = doc.add_table(rows=1, cols=4)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table, color="7F8C8D", sz="5")
    
    r0 = table.rows[0].cells
    r0[0].text = "Mã Use case"
    r0[1].text = uc_code
    r0[2].text = "Tên Use case"
    r0[3].text = uc_name
    for i in (0, 2):
        set_cell_shading(r0[i], "FADBD8")
        r0[i].paragraphs[0].runs[0].font.bold = True
        r0[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(120, 40, 31)
    for c in r0:
        set_cell_margins(c, top=80, bottom=80, left=100, right=100)
        c.paragraphs[0].runs[0].font.name = 'Times New Roman'
        c.paragraphs[0].runs[0].font.size = Pt(12)
        c.paragraphs[0].paragraph_format.space_before = Pt(4)
        c.paragraphs[0].paragraph_format.space_after = Pt(4)
        
    def add_merged_row(label, content):
        row = table.add_row()
        cells = row.cells
        cells[0].text = label
        set_cell_shading(cells[0], "FADBD8")
        cells[0].paragraphs[0].runs[0].font.name = 'Times New Roman'
        cells[0].paragraphs[0].runs[0].font.size = Pt(12)
        cells[0].paragraphs[0].runs[0].font.bold = True
        cells[0].paragraphs[0].runs[0].font.color.rgb = RGBColor(120, 40, 31)
        set_cell_margins(cells[0], top=80, bottom=80, left=100, right=100)
        cells[0].paragraphs[0].paragraph_format.space_before = Pt(4)
        cells[0].paragraphs[0].paragraph_format.space_after = Pt(4)
        
        cells[1].merge(cells[2]).merge(cells[3])
        cells[1].text = content
        set_cell_margins(cells[1], top=80, bottom=80, left=100, right=100)
        cells[1].paragraphs[0].runs[0].font.name = 'Times New Roman'
        cells[1].paragraphs[0].runs[0].font.size = Pt(12)
        cells[1].paragraphs[0].paragraph_format.space_before = Pt(4)
        cells[1].paragraphs[0].paragraph_format.space_after = Pt(4)
        return cells[1]

    add_merged_row("Tác nhân", actor)
    add_merged_row("Mô tả", desc)
    add_merged_row("Sự kiện kích hoạt", trigger)
    add_merged_row("Tiền điều kiện", pre_cond)
    
    r_main = table.add_row()
    c_label = r_main.cells[0]
    c_label.text = "Luồng sự kiện chính"
    set_cell_shading(c_label, "FADBD8")
    c_label.paragraphs[0].runs[0].font.name = 'Times New Roman'
    c_label.paragraphs[0].runs[0].font.size = Pt(12)
    c_label.paragraphs[0].runs[0].font.bold = True
    c_label.paragraphs[0].runs[0].font.color.rgb = RGBColor(120, 40, 31)
    set_cell_margins(c_label, top=80, bottom=80, left=100, right=100)
    
    c_content = r_main.cells[1].merge(r_main.cells[2]).merge(r_main.cells[3])
    set_cell_margins(c_content, top=60, bottom=60, left=80, right=80)
    c_content.paragraphs[0].text = ""
    for step in main_flow:
        st_num, st_actor, st_action = step
        p_step = c_content.add_paragraph()
        p_step.paragraph_format.line_spacing = 1.15
        p_step.paragraph_format.space_before = Pt(2)
        p_step.paragraph_format.space_after = Pt(2)
        r_s1 = p_step.add_run(f"Bước {st_num} [{st_actor}]: ")
        r_s1.font.name = 'Times New Roman'
        r_s1.font.size = Pt(11.5)
        r_s1.font.bold = True
        r_s2 = p_step.add_run(st_action)
        r_s2.font.name = 'Times New Roman'
        r_s2.font.size = Pt(11.5)

    r_alt = table.add_row()
    c_label_alt = r_alt.cells[0]
    c_label_alt.text = "Luồng sự kiện thay thế"
    set_cell_shading(c_label_alt, "FADBD8")
    c_label_alt.paragraphs[0].runs[0].font.name = 'Times New Roman'
    c_label_alt.paragraphs[0].runs[0].font.size = Pt(12)
    c_label_alt.paragraphs[0].runs[0].font.bold = True
    c_label_alt.paragraphs[0].runs[0].font.color.rgb = RGBColor(120, 40, 31)
    set_cell_margins(c_label_alt, top=80, bottom=80, left=100, right=100)
    
    c_content_alt = r_alt.cells[1].merge(r_alt.cells[2]).merge(r_alt.cells[3])
    set_cell_margins(c_content_alt, top=60, bottom=60, left=80, right=80)
    c_content_alt.paragraphs[0].text = ""
    for step in alt_flow:
        st_num, st_actor, st_action = step
        p_step = c_content_alt.add_paragraph()
        p_step.paragraph_format.line_spacing = 1.15
        p_step.paragraph_format.space_before = Pt(2)
        p_step.paragraph_format.space_after = Pt(2)
        r_s1 = p_step.add_run(f"Trường hợp {st_num} [{st_actor}]: ")
        r_s1.font.name = 'Times New Roman'
        r_s1.font.size = Pt(11.5)
        r_s1.font.bold = True
        r_s2 = p_step.add_run(st_action)
        r_s2.font.name = 'Times New Roman'
        r_s2.font.size = Pt(11.5)

    add_merged_row("Hậu điều kiện", post_cond)
    
    table.rows[0].cells[0].width = Cm(3.2)
    table.rows[0].cells[1].width = Cm(4.5)
    table.rows[0].cells[2].width = Cm(3.0)
    table.rows[0].cells[3].width = Cm(4.8)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(6)
    return table

def generate_report():
    print("Bắt đầu khởi tạo tài liệu...")
    doc = docx.Document()
    
    # Thiết lập khổ giấy và lề trang chuẩn quy định
    section = doc.sections[0]
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.top_margin = Cm(3.0)
    section.bottom_margin = Cm(3.0)
    section.left_margin = Cm(3.5)
    section.right_margin = Cm(2.0)
    section.different_first_page_header_footer = True
    
    add_header_page_number(section)
    
    style_normal = doc.styles['Normal']
    font = style_normal.font
    font.name = 'Times New Roman'
    font.size = Pt(13)
    font.color.rgb = RGBColor(30, 30, 30)
    
    # -------------------------------------------------------------------------
    # TRANG BÌA BÁO CÁO
    # -------------------------------------------------------------------------
    p_b1 = doc.add_paragraph()
    p_b1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_b1.paragraph_format.space_before = Pt(0)
    p_b1.paragraph_format.space_after = Pt(3)
    r = p_b1.add_run("BỘ GIÁO DỤC VÀ ĐÀO TẠO\nTRƯỜNG ĐẠI HỌC ...\nKHOA CÔNG NGHỆ THÔNG TIN")
    r.font.name = 'Times New Roman'
    r.font.size = Pt(14)
    r.font.bold = True
    
    p_div = doc.add_paragraph()
    p_div.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_div.paragraph_format.space_before = Pt(6)
    p_div.paragraph_format.space_after = Pt(28)
    r_div = p_div.add_run("-----------------------***-----------------------")
    r_div.font.bold = True
    
    p_b2 = doc.add_paragraph()
    p_b2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_b2.paragraph_format.space_before = Pt(10)
    p_b2.paragraph_format.space_after = Pt(6)
    r_b2 = p_b2.add_run("BÁO CÁO ĐỒ ÁN MÔN HỌC")
    r_b2.font.name = 'Times New Roman'
    r_b2.font.size = Pt(18)
    r_b2.font.bold = True
    r_b2.font.color.rgb = RGBColor(169, 50, 38)
    
    p_b3 = doc.add_paragraph()
    p_b3.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_b3.paragraph_format.space_before = Pt(0)
    p_b3.paragraph_format.space_after = Pt(24)
    r_b3 = p_b3.add_run("CHUYÊN NGÀNH: CÔNG NGHỆ THÔNG TIN / KỸ THUẬT PHẦN MỀM")
    r_b3.font.name = 'Times New Roman'
    r_b3.font.size = Pt(13)
    r_b3.font.bold = True
    
    p_dt = doc.add_paragraph()
    p_dt.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_dt.paragraph_format.space_before = Pt(18)
    p_dt.paragraph_format.space_after = Pt(10)
    r_dt = p_dt.add_run("ĐỀ TÀI:")
    r_dt.font.name = 'Times New Roman'
    r_dt.font.size = Pt(15)
    r_dt.font.bold = True
    
    p_name = doc.add_paragraph()
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_name.paragraph_format.space_before = Pt(4)
    p_name.paragraph_format.space_after = Pt(40)
    r_name = p_name.add_run("XÂY DỰNG HỆ THỐNG QUẢN LÝ QUÁN ĂN VÀ ĐIỂM BÁN HÀNG TRỰC TIẾP\n(HƯƠNG VIỆT POS & RESTAURANT OPS)")
    r_name.font.name = 'Times New Roman'
    r_name.font.size = Pt(17)
    r_name.font.bold = True
    r_name.font.color.rgb = RGBColor(120, 40, 31)
    
    p_info = doc.add_paragraph()
    p_info.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p_info.paragraph_format.left_indent = Cm(3.0)
    p_info.paragraph_format.line_spacing = 1.5
    p_info.paragraph_format.space_before = Pt(20)
    p_info.paragraph_format.space_after = Pt(40)
    
    runs_info = [
        ("Giảng viên hướng dẫn: ", "ThS. / TS. .....................................................\n"),
        ("Sinh viên thực hiện: ", ".....................................................\n"),
        ("Mã số sinh viên: ", ".....................................................\n"),
        ("Lớp / Khóa: ", ".....................................................\n"),
    ]
    for lbl, val in runs_info:
        r1 = p_info.add_run(lbl)
        r1.font.name = 'Times New Roman'
        r1.font.size = Pt(13)
        r1.font.bold = True
        r2 = p_info.add_run(val)
        r2.font.name = 'Times New Roman'
        r2.font.size = Pt(13)
        
    p_foot = doc.add_paragraph()
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_foot.paragraph_format.space_before = Pt(30)
    p_foot.paragraph_format.space_after = Pt(0)
    r_foot = p_foot.add_run("HÀ NỘI, NĂM HỌC 2025 - 2026")
    r_foot.font.name = 'Times New Roman'
    r_foot.font.size = Pt(13)
    r_foot.font.bold = True
    
    doc.add_page_break()
    
    # -------------------------------------------------------------------------
    # LỜI CẢM ƠN
    # -------------------------------------------------------------------------
    add_heading_1(doc, "LỜI CẢM ƠN")
    add_body_p(doc, "Trong suốt quá trình học tập, nghiên cứu và xây dựng đồ án môn học với đề tài \"Xây dựng Hệ thống Quản lý Quán ăn và Điểm bán hàng trực tiếp (Hương Việt POS & Restaurant Ops)\", em đã nhận được sự định hướng, quan tâm giúp đỡ và chỉ dẫn tận tình từ quý Thầy Cô, bạn bè và gia đình.")
    add_body_p(doc, "Lời đầu tiên, em xin bày tỏ lòng biết ơn sâu sắc và chân thành nhất tới toàn thể các Thầy Cô giáo trong Khoa Công nghệ Thông tin đã tận tâm truyền đạt những kiến thức chuyên môn vững chắc, phương pháp luận nghiên cứu khoa học và tư duy thiết kế phần mềm hiện đại trong suốt các năm học vừa qua.")
    add_body_p(doc, "Đặc biệt, em xin gửi lời cảm ơn trân trọng nhất đến Giảng viên hướng dẫn môn học, người đã trực tiếp định hướng đề tài, giải đáp cặn kẽ các vướng mắc về mặt kiến trúc công nghệ, mô hình phân tích thiết kế và tận tình góp ý để em hoàn thiện sản phẩm phần mềm cũng như bản báo cáo này một cách chỉn chu, khoa học nhất.")
    add_body_p(doc, "Dù đã dành nhiều tâm huyết và nỗ lực để hoàn thành đồ án một cách toàn diện nhất, song do giới hạn về mặt thời gian và kinh nghiệm thực tiễn, báo cáo chắc chắn khó tránh khỏi những thiếu sót nhất định. Em rất mong nhận được những lời nhận xét, đánh giá và đóng góp quý báu từ quý Thầy Cô trong hội đồng chấm đồ án để sản phẩm ngày càng hoàn thiện hơn, sẵn sàng ứng dụng hiệu quả vào hoạt động kinh doanh ẩm thực thực tế.")
    add_body_p(doc, "Em xin kính chúc quý Thầy Cô luôn dồi dào sức khỏe, hạnh phúc và gặt hái được nhiều thành tựu rực rỡ trong sự nghiệp trồng người cao quý!")
    
    p_sign = doc.add_paragraph()
    p_sign.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_sign.paragraph_format.space_before = Pt(20)
    p_sign.paragraph_format.space_after = Pt(4)
    r_sign1 = p_sign.add_run("Hà Nội, ngày ... tháng ... năm 2026\n")
    r_sign1.font.italic = True
    r_sign2 = p_sign.add_run("Sinh viên thực hiện\n")
    r_sign2.font.bold = True
    r_sign3 = p_sign.add_run("(Ký và ghi rõ họ tên)")
    r_sign3.font.italic = True
    
    doc.add_page_break()
    
    # -------------------------------------------------------------------------
    # MỤC LỤC
    # -------------------------------------------------------------------------
    add_heading_1(doc, "MỤC LỤC")
    toc_items = [
        ("LỜI CẢM ƠN", "i"),
        ("MỤC LỤC", "ii"),
        ("DANH MỤC CÁC CHỮ VIẾT TẮT", "iii"),
        ("DANH MỤC CÁC BẢNG", "iv"),
        ("DANH MỤC CÁC HÌNH", "v"),
        ("MỞ ĐẦU", "1"),
        ("   1. Lý do chọn đề tài", "1"),
        ("   2. Mục tiêu nghiên cứu của đồ án", "2"),
        ("   3. Đối tượng và phạm vi nghiên cứu", "2"),
        ("   4. Phương pháp nghiên cứu và công cụ sử dụng", "3"),
        ("   5. Bố cục của báo cáo đồ án", "3"),
        ("CHƯƠNG 1: TỔNG QUAN VỀ CÔNG NGHỆ VÀ CÔNG CỤ PHÁT TRIỂN", "4"),
        ("   1.1. Tổng quan về bài toán quản lý quán ăn và mô hình bán lẻ F&B", "4"),
        ("   1.2. Công nghệ nền tảng phía Backend", "5"),
        ("      1.2.1. Ngôn ngữ Java 21 LTS", "5"),
        ("      1.2.2. Khung ứng dụng Spring Boot 3.3.4", "6"),
        ("      1.2.3. Cơ chế xác thực Spring Security & JWT", "7"),
        ("   1.3. Công nghệ nền tảng phía Frontend", "8"),
        ("      1.3.1. Thư viện React 18 và ngôn ngữ TypeScript", "8"),
        ("      1.3.2. Công cụ đóng gói hiện đại Vite 5", "9"),
        ("      1.3.3. Phong cách thiết kế giao diện Glassmorphism và tối ưu UX POS", "9"),
        ("   1.4. Hệ quản trị cơ sở dữ liệu MySQL 8.0 & Quản lý Migration Flyway", "10"),
        ("   1.5. Cổng thanh toán mã quét chuẩn quốc gia VietQR", "11"),
        ("CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG", "12"),
        ("   2.1. Mô tả bài toán quán ăn", "12"),
        ("   2.2. Yêu cầu bài toán", "13"),
        ("      2.2.1. Yêu cầu chức năng", "13"),
        ("      2.2.2. Yêu cầu phi chức năng", "14"),
        ("   2.3. Kiến trúc tổng thể hệ thống", "14"),
        ("   2.4. Biểu đồ Use Case", "15"),
        ("      2.4.1. Biểu đồ Use Case tổng quát", "15"),
        ("      2.4.2. Biểu đồ Use Case phân hệ Quản trị viên (Admin)", "16"),
        ("      2.4.3. Biểu đồ Use Case phân hệ Nhân viên (Staff / Thu ngân / Phục vụ)", "17"),
        ("   2.5. Mô tả chi tiết các Use Case chính", "18"),
        ("   2.6. Thiết kế Backend hệ thống", "22"),
        ("      2.6.1. Thiết kế biểu đồ trình tự (Sequence Diagrams)", "22"),
        ("      2.6.2. Thiết kế biểu đồ lớp phân tích (VOPC Diagrams)", "24"),
        ("      2.6.3. Thiết kế cơ sở dữ liệu", "25"),
        ("CHƯƠNG 3: CÀI ĐẶT VÀ THỬ NGHIỆM HỆ THỐNG", "28"),
        ("   3.1. Môi trường triển khai và vận hành hệ thống", "28"),
        ("   3.2. Giao diện các chức năng chính của hệ thống", "29"),
        ("   3.3. Kịch bản kiểm thử hệ thống (Test Cases)", "33"),
        ("KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", "36"),
        ("   1. Đánh giá kết quả đạt được", "36"),
        ("   2. Hạn chế của hệ thống", "36"),
        ("   3. Hướng phát triển trong tương lai", "37"),
        ("TÀI LIỆU THAM KHẢO", "38"),
    ]
    for title, pg in toc_items:
        p_t = doc.add_paragraph()
        p_t.paragraph_format.line_spacing = 1.3
        p_t.paragraph_format.space_before = Pt(2)
        p_t.paragraph_format.space_after = Pt(2)
        r_t = p_t.add_run(title)
        r_t.font.name = 'Times New Roman'
        r_t.font.size = Pt(12)
        if title.startswith("CHƯƠNG") or title in ("LỜI CẢM ƠN", "MỤC LỤC", "MỞ ĐẦU", "KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", "TÀI LIỆU THAM KHẢO"):
            r_t.font.bold = True
        
        # Thêm chấm dẫn và số trang
        dots = " " + "." * max(5, 75 - len(title) * 2) + " "
        r_d = p_t.add_run(dots)
        r_d.font.color.rgb = RGBColor(160, 160, 160)
        r_p = p_t.add_run(pg)
        r_p.font.name = 'Times New Roman'
        r_p.font.size = Pt(12)
        r_p.font.bold = True
        
    doc.add_page_break()
    
    # -------------------------------------------------------------------------
    # DANH MỤC CHỮ VIẾT TẮT
    # -------------------------------------------------------------------------
    add_heading_1(doc, "DANH MỤC CÁC CHỮ VIẾT TẮT")
    abbr_data = [
        ("API", "Application Programming Interface", "Giao diện lập trình ứng dụng kết nối Frontend và Backend"),
        ("CORS", "Cross-Origin Resource Sharing", "Cơ chế chia sẻ tài nguyên giữa các nguồn gốc khác nhau"),
        ("CSS", "Cascading Style Sheets", "Ngôn ngữ định dạng và bố cục giao diện trang web"),
        ("DTO", "Data Transfer Object", "Đối tượng truyền dữ liệu giữa tầng Controller và Service"),
        ("ERD", "Entity Relationship Diagram", "Sơ đồ quan hệ thực thể mô tả cấu trúc cơ sở dữ liệu"),
        ("F&B", "Food and Beverage", "Ngành kinh doanh dịch vụ ẩm thực và đồ uống"),
        ("JWT", "JSON Web Token", "Chuẩn mã hóa thông tin xác thực phiên làm việc phi trạng thái"),
        ("ORM", "Object-Relational Mapping", "Kỹ thuật ánh xạ giữa đối tượng mã nguồn và bảng cơ sở dữ liệu"),
        ("POS", "Point of Sale", "Hệ thống điểm bán hàng phục vụ trực tiếp tại quầy hoặc bàn"),
        ("RBAC", "Role-Based Access Control", "Mô hình kiểm soát truy cập dựa trên phân quyền vai trò người dùng"),
        ("REST", "Representational State Transfer", "Kiến trúc thiết kế dịch vụ web dựa trên giao thức HTTP chuẩn"),
        ("SQL", "Structured Query Language", "Ngôn ngữ truy vấn cơ sở dữ liệu có cấu trúc quan hệ"),
        ("UI/UX", "User Interface / User Experience", "Giao diện người dùng và Trải nghiệm người dùng phần mềm"),
        ("VOPC", "View of Participating Classes", "Biểu đồ các lớp tham gia thực thi ca sử dụng (UML)"),
    ]
    add_formatted_table(
        doc, "0.1", "Danh mục các thuật ngữ và chữ viết tắt",
        ["Từ viết tắt", "Tên tiếng Anh đầy đủ", "Ý nghĩa chuyên môn trong đồ án"],
        abbr_data,
        [Cm(2.5), Cm(6.0), Cm(7.0)]
    )
    
    doc.add_page_break()
    
    # -------------------------------------------------------------------------
    # DANH MỤC CÁC BẢNG VÀ DANH MỤC CÁC HÌNH
    # -------------------------------------------------------------------------
    add_heading_1(doc, "DANH MỤC CÁC BẢNG")
    tables_list = [
        ("Bảng 0.1", "Danh mục các thuật ngữ và chữ viết tắt", "iii"),
        ("Bảng 2.1", "Mô tả chi tiết ca sử dụng UC_01 Đăng nhập hệ thống (UC_DANGNHAP)", "18"),
        ("Bảng 2.2", "Mô tả chi tiết ca sử dụng UC_06 Quản lý sơ đồ bàn (UC_QUANLY_BAN)", "19"),
        ("Bảng 2.3", "Mô tả chi tiết ca sử dụng UC_05 Quản lý thực đơn & Món ăn (UC_QUANLY_MONAN)", "19"),
        ("Bảng 2.4", "Mô tả chi tiết ca sử dụng UC_08 Mở bàn và Tạo đơn gọi món (UC_GOIMON_POS)", "20"),
        ("Bảng 2.5", "Mô tả chi tiết ca sử dụng UC_10 Thêm món, ghi chú và cập nhật đơn hàng (UC_CAPNHAT_ORDER)", "20"),
        ("Bảng 2.6", "Mô tả chi tiết ca sử dụng UC_15 Thanh toán và In hóa đơn (UC_THANHTOAN_HOADON)", "21"),
        ("Bảng 2.7", "Mô tả chi tiết ca sử dụng UC_18 Thống kê doanh thu Dashboard (UC_THONGKE_DOANHTHU)", "21"),
        ("Bảng 2.8", "Cấu trúc dữ liệu bảng users (Tài khoản người dùng và phân quyền)", "25"),
        ("Bảng 2.9", "Cấu trúc dữ liệu bảng categories (Danh mục món ăn)", "26"),
        ("Bảng 2.10", "Cấu trúc dữ liệu bảng menu_items (Món ăn / Đồ uống trong thực đơn)", "26"),
        ("Bảng 2.11", "Cấu trúc dữ liệu bảng dining_tables (Sơ đồ bàn ăn và trạng thái phục vụ)", "26"),
        ("Bảng 2.12", "Cấu trúc dữ liệu bảng orders (Đơn gọi món tại bàn)", "27"),
        ("Bảng 2.13", "Cấu trúc dữ liệu bảng order_items (Chi tiết từng món ăn trong đơn)", "27"),
        ("Bảng 2.14", "Cấu trúc dữ liệu bảng payments (Lịch sử thanh toán và hóa đơn)", "28"),
        ("Bảng 3.1", "Kịch bản kiểm thử phân hệ Xác thực và Đăng nhập hệ thống", "33"),
        ("Bảng 3.2", "Kịch bản kiểm thử phân hệ Quản lý bàn và Tạo đơn gọi món POS", "34"),
        ("Bảng 3.3", "Kịch bản kiểm thử phân hệ Thanh toán và Cập nhật trạng thái bàn", "34"),
        ("Bảng 3.4", "Kịch bản kiểm thử phân hệ Quản lý thực đơn và Xóa mềm (Soft Delete)", "35"),
    ]
    for num, name, pg in tables_list:
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        r1 = p.add_run(f"{num}: ")
        r1.font.bold = True
        r2 = p.add_run(name)
        dots = " " + "." * max(5, 70 - len(name)) + " "
        r3 = p.add_run(dots)
        r3.font.color.rgb = RGBColor(160, 160, 160)
        r4 = p.add_run(pg)
        r4.font.bold = True
        
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(14)
    
    add_heading_1(doc, "DANH MỤC CÁC HÌNH")
    figures_list = [
        ("Hình 2.1", "Sơ đồ kiến trúc 3 lớp Client - Server tổng thể của hệ thống Quản lý Quán ăn", "14"),
        ("Hình 2.2", "Sơ đồ Use Case tổng quát hệ thống Quản lý Quán ăn Hương Việt", "15"),
        ("Hình 2.3", "Sơ đồ Use Case phân hệ Quản trị viên (Admin)", "16"),
        ("Hình 2.4", "Sơ đồ Use Case phân hệ Nhân viên phục vụ và Thu ngân (Staff)", "17"),
        ("Hình 2.5", "Sơ đồ Use Case phân rã chức năng Đăng nhập hệ thống", "18"),
        ("Hình 2.6", "Sơ đồ Use Case phân rã chức năng Quản lý sơ đồ bàn", "19"),
        ("Hình 2.7", "Sơ đồ Use Case phân rã chức năng Quản lý món ăn và danh mục", "19"),
        ("Hình 2.8", "Sơ đồ Use Case phân rã chức năng Mở bàn và Tạo đơn gọi món", "20"),
        ("Hình 2.9", "Sơ đồ Use Case phân rã chức năng Thanh toán và In hóa đơn", "21"),
        ("Hình 2.10", "Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Đăng nhập & Cấp phát JWT", "22"),
        ("Hình 2.11", "Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Tạo đơn gọi món & Chuyển trạng thái bàn sang OCCUPIED", "23"),
        ("Hình 2.12", "Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Thanh toán hóa đơn & Trả bàn về EMPTY", "24"),
        ("Hình 2.13", "Biểu đồ lớp phân tích (VOPC) phân hệ Gọi món và Quản lý bàn", "24"),
        ("Hình 2.14", "Biểu đồ lớp phân tích (VOPC) phân hệ Thanh toán và Quản lý thực đơn", "25"),
        ("Hình 2.15", "Sơ đồ quan hệ thực thể ERD cơ sở dữ liệu restaurant_management", "25"),
        ("Hình 3.1", "Giao diện Sơ đồ bàn ăn và POS trực quan", "29"),
        ("Hình 3.2", "Giao diện Gọi món và Giỏ hàng theo bàn ăn thực tế", "29"),
        ("Hình 3.3", "Giao diện Quản lý Thực đơn và Danh mục món ăn", "30"),
        ("Hình 3.4", "Cửa sổ Modal Thêm/Sửa món ăn kèm chọn ảnh trực tiếp từ máy tính", "30"),
        ("Hình 3.5", "Cửa sổ Xác nhận thanh toán (Tiền mặt và Mã QR ngân hàng VietQR)", "31"),
        ("Hình 3.6", "Mẫu phiếu In hóa đơn thanh toán cho khách hàng", "31"),
        ("Hình 3.7", "Giao diện Quản lý Đơn hàng và Lịch sử hóa đơn", "32"),
        ("Hình 3.8", "Bảng điều khiển Quản trị Dashboard và thống kê doanh thu", "32"),
        ("Hình 3.9", "Biểu đồ thống kê top món ăn bán chạy nhất", "32"),
        ("Hình 3.10", "Màn hình Đăng nhập phân quyền hệ thống Admin / Staff", "33"),
        ("Hình 3.11", "Tính năng Xóa mềm (Soft Delete) món ăn và danh mục bảo toàn dữ liệu", "33"),
    ]
    for num, name, pg in figures_list:
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        r1 = p.add_run(f"{num}: ")
        r1.font.bold = True
        r2 = p.add_run(name)
        dots = " " + "." * max(5, 70 - len(name)) + " "
        r3 = p.add_run(dots)
        r3.font.color.rgb = RGBColor(160, 160, 160)
        r4 = p.add_run(pg)
        r4.font.bold = True
        
    doc.add_page_break()
    
    # -------------------------------------------------------------------------
    # PHẦN MỞ ĐẦU
    # -------------------------------------------------------------------------
    add_heading_1(doc, "MỞ ĐẦU")
    
    add_heading_2(doc, "1. Lý do chọn đề tài")
    add_body_p(doc, "Trong xu thế chuyển đổi số mạnh mẽ của nền kinh tế hiện nay, ngành dịch vụ ẩm thực (Food and Beverage - F&B) tại Việt Nam đang có những bước chuyển mình vượt bậc. Từ các nhà hàng quy mô lớn cho đến các quán ăn gia đình, quán cà phê và quán ăn vừa và nhỏ, nhu cầu ứng dụng công nghệ thông tin vào công tác vận hành bán lẻ đang trở nên cấp thiết hơn bao giờ hết.")
    add_body_p(doc, "Theo khảo sát thực tế tại các quán ăn truyền thống, phương thức quản lý thủ công bằng giấy ghi món (order giấy), nhẩm tính tiền và ghi sổ tay doanh thu hàng ngày đang bộc lộ rất nhiều nhược điểm nghiêm trọng:")
    add_bullet_p(doc, "Tình trạng ghi sai món, sót món của khách, nhầm lẫn giữa các bàn trong khung giờ cao điểm (buổi trưa và buổi tối) diễn ra thường xuyên do nhân viên phục vụ phải chạy qua lại giữa khu vực bàn ăn và nhà bếp.", "Sai sót trong quy trình gọi món: ")
    add_bullet_p(doc, "Việc tính nhẩm tiền trên hóa đơn viết tay rất dễ gây nhầm lẫn về đơn giá, số lượng hoặc sai sót khi áp dụng giảm giá, gây thiệt hại tài chính cho quán hoặc mất lòng tin từ khách hàng.", "Thất thoát và sai lệch doanh thu: ")
    add_bullet_p(doc, "Nhân viên phục vụ khó kiểm soát bàn nào đang có khách, bàn nào đã đặt trước, bàn nào đang chờ thanh toán, dẫn đến việc sắp xếp chỗ ngồi lộn xộn và giảm hiệu suất quay vòng bàn.", "Khó khăn trong kiểm soát sơ đồ bàn: ")
    add_bullet_p(doc, "Chủ quán không thể nắm bắt tức thời doanh thu trong ngày, món nào bán chạy (Best Seller) để nhập nguyên liệu kịp thời, gây lãng phí tồn kho hoặc thiếu hụt nguyên liệu phục vụ.", "Thiếu công cụ báo cáo phân tích kinh doanh: ")
    add_body_p(doc, "Xuất phát từ những bất cập thực tiễn nêu trên, đề tài \"Xây dựng Hệ thống Quản lý Quán ăn và Điểm bán hàng trực tiếp (Hương Việt POS & Restaurant Ops)\" được lựa chọn nghiên cứu và triển khai nhằm cung cấp một giải pháp phần mềm toàn diện, hiện đại, dễ thao tác trên màn hình cảm ứng, giúp tự động hóa quy trình phục vụ từ khâu mở bàn, gọi món, in hóa đơn đến thanh toán chuyển khoản mã QR và báo cáo doanh thu theo thời gian thực.")
    
    add_heading_2(doc, "2. Mục tiêu nghiên cứu của đồ án")
    add_body_p(doc, "Đồ án hướng tới các mục tiêu nghiên cứu và phát triển cụ thể sau đây:")
    add_bullet_p(doc, "Khảo sát và chuẩn hóa quy trình nghiệp vụ phục vụ ăn uống tại chỗ (Dine-in) và bán mang về của mô hình quán ăn hiện đại.", "Nghiên cứu nghiệp vụ F&B: ")
    add_bullet_p(doc, "Áp dụng kiến trúc Client-Server RESTful API hiện đại, phân tách độc lập giữa phần mềm giao diện người dùng (Frontend) và hệ thống xử lý logic nghiệp vụ lưu trữ dữ liệu (Backend).", "Làm chủ công nghệ phát triển: ")
    add_bullet_p(doc, "Bao gồm sơ đồ bàn trực quan theo thời gian thực, bảng gọi món POS chia theo từng nhóm danh mục, giỏ hàng linh hoạt, hỗ trợ ghi chú từng món (ví dụ: không cay, ít đá), in hóa đơn chuyên nghiệp và tích hợp mã QR thanh toán động VietQR.", "Xây dựng hoàn thiện các phân hệ cốt lõi: ")
    add_bullet_p(doc, "Bảo đảm hệ thống vận hành an toàn với cơ chế xác thực JWT, mã hóa mật khẩu một chiều BCrypt, cơ chế xóa mềm (Soft Delete) giúp bảo toàn dữ liệu lịch sử đơn hàng ngay cả khi xóa món hoặc xóa danh mục.", "Đảm bảo tính tin cậy và toàn vẹn dữ liệu: ")
    add_bullet_p(doc, "Triển khai thử nghiệm thực tế trên môi trường cục bộ và đánh giá khả năng phản hồi dưới tải thao tác liên tục của thu ngân và nhân viên phục vụ.", "Thử nghiệm và đánh giá: ")
    
    add_heading_2(doc, "3. Đối tượng và phạm vi nghiên cứu")
    add_body_p(doc, "Đối tượng và phạm vi nghiên cứu của đề tài được xác định rõ ràng:")
    add_bullet_p(doc, "Quy trình vận hành, quản lý sơ đồ bàn ăn, quy trình gọi món (POS), quy trình thanh toán hóa đơn, in phiếu tạm tính và quản trị báo cáo doanh số trong mô hình kinh doanh ẩm thực.", "Đối tượng nghiên cứu: ")
    add_bullet_p(doc, "Tập trung vào phân khúc quán ăn vừa và nhỏ, nhà hàng phục vụ tại chỗ kết hợp thanh toán tại quầy thu ngân. Hệ thống hỗ trợ 02 nhóm người dùng chính là Quản trị viên (Chủ quán/Admin) và Nhân viên phục vụ/Thu ngân (Staff). Không đi sâu vào phân hệ giao hàng trực tuyến (Delivery) qua bên thứ ba.", "Phạm vi ứng dụng: ")
    
    add_heading_2(doc, "4. Phương pháp nghiên cứu và công cụ sử dụng")
    add_body_p(doc, "Đề tài kết hợp giữa phương pháp nghiên cứu lý thuyết kỹ thuật phần mềm và phương pháp thực nghiệm phát triển sản phẩm:")
    add_bullet_p(doc, "Áp dụng mô hình phát triển phần mềm linh hoạt Agile/Scrum, phân chia tiến độ thành các giai đoạn (sprint) từ thiết kế cơ sở dữ liệu, xây dựng REST API, hoàn thiện giao diện đến kiểm thử và tái cấu trúc.", "Mô hình quy trình: ")
    add_bullet_p(doc, "Java 21 LTS, Spring Boot 3.3.4 (Spring Data JPA, Spring Security, JWT, Flyway Migration).", "Công nghệ Backend: ")
    add_bullet_p(doc, "React 18, TypeScript, Vite 5, phong cách giao diện hiện đại Glassmorphism, tối ưu giao diện chạm POS.", "Công nghệ Frontend: ")
    add_bullet_p(doc, "MySQL 8.0 Community Edition, chỉ mục Indexing và quan hệ khóa ngoại bảo đảm chuẩn ACID.", "Hệ quản trị cơ sở dữ liệu: ")
    add_bullet_p(doc, "Antigravity IDE, Visual Studio Code, Postman, Git, GitHub.", "Công cụ hỗ trợ: ")
    
    add_heading_2(doc, "5. Bố cục của báo cáo đồ án")
    add_body_p(doc, "Nội dung của báo cáo đồ án được kết cấu thành 3 chương chính cùng phần mở đầu, kết luận và tài liệu tham khảo:")
    add_bullet_p(doc, "Trình bày cơ sở lý thuyết về mô hình F&B, kiến trúc ứng dụng web hiện đại và các công nghệ cốt lõi được sử dụng trong dự án (Java 21, Spring Boot, React, Vite, MySQL, VietQR).", "Chương 1 - Tổng quan về công nghệ và công cụ phát triển: ")
    add_bullet_p(doc, "Phân tích yêu cầu chức năng, phi chức năng, xây dựng các biểu đồ Use Case, mô tả chi tiết ca sử dụng, thiết kế biểu đồ tuần tự Sequence, biểu đồ lớp VOPC và thiết kế cơ sở dữ liệu 7 bảng hoàn chỉnh.", "Chương 2 - Phân tích và thiết kế hệ thống: ")
    add_bullet_p(doc, "Mô tả môi trường triển khai thực tế, giới thiệu 11 màn hình chức năng hoạt động của hệ thống kèm khung chụp ảnh minh họa và xây dựng các bảng kịch bản kiểm thử (Test Cases) chi tiết.", "Chương 3 - Cài đặt và thử nghiệm hệ thống: ")
    add_bullet_p(doc, "Tổng kết những kết quả đã đạt được, thẳng thắn nhìn nhận những hạn chế còn tồn đọng và đề xuất các định hướng nâng cấp mở rộng trong tương lai.", "Kết luận và hướng phát triển: ")
    
    doc.add_page_break()
    
    # -------------------------------------------------------------------------
    # CHƯƠNG 1
    # -------------------------------------------------------------------------
    add_heading_1(doc, "CHƯƠNG 1: TỔNG QUAN VỀ CÔNG NGHỆ VÀ CÔNG CỤ PHÁT TRIỂN")
    
    add_heading_2(doc, "1.1. Tổng quan về bài toán quản lý quán ăn và mô hình bán lẻ F&B")
    add_body_p(doc, "Ngành kinh doanh dịch vụ ẩm thực (F&B) có những đặc thù vận hành rất riêng biệt so với các ngành thương mại điện tử thuần túy. Điểm mấu chốt nằm ở tính thời gian thực (Real-time), cường độ phục vụ tăng đột biến vào khung giờ cao điểm và sự luân chuyển trạng thái liên tục của bàn ăn. Một quy trình phục vụ quán ăn tiêu chuẩn bao gồm các bước chặt chẽ:")
    add_bullet_p(doc, "Nhân viên tiếp đón khách, quan sát sơ đồ bàn để chọn bàn trống phù hợp với số lượng khách (bàn đơn, bàn 4 người hoặc phòng tiệc). Bàn được đánh dấu chuyển từ trạng thái Trống (EMPTY) sang Đang phục vụ (OCCUPIED).", "1. Tiếp nhận và mở bàn: ")
    add_bullet_p(doc, "Nhân viên sử dụng màn hình POS chọn các món ăn khách yêu cầu, nhập ghi chú khẩu vị cho từng món. Đơn hàng được lưu vào hệ thống và in phiếu thông báo cho khu vực bếp/pha chế chuẩn bị món ăn.", "2. Gọi món (Order món): ")
    add_bullet_p(doc, "Khách hàng có thể gọi thêm món mới, hủy món chưa chế biến hoặc yêu cầu tạm tính. Hệ thống tự động tính lũy tiến tổng tiền món ăn.", "3. Phục vụ và cập nhật đơn: ")
    add_bullet_p(doc, "Thu ngân thực hiện in hóa đơn tạm tính cho khách kiểm tra. Sau đó, khách lựa chọn thanh toán bằng Tiền mặt hoặc Quét mã QR ngân hàng. Ngay khi giao dịch hoàn tất, hệ thống tự động ghi nhận thanh toán, giải phóng bàn ăn về trạng thái Trống (EMPTY) và cộng doanh thu vào báo cáo ngày.", "4. Thanh toán và trả bàn: ")
    add_body_p(doc, "Hệ thống Hương Việt POS & Restaurant Ops được thiết kế nhằm số hóa trọn vẹn toàn bộ chu trình 4 bước trên, loại bỏ hoàn toàn việc ghi chép thủ công dễ thất thoát và nhầm lẫn.")
    
    add_heading_2(doc, "1.2. Công nghệ nền tảng phía Backend")
    add_heading_3(doc, "1.2.1. Ngôn ngữ Java 21 LTS")
    add_body_p(doc, "Java 21 là phiên bản hỗ trợ dài hạn (Long-Term Support - LTS) mới nhất của ngôn ngữ lập trình Java. Phiên bản này mang lại nhiều cải tiến đột phá về mặt hiệu năng và cú pháp hiện đại:")
    add_bullet_p(doc, "Cho phép hệ điều hành và máy ảo JVM xử lý đồng thời hàng chục nghìn kết nối mạng với chi phí tài nguyên bộ nhớ cực thấp, phù hợp với hệ thống điểm bán hàng có nhiều thiết bị máy tính bảng của nhân viên cùng gửi yêu cầu gọi món.", "Virtual Threads (Project Loom): ")
    add_bullet_p(doc, "Đơn giản hóa việc khai báo các lớp đối tượng truyền nhận dữ liệu (DTO) bất biến, loại bỏ mã thừa Boilerplate code mà vẫn giữ tính toàn vẹn dữ liệu.", "Record Classes & Pattern Matching: ")
    add_bullet_p(doc, "Bộ thu gom rác thế hệ mới (ZGC) tối ưu hóa thời gian dừng xử lý (pause time) dưới 1 mili-giây, giúp API phản hồi tức thì mà không gặp hiện tượng giật lag.", "Cơ chế quản lý bộ nhớ tiên tiến: ")
    
    add_heading_3(doc, "1.2.2. Khung ứng dụng Spring Boot 3.3.4")
    add_body_p(doc, "Spring Boot là nền tảng tiêu chuẩn doanh nghiệp hàng đầu để xây dựng các dịch vụ RESTful API bảo mật và có khả năng mở rộng cao. Các module chính của Spring Boot được tận dụng trong dự án bao gồm:")
    add_bullet_p(doc, "Định nghĩa các REST Controller tiếp nhận các phương thức HTTP (GET, POST, PUT, DELETE) với định dạng dữ liệu JSON chuẩn mực.", "Spring Boot Starter Web: ")
    add_bullet_p(doc, "Sử dụng Hibernate ORM để ánh xạ các bảng quan hệ trong MySQL thành các thực thể Java (Entity). Cung cấp cơ chế phân trang, lọc và các hàm truy vấn tiện lợi mà không cần viết câu lệnh SQL phức tạp.", "Spring Data JPA: ")
    add_bullet_p(doc, "Sử dụng các chú thích (annotations) như @NotBlank, @Min, @NotNull để kiểm soát chặt chẽ tính hợp lệ của dữ liệu đầu vào ngay tại tầng biên Controller, ngăn ngừa lỗi dữ liệu rác.", "Spring Validation: ")
    add_bullet_p(doc, "Tự động quản lý lịch sử tiến hóa cơ sở dữ liệu qua các tệp migration dạng script SQL (từ V1__init_schema đến V5__add_is_deleted_to_categories), đảm bảo tính đồng nhất cấu trúc dữ liệu trên mọi môi trường thử nghiệm.", "Flyway Migration: ")
    
    add_heading_3(doc, "1.2.3. Cơ chế xác thực Spring Security & JWT")
    add_body_p(doc, "Hệ thống áp dụng mô hình bảo mật phi trạng thái (Stateless Authentication) dựa trên JSON Web Token (JWT) kết hợp thuật toán ký số an toàn HMAC-SHA256:")
    add_bullet_p(doc, "Mật khẩu của người dùng được băm một chiều an toàn bằng thuật toán BCrypt kèm muối ngẫu nhiên (salt) trước khi lưu vào cơ sở dữ liệu, chống lại các cuộc tấn công tra cứu bảng băm (Rainbow table).", "Mã hóa mật khẩu BCrypt: ")
    add_bullet_p(doc, "Khi người dùng đăng nhập thành công, máy chủ tạo một chuỗi JWT Token có chứa thông tin định danh và vai trò (Role), có thời hạn sử dụng 24 giờ. Máy chủ không cần duy trì session trong bộ nhớ RAM, giúp hệ thống hoạt động nhẹ nhàng và dễ mở rộng.", "Cơ chế cấp phát Token: ")
    add_bullet_p(doc, "Một bộ lọc bảo mật JwtAuthenticationFilter chặn mọi yêu cầu gửi đến, giải mã token từ Header Authorization, kiểm tra tính hợp lệ và thiết lập ngữ cảnh bảo mật cho người dùng. Phân quyền chặt chẽ giữa 2 vai trò: ADMIN (toàn quyền) và STAFF (chỉ xem bàn, gọi món và thanh toán).", "Kiểm soát truy cập theo vai trò (RBAC): ")
    
    add_heading_2(doc, "1.3. Công nghệ nền tảng phía Frontend")
    add_heading_3(doc, "1.3.1. Thư viện React 18 và ngôn ngữ TypeScript")
    add_body_p(doc, "Giao diện người dùng được xây dựng dựa trên React 18 - thư viện giao diện người dùng phổ biến nhất hiện nay, kết hợp với ngôn ngữ TypeScript:")
    add_bullet_p(doc, "Giao diện được module hóa thành các thành phần tái sử dụng cao như MenuCard, TableCard, CartDrawer, PaymentModal, RevenueChart.", "Kiến trúc hướng thành phần (Component-Based): ")
    add_bullet_p(doc, "React duy trì cây DOM ảo trong bộ nhớ, tính toán sự khác biệt tối thiểu khi trạng thái bàn ăn hoặc giỏ hàng thay đổi để cập nhật lên màn hình với tốc độ cực nhanh mà không cần tải lại toàn bộ trang web.", "Cơ chế Virtual DOM: ")
    add_bullet_p(doc, "Đảm bảo kiểu dữ liệu tĩnh nghiêm ngặt cho toàn bộ các đối tượng dữ liệu (MenuItem, DiningTable, Order, Invoice), phát hiện lỗi lập trình ngay trong quá trình biên dịch (Compile-time), giảm thiểu tối đa các lỗi runtime không mong muốn.", "Ngôn ngữ TypeScript: ")
    
    add_heading_3(doc, "1.3.2. Công cụ đóng gói hiện đại Vite 5")
    add_body_p(doc, "Thay vì sử dụng Webpack truyền thống với thời gian khởi động chậm, dự án lựa chọn Vite 5 làm công cụ đóng gói và máy chủ phát triển cục bộ:")
    add_bullet_p(doc, "Vite tận dụng chuẩn Native ES Modules của trình duyệt hiện đại, giúp máy chủ phát triển khởi động gần như ngay lập tức (< 300ms).", "Khởi động cực nhanh: ")
    add_bullet_p(doc, "Khi lập trình viên chỉnh sửa giao diện CSS hoặc component React, Vite chỉ cập nhật đúng module bị thay đổi mà không cần tải lại trang hay làm mất trạng thái dữ liệu giỏ hàng hiện tại.", "Hot Module Replacement (HMR): ")
    add_bullet_p(doc, "Sử dụng Rollup để tối ưu hóa, nén mã nguồn JavaScript/CSS và chia nhỏ gói mã (Code Splitting), giúp giao diện tải mượt mà ngay cả trên các thiết bị máy tính bảng POS cấu hình khiêm tốn.", "Đóng gói sản phẩm tối ưu: ")
    
    add_heading_3(doc, "1.3.3. Phong cách thiết kế giao diện Glassmorphism và tối ưu UX POS")
    add_body_p(doc, "Đặc thù giao diện điểm bán hàng quán ăn đòi hỏi tính trực quan, độ tương phản rõ ràng và các nút bấm lớn dễ thao tác bằng ngón tay trên màn hình cảm ứng:")
    add_bullet_p(doc, "Hệ thống áp dụng phong cách thiết kế kính mờ hiện đại kết hợp bảng màu ẩm thực ấm áp (đỏ gạch #C0392B, cam san hô, xanh lá cây báo trạng thái bàn trống).", "Thẩm mỹ cao cấp: ")
    add_bullet_p(doc, "Bàn ăn hiển thị trực quan theo dạng thẻ lưới (Grid) với mã bàn, số chỗ ngồi và màu sắc trạng thái rõ ràng (Xanh: Trống, Đỏ cam: Đang có khách, Vàng: Chờ thanh toán). Giỏ hàng dạng trượt bên phải hiển thị rõ danh sách món, số lượng, nút tăng/giảm và ô ghi chú khẩu vị.", "Bố cục công thái học: ")
    add_bullet_p(doc, "Các hiệu ứng phản hồi xúc giác nhẹ nhàng khi nhấn chọn món ăn, thanh tìm kiếm tức thì theo tên món ăn và bộ lọc phân loại danh mục nhanh giúp nhân viên hoàn tất một lượt gọi món chỉ trong vòng chưa đầy 15 giây.", "Tối ưu hóa thao tác: ")
    
    add_heading_2(doc, "1.4. Hệ quản trị cơ sở dữ liệu MySQL 8.0 & Quản lý Migration Flyway")
    add_body_p(doc, "MySQL 8.0 là hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở mạnh mẽ, đáp ứng hoàn hảo các yêu cầu khắt khe về tính nhất quán và độ tin cậy trong giao dịch tài chính:")
    add_bullet_p(doc, "Đảm bảo mọi giao dịch thanh toán hoặc trừ tồn món ăn đều tuân thủ 4 thuộc tính Atomicity (Nguyên tử), Consistency (Nhất quán), Isolation (Cô lập) và Durability (Bền vững).", "Tuân thủ chuẩn ACID: ")
    add_bullet_p(doc, "Các trường dữ liệu thường xuyên tra cứu như category_id, table_id, order_code, status đều được đánh chỉ mục tối ưu, cho phép thực hiện các truy vấn thống kê báo cáo doanh thu hàng tháng chỉ trong vài mili-giây.", "Chỉ mục hiệu quả: ")
    add_bullet_p(doc, "Toàn bộ cấu trúc bảng và dữ liệu mẫu ban đầu được quản lý tuần tự qua Flyway Migration, loại bỏ rủi ro sai lệch cấu trúc bảng giữa máy chủ lập trình và máy chủ vận hành thực tế.", "Kiểm soát phiên bản dữ liệu: ")
    
    add_heading_2(doc, "1.5. Cổng thanh toán mã quét chuẩn quốc gia VietQR")
    add_body_p(doc, "Để bắt kịp xu hướng thanh toán không dùng tiền mặt đang bùng nổ mạnh mẽ tại Việt Nam, hệ thống tích hợp giải pháp thanh toán mã QR chuẩn quốc gia VietQR:")
    add_bullet_p(doc, "Khi khách yêu cầu thanh toán chuyển khoản, hệ thống tự động sinh một mã QR động chứa đầy đủ thông tin: Mã ngân hàng thụ hưởng, Số tài khoản của quán ăn, Số tiền chính xác cần thanh toán và Nội dung chuyển khoản gắn liền với Mã hóa đơn (Invoice Code).", "Cơ chế sinh mã động: ")
    add_bullet_p(doc, "Khách hàng chỉ cần mở bất kỳ ứng dụng ngân hàng số (Mobile Banking) nào, quét mã QR hiển thị trên màn hình POS hoặc trên hóa đơn in ra. Mọi thông tin về số tài khoản, số tiền và nội dung đều được điền tự động 100%, loại bỏ hoàn toàn nguy cơ chuyển khoản nhầm số tiền hoặc nhầm người nhận.", "Thuận tiện và chính xác tuyệt đối: ")
    
    doc.add_page_break()
    
    # -------------------------------------------------------------------------
    # CHƯƠNG 2
    # -------------------------------------------------------------------------
    add_heading_1(doc, "CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG")
    
    add_heading_2(doc, "2.1. Mô tả bài toán quán ăn")
    add_body_p(doc, "Hệ thống Quản lý Quán ăn và Điểm bán hàng trực tiếp (Hương Việt POS & Restaurant Ops) được xây dựng để phục vụ toàn diện hoạt động vận hành thường nhật của một quán ăn với các phân vùng chức năng sau:")
    add_bullet_p(doc, "Hiển thị danh sách tất cả các bàn ăn trong quán kèm trạng thái thực tế: Trống (EMPTY) hoặc Đang có khách (OCCUPIED). Cho phép nhân viên bấm vào bàn trống để mở bàn và tạo đơn mới, hoặc bấm vào bàn đang có khách để xem giỏ hàng hiện tại.", "Khu vực Sơ đồ bàn: ")
    add_bullet_p(doc, "Hiển thị danh sách thực đơn chia theo từng danh mục (Món Khai Vị, Món Chính, Đồ Uống, Tráng Miệng). Nhân viên có thể tìm kiếm món, chọn hình ảnh món ăn, thêm món vào đơn, tăng giảm số lượng và ghi chú yêu cầu riêng của khách.", "Khu vực Bán hàng POS: ")
    add_bullet_p(doc, "Hỗ trợ 2 phương thức thanh toán là Tiền mặt (có tính tiền thừa trả khách) và Chuyển khoản VietQR. Sau khi thanh toán thành công, hệ thống in hóa đơn chi tiết và giải phóng bàn ăn về trạng thái Trống.", "Khu vực Thu ngân & Thanh toán: ")
    add_bullet_p(doc, "Cho phép thêm, sửa thông tin món ăn, tải ảnh trực tiếp từ máy tính lên máy chủ, thiết lập trạng thái phục vụ hoặc tạm ngưng bán. Đặc biệt, hỗ trợ tính năng Xóa mềm (Soft Delete) giúp ẩn món ăn hoặc danh mục không còn kinh doanh mà không làm hỏng dữ liệu lịch sử hóa đơn.", "Khu vực Quản lý thực đơn: ")
    add_bullet_p(doc, "Dành riêng cho Quản trị viên theo dõi tổng doanh thu trong ngày, tổng số đơn đã hoàn thành, tổng số món ăn đang kinh doanh và biểu đồ trực quan thống kê top các món ăn bán chạy nhất.", "Khu vực Báo cáo Dashboard: ")
    
    add_heading_2(doc, "2.2. Yêu cầu bài toán")
    add_heading_3(doc, "2.2.1. Yêu cầu chức năng")
    add_body_p(doc, "Hệ thống đáp ứng đầy đủ các yêu cầu chức năng nghiệp vụ sau:")
    add_bullet_p(doc, "Đăng nhập phân quyền dựa trên tài khoản và mật khẩu, cấp phát mã phiên làm việc JWT.", "F1 - Quản lý xác thực: ")
    add_bullet_p(doc, "Hiển thị danh sách bàn, trạng thái phục vụ theo thời gian thực, mở bàn ăn mới, đổi trạng thái bàn sau thanh toán.", "F2 - Quản lý sơ đồ bàn: ")
    add_bullet_p(doc, "Hiển thị danh mục, tìm kiếm món ăn, chọn món vào giỏ hàng, cập nhật số lượng, thêm ghi chú khẩu vị cho từng món.", "F3 - Nghiệp vụ gọi món POS: ")
    add_bullet_p(doc, "Tạo đơn hàng liên kết với mã bàn, lưu thông tin người tạo đơn, cập nhật trạng thái đơn (PENDING, PAID, CANCELLED).", "F4 - Quản lý đơn hàng: ")
    add_bullet_p(doc, "Xác nhận số tiền, thanh toán bằng Tiền mặt hoặc VietQR, xuất phiếu hóa đơn có mã hóa đơn duy nhất.", "F5 - Thanh toán & In hóa đơn: ")
    add_bullet_p(doc, "Thêm mới món ăn, chỉnh sửa đơn giá/mô tả, chọn tệp ảnh tải lên từ máy tính cục bộ, dừng bán, xóa mềm món và danh mục.", "F6 - Quản lý thực đơn: ")
    add_bullet_p(doc, "Thống kê tổng doanh thu thực thu, số đơn đã hoàn tất, tỷ lệ bàn có khách, vẽ biểu đồ top món bán chạy.", "F7 - Báo cáo thống kê: ")
    
    add_heading_3(doc, "2.2.2. Yêu cầu phi chức năng")
    add_body_p(doc, "Bên cạnh các tính năng nghiệp vụ, hệ thống cam kết đáp ứng các tiêu chuẩn chất lượng kỹ thuật phần mềm:")
    add_bullet_p(doc, "Thời gian phản hồi các yêu cầu gọi món và tra cứu dữ liệu không vượt quá 200ms trên mạng nội bộ LAN.", "Hiệu năng xử lý: ")
    add_bullet_p(doc, "Mật khẩu người dùng được băm mã hóa một chiều BCrypt; các endpoint quan trọng đều yêu cầu xác thực JWT qua HTTP Authorization Header.", "Tính bảo mật: ")
    add_bullet_p(doc, "Đảm bảo tính sẵn sàng cao, cơ chế phòng ngừa lỗi xung đột khóa ngoại khi xóa món ăn nhờ tính năng Soft Delete.", "Độ tin cậy và toàn vẹn dữ liệu: ")
    add_bullet_p(doc, "Giao diện hiện đại, nút bấm rõ ràng, bố cục trực quan thân thiện với người dùng không rành công nghệ, màu sắc tương phản cao.", "Tính tiện dụng (Usability): ")
    
    add_heading_2(doc, "2.3. Kiến trúc tổng thể hệ thống")
    add_body_p(doc, "Hệ thống được tổ chức theo kiến trúc Client-Server phân tầng chuẩn công nghiệp, bảo đảm tính độc lập cao giữa giao diện và logic xử lý dữ liệu:")
    add_bullet_p(doc, "Ứng dụng Single Page Application (SPA) viết bằng React 18 & TypeScript, giao tiếp với máy chủ thông qua giao thức HTTP/HTTPS với định dạng dữ liệu chuẩn JSON.", "Tầng Client (Frontend): ")
    add_bullet_p(doc, "Bao gồm tầng Controller tiếp nhận yêu cầu, tầng Service xử lý nghiệp vụ, tầng Repository giao tiếp cơ sở dữ liệu và Spring Security bảo vệ quyền truy cập.", "Tầng Server (Backend): ")
    add_bullet_p(doc, "Cơ sở dữ liệu quan hệ MySQL 8.0 lưu trữ bền vững các bảng dữ liệu nghiệp vụ.", "Tầng Dữ liệu (Database): ")
    
    # Placeholder Hình 2.1
    ascii_arch = """
+-----------------------------------------------------------------------------------+
|                        TẦNG TRÌNH DIỄN (FRONTEND - REACT 18 / VITE)               |
|   +-------------------+   +--------------------+   +--------------------------+   |
|   | Sơ đồ bàn ăn POS  |   | Giỏ hàng gọi món   |   | Quản lý thực đơn & Món   |   |
|   +-------------------+   +--------------------+   +--------------------------+   |
+------------------------------------------+----------------------------------------+
                                           | HTTP REST / JSON API (JWT Token)
+------------------------------------------v----------------------------------------+
|                        TẦNG ỨNG DỤNG (BACKEND - SPRING BOOT 3.3.4)                |
|   +---------------------------------------------------------------------------+   |
|   | Controller Layer (AuthController, TableController, OrderController, ...)  |   |
|   +-------------------------------------+-------------------------------------+   |
|                                         |
|   +-------------------------------------v-------------------------------------+   |
|   | Service Layer (OrderService, TableService, MenuItemService, ...)          |   |
|   +-------------------------------------+-------------------------------------+   |
|                                         |
|   +-------------------------------------v-------------------------------------+   |
|   | Repository Layer (Spring Data JPA / Hibernate)                            |   |
|   +---------------------------------------------------------------------------+   |
+------------------------------------------+----------------------------------------+
                                           | JDBC Connection Pool (HikariCP)
+------------------------------------------v----------------------------------------+
|                   TẦNG DỮ LIỆU BỀN VỮNG (DATABASE - MYSQL 8.0)                    |
|       [users]  [dining_tables]  [categories]  [menu_items]  [orders]  [payments]  |
+-----------------------------------------------------------------------------------+
"""
    add_figure_placeholder(doc, "2.1", "Sơ đồ kiến trúc 3 lớp Client - Server tổng thể của hệ thống Quản lý Quán ăn", "Sơ đồ kiến trúc phân tầng hệ thống", ascii_arch)
    
    add_heading_2(doc, "2.4. Biểu đồ Use Case")
    add_heading_3(doc, "2.4.1. Biểu đồ Use Case tổng quát")
    add_body_p(doc, "Hệ thống xác định 02 tác nhân chính tham gia tương tác: Quản trị viên (Admin - Chủ quán) và Nhân viên (Staff - Phục vụ/Thu ngân). Dưới đây là biểu đồ Use Case tổng quát mô tả sự phân chia quyền hạn giữa các tác nhân:")
    
    ascii_uc_all = """
          +---------------+
          |   NHÂN VIÊN   |
          |    (Staff)    |
          +-------+-------+
                  |
     +------------+------------+---------------+---------------+
     |            |            |               |               |
     v            v            v               v               v
(UC_01: Đăng nhập) (UC_06: Xem bàn) (UC_08: Gọi món) (UC_10: Đổi món) (UC_15: Thanh toán)
     ^            ^            ^               ^               ^
     |            |            |               |               |
     +------------+------------+---------------+---------------+
                  |
                  |     +----------------------+  +---------------------+
                  +---->| UC_05: Quản lý món ăn|  | UC_18: Báo cáo D-Thu|
                  |     +----------------------+  +---------------------+
                  |                ^                         ^
          +-------+-------+        |                         |
          | QUẢN TRỊ VIÊN |--------+-------------------------+
          |    (Admin)    |
          +---------------+
"""
    add_figure_placeholder(doc, "2.2", "Sơ đồ Use Case tổng quát hệ thống Quản lý Quán ăn Hương Việt", "Biểu đồ tổng quan các ca sử dụng", ascii_uc_all)
    
    add_heading_3(doc, "2.4.2. Biểu đồ Use Case phân hệ Quản trị viên (Admin)")
    add_body_p(doc, "Tác nhân Quản trị viên (Admin) kế thừa toàn bộ quyền của Nhân viên, đồng thời nắm giữ các quyền hạn tối cao về quản trị dữ liệu:")
    add_bullet_p(doc, "Xem tổng quan doanh thu trong ngày, biểu đồ xu hướng doanh số và danh sách top món ăn bán chạy.", "Quản lý Báo cáo Dashboard: ")
    add_bullet_p(doc, "Thêm mới danh mục món ăn, sửa tên danh mục, xóa mềm danh mục không còn phục vụ.", "Quản trị Danh mục: ")
    add_bullet_p(doc, "Thêm món ăn mới, chỉnh sửa đơn giá, thay đổi hình ảnh đại diện món ăn từ máy tính, tạm dừng bán hoặc xóa mềm món ăn.", "Quản trị Món ăn: ")
    add_bullet_p(doc, "Thêm bàn mới, chỉnh sửa sức chứa của từng bàn ăn, xem lịch sử tất cả các hóa đơn của quán.", "Quản trị Bàn & Đơn hàng: ")
    
    add_figure_placeholder(doc, "2.3", "Sơ đồ Use Case phân hệ Quản trị viên (Admin)", "Biểu đồ các ca sử dụng phía Quản trị viên")
    
    add_heading_3(doc, "2.4.3. Biểu đồ Use Case phân hệ Nhân viên (Staff / Thu ngân / Phục vụ)")
    add_body_p(doc, "Tác nhân Nhân viên tập trung vào các thao tác bán hàng và phục vụ khách trực tiếp:")
    add_bullet_p(doc, "Quan sát danh sách bàn và màu sắc trạng thái (Xanh: Trống, Đỏ cam: Đang phục vụ).", "Xem sơ đồ bàn: ")
    add_bullet_p(doc, "Mở bàn ăn, thêm các món ăn vào giỏ hàng, tăng giảm số lượng, nhập ghi chú khẩu vị cho đầu bếp.", "Gọi món (POS): ")
    add_bullet_p(doc, "Chọn phương thức tiền mặt hoặc quét mã QR VietQR, xác nhận thanh toán, xuất phiếu in hóa đơn cho khách.", "Thanh toán & Trả bàn: ")
    
    add_figure_placeholder(doc, "2.4", "Sơ đồ Use Case phân hệ Nhân viên phục vụ và Thu ngân (Staff)", "Biểu đồ các ca sử dụng phía Nhân viên")
    
    add_heading_2(doc, "2.5. Mô tả chi tiết các Use Case chính")
    add_body_p(doc, "Nhằm phục vụ công tác cài đặt và kiểm thử chính xác, 07 ca sử dụng trọng tâm nhất của hệ thống được đặc tả chi tiết theo biểu mẫu chuẩn 9 mục quy định:")
    
    # Bảng 2.1: UC_01 Đăng nhập
    add_usecase_detail_table(
        doc, "2.1", "UC_01", "Đăng nhập hệ thống (UC_DANGNHAP)",
        "Quản trị viên (Admin), Nhân viên (Staff)",
        "Cho phép người dùng xác thực danh tính bằng tên đăng nhập và mật khẩu để truy cập vào hệ thống",
        "Người dùng truy cập vào địa chỉ hệ thống và bấm nút Đăng nhập",
        "Người dùng đã được cấp tài khoản hợp lệ trong cơ sở dữ liệu và đang ở trạng thái ACTIVE",
        [
            (1, "Người dùng", "Nhập tên đăng nhập (username) và mật khẩu (password) vào form đăng nhập"),
            (2, "Người dùng", "Bấm nút \"Đăng nhập\""),
            (3, "Hệ thống", "Kiểm tra tính hợp lệ của dữ liệu đầu vào (không được để trống)"),
            (4, "Hệ thống", "Mã hóa mật khẩu và so khớp với chuỗi băm BCrypt trong bảng users"),
            (5, "Hệ thống", "Khởi tạo chuỗi JWT Token có chứa thông tin user và vai trò (Role), trả về cho Frontend"),
            (6, "Hệ thống", "Lưu token vào LocalStorage và chuyển hướng người dùng đến giao diện tương ứng với quyền hạn")
        ],
        [
            ("1a", "Hệ thống", "Nếu tên đăng nhập không tồn tại hoặc mật khẩu không chính xác, hệ thống hiển thị thông báo lỗi \"Tên đăng nhập hoặc mật khẩu không đúng\" và yêu cầu nhập lại"),
            ("1b", "Hệ thống", "Nếu tài khoản đang ở trạng thái INACTIVE hoặc LOCKED, hiển thị thông báo \"Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên\"")
        ],
        "Người dùng đăng nhập thành công, phiên làm việc được lưu trữ và có quyền truy cập vào các chức năng theo vai trò"
    )
    add_figure_placeholder(doc, "2.5", "Sơ đồ Use Case phân rã chức năng Đăng nhập hệ thống", "Biểu đồ phân rã ca sử dụng đăng nhập")
    
    # Bảng 2.2: UC_06 Quản lý sơ đồ bàn
    add_usecase_detail_table(
        doc, "2.2", "UC_06", "Quản lý sơ đồ bàn (UC_QUANLY_BAN)",
        "Quản trị viên, Nhân viên phục vụ",
        "Hiển thị danh sách bàn ăn, trạng thái sử dụng thực tế và hỗ trợ thao tác chuyển đổi trạng thái bàn",
        "Người dùng chọn menu \"Sơ đồ bàn\" trên thanh điều hướng",
        "Người dùng đã đăng nhập thành công vào hệ thống",
        [
            (1, "Người dùng", "Truy cập màn hình Sơ đồ bàn ăn"),
            (2, "Hệ thống", "Gửi yêu cầu GET /api/tables đến Backend để lấy danh sách bàn"),
            (3, "Hệ thống", "Hiển thị danh sách các thẻ bàn với màu sắc trực quan (Xanh: Trống, Đỏ cam: Đang phục vụ)"),
            (4, "Người dùng", "Bấm vào một bàn ăn cụ thể để thực hiện mở bàn mới hoặc xem đơn hàng hiện tại")
        ],
        [
            ("1a", "Hệ thống", "Nếu kết nối mạng gặp sự cố, hiển thị thông báo lỗi \"Không thể tải danh sách bàn, vui lòng thử lại\"")
        ],
        "Sơ đồ bàn được cập nhật chính xác theo dữ liệu mới nhất trên máy chủ"
    )
    add_figure_placeholder(doc, "2.6", "Sơ đồ Use Case phân rã chức năng Quản lý sơ đồ bàn", "Biểu đồ phân rã ca sử dụng sơ đồ bàn")
    
    # Bảng 2.3: UC_05 Quản lý thực đơn & Món ăn
    add_usecase_detail_table(
        doc, "2.3", "UC_05", "Quản lý thực đơn & Món ăn (UC_QUANLY_MONAN)",
        "Quản trị viên (Admin)",
        "Cho phép Admin thêm món mới, cập nhật giá tiền, chọn ảnh từ máy tính, tạm dừng bán hoặc xóa mềm món ăn",
        "Admin chọn chức năng \"Quản lý thực đơn\" trên menu",
        "Người dùng đăng nhập với quyền Quản trị viên (ADMIN)",
        [
            (1, "Admin", "Mở giao diện Quản lý Thực đơn và bấm nút \"Thêm món mới\""),
            (2, "Hệ thống", "Hiển thị cửa sổ Modal nhập thông tin món: Tên món, Danh mục, Đơn giá, Mô tả và Khung tải ảnh"),
            (3, "Admin", "Nhập thông tin, bấm nút \"Chọn tệp ảnh từ máy\" để tải ảnh đại diện món ăn lên"),
            (4, "Hệ thống", "Tải ảnh lên thư mục lưu trữ /uploads/ của Backend và trả về đường dẫn ảnh"),
            (5, "Admin", "Bấm nút \"Lưu món ăn\""),
            (6, "Hệ thống", "Lưu thông tin món vào bảng menu_items và cập nhật danh sách hiển thị ngay lập tức")
        ],
        [
            ("1a", "Admin", "Nếu Admin bấm nút \"Xóa món\", hệ thống kiểm tra: Món ăn được đánh dấu is_deleted = TRUE (Xóa mềm), ẩn khỏi thực đơn bán hàng nhưng bảo toàn lịch sử hóa đơn cũ")
        ],
        "Thực đơn quán ăn được cập nhật thành công mà không gây ảnh hưởng đến tính toàn vẹn dữ liệu"
    )
    add_figure_placeholder(doc, "2.7", "Sơ đồ Use Case phân rã chức năng Quản lý món ăn và danh mục", "Biểu đồ phân rã ca sử dụng thực đơn")
    
    # Bảng 2.4: UC_08 Mở bàn và Tạo đơn gọi món
    add_usecase_detail_table(
        doc, "2.4", "UC_08", "Mở bàn và Tạo đơn gọi món (UC_GOIMON_POS)",
        "Nhân viên phục vụ (Staff)",
        "Tạo đơn hàng mới gắn liền với bàn ăn và lưu danh sách món khách chọn",
        "Nhân viên bấm vào một bàn ăn đang ở trạng thái Trống",
        "Bàn ăn được chọn đang ở trạng thái EMPTY",
        [
            (1, "Nhân viên", "Chọn bàn trống trên sơ đồ bàn ăn"),
            (2, "Hệ thống", "Mở giao diện gọi món POS và giỏ hàng tương ứng với bàn ăn đã chọn"),
            (3, "Nhân viên", "Bấm chọn các món ăn từ danh mục để thêm vào giỏ hàng"),
            (4, "Nhân viên", "Điều chỉnh số lượng từng món, thêm ghi chú riêng nếu khách yêu cầu"),
            (5, "Nhân viên", "Bấm nút \"Xác nhận gọi món\""),
            (6, "Hệ thống", "Tạo một bản ghi đơn hàng mới trong bảng orders, lưu các dòng món vào bảng order_items"),
            (7, "Hệ thống", "Cập nhật trạng thái của bàn ăn từ EMPTY sang OCCUPIED")
        ],
        [
            ("1a", "Hệ thống", "Nếu giỏ hàng đang trống, hiển thị cảnh báo \"Vui lòng chọn ít nhất một món ăn trước khi xác nhận đơn\"")
        ],
        "Đơn hàng được lưu thành công, bàn ăn chuyển sang trạng thái đang có khách phục vụ"
    )
    add_figure_placeholder(doc, "2.8", "Sơ đồ Use Case phân rã chức năng Mở bàn và Tạo đơn gọi món", "Biểu đồ phân rã ca sử dụng gọi món POS")
    
    # Bảng 2.5: UC_10 Thêm món, ghi chú và cập nhật đơn hàng
    add_usecase_detail_table(
        doc, "2.5", "UC_10", "Thêm món, ghi chú và cập nhật đơn hàng (UC_CAPNHAT_ORDER)",
        "Nhân viên phục vụ, Thu ngân",
        "Cho phép bổ sung món ăn mới hoặc chỉnh sửa ghi chú của đơn hàng đang phục vụ",
        "Khách hàng gọi thêm món hoặc yêu cầu đổi món",
        "Bàn ăn đang ở trạng thái OCCUPIED và đơn hàng đang ở trạng thái PENDING",
        [
            (1, "Nhân viên", "Chọn bàn ăn đang có khách trên sơ đồ bàn"),
            (2, "Hệ thống", "Tải đơn hàng hiện tại của bàn và hiển thị danh sách các món đã gọi"),
            (3, "Nhân viên", "Chọn thêm các món ăn mới vào giỏ hàng hoặc cập nhật số lượng"),
            (4, "Nhân viên", "Bấm \"Cập nhật đơn hàng\""),
            (5, "Hệ thống", "Tính toán lại tổng tiền tạm tính và cập nhật các dòng món trong order_items")
        ],
        [
            ("1a", "Nhân viên", "Nếu khách yêu cầu hủy món chưa phục vụ, nhân viên giảm số lượng món về 0 để xóa dòng món đó")
        ],
        "Đơn hàng được cập nhật mới nhất, tổng tiền được tính toán lại chính xác"
    )
    
    # Bảng 2.6: UC_15 Thanh toán và In hóa đơn
    add_usecase_detail_table(
        doc, "2.6", "UC_15", "Thanh toán và In hóa đơn (UC_THANHTOAN_HOADON)",
        "Thu ngân, Nhân viên phục vụ",
        "Thực hiện thu tiền của khách bằng Tiền mặt hoặc VietQR, in hóa đơn và giải phóng bàn ăn",
        "Khách hàng yêu cầu thanh toán hóa đơn của bàn",
        "Đơn hàng của bàn đang ở trạng thái PENDING và có tổng tiền hợp lệ",
        [
            (1, "Thu ngân", "Mở đơn hàng của bàn và bấm nút \"Thanh toán\""),
            (2, "Hệ thống", "Hiển thị cửa sổ thanh toán với tổng số tiền cần thu"),
            (3, "Thu ngân", "Chọn phương thức thanh toán: \"Tiền mặt\" (nhập số tiền khách đưa để xem tiền thừa) hoặc \"Chuyển khoản VietQR\""),
            (4, "Hệ thống", "Nếu chọn VietQR, tự động tạo mã QR động ngân hàng chứa số tiền và mã hóa đơn"),
            (5, "Thu ngân", "Xác nhận đã nhận đủ tiền và bấm nút \"Hoàn tất thanh toán\""),
            (6, "Hệ thống", "Cập nhật trạng thái đơn hàng sang PAID, tạo bản ghi trong bảng payments"),
            (7, "Hệ thống", "Tự động chuyển trạng thái bàn ăn từ OCCUPIED về lại EMPTY (Trống)"),
            (8, "Hệ thống", "Hiển thị bản xem trước hóa đơn và kích hoạt hộp thoại in phiếu thanh toán")
        ],
        [
            ("1a", "Thu ngân", "Nếu số tiền mặt khách đưa nhỏ hơn tổng tiền hóa đơn, hệ thống báo lỗi \"Số tiền khách đưa chưa đủ\" và không cho hoàn tất")
        ],
        "Hóa đơn được thanh toán trọn vẹn, doanh thu được ghi nhận, bàn ăn trở về trạng thái trống sẵn sàng đón lượt khách tiếp theo"
    )
    add_figure_placeholder(doc, "2.9", "Sơ đồ Use Case phân rã chức năng Thanh toán và In hóa đơn", "Biểu đồ phân rã ca sử dụng thanh toán")
    
    # Bảng 2.7: UC_18 Thống kê doanh thu Dashboard
    add_usecase_detail_table(
        doc, "2.7", "UC_18", "Thống kê doanh thu Dashboard (UC_THONGKE_DOANHTHU)",
        "Quản trị viên (Admin)",
        "Tổng hợp các chỉ số kinh doanh: Doanh thu thực thu, số đơn hoàn thành, tỷ lệ lấp đầy bàn và top món bán chạy",
        "Admin truy cập trang Bảng điều khiển (Dashboard)",
        "Người dùng đăng nhập với quyền ADMIN",
        [
            (1, "Admin", "Chọn menu \"Dashboard / Báo cáo\""),
            (2, "Hệ thống", "Gửi yêu cầu tổng hợp dữ liệu thống kê từ Backend"),
            (3, "Hệ thống", "Truy vấn các đơn hàng có trạng thái PAID trong ngày và tính tổng doanh thu"),
            (4, "Hệ thống", "Thống kê số lượng từng món ăn đã bán và sắp xếp giảm dần"),
            (5, "Hệ thống", "Hiển thị các thẻ chỉ số KPI và biểu đồ trực quan hóa dữ liệu trên giao diện")
        ],
        [
            ("1a", "Hệ thống", "Nếu chưa có đơn hàng nào được thanh toán trong ngày, hiển thị doanh thu bằng 0 kèm thông điệp thân thiện")
        ],
        "Admin nắm bắt chính xác tình hình kinh doanh của quán theo thời gian thực"
    )
    
    add_heading_2(doc, "2.6. Thiết kế Backend hệ thống")
    add_heading_3(doc, "2.6.1. Thiết kế biểu đồ trình tự (Sequence Diagrams)")
    add_body_p(doc, "Biểu đồ trình tự mô tả chi tiết dòng thông điệp trao đổi theo thời gian giữa các thành phần giao diện, các tầng xử lý Backend và cơ sở dữ liệu:")
    
    # Sequence 1: Đăng nhập
    ascii_seq_auth = """
User/Client                AuthController          AuthService          UserRepository        Database
    |                            |                      |                      |                 |
    |-- 1. POST /api/auth/login->|                      |                      |                 |
    |   {username, password}     |                      |                      |                 |
    |                            |-- 2. authenticate()->|                      |                 |
    |                            |                      |-- 3. findByUsername->|                 |
    |                            |                      |                      |-- 4. SELECT --->|
    |                            |                      |                      |<- 5. User Data -|
    |                            |                      |<- 6. User Entity ----|                 |
    |                            |                      |-- 7. checkPassword() |                 |
    |                            |                      |-- 8. generateJWT()   |                 |
    |                            |<- 9. AuthResponse ---|                      |                 |
    |<- 10. 200 OK (Token, Role)-|
"""
    add_figure_placeholder(doc, "2.10", "Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Đăng nhập & Cấp phát JWT", "Biểu đồ tuần tự quy trình xác thực JWT", ascii_seq_auth)
    
    # Sequence 2: Gọi món POS
    ascii_seq_order = """
Staff/POS                 OrderController         OrderService         TableRepo     OrderRepo    Database
    |                            |                      |                  |             |           |
    |-- 1. POST /api/orders ---->|                      |                  |             |           |
    |   {tableId, items: [...]}  |-- 2. createOrder() ->|                  |             |           |
    |                            |                      |-- 3. findTable()->|             |           |
    |                            |                      |                  |-- SELECT -->|           |
    |                            |                      |<- 4. Table(EMPTY)|             |           |
    |                            |                      |-- 5. saveOrder() ------------->|           |
    |                            |                      |                                |-- INSERT->|
    |                            |                      |-- 6. updateStatus(OCCUPIED) -->|           |
    |                            |                      |                                |-- UPDATE->|
    |                            |<- 7. OrderResponse --|                  |             |           |
    |<- 8. 201 Created (Order)---|
"""
    add_figure_placeholder(doc, "2.11", "Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Tạo đơn gọi món & Chuyển trạng thái bàn sang OCCUPIED", "Biểu đồ tuần tự quy trình tạo đơn và đổi trạng thái bàn", ascii_seq_order)
    
    # Sequence 3: Thanh toán
    ascii_seq_pay = """
Cashier/POS              PaymentController       PaymentService       OrderRepo     TableRepo     Database
    |                            |                      |                 |             |            |
    |-- 1. POST /api/payments -->|                      |                 |             |            |
    |   {orderId, method: CASH}  |-- 2. processPay() -->|                 |             |            |
    |                            |                      |-- 3. getOrder()->|             |            |
    |                            |                      |<- 4. Order -----|             |            |
    |                            |                      |-- 5. updateStatus(PAID) ----->|            |
    |                            |                      |-- 6. createPaymentRecord() ----------------> INSERT
    |                            |                      |-- 7. updateTable(EMPTY) ----->|            |
    |                            |                      |                               |-- UPDATE ->|
    |                            |<- 8. InvoiceDTO -----|                 |             |            |
    |<- 9. 200 OK (Invoice) -----|
"""
    add_figure_placeholder(doc, "2.12", "Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Thanh toán hóa đơn & Trả bàn về EMPTY", "Biểu đồ tuần tự quy trình thanh toán và trả bàn trống", ascii_seq_pay)
    
    add_heading_3(doc, "2.6.2. Thiết kế biểu đồ lớp phân tích (VOPC Diagrams)")
    add_body_p(doc, "Mô hình VOPC (View of Participating Classes) phân tách rõ ràng các lớp tham gia ca sử dụng theo mô hình 3 thành phần: Lớp biên (Boundary), Lớp điều khiển (Control) và Lớp thực thể dữ liệu (Entity):")
    
    ascii_vopc_order = """
+-----------------------+         +--------------------------+         +------------------------+
|   <<Boundary>>        |         |       <<Control>>        |         |       <<Entity>>       |
|    PosOrderView       |-------->|       OrderService       |-------->|      OrderEntity       |
| (Màn hình gọi món POS)|         | (Xử lý nghiệp vụ đơn)    |         | (Bảng orders)          |
+-----------------------+         +--------------------------+         +------------------------+
                                                |                                   |
                                                |                      +------------v-----------+
                                                |                      |     OrderItemEntity    |
                                                v                      | (Bảng order_items)     |
                                  +--------------------------+         +------------------------+
                                  |       TableService       |                      |
                                  | (Quản lý trạng thái bàn) |-------->+------------v-----------+
                                  +--------------------------+         |   DiningTableEntity    |
                                                                       | (Bảng dining_tables)   |
                                                                       +------------------------+
"""
    add_figure_placeholder(doc, "2.13", "Biểu đồ lớp phân tích (VOPC) phân hệ Gọi món và Quản lý bàn", "Biểu đồ VOPC phân hệ gọi món", ascii_vopc_order)
    
    ascii_vopc_pay = """
+-----------------------+         +--------------------------+         +------------------------+
|     <<Boundary>>      |         |       <<Control>>        |         |       <<Entity>>       |
|    PaymentModal       |-------->|      PaymentService      |-------->|     PaymentEntity      |
| (Cửa sổ thanh toán)   |         | (Xử lý thanh toán & QR)  |         | (Bảng payments)        |
+-----------------------+         +--------------------------+         +------------------------+
                                                |
                                                v
+-----------------------+         +--------------------------+         +------------------------+
|     <<Boundary>>      |         |       <<Control>>        |         |       <<Entity>>       |
|      MenuView         |-------->|     MenuItemService      |-------->|     MenuItemEntity     |
| (Quản lý thực đơn)    |         | (Xử lý món ăn & upload)  |         | (Bảng menu_items)      |
+-----------------------+         +--------------------------+         +------------------------+
"""
    add_figure_placeholder(doc, "2.14", "Biểu đồ lớp phân tích (VOPC) phân hệ Thanh toán và Quản lý thực đơn", "Biểu đồ VOPC phân hệ thanh toán và thực đơn", ascii_vopc_pay)
    
    add_heading_3(doc, "2.6.3. Thiết kế cơ sở dữ liệu")
    add_body_p(doc, "Cơ sở dữ liệu restaurant_management bao gồm 07 bảng quan hệ được thiết kế chuẩn hóa mức 3NF, bảo đảm tính nhất quán dữ liệu và tối ưu hiệu năng truy vấn:")
    
    ascii_erd = """
+------------------+         +---------------------+         +---------------------+
|      users       |         |     categories      |         |    dining_tables    |
+------------------+         +---------------------+         +---------------------+
| id (PK)          |         | id (PK)             |         | id (PK)             |
| username (UQ)    |         | name (UQ)           |         | code (UQ)           |
| password_hash    |         | description         |         | name                |
| full_name        |         | display_order       |         | capacity            |
| role (ADMIN/STAFF|         | is_deleted (BOOLEAN)|         | status (EMPTY/OCC.) |
+--------+---------+         +----------+----------+         +----------+----------+
         |                              |                               |
         | 1                            | 1                             | 1
         |                              |                               |
         | N                            | N                             | N
+--------v---------+         +----------v----------+         +----------v----------+
|      orders      |         |     menu_items      |         |       orders        |
+------------------+         +---------------------+         +---------------------+
| id (PK)          |         | id (PK)             |         | id (PK)             |
| order_code (UQ)  |         | category_id (FK)    |         | table_id (FK)       |
| table_id (FK)    |         | name                |         | final_amount        |
| created_by (FK)  |         | price               |         | status (PENDING/PAID|
| status           |         | image_url           |         +----------+----------+
+--------+---------+         | is_deleted (BOOLEAN)|                    |
         |                   +----------+----------+                    | 1
         |                              |                               |
         | 1                            | 1                             |
         |                              |                               |
         | N                            | N                             | 1
+--------v------------------------------v----------+         +----------v----------+
|                   order_items                    |         |      payments       |
+--------------------------------------------------+         +---------------------+
| id (PK)                                          |         | id (PK)             |
| order_id (FK)                                    |         | order_id (FK, UQ)   |
| menu_item_id (FK)                                |         | invoice_code (UQ)   |
| item_name, price_at_order, quantity, subtotal    |         | amount, method      |
+--------------------------------------------------+         +---------------------+
"""
    add_figure_placeholder(doc, "2.15", "Sơ đồ quan hệ thực thể ERD cơ sở dữ liệu restaurant_management", "Sơ đồ ERD 7 bảng cơ sở dữ liệu", ascii_erd)
    
    # 7 Bảng CSDL
    # Bảng 2.8: users
    users_data = [
        ("id", "BIGINT", "PK, Auto Inc", "Khóa chính định danh người dùng"),
        ("username", "VARCHAR(50)", "Not Null, Unique", "Tên đăng nhập hệ thống"),
        ("password_hash", "VARCHAR(255)", "Not Null", "Chuỗi mật khẩu băm BCrypt"),
        ("full_name", "VARCHAR(100)", "Not Null", "Họ và tên đầy đủ của nhân viên/admin"),
        ("phone", "VARCHAR(20)", "Null", "Số điện thoại liên lạc"),
        ("role", "VARCHAR(20)", "Not Null, Default 'STAFF'", "Vai trò người dùng: ADMIN hoặc STAFF"),
        ("status", "VARCHAR(20)", "Not Null, Default 'ACTIVE'", "Trạng thái tài khoản: ACTIVE, INACTIVE"),
        ("created_at", "TIMESTAMP", "Not Null, Current Time", "Thời điểm tạo tài khoản"),
        ("updated_at", "TIMESTAMP", "Not Null, Auto Update", "Thời điểm cập nhật tài khoản gần nhất")
    ]
    add_formatted_table(doc, "2.8", "Cấu trúc dữ liệu bảng users (Tài khoản người dùng và phân quyền)", ["Tên trường", "Kiểu dữ liệu", "Ràng buộc", "Ý nghĩa nghiệp vụ"], users_data, [Cm(3.2), Cm(3.0), Cm(3.8), Cm(5.5)])
    
    # Bảng 2.9: categories
    cat_data = [
        ("id", "BIGINT", "PK, Auto Inc", "Khóa chính danh mục"),
        ("name", "VARCHAR(100)", "Not Null, Unique", "Tên danh mục món (Khai vị, Món chính, Đồ uống)"),
        ("description", "VARCHAR(255)", "Null", "Mô tả ngắn gọn danh mục"),
        ("display_order", "INT", "Not Null, Default 0", "Thứ tự sắp xếp hiển thị trên giao diện"),
        ("active", "BOOLEAN", "Not Null, Default TRUE", "Trạng thái hiển thị danh mục"),
        ("is_deleted", "BOOLEAN", "Not Null, Default FALSE", "Cờ xóa mềm (Soft Delete) bảo vệ dữ liệu"),
        ("created_at", "TIMESTAMP", "Not Null, Current Time", "Thời điểm tạo danh mục")
    ]
    add_formatted_table(doc, "2.9", "Cấu trúc dữ liệu bảng categories (Danh mục món ăn)", ["Tên trường", "Kiểu dữ liệu", "Ràng buộc", "Ý nghĩa nghiệp vụ"], cat_data, [Cm(3.2), Cm(3.0), Cm(3.8), Cm(5.5)])
    
    # Bảng 2.10: menu_items
    items_data = [
        ("id", "BIGINT", "PK, Auto Inc", "Khóa chính món ăn"),
        ("category_id", "BIGINT", "FK -> categories(id)", "Khóa ngoại liên kết danh mục món"),
        ("name", "VARCHAR(150)", "Not Null", "Tên món ăn hoặc thức uống"),
        ("description", "TEXT", "Null", "Mô tả chi tiết nguyên liệu, hương vị"),
        ("price", "DECIMAL(12,2)", "Not Null", "Đơn giá niêm yết (VNĐ)"),
        ("image_url", "VARCHAR(500)", "Null", "Đường dẫn ảnh món (link web hoặc tệp tải lên)"),
        ("status", "VARCHAR(20)", "Default 'AVAILABLE'", "Trạng thái bán: AVAILABLE hoặc OUT_OF_STOCK"),
        ("is_deleted", "BOOLEAN", "Default FALSE", "Cờ xóa mềm (Soft Delete) khi dừng kinh doanh")
    ]
    add_formatted_table(doc, "2.10", "Cấu trúc dữ liệu bảng menu_items (Món ăn / Đồ uống trong thực đơn)", ["Tên trường", "Kiểu dữ liệu", "Ràng buộc", "Ý nghĩa nghiệp vụ"], items_data, [Cm(3.2), Cm(3.0), Cm(3.8), Cm(5.5)])
    
    # Bảng 2.11: dining_tables
    tables_data = [
        ("id", "BIGINT", "PK, Auto Inc", "Khóa chính bàn ăn"),
        ("code", "VARCHAR(30)", "Not Null, Unique", "Mã hiệu bàn ăn (B01, B02, VIP01)"),
        ("name", "VARCHAR(100)", "Not Null", "Tên hiển thị (Bàn 01 Tầng 1, Phòng VIP)"),
        ("capacity", "INT", "Default 4", "Số ghế / Sức chứa tối đa của bàn"),
        ("status", "VARCHAR(20)", "Default 'EMPTY'", "Trạng thái phục vụ: EMPTY hoặc OCCUPIED")
    ]
    add_formatted_table(doc, "2.11", "Cấu trúc dữ liệu bảng dining_tables (Sơ đồ bàn ăn và trạng thái phục vụ)", ["Tên trường", "Kiểu dữ liệu", "Ràng buộc", "Ý nghĩa nghiệp vụ"], tables_data, [Cm(3.2), Cm(3.0), Cm(3.8), Cm(5.5)])
    
    # Bảng 2.12: orders
    orders_data = [
        ("id", "BIGINT", "PK, Auto Inc", "Khóa chính đơn hàng"),
        ("order_code", "VARCHAR(30)", "Not Null, Unique", "Mã đơn hàng duy nhất (ORD-XXXX)"),
        ("table_id", "BIGINT", "FK -> dining_tables(id)", "Bàn ăn phục vụ đơn"),
        ("created_by_user_id", "BIGINT", "FK -> users(id)", "Nhân viên tạo đơn hàng"),
        ("subtotal_amount", "DECIMAL(12,2)", "Default 0.00", "Tổng tiền món ăn trước giảm giá"),
        ("discount_amount", "DECIMAL(12,2)", "Default 0.00", "Tiền chiết khấu giảm giá"),
        ("final_amount", "DECIMAL(12,2)", "Default 0.00", "Tổng tiền thực thanh toán"),
        ("status", "VARCHAR(20)", "Default 'PENDING'", "Trạng thái đơn: PENDING, PAID, CANCELLED")
    ]
    add_formatted_table(doc, "2.12", "Cấu trúc dữ liệu bảng orders (Đơn gọi món tại bàn)", ["Tên trường", "Kiểu dữ liệu", "Ràng buộc", "Ý nghĩa nghiệp vụ"], orders_data, [Cm(3.2), Cm(3.0), Cm(3.8), Cm(5.5)])
    
    # Bảng 2.13: order_items
    order_items_data = [
        ("id", "BIGINT", "PK, Auto Inc", "Khóa chính dòng món"),
        ("order_id", "BIGINT", "FK -> orders(id)", "Khóa ngoại thuộc đơn hàng"),
        ("menu_item_id", "BIGINT", "FK -> menu_items(id)", "Khóa ngoại món ăn tương ứng"),
        ("item_name", "VARCHAR(150)", "Not Null", "Tên món ăn tại thời điểm gọi"),
        ("price_at_order", "DECIMAL(12,2)", "Not Null", "Đơn giá tại thời điểm gọi món"),
        ("quantity", "INT", "Not Null, Default 1", "Số lượng đĩa / cốc được gọi"),
        ("subtotal", "DECIMAL(12,2)", "Not Null", "Thành tiền dòng món (đơn giá * số lượng)"),
        ("note", "VARCHAR(255)", "Null", "Ghi chú khẩu vị (ít cay, không hành, v.v.)")
    ]
    add_formatted_table(doc, "2.13", "Cấu trúc dữ liệu bảng order_items (Chi tiết từng món ăn trong đơn)", ["Tên trường", "Kiểu dữ liệu", "Ràng buộc", "Ý nghĩa nghiệp vụ"], order_items_data, [Cm(3.2), Cm(3.0), Cm(3.8), Cm(5.5)])
    
    # Bảng 2.14: payments
    pay_data = [
        ("id", "BIGINT", "PK, Auto Inc", "Khóa chính bản ghi thanh toán"),
        ("order_id", "BIGINT", "FK -> orders(id), Unique", "Khóa ngoại liên kết đơn hàng đã thanh toán"),
        ("invoice_code", "VARCHAR(30)", "Not Null, Unique", "Mã số hóa đơn (INV-XXXX) in cho khách"),
        ("amount_paid", "DECIMAL(12,2)", "Not Null", "Tổng số tiền thực thu"),
        ("payment_method", "VARCHAR(20)", "Not Null", "Phương thức: CASH (tiền mặt) hoặc VIETQR"),
        ("created_at", "TIMESTAMP", "Current Time", "Thời điểm xuất hóa đơn thanh toán")
    ]
    add_formatted_table(doc, "2.14", "Cấu trúc dữ liệu bảng payments (Lịch sử thanh toán và hóa đơn)", ["Tên trường", "Kiểu dữ liệu", "Ràng buộc", "Ý nghĩa nghiệp vụ"], pay_data, [Cm(3.2), Cm(3.0), Cm(3.8), Cm(5.5)])
    
    doc.add_page_break()
    
    # -------------------------------------------------------------------------
    # CHƯƠNG 3
    # -------------------------------------------------------------------------
    add_heading_1(doc, "CHƯƠNG 3: CÀI ĐẶT VÀ THỬ NGHIỆM HỆ THỐNG")
    
    add_heading_2(doc, "3.1. Môi trường triển khai và vận hành hệ thống")
    add_body_p(doc, "Hệ thống Quản lý Quán ăn và Điểm bán hàng trực tiếp (Hương Việt POS & Restaurant Ops) đã được đóng gói, cấu hình đồng bộ và đang vận hành ổn định trên môi trường thử nghiệm thực tế với các tham số chuẩn xác sau:")
    add_bullet_p(doc, "Ứng dụng Spring Boot 3.3.4, môi trường chạy JDK 21 LTS, máy chủ nội bộ nhúng Tomcat chạy trên cổng http://localhost:8080 (Context API: /api/). Cung cấp toàn bộ các REST API phục vụ gọi món, quản lý bàn, cập nhật thực đơn và thanh toán.", "Máy chủ Backend: ")
    add_bullet_p(doc, "Ứng dụng React 18, TypeScript, đóng gói bằng Vite 5, chạy trên máy chủ phát triển tại cổng http://localhost:3000. Thiết kế giao diện hiện đại Glassmorphism, tối ưu hóa thao tác chạm cảm ứng cho nhân viên phục vụ.", "Máy chủ Frontend: ")
    add_bullet_p(doc, "Hệ quản trị cơ sở dữ liệu MySQL 8.0 Community, Cơ sở dữ liệu: restaurant_management, cổng mặc định 3306. Toàn bộ cấu trúc bảng và dữ liệu mẫu được khởi tạo tự động thông qua Flyway Migration.", "Cơ sở dữ liệu: ")
    add_bullet_p(doc, "Hệ thống được thiết lập sẵn 02 tài khoản đại diện cho 2 phân quyền chính:", "Tài khoản kiểm thử tích hợp: ")
    
    p_acc = doc.add_paragraph()
    p_acc.paragraph_format.left_indent = Cm(1.0)
    p_acc.paragraph_format.line_spacing = 1.4
    p_acc.paragraph_format.space_before = Pt(4)
    p_acc.paragraph_format.space_after = Pt(8)
    r_a1 = p_acc.add_run("• Tài khoản Quản trị viên (Admin):\n")
    r_a1.font.bold = True
    r_a1.font.color.rgb = RGBColor(169, 50, 38)
    r_a2 = p_acc.add_run("  - Tên đăng nhập: admin\n  - Mật khẩu: Admin123@\n  - Quyền hạn: Toàn quyền quản trị Dashboard doanh thu, quản lý danh mục, quản lý món ăn, tải ảnh từ máy, quản lý sơ đồ bàn và xem lịch sử hóa đơn.\n")
    r_a3 = p_acc.add_run("• Tài khoản Nhân viên phục vụ / Thu ngân (Staff):\n")
    r_a3.font.bold = True
    r_a3.font.color.rgb = RGBColor(39, 174, 96)
    r_a4 = p_acc.add_run("  - Tên đăng nhập: staff01\n  - Mật khẩu: Admin123@\n  - Quyền hạn: Xem sơ đồ bàn ăn trực quan, mở bàn, gọi món POS tại chỗ, thêm ghi chú khẩu vị, in hóa đơn tạm tính và thực hiện thanh toán thu tiền (Tiền mặt / VietQR).")
    
    add_heading_2(doc, "3.2. Giao diện các chức năng chính của hệ thống")
    add_body_p(doc, "Hệ thống đã hoàn thiện 11 màn hình chức năng hoạt động thực tế trên trình duyệt web. Dưới đây là các khung chỉ dẫn vị trí chụp màn hình thực tế từ hệ thống đang chạy tại địa chỉ http://localhost:3000/ để sinh viên đưa vào báo cáo:")
    
    add_figure_placeholder(doc, "3.1", "Giao diện Sơ đồ bàn ăn và POS trực quan", "Đăng nhập tài khoản staff01, mở menu 'Sơ đồ bàn'. Chụp toàn bộ giao diện lưới các bàn ăn hiển thị màu xanh lá (Bàn trống) và màu đỏ cam (Bàn có khách)", "", "http://localhost:3000/#/tables")
    add_figure_placeholder(doc, "3.2", "Giao diện Gọi món và Giỏ hàng theo bàn ăn thực tế", "Bấm vào một bàn ăn để vào màn hình POS. Chụp giao diện chia đôi: bên trái là danh mục món ăn (Khai vị, Món chính, Đồ uống), bên phải là Giỏ hàng món ăn kèm số lượng và ô nhập ghi chú", "", "http://localhost:3000/#/pos")
    add_figure_placeholder(doc, "3.3", "Giao diện Quản lý Thực đơn và Danh mục món ăn", "Đăng nhập tài khoản admin, truy cập menu 'Quản lý thực đơn'. Chụp danh sách các món ăn hiển thị ảnh, tên món, danh mục, đơn giá và các nút Sửa, Xóa món", "", "http://localhost:3000/#/menu")
    add_figure_placeholder(doc, "3.4", "Cửa sổ Modal Thêm/Sửa món ăn kèm chọn ảnh trực tiếp từ máy tính", "Trên trang Thực đơn, bấm nút 'Thêm món mới'. Chụp cửa sổ pop-up hiển thị các ô nhập Tên món, Đơn giá, Danh mục và nút bấm 'Chọn tệp ảnh từ máy' (Upload Local File)", "", "http://localhost:3000/#/menu")
    add_figure_placeholder(doc, "3.5", "Cửa sổ Xác nhận thanh toán (Tiền mặt và Mã QR ngân hàng VietQR)", "Tại màn hình giỏ hàng của một bàn ăn có món, bấm nút 'Thanh toán'. Chụp cửa sổ thanh toán hiển thị số tiền, tùy chọn Tiền mặt (tính tiền thừa) và mã VietQR sinh động", "", "http://localhost:3000/#/pos")
    add_figure_placeholder(doc, "3.6", "Mẫu phiếu In hóa đơn thanh toán cho khách hàng", "Sau khi bấm hoàn tất thanh toán hoặc in tạm tính, chụp bản xem trước phiếu in hóa đơn hiển thị đầy đủ: Tên quán Hương Việt, Mã hóa đơn INV, tên bàn, danh sách món, tổng tiền và lời cảm ơn", "", "http://localhost:3000/#/orders")
    add_figure_placeholder(doc, "3.7", "Giao diện Quản lý Đơn hàng và Lịch sử hóa đơn", "Truy cập menu 'Đơn hàng / Hóa đơn'. Chụp bảng danh sách các đơn hàng đã thanh toán (PAID) và đang phục vụ (PENDING) kèm thời gian và tổng tiền", "", "http://localhost:3000/#/orders")
    add_figure_placeholder(doc, "3.8", "Bảng điều khiển Quản trị Dashboard và thống kê doanh thu", "Đăng nhập admin, chọn 'Dashboard'. Chụp các thẻ số liệu KPI tổng quan: Doanh thu hôm nay, Số đơn hoàn thành, Tỷ lệ bàn đang phục vụ", "", "http://localhost:3000/#/dashboard")
    add_figure_placeholder(doc, "3.9", "Biểu đồ thống kê top món ăn bán chạy nhất", "Kéo xuống phần biểu đồ trên trang Dashboard. Chụp đồ thị cột/thanh thống kê danh sách các món ăn bán chạy nhất quán", "", "http://localhost:3000/#/dashboard")
    add_figure_placeholder(doc, "3.10", "Màn hình Đăng nhập phân quyền hệ thống Admin / Staff", "Đăng xuất khỏi hệ thống. Chụp màn hình đăng nhập với giao diện kính mờ Glassmorphism, 2 ô nhập tài khoản, mật khẩu và nút Đăng nhập", "", "http://localhost:3000/#/login")
    add_figure_placeholder(doc, "3.11", "Tính năng Xóa mềm (Soft Delete) món ăn và danh mục bảo toàn dữ liệu", "Thực hiện thao tác bấm nút xóa một món ăn hoặc danh mục trên trang Quản lý thực đơn. Chụp thông báo xác nhận xóa mềm an toàn thành công mà không gây lỗi khóa ngoại", "", "http://localhost:3000/#/menu")
    
    add_heading_2(doc, "3.3. Kịch bản kiểm thử hệ thống (Test Cases)")
    add_body_p(doc, "Quá trình kiểm thử được tiến hành nghiêm ngặt qua 4 bảng kịch bản chính nhằm kiểm chứng tính đúng đắn và độ bền của toàn bộ hệ thống:")
    
    # Bảng 3.1: Test auth
    auth_tc = [
        ("TC_AUTH_01", "Đăng nhập thành công với tài khoản Quản trị viên", "Nhập admin / Admin123@", "Đăng nhập thành công, chuyển hướng đến Dashboard, hiển thị đầy đủ menu Admin", "Đạt"),
        ("TC_AUTH_02", "Đăng nhập thành công với tài khoản Nhân viên", "Nhập staff01 / Admin123@", "Đăng nhập thành công, chuyển hướng đến Sơ đồ bàn, ẩn menu Dashboard", "Đạt"),
        ("TC_AUTH_03", "Đăng nhập với mật khẩu sai", "Nhập admin / sai_mat_khau", "Hiển thị thông báo lỗi 'Tên đăng nhập hoặc mật khẩu không chính xác', không cấp token", "Đạt"),
        ("TC_AUTH_04", "Đăng nhập bỏ trống trường dữ liệu", "Để trống mật khẩu và bấm Đăng nhập", "Hiển thị cảnh báo màu đỏ yêu cầu nhập đầy đủ thông tin", "Đạt")
    ]
    add_formatted_table(doc, "3.1", "Kịch bản kiểm thử phân hệ Xác thực và Đăng nhập hệ thống", ["Mã kiểm thử", "Mục tiêu kiểm thử", "Dữ liệu đầu vào", "Kết quả mong đợi", "Đánh giá"], auth_tc, [Cm(2.5), Cm(4.5), Cm(3.2), Cm(4.5), Cm(1.8)])
    
    # Bảng 3.2: Test table & order
    pos_tc = [
        ("TC_POS_01", "Xem sơ đồ bàn trực quan", "Truy cập /tables", "Tải danh sách 10 bàn ăn kèm trạng thái màu sắc chính xác từ cơ sở dữ liệu", "Đạt"),
        ("TC_POS_02", "Mở bàn trống và chọn món ăn", "Bấm Bàn 01 (EMPTY), chọn 2 Phở bò, 1 Trà đá", "Món hiển thị đúng trong giỏ hàng, tổng tiền tính đúng (2*55k + 10k = 120k)", "Đạt"),
        ("TC_POS_03", "Thêm ghi chú khẩu vị cho món", "Nhập 'Không cho hành tây' vào dòng món Phở bò", "Ghi chú được lưu vào chi tiết dòng món trong giỏ hàng", "Đạt"),
        ("TC_POS_04", "Xác nhận tạo đơn gọi món", "Bấm nút 'Xác nhận gọi món'", "Tạo bản ghi orders, bàn B01 tự động chuyển sang màu đỏ cam (OCCUPIED)", "Đạt")
    ]
    add_formatted_table(doc, "3.2", "Kịch bản kiểm thử phân hệ Quản lý bàn và Tạo đơn gọi món POS", ["Mã kiểm thử", "Mục tiêu kiểm thử", "Dữ liệu đầu vào", "Kết quả mong đợi", "Đánh giá"], pos_tc, [Cm(2.5), Cm(4.5), Cm(3.2), Cm(4.5), Cm(1.8)])
    
    # Bảng 3.3: Test payment
    pay_tc = [
        ("TC_PAY_01", "Thanh toán bằng Tiền mặt và tính tiền thừa", "Đơn 120k, nhập khách đưa 200.000đ", "Hệ thống hiển thị tiền thừa thối lại: 80.000đ, cho phép bấm Hoàn tất", "Đạt"),
        ("TC_PAY_02", "Thanh toán bằng mã quét VietQR", "Chọn phương thức VietQR", "Mã QR động được sinh ra chứa đúng số tiền 120.000đ và mã đơn hàng", "Đạt"),
        ("TC_PAY_03", "Giải phóng bàn ăn sau thanh toán", "Bấm 'Hoàn tất thanh toán'", "Đơn chuyển PAID, bàn B01 lập tức chuyển về màu xanh (EMPTY - Trống)", "Đạt"),
        ("TC_PAY_04", "In phiếu hóa đơn thanh toán", "Bấm nút 'In hóa đơn'", "Mở hộp thoại in chuẩn trình duyệt, bố cục hóa đơn rõ ràng, chuyên nghiệp", "Đạt")
    ]
    add_formatted_table(doc, "3.3", "Kịch bản kiểm thử phân hệ Thanh toán và Cập nhật trạng thái bàn", ["Mã kiểm thử", "Mục tiêu kiểm thử", "Dữ liệu đầu vào", "Kết quả mong đợi", "Đánh giá"], pay_tc, [Cm(2.5), Cm(4.5), Cm(3.2), Cm(4.5), Cm(1.8)])
    
    # Bảng 3.4: Test menu & soft delete
    menu_tc = [
        ("TC_MENU_01", "Thêm món ăn mới kèm ảnh tải từ máy", "Tên: 'Gà Hấp Lá Chanh', Giá: 150k, Chọn ảnh file ga.jpg", "Ảnh tải lên /uploads/, món mới xuất hiện ngay trong danh mục Món chính", "Đạt"),
        ("TC_MENU_02", "Tạm dừng bán món ăn", "Chuyển trạng thái món sang OUT_OF_STOCK", "Món hiển thị chữ 'Hết hàng' trên giao diện POS và nhân viên không bấm chọn được", "Đạt"),
        ("TC_MENU_03", "Xóa mềm (Soft Delete) món ăn đã từng bán", "Bấm nút 'Xóa món' đối với món đã có trong đơn hàng cũ", "Món được đánh dấu is_deleted = TRUE, ẩn khỏi thực đơn bán nhưng đơn cũ vẫn nguyên vẹn", "Đạt"),
        ("TC_MENU_04", "Xóa mềm danh mục món ăn", "Bấm nút 'Xóa danh mục' trống", "Danh mục ẩn thành công, không phát sinh lỗi ràng buộc 500 Foreign Key", "Đạt")
    ]
    add_formatted_table(doc, "3.4", "Kịch bản kiểm thử phân hệ Quản lý thực đơn và Xóa mềm (Soft Delete)", ["Mã kiểm thử", "Mục tiêu kiểm thử", "Dữ liệu đầu vào", "Kết quả mong đợi", "Đánh giá"], menu_tc, [Cm(2.5), Cm(4.5), Cm(3.2), Cm(4.5), Cm(1.8)])
    
    doc.add_page_break()
    
    # -------------------------------------------------------------------------
    # KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN
    # -------------------------------------------------------------------------
    add_heading_1(doc, "KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN")
    
    add_heading_2(doc, "1. Đánh giá kết quả đạt được")
    add_body_p(doc, "Sau thời gian tập trung nghiên cứu, thiết kế và triển khai thực nghiệm, đồ án môn học với đề tài \"Xây dựng Hệ thống Quản lý Quán ăn và Điểm bán hàng trực tiếp (Hương Việt POS & Restaurant Ops)\" đã hoàn thành trọn vẹn mọi mục tiêu đã đề ra ban đầu:")
    add_bullet_p(doc, "Xây dựng thành công ứng dụng web hiện đại, tách biệt hoàn toàn giữa Frontend (React 18, TypeScript, Vite 5) và Backend (Spring Boot 3.3.4, Java 21, MySQL 8.0).", "Hoàn thiện kiến trúc phần mềm: ")
    add_bullet_p(doc, "Số hóa toàn diện 100% các công đoạn phục vụ ẩm thực tại quán bao gồm: Xem sơ đồ bàn ăn trực quan, mở bàn, gọi món POS tại chỗ, ghi chú khẩu vị, cập nhật đơn hàng, thanh toán tiền mặt có tính tiền thừa, sinh mã VietQR động và in phiếu hóa đơn chuyên nghiệp.", "Giải quyết triệt để nghiệp vụ F&B: ")
    add_bullet_p(doc, "Cơ chế bảo mật JWT kết hợp mã hóa BCrypt bảo vệ an toàn tài khoản; cơ chế Xóa mềm (Soft Delete) bảo vệ toàn vẹn dữ liệu kế toán lịch sử khi xóa món hoặc danh mục; tính năng chọn tệp ảnh trực tiếp từ máy tính giúp người dùng dễ dàng cập nhật thực đơn phong phú.", "Nâng cao độ tin cậy và tiện ích: ")
    add_bullet_p(doc, "Toàn bộ 16 kịch bản kiểm thử trọng yếu đều đạt kết quả xuất sắc, hệ thống hoạt động ổn định và phản hồi mượt mà dưới thao tác liên tục.", "Kiểm thử thực nghiệm: ")
    
    add_heading_2(doc, "2. Hạn chế của hệ thống")
    add_body_p(doc, "Bên cạnh những thành tựu nổi bật, đồ án vẫn còn một số điểm hạn chế do giới hạn về mặt thời gian và nguồn lực nghiên cứu:")
    add_bullet_p(doc, "Sự thay đổi trạng thái bàn ăn (từ Trống sang Có khách) giữa nhiều thiết bị hiện tại vẫn phụ thuộc vào việc làm mới dữ liệu qua HTTP Polling thay vì sử dụng công nghệ kết nối hai chiều WebSocket (STOMP).", "Chưa áp dụng WebSocket thời gian thực: ")
    add_bullet_p(doc, "Hệ thống hiện tại in hóa đơn thông qua lệnh in tiêu chuẩn của trình duyệt web (window.print), chưa tích hợp giao tiếp trực tiếp qua cổng mạng LAN/Bluetooth với các dòng máy in nhiệt chuyên dụng (máy in Bill K80 dùng tập lệnh ESC/POS).", "Chưa kết nối trực tiếp máy in nhiệt ESC/POS: ")
    add_bullet_p(doc, "Chưa xây dựng phân hệ quản lý kho nguyên vật liệu đầu vào (định lượng món ăn để tự động trừ kho khi bán đĩa thức ăn).", "Chưa quản lý định lượng kho nguyên liệu: ")
    
    add_heading_2(doc, "3. Hướng phát triển trong tương lai")
    add_body_p(doc, "Nhằm phát triển sản phẩm trở thành một giải pháp phần mềm quản lý nhà hàng F&B thương mại hóa chuyên nghiệp, hệ thống sẽ tiếp tục được nâng cấp với các định hướng trọng tâm sau:")
    add_bullet_p(doc, "Tích hợp Spring WebSocket và SockJS để đồng bộ tức thời trạng thái bàn ăn và các món vừa gọi sang màn hình hiển thị nhà bếp (Kitchen Display System - KDS) ngay khi nhân viên bấm gửi món.", "Tích hợp WebSocket & Màn hình Bếp (KDS): ")
    add_bullet_p(doc, "Cung cấp mã QR cố định in trên từng bàn ăn để khách hàng có thể dùng điện thoại cá nhân tự quét mã, xem thực đơn số và tự gọi món mà không cần đợi nhân viên phục vụ.", "Tính năng Đặt bàn và Tự gọi món tại bàn qua Mobile: ")
    add_bullet_p(doc, "Kết nối trực tiếp máy in nhiệt hóa đơn (ESC/POS) để in bill tự động ngay tại quầy thu ngân và tại quầy bếp khi có đơn mới.", "Tích hợp Driver máy in hóa đơn nhiệt ESC/POS: ")
    add_bullet_p(doc, "Phát triển phân hệ quản lý kho nguyên vật liệu, định lượng từng gram thịt, rau, gia vị cho mỗi suất ăn để cảnh báo khi kho sắp hết hàng.", "Quản lý xuất nhập tồn nguyên liệu và giá vốn: ")
    
    doc.add_page_break()
    
    # -------------------------------------------------------------------------
    # TÀI LIỆU THAM KHẢO
    # -------------------------------------------------------------------------
    add_heading_1(doc, "TÀI LIỆU THAM KHẢO")
    refs = [
        "[1] Craig Walls (2022), Spring in Action, Sixth Edition, Manning Publications.",
        "[2] Christian Bauer, Gavin King, Gary Gregory (2015), Java Persistence with Hibernate, Second Edition, Manning Publications.",
        "[3] Alex Banks, Eve Porcello (2020), Learning React: Modern Patterns for Developing React Apps, 2nd Edition, O'Reilly Media.",
        "[4] Joshua Bloch (2018), Effective Java, 3rd Edition, Addison-Wesley Professional.",
        "[5] Martin Fowler (2002), Patterns of Enterprise Application Architecture, Addison-Wesley Professional.",
        "[6] Robert C. Martin (2008), Clean Code: A Handbook of Agile Software Craftsmanship, Prentice Hall.",
        "[7] Oracle Corporation (2024), Java Platform, Standard Edition Documentation, Version 21 LTS, truy cập tại: https://docs.oracle.com/en/java/javase/21/",
        "[8] Spring Framework Documentation (2024), Spring Boot Reference Guide 3.3, truy cập tại: https://spring.io/projects/spring-boot",
        "[9] React Documentation (2024), React 18 Official Reference, truy cập tại: https://react.dev/",
        "[10] NAPAS & Công ty Cổ phần Thanh toán Quốc gia Việt Nam (2023), Tiêu chuẩn kỹ thuật mã phản hồi nhanh VietQR, truy cập tại: https://vietqr.net/"
    ]
    for rf in refs:
        p_rf = doc.add_paragraph()
        p_rf.paragraph_format.line_spacing = 1.4
        p_rf.paragraph_format.space_before = Pt(4)
        p_rf.paragraph_format.space_after = Pt(4)
        p_rf.paragraph_format.left_indent = Cm(0.8)
        p_rf.paragraph_format.first_line_indent = Cm(-0.8)
        r = p_rf.add_run(rf)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(12)
        
    # Lưu file DOCX
    docx_path = r"c:\Users\Admin\.gemini\antigravity-ide\scratch\quan_ly_quan_an\BAO_CAO_DO_AN_MON_HOC.docx"
    doc.save(docx_path)
    print(f"Đã tạo thành công tệp DOCX tại: {docx_path}")

if __name__ == "__main__":
    generate_report()
