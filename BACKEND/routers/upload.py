from fastapi import APIRouter, File, UploadFile, Depends
import shutil, os

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/admin/upload")
def upload_file(file: UploadFile = File(...), admin=Depends(get_current_admin)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return {"filename": file.filename, "url": f"/{UPLOAD_DIR}/{file.filename}"}
