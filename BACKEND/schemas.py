# backend/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = "user"   # user, instructor, admin, superadmin
    name: Optional[str] = None

class UserOut(BaseModel):
    id: Optional[str]
    email: EmailStr
    role: str
    name: Optional[str]

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class FormationCreate(BaseModel):
    title: str
    description: str
    price: Optional[float] = 0.0
    tags: Optional[List[str]] = []

class FormationOut(FormationCreate):
    id: Optional[str]

class ProjectCreate(BaseModel):
    title: str
    description: str
    cover_url: Optional[str] = None
    tags: Optional[List[str]] = []

class ProjectOut(ProjectCreate):
    id: Optional[str]

class EnrollmentCreate(BaseModel):
    user_email: EmailStr
    formation_id: str
    created_at: Optional[datetime] = None

class LogEntry(BaseModel):
    actor: str
    action: str
    resource: Optional[str] = None
    timestamp: Optional[datetime] = None
