# backend/main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import db
from auth import create_access_token
from passlib.hash import bcrypt
import os
from admin import router as admin_router
from schemas import UserCreate
from routers import auth
from dependencies import get_current_admin
from routers import upload
from routers import admin
from routers import projects
from fastapi import FastAPI
from mongoengine import connect
from config import MONGO_URL
from routers import auth, admin, projects, upload
from fastapi.middleware.cors import CORSMiddleware
from config import CORS_ORIGINS
from models.user import User
from config import INITIAL_SUPERADMIN_EMAIL, INITIAL_SUPERADMIN_PW
from passlib.hash import bcrypt

if not User.objects(email=INITIAL_SUPERADMIN_EMAIL):
    hashed_pw = bcrypt.hash(INITIAL_SUPERADMIN_PW)
    User(email=INITIAL_SUPERADMIN_EMAIL, hashed_password=hashed_pw, role="admin").save()

app = FastAPI(title="MACERAT.S Hub API")

origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_router)

app.include_router(auth.router)
app.include_router(upload.router)
app.include_router(admin.router)
app.include_router(projects.router)

app = FastAPI()

# Connexion MongoDB
connect(host=MONGO_URL)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(projects.router)
app.include_router(upload.router)

@router.get("/admin/formations")
def get_formations(admin=Depends(get_current_admin)):
    ...

@app.post("/auth/register")
async def register(payload: UserCreate):
    existing = await db.users.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email exists")
    hashed = bcrypt.hash(payload.password)
    user = {"email": payload.email, "password": hashed, "role": payload.role, "name": getattr(payload, "name", None)}
    res = await db.users.insert_one(user)
    return {"id": str(res.inserted_id)}

@app.post("/auth/token")
async def token(form_data: dict):
    # expects {"email":..,"password":..}
    u = await db.users.find_one({"email": form_data.get("email")})
    if not u or not bcrypt.verify(form_data.get("password",""), u["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"email": u["email"], "role": u["role"]})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/formations")
async def public_formations():
    arr = await db.formations.find().to_list(None)
    # map ids
    out = []
    for f in arr:
        f["id"] = str(f["_id"])
        out.append(f)
    return out

# bootstrap superadmin if none exists
@app.on_event("startup")
async def startup_event():
    count = await db.users.count_documents({})
    if count == 0:
        from passlib.hash import bcrypt
        pw = os.getenv("INITIAL_SUPERADMIN_PW", "ChangeMe123!")
        admin = {"email": os.getenv("INITIAL_SUPERADMIN_EMAIL","admin@macerat.s"), "password": bcrypt.hash(pw), "role":"superadmin", "name":"Super Admin"}
        await db.users.insert_one(admin)
        print("Inserted initial superadmin:", admin["email"])
