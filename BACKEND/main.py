from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
from passlib.hash import bcrypt
import os

from database import db
from models import User, Formation, Enrollment

SECRET_KEY = os.getenv("SECRET_KEY", "secret123")
ALGORITHM = "HS256"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
async def register(user: User):
    user.password = bcrypt.hash(user.password)
    await db.users.insert_one(user.dict())
    return {"message": "User registered"}

@app.post("/login")
async def login(user: User):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not bcrypt.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = jwt.encode({"email": user.email}, SECRET_KEY, algorithm=ALGORITHM)
    return {"token": token}

@app.get("/formations")
async def get_formations():
    formations = await db.formations.find().to_list(None)
    return formations

@app.post("/enroll")
async def enroll(enrollment: Enrollment):
    await db.enrollments.insert_one(enrollment.dict())
    return {"message": "Enrollment successful"}
