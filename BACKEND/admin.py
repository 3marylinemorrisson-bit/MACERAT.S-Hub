# backend/admin.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from auth import require_roles, create_access_token
from database import db
from utils import log_action, generate_csv_from_cursor, save_upload_file_tmp
from bson import ObjectId
from datetime import datetime
import os

router = APIRouter(prefix="/admin", tags=["admin"])

# Create a formation
@router.post("/formations")
async def create_formation(payload: dict, admin=Depends(require_roles(["admin","superadmin"]))):
    payload["created_at"] = datetime.utcnow()
    res = await db.formations.insert_one(payload)
    await log_action(admin["email"], "create_formation", str(res.inserted_id))
    return {"id": str(res.inserted_id)}

# Update formation
@router.put("/formations/{fid}")
async def update_formation(fid: str, payload: dict, admin=Depends(require_roles(["admin","superadmin"]))):
    res = await db.formations.update_one({"_id": ObjectId(fid)}, {"$set": payload})
    await log_action(admin["email"], "update_formation", fid)
    return {"modified": res.modified_count}

# Delete formation
@router.delete("/formations/{fid}")
async def delete_formation(fid: str, admin=Depends(require_roles(["admin","superadmin"]))):
    res = await db.formations.delete_one({"_id": ObjectId(fid)})
    await log_action(admin["email"], "delete_formation", fid)
    return {"deleted": res.deleted_count}

# List users
@router.get("/users")
async def list_users(admin=Depends(require_roles(["admin","superadmin"]))):
    users = await db.users.find().to_list(None)
    for u in users:
        u["id"] = str(u["_id"])
        u.pop("password", None)
    return users

# Create user (admin creates instructors/admins)
@router.post("/users")
async def create_user(payload: dict, admin=Depends(require_roles(["superadmin"]))):
    # expect payload: email, password, role
    from passlib.hash import bcrypt
    payload["password"] = bcrypt.hash(payload["password"])
    res = await db.users.insert_one(payload)
    await log_action(admin["email"], "create_user", payload.get("email"))
    return {"id": str(res.inserted_id)}

# Upload asset (image/pdf) - dev local storage
@router.post("/upload")
async def upload_file(file: UploadFile = File(...), admin=Depends(require_roles(["admin","superadmin","instructor"]))):
    filename = f"uploads/{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{file.filename}"
    path = await save_upload_file_tmp(file, filename)
    await log_action(admin["email"], "upload_file", path)
    # In prod -> return S3/cloudinary URL
    return {"url": f"/{path}"}

# Export enrollments CSV
@router.get("/export/enrollments")
async def export_enrollments(admin=Depends(require_roles(["admin","superadmin"]))):
    rows = await db.enrollments.find().to_list(None)
    csv_bytes = generate_csv_from_cursor(rows)
    if not csv_bytes:
        raise HTTPException(status_code=404, detail="No data")
    return {"csv": csv_bytes.decode("utf-8")}

# Activity logs
@router.get("/logs")
async def get_logs(admin=Depends(require_roles(["admin","superadmin"]))):
    logs = await db.logs.find().sort("timestamp",-1).to_list(200)
    return logs
