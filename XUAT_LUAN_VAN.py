import os
import sys
import subprocess

current_dir = os.path.dirname(os.path.abspath(__file__))
build_script = os.path.join(current_dir, "docs", "build_docx.py")

print("=" * 65)
print("     CITYGYM - BIEN TAP VA XUAT FILE LUAN VAN TOT NGHIEP (STU)")
print("=" * 65)

try:
    import docx
except ImportError:
    print("[1/2] Dang cai dat thu vien python-docx...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "python-docx"])

print("[2/2] Dang bien tap file Word tu noi dung luan van...")
subprocess.call([sys.executable, build_script])

docx_path = os.path.join(current_dir, "docs", "LuanVan_TotNghiep_STU_VoDuyPhuc.docx")
if os.path.exists(docx_path):
    print("\n" + "=" * 65)
    print(f"[THANH CONG] Da tao file: {docx_path}")
    print("=" * 65)
    try:
        os.startfile(docx_path)
    except Exception:
        pass
else:
    print("\n[LỖI] Chua tao duoc file Word.")

input("\nNhan Enter de hoan tat...")

