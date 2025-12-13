from fastapi import APIRouter, Depends
from dependencies import get_current_admin
from models.project import Project

router = APIRouter()

@router.get("/admin/projects")
def list_projects(admin=Depends(get_current_admin)):
    return Project.objects.all()

@router.post("/admin/projects")
def create_project(project: dict, admin=Depends(get_current_admin)):
    p = Project(**project)
    p.save()
    return p

@router.delete("/admin/projects/{id}")
def delete_project(id: str, admin=Depends(get_current_admin)):
    p = Project.objects.get(id=id)
    p.delete()
    return {"detail": "Supprimé"}
