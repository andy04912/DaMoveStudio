import uuid
from datetime import datetime
from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models import ConsultationRequest

router = APIRouter()

# In-memory storage for MVP
consultations: List[ConsultationRequest] = []

class StatusUpdate(BaseModel):
    status: str

@router.post("/consultation", response_model=ConsultationRequest)
async def create_consultation(request: ConsultationRequest):
    request.id = str(uuid.uuid4())
    request.created_at = datetime.now().isoformat()
    consultations.append(request)
    return request

@router.get("/consultations", response_model=List[ConsultationRequest])
async def get_consultations():
    return consultations

@router.patch("/consultation/{cid}/status", response_model=ConsultationRequest)
async def update_status(cid: str, update: StatusUpdate):
    for consultation in consultations:
        if consultation.id == cid:
            consultation.status = update.status
            return consultation
    raise HTTPException(status_code=404, detail="Consultation not found")
