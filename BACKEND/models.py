from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: Optional[str]
    email: str
    password: str

class Formation(BaseModel):
    id: Optional[str]
    title: str
    description: str

class Enrollment(BaseModel):
    id: Optional[str]
    user_email: str
    formation_id: str
