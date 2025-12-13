from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from datetime import datetime, timedelta
from models.user import get_user_by_email  # ta fonction existante
from config import SECRET_KEY

router = APIRouter()

@router.post("/admin/login")
def admin_login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user_by_email(form_data.username)
    if not user or user.role != "admin":
        raise HTTPException(status_code=403, detail="Accès refusé")
    # Vérifie le mot de passe avec bcrypt (déjà existant)
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=403, detail="Mot de passe invalide")
    # Crée token
    token_data = {"sub": user.email, "role": user.role}
    token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")
    return {"access_token": token, "token_type": "bearer"}
