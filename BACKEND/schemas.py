from pydantic import BaseModel
from typing import Optional

# Utilisateur pour inscription et login
class UserCreate(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: Optional[str]
    email: str

# Formation
class FormationCreate(BaseModel):
    title: str
    description: str

class FormationOut(BaseModel):
    id: Optional[str]
    title: str
    description: str

# Inscription à une formation
class EnrollmentCreate(BaseModel):
    user_email: str
    formation_id: str

class EnrollmentOut(BaseModel):
    id: Optional[str]
    user_email: str
    formation_id: str
