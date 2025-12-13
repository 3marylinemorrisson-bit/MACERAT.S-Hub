# backend/utils.py
from database import db
import csv, io
from datetime import datetime
import os
from fastapi import UploadFile

async def log_action(actor: str, action: str, resource: str = None):
    entry = {"actor": actor, "action": action, "resource": resource, "timestamp": datetime.utcnow()}
    await db.logs.insert_one(entry)

def generate_csv_from_cursor(cursor):
    # cursor is list of dicts
    if not cursor:
        return None
    output = io.StringIO()
    keys = sorted(cursor[0].keys())
    writer = csv.DictWriter(output, fieldnames=keys)
    writer.writeheader()
    for row in cursor:
        writer.writerow({k: row.get(k,"") for k in keys})
    output.seek(0)
    return output.getvalue().encode("utf-8")

async def save_upload_file_tmp(upload_file: UploadFile, destination: str):
    # Save to uploads directory — simple dev implementation
    os.makedirs(os.path.dirname(destination), exist_ok=True)
    with open(destination, "wb") as buffer:
        content = await upload_file.read()
        buffer.write(content)
    return destination
