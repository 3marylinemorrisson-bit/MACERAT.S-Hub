from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_current_admin
from models.formation import Formation  # ton modèle
from models.user import User
from models.enrollment import Enrollment
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from dependencies import admin_required
from models.enrollment import Enrollment
from models.formation import Formation
import csv
import io

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/export/enrollments")
def export_enrollments(current_admin=Depends(admin_required)):
    enrollments = Enrollment.objects()

    output = io.StringIO()
    writer = csv.writer(output)

    # En-têtes CSV
    writer.writerow([
        "Email utilisateur",
        "ID Formation",
        "Titre Formation"
    ])

    for e in enrollments:
        formation = Formation.objects(id=e.formation_id).first()
        writer.writerow([
            e.user_email,
            str(e.formation_id),
            formation.title if formation else "—"
        ])

    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=inscriptions.csv"
        }
    )

router = APIRouter()

# FORMATIONS
@router.get("/admin/formations")
def list_formations(admin=Depends(get_current_admin)):
    return Formation.objects.all()

@router.post("/admin/formations")
def create_formation(formation: dict, admin=Depends(get_current_admin)):
    f = Formation(**formation)
    f.save()
    return f

@router.put("/admin/formations/{id}")
def update_formation(id: str, formation: dict, admin=Depends(get_current_admin)):
    f = Formation.objects.get(id=id)
    for k, v in formation.items():
        setattr(f, k, v)
    f.save()
    return f

@router.delete("/admin/formations/{id}")
def delete_formation(id: str, admin=Depends(get_current_admin)):
    f = Formation.objects.get(id=id)
    f.delete()
    return {"detail": "Supprimé"}

# INSCRIPTIONS
@router.get("/admin/enrollments")
def list_enrollments(admin=Depends(get_current_admin)):
    return Enrollment.objects.all()

# UTILISATEURS
@router.get("/admin/users")
def list_users(admin=Depends(get_current_admin)):
    return User.objects.all()
