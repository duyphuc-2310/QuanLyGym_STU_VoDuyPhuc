import os
import re
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import qn, nsdecls

THESIS_TITLE = (
    "XÂY DỰNG HỆ THỐNG WEBSITE QUẢN LÝ PHÒNG GYM TÍCH HỢP ĐẶT LỊCH PT, "
    "THANH TOÁN TRỰC TUYẾN VÀ CỔNG KHÁCH HÀNG"
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.join(BASE_DIR, "LuanVan_TotNghiep_STU_VoDuyPhuc.docx")


def set_cell_shading(cell, fill_hex):
    shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading)


def set_table_borders(table):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        '<w:top w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        '<w:left w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        '<w:right w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        '<w:insideH w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        '<w:insideV w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        "</w:tblBorders>"
    )
    tblPr.append(borders)


def add_page_border(section):
    sectPr = section._sectPr
    pgBorders = parse_xml(
        f'<w:pgBorders {nsdecls("w")} w:offsetFrom="page">'
        '<w:top w:val="single" w:sz="12" w:space="24" w:color="000000"/>'
        '<w:left w:val="single" w:sz="12" w:space="24" w:color="000000"/>'
        '<w:bottom w:val="single" w:sz="12" w:space="24" w:color="000000"/>'
        '<w:right w:val="single" w:sz="12" w:space="24" w:color="000000"/>'
        "</w:pgBorders>"
    )
    sectPr.append(pgBorders)


def remove_page_border(section):
    sectPr = section._sectPr
    for el in sectPr.findall(qn("w:pgBorders")):
        sectPr.remove(el)


def configure_a4_margins(section):
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.top_margin = Cm(2.0)
    section.bottom_margin = Cm(2.0)
    section.left_margin = Cm(3.0)
    section.right_margin = Cm(2.0)
    section.gutter = Cm(0.0)
    section.header_distance = Cm(1.0)
    section.footer_distance = Cm(1.0)


def add_page_number_field(run):
    fldChar1 = parse_xml(r'<w:fldChar %s w:fldCharType="begin"/>' % nsdecls("w"))
    instrText = parse_xml(r'<w:instrText %s xml:space="preserve"> PAGE </w:instrText>' % nsdecls("w"))
    fldChar2 = parse_xml(r'<w:fldChar %s w:fldCharType="separate"/>' % nsdecls("w"))
    fldChar3 = parse_xml(r'<w:fldChar %s w:fldCharType="end"/>' % nsdecls("w"))
    run._r.append(fldChar1)
    run._r.append(instrText)
    run._r.append(fldChar2)
    run._r.append(fldChar3)


def set_section_header_footer(section, chapter_header_text, reset_page_num=False):
    section.different_first_page_header_footer = True
    section.header.is_linked_to_previous = False
    section.footer.is_linked_to_previous = False
    section.first_page_header.is_linked_to_previous = False
    section.first_page_footer.is_linked_to_previous = False

    if reset_page_num:
        pgNumType = parse_xml(f'<w:pgNumType {nsdecls("w")} w:start="1"/>')
        section._sectPr.append(pgNumType)

    # First page header: empty (quy định STU)
    for p in section.first_page_header.paragraphs:
        p.text = ""

    # Subsequent pages header
    if chapter_header_text:
        hp = section.header.paragraphs[0]
        hp.text = ""
        hp.alignment = WD_ALIGN_PARAGRAPH.LEFT
        pPr = hp._p.get_or_add_pPr()
        pBdr = parse_xml(
            f'<w:pBdr {nsdecls("w")}>'
            '<w:bottom w:val="single" w:sz="6" w:space="4" w:color="000000"/>'
            "</w:pBdr>"
        )
        pPr.append(pBdr)
        r = hp.add_run(chapter_header_text)
        r.font.name = "Times New Roman"
        r.font.size = Pt(13)
        r.italic = True

    # Footer
    for ftr in (section.first_page_footer, section.footer):
        fp = ftr.paragraphs[0]
        fp.text = ""
        pPr = fp._p.get_or_add_pPr()
        pBdr = parse_xml(
            f'<w:pBdr {nsdecls("w")}>'
            '<w:top w:val="single" w:sz="6" w:space="4" w:color="000000"/>'
            "</w:pBdr>"
        )
        pPr.append(pBdr)
        tabs = parse_xml(f'<w:tabs {nsdecls("w")}><w:tab w:val="right" w:pos="9070"/></w:tabs>')
        pPr.append(tabs)

        r_title = fp.add_run(f"Đề tài: {THESIS_TITLE}\t")
        r_title.font.name = "Times New Roman"
        r_title.font.size = Pt(10)
        r_title.italic = True

        r_pg = fp.add_run()
        r_pg.font.name = "Times New Roman"
        r_pg.font.size = Pt(13)
        add_page_number_field(r_pg)


def style_run(run, size=13, bold=False, italic=False, underline=False):
    run.font.name = "Times New Roman"
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.underline = underline


def add_formatted_runs(p, text, size=13, base_bold=False, base_italic=False):
    tokens = re.split(r"(\*\*.*?\*\*|\*[^\*]+?\*|`[^`]+?`)", text)
    for tok in tokens:
        if not tok:
            continue
        if tok.startswith("**") and tok.endswith("**"):
            r = p.add_run(tok[2:-2])
            style_run(r, size=size, bold=True, italic=base_italic)
        elif tok.startswith("*") and tok.endswith("*"):
            r = p.add_run(tok[1:-1])
            style_run(r, size=size, bold=base_bold, italic=True)
        elif tok.startswith("`") and tok.endswith("`"):
            r = p.add_run(tok[1:-1])
            style_run(r, size=size, bold=base_bold, italic=base_italic)
        else:
            r = p.add_run(tok)
            style_run(r, size=size, bold=base_bold, italic=base_italic)


def add_normal_p(doc, text="", align=WD_ALIGN_PARAGRAPH.JUSTIFY, before=6, after=0, line_spacing=1.3, size=13):
    p = doc.add_paragraph()
    p.alignment = align
    pf = p.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    pf.line_spacing = line_spacing
    if text:
        add_formatted_runs(p, text, size=size)
    return p


def add_chapter_heading(doc, num, title):
    p = doc.add_paragraph(style="Heading 1")
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    pf = p.paragraph_format
    pf.space_before = Pt(12)
    pf.space_after = Pt(12)

    r1 = p.add_run(f"Chương {num}. ")
    style_run(r1, size=24, bold=False)

    r2 = p.add_run(title.upper())
    style_run(r2, size=24, bold=True)
    return p


def add_h2(doc, text):
    p = doc.add_paragraph(style="Heading 2")
    pf = p.paragraph_format
    pf.space_before = Pt(10)
    pf.space_after = Pt(4)
    r = p.add_run(text.upper())
    style_run(r, size=15, bold=True)
    return p


def add_h3(doc, text):
    p = doc.add_paragraph(style="Heading 3")
    pf = p.paragraph_format
    pf.space_before = Pt(8)
    pf.space_after = Pt(2)
    r = p.add_run(text)
    style_run(r, size=14, bold=True)
    return p


def add_h4(doc, text):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_before = Pt(6)
    pf.space_after = Pt(2)
    r = p.add_run(text)
    style_run(r, size=13, bold=False, underline=True)
    return p


def add_cover_page(doc):
    sec = doc.sections[0]
    configure_a4_margins(sec)
    add_page_border(sec)

    for line in [
        "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ SÀI GÒN",
        "KHOA CÔNG NGHỆ THÔNG TIN",
        "---oOo---",
    ]:
        p = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.CENTER, before=0, after=0, line_spacing=1.15)
        r = p.add_run(line)
        style_run(r, size=13, bold=(line != "---oOo---"))

    for _ in range(3):
        add_normal_p(doc, "", before=0, after=0)

    p_lv = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.CENTER, before=12, after=24)
    r_lv = p_lv.add_run("LUẬN VĂN TỐT NGHIỆP")
    style_run(r_lv, size=16, bold=True)

    for _ in range(2):
        add_normal_p(doc, "", before=0, after=0)

    p_lbl = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.LEFT, before=6, after=6)
    r_lbl = p_lbl.add_run("Tên đề tài:")
    style_run(r_lbl, size=14, italic=True, underline=True)

    p_t = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.CENTER, before=12, after=24, line_spacing=1.3)
    r_t = p_t.add_run(THESIS_TITLE)
    style_run(r_t, size=20, bold=True)

    for _ in range(4):
        add_normal_p(doc, "", before=0, after=0)

    p_gvhd = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.LEFT, before=6, after=6)
    p_gvhd.paragraph_format.left_indent = Cm(4.0)
    r_g1 = p_gvhd.add_run("Người hướng dẫn: ")
    style_run(r_g1, size=13)
    r_g2 = p_gvhd.add_run("ThS. Bùi Nhật Bằng")
    style_run(r_g2, size=13, bold=True)

    p_sv = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.LEFT, before=6, after=6)
    p_sv.paragraph_format.left_indent = Cm(4.0)
    r_s1 = p_sv.add_run("Sinh viên thực hiện: ")
    style_run(r_s1, size=13)
    r_s2 = p_sv.add_run("Võ Duy Phúc")
    style_run(r_s2, size=13, bold=True)

    for _ in range(4):
        add_normal_p(doc, "", before=0, after=0)

    p_city = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.CENTER, before=12, after=0)
    r_c = p_city.add_run("TP. HỒ CHÍ MINH – NĂM 2026")
    style_run(r_c, size=13)


def add_front_matter(doc):
    sec = doc.add_section()
    configure_a4_margins(sec)
    remove_page_border(sec)
    sec.header.is_linked_to_previous = False
    sec.footer.is_linked_to_previous = False

    # LỜI CẢM ƠN
    p = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.CENTER, before=12, after=18)
    r = p.add_run("LỜI CẢM ƠN")
    style_run(r, size=18, bold=True)
    
    cam_on_text = (
        "Trong suốt thời gian học tập, rèn luyện và thực hiện luận văn tốt nghiệp tại Trường Đại học "
        "Công nghệ Sài Gòn (STU), em đã nhận được sự dạy dỗ, quan tâm, giúp đỡ và chỉ bảo vô cùng tận tình "
        "của quý thầy cô, gia đình và bạn bè.\n\n"
        "Trước tiên, em xin gửi lời tri ân sâu sắc và lòng biết ơn chân thành nhất đến ThS. Bùi Nhật Bằng. "
        "Thầy là người đã trực tiếp hướng dẫn, định hướng khoa học, dành nhiều thời gian và tâm huyết để giúp đỡ em "
        "trong suốt quá trình hoàn thiện đề tài \"Xây dựng hệ thống website quản lý phòng gym tích hợp đặt lịch PT, "
        "thanh toán trực tuyến và cổng khách hàng\". Những góp ý sắc bén về chuyên môn, sự chỉ dẫn cặn kẽ trong việc "
        "phân tích thiết kế hệ thống, chuẩn hóa cơ sở dữ liệu quan hệ, cũng như việc xử lý các bài toán kỹ thuật phức tạp "
        "như kiểm soát đồng thời (Concurrency Transaction), điểm danh bằng mã QR động theo thời gian thực (Socket.io) "
        "và tích hợp đối soát Webhook tự động đã giúp em tháo gỡ nhiều khó khăn, đồng thời mở rộng tư duy làm chủ công nghệ thực tế.\n\n"
        "Em cũng xin gửi lời cảm ơn chân thành đến Ban Giám hiệu Trường Đại học Công nghệ Sài Gòn, cùng toàn thể quý thầy cô giáo "
        "trong Khoa Công nghệ Thông tin đã tận tình truyền đạt những tri thức quý báu, trang bị cho em nền tảng kiến thức vững chắc "
        "và tư duy nghiên cứu nghiêm túc trong suốt những năm tháng trên giảng đường đại học.\n\n"
        "Mặc dù bản thân đã nỗ lực hết mình để hoàn thiện sản phẩm phần mềm và bản báo cáo luận văn một cách chỉn chu nhất, "
        "song do giới hạn về mặt thời gian cũng như kinh nghiệm thực tiễn, luận văn chắc chắn không thể tránh khỏi những thiếu sót. "
        "Em rất mong nhận được những nhận xét, đóng góp ý kiến quý báu từ Hội đồng bảo vệ và quý thầy cô để đề tài được hoàn thiện hơn nữa."
    )
    for p_line in cam_on_text.split("\n\n"):
        add_normal_p(doc, p_line, align=WD_ALIGN_PARAGRAPH.JUSTIFY, before=6, after=6)

    doc.add_page_break()

    # MỤC LỤC
    p_toc = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.CENTER, before=12, after=12)
    r_toc = p_toc.add_run("MỤC LỤC")
    style_run(r_toc, size=18, bold=True)

    p_field = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.LEFT, before=6, after=6)
    r_f = p_field.add_run()
    style_run(r_f, size=13)
    fld1 = parse_xml(r'<w:fldChar %s w:fldCharType="begin"/>' % nsdecls("w"))
    instr = parse_xml(r'<w:instrText %s xml:space="preserve"> TOC \o "1-3" \h \z \u </w:instrText>' % nsdecls("w"))
    fld2 = parse_xml(r'<w:fldChar %s w:fldCharType="separate"/>' % nsdecls("w"))
    fld3 = parse_xml(r'<w:fldChar %s w:fldCharType="end"/>' % nsdecls("w"))
    r_f._r.append(fld1)
    r_f._r.append(instr)
    r_f._r.append(fld2)
    r_f._r.append(fld3)
    add_normal_p(
        doc,
        "(Mở file trong Word → Nhấn chuột phải vào vùng Mục lục → Chọn Update Field để cập nhật số trang tự động.)",
        align=WD_ALIGN_PARAGRAPH.LEFT,
        size=11,
    )

    doc.add_page_break()

    p_lof = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.CENTER, before=12, after=12)
    r_lof = p_lof.add_run("MỤC LỤC CÁC HÌNH VẼ")
    style_run(r_lof, size=18, bold=True)
    figures = [
        "Hình 2.1.1.1: Giao diện tổng quan phân hệ Vận hành và Bản đồ thiết lập NextX GymMaster",
        "Hình 2.1.1.2: Giao diện Quản lý Hội viên và danh mục Biến động Hợp đồng (Phiếu bảo lưu, gia hạn) NextX GymMaster",
        "Hình 2.1.1.3: Giao diện phân hệ Huấn luyện viên (Lịch dạy PT 1-1 và Tổng kết ngày) NextX GymMaster",
        "Hình 2.3.2: Sơ đồ chức năng hệ thống",
        "Hình 2.3.3: Sơ đồ Use case tổng quát toàn hệ thống",
        "Hình 3.1.1.1: Sơ đồ thực thể mối quan hệ mức ý niệm (Conceptual ERD)",
        "Hình 3.2.1.1: Sơ đồ Use case chi tiết: Đăng ký vé tập thử E-Pass 03 ngày",
        "Hình 3.2.1.2: Sơ đồ Use case chi tiết: Đăng nhập và phân quyền hệ thống",
        "Hình 3.2.1.3: Sơ đồ Use case chi tiết: Lấy mã QR Check-in động 60s",
        "Hình 3.2.1.4: Sơ đồ Use case chi tiết: Quét kiểm soát Check-in QR Realtime",
        "Hình 3.2.1.5: Sơ đồ Use case chi tiết: Đặt lịch tập 1-1 cùng Huấn luyện viên PT",
        "Hình 3.2.1.6: Sơ đồ Use case chi tiết: Hủy lịch hẹn PT trước 02 giờ",
        "Hình 3.2.1.7: Sơ đồ Use case chi tiết: Xác nhận hoàn thành buổi tập và trừ buổi",
        "Hình 3.2.1.8: Sơ đồ Use case chi tiết: Bảo lưu gói tập và tự động bù hạn thẻ",
        "Hình 3.2.1.9: Sơ đồ Use case chi tiết: Thanh toán trực tuyến qua Webhook VietQR",
        "Hình 3.2.1.10: Sơ đồ Use case chi tiết: Cập nhật chỉ số InBody và lộ trình tập",
        "Hình 3.2.2.1: Sơ đồ tuần tự quy trình Check-in QR Code Realtime",
        "Hình 3.2.2.2: Sơ đồ tuần tự quy trình Đặt lịch PT 1-1 có bảo vệ Transaction",
        "Hình 3.2.2.3: Sơ đồ tuần tự quy trình Xử lý thanh toán trực tuyến qua Webhook",
        "Hình 3.2.2.4: Sơ đồ tuần tự quy trình Bảo lưu gói tập và cộng bù ngày hết hạn",
        "Hình 3.2.3.1: Sơ đồ hoạt động quy trình quản lý vòng đời hợp đồng hội viên",
        "Hình 3.2.3.2: Sơ đồ hoạt động phễu chuyển đổi khách vãng lai thành hội viên",
        "Hình 3.2.3.3: Sơ đồ hoạt động quy trình đặt và thực hiện buổi tập kèm PT",
        "Hình 3.2.3.4: Sơ đồ hoạt động quy trình bảo lưu và mở lại thẻ tập",
        "Hình 3.2.4.1: Sơ đồ cơ sở dữ liệu quan hệ vật lý (Database Diagram)",
        "Hình 3.3.1.1: Màn hình trang chủ Landing Page (Khu vực Hero & Triết lý)",
        "Hình 3.3.1.2: Màn hình công cụ tính chỉ số thể trạng BMI, BMR và TDEE",
        "Hình 3.3.1.3: Màn hình bảng giá gói tập và lịch lớp nhóm GroupX",
        "Hình 3.3.1.4: Màn hình đăng ký vé tập thử 03 ngày nhận mã E-Pass QR",
        "Hình 3.3.1.5: Màn hình đăng nhập hệ thống đa vai trò",
        "Hình 3.3.1.6: Màn hình Cổng Hội viên: Thẻ thành viên QR động 60 giây",
        "Hình 3.3.1.7: Màn hình Cổng Hội viên: Đặt lịch tập cùng Huấn luyện viên PT",
        "Hình 3.3.1.8: Màn hình Cổng Hội viên: Biểu đồ theo dõi chỉ số InBody",
        "Hình 3.3.1.9: Màn hình thanh toán trực tuyến VietQR kèm đếm ngược 15 phút",
        "Hình 3.3.2.1: Màn hình Cổng Huấn luyện viên: Lịch làm việc trong tuần",
        "Hình 3.3.2.2: Màn hình Cổng Huấn luyện viên: Điểm danh và xác nhận hoàn thành",
        "Hình 3.3.2.3: Màn hình Cổng Huấn luyện viên: Nhập chỉ số thể trạng InBody",
        "Hình 3.3.2.4: Màn hình Cổng Huấn luyện viên: Bảng thống kê hoa hồng cá nhân",
        "Hình 3.3.3.1: Màn hình Quét Check-in Realtime tại quầy Lễ tân",
        "Hình 3.3.3.2: Màn hình Quản lý CRM Khách tiềm năng (Lead Pipeline)",
        "Hình 3.3.3.3: Màn hình Quản lý Hợp đồng hội viên và trạng thái gói",
        "Hình 3.3.3.4: Màn hình Modal Lập hợp đồng mới và in biểu mẫu STU Form 01",
        "Hình 3.3.3.5: Màn hình Thực hiện bảo lưu và tự động mở lại hợp đồng",
        "Hình 3.3.3.6: Màn hình Dashboard Quản trị BI: Doanh thu & Giờ cao điểm",
        "Hình 4.1: Giao diện trang chủ Landing Page và công cụ tính chỉ số",
        "Hình 4.2: Giao diện đăng ký vé tập thử nhận mã QR E-Pass",
        "Hình 4.3: Giao diện đăng nhập hệ thống phân quyền",
        "Hình 4.4: Giao diện Cổng Hội viên với thẻ QR động 60s",
        "Hình 4.5: Giao diện màn hình Quét Check-in tại quầy Lễ tân",
        "Hình 4.6: Giao diện kiểm tra trạng thái Check-in từ chối khi thẻ bảo lưu",
        "Hình 4.7: Giao diện đặt lịch tập 1-1 cùng Huấn luyện viên PT",
        "Hình 4.8: Giao diện thông báo lỗi 409 Conflict khi trùng giờ tập",
        "Hình 4.9: Giao diện Huấn luyện viên xác nhận hoàn thành buổi tập",
        "Hình 4.10: Giao diện thanh toán trực tuyến VietQR và đối soát Webhook",
        "Hình 4.11: Giao diện Dashboard Quản trị và biểu đồ nhiệt giờ cao điểm",
    ]
    for fig in figures:
        add_normal_p(doc, fig, align=WD_ALIGN_PARAGRAPH.LEFT, before=2, after=2)


def render_content_lines(doc, lines):
    i = 0
    in_code = False
    code_lines = []

    while i < len(lines):
        line = lines[i]

        # Code / Mermaid blocks
        if line.strip().startswith("```"):
            if not in_code:
                in_code = True
                code_lines = []
            else:
                in_code = False
                p_note = add_normal_p(
                    doc,
                    "[Sơ đồ minh họa — Sinh viên chèn hình ảnh sơ đồ tại vị trí này]",
                    align=WD_ALIGN_PARAGRAPH.CENTER,
                    size=12,
                )
                for r in p_note.runs:
                    r.italic = True
                    r.font.color.rgb = RGBColor(120, 120, 120)
            i += 1
            continue

        if in_code:
            code_lines.append(line)
            i += 1
            continue

        stripped = line.strip()
        if not stripped or stripped == "---":
            i += 1
            continue

        # Tables
        if stripped.startswith("|") and "|" in stripped[1:]:
            table_rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                row_str = lines[i].strip()
                cells = [c.strip() for c in row_str.strip("|").split("|")]
                if not all(re.match(r"^:?-{2,}:?$", c) for c in cells if c):
                    table_rows.append(cells)
                i += 1
            if table_rows:
                cols = max(len(r) for r in table_rows)
                tbl = doc.add_table(rows=len(table_rows), cols=cols)
                tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
                set_table_borders(tbl)
                for r_idx, row_data in enumerate(table_rows):
                    for c_idx in range(cols):
                        cell = tbl.cell(r_idx, c_idx)
                        if r_idx == 0:
                            set_cell_shading(cell, "E8EEF5")
                        cp = cell.paragraphs[0]
                        cp.alignment = WD_ALIGN_PARAGRAPH.LEFT
                        cp.paragraph_format.space_before = Pt(3)
                        cp.paragraph_format.space_after = Pt(3)
                        cp.paragraph_format.line_spacing = 1.15
                        val = row_data[c_idx] if c_idx < len(row_data) else ""
                        add_formatted_runs(cp, val, size=12, base_bold=(r_idx == 0))
            continue

        # Placeholders for images
        if stripped.startswith("[CHÈN HÌNH VẼ") or stripped.startswith("[CHÈN SƠ ĐỒ"):
            p_box = add_normal_p(
                doc, stripped, align=WD_ALIGN_PARAGRAPH.CENTER, before=10, after=4
            )
            for r in p_box.runs:
                r.bold = True
                r.italic = True
                r.font.color.rgb = RGBColor(180, 0, 0)
        # Figure captions
        elif (stripped.startswith("Hình ") and ":" in stripped) or stripped.startswith("**<u>*Hình"):
            p = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.CENTER, before=4, after=8)
            clean = stripped.replace("**<u>*", "").replace("*</u>**", "")
            parts = clean.split(":", 1)
            r1 = p.add_run(parts[0])
            style_run(r1, size=12, bold=True, italic=True)
            if len(parts) > 1:
                r2 = p.add_run(":" + parts[1])
                style_run(r2, size=12, italic=True)
        # Headings
        elif stripped.startswith("#### ") or stripped.startswith("##### "):
            text = stripped.lstrip("#").strip()
            add_h4(doc, text)
        elif stripped.startswith("### "):
            add_h3(doc, stripped[4:].strip())
        elif stripped.startswith("## "):
            add_h2(doc, stripped[3:].strip())
        elif stripped.startswith("- ") or stripped.startswith("* "):
            p = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.JUSTIFY, before=3, after=0)
            p.paragraph_format.left_indent = Cm(0.75)
            add_formatted_runs(p, "• " + stripped[2:].strip(), size=13)
        elif re.match(r"^\d+\.\s+", stripped):
            p = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.JUSTIFY, before=3, after=0)
            p.paragraph_format.left_indent = Cm(0.5)
            add_formatted_runs(p, stripped, size=13)
        else:
            add_normal_p(doc, stripped, align=WD_ALIGN_PARAGRAPH.JUSTIFY, before=5, after=0)

        i += 1


def render_full_thesis(doc, md_path):
    with open(md_path, "r", encoding="utf-8") as f:
        full_text = f.read()

    # Split by Chapter markers
    chapter_splits = re.split(r"\n(?=CHƯƠNG\s+\d+[:\.]|HƯỚNG DẪN SỬ DỤNG|TÀI LIỆU THAM KHẢO)", full_text)

    is_first_chapter = True
    for chunk in chapter_splits:
        chunk = chunk.strip()
        if not chunk:
            continue

        # Skip headers if before Chapter 1
        if not (chunk.startswith("CHƯƠNG") or chunk.startswith("HƯỚNG DẪN SỬ DỤNG") or chunk.startswith("TÀI LIỆU THAM KHẢO")):
            continue

        lines = chunk.splitlines()
        first_line = lines[0].strip()

        # Determine chapter title and header
        m_chap = re.match(r"^CHƯƠNG\s+(\d+)[:\.]\s*(.*)$", first_line, re.IGNORECASE)
        sec = doc.add_section()
        configure_a4_margins(sec)
        remove_page_border(sec)

        if m_chap:
            ch_num = int(m_chap.group(1))
            ch_title = m_chap.group(2).strip()
            set_section_header_footer(
                sec,
                f"Chương {ch_num}. {ch_title.upper()}",
                reset_page_num=is_first_chapter,
            )
            add_chapter_heading(doc, ch_num, ch_title)
            is_first_chapter = False
            render_content_lines(doc, lines[1:])
        elif first_line.startswith("HƯỚNG DẪN SỬ DỤNG"):
            set_section_header_footer(sec, "PHỤ LỤC. HƯỚNG DẪN SỬ DỤNG", reset_page_num=False)
            p = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.CENTER, before=12, after=12)
            r = p.add_run("PHỤ LỤC: HƯỚNG DẪN SỬ DỤNG")
            style_run(r, size=18, bold=True)
            render_content_lines(doc, lines[1:])
        elif first_line.startswith("TÀI LIỆU THAM KHẢO"):
            set_section_header_footer(sec, "TÀI LIỆU THAM KHẢO", reset_page_num=False)
            p = add_normal_p(doc, align=WD_ALIGN_PARAGRAPH.CENTER, before=12, after=12)
            r = p.add_run("TÀI LIỆU THAM KHẢO")
            style_run(r, size=18, bold=True)
            render_content_lines(doc, lines[1:])


def main():
    doc = Document()
    add_cover_page(doc)
    add_front_matter(doc)

    master_path = os.path.join(BASE_DIR, "LUAN_VAN_TOT_NGHIEP_CITYGYM_STU.md")
    if os.path.exists(master_path):
        print("Rendering master thesis from LUAN_VAN_TOT_NGHIEP_CITYGYM_STU.md...")
        render_full_thesis(doc, master_path)
    else:
        print("Error: Master thesis file not found!")

    doc.save(OUT_PATH)
    print(f"Exported successfully: {OUT_PATH}")


if __name__ == "__main__":
    main()
