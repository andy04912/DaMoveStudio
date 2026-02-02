from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum

class ShoeType(str, Enum):
    NIKE_AF1 = "Nike Air Force 1"
    NIKE_DUNK = "Nike Dunk"
    CONVERSE_CHUCK_70 = "Converse Chuck 70"
    VANS_OLD_SKOOL = "Vans Old Skool"
    OTHER = "Other"

class ConsultationStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    REJECTED = "rejected"

class ConsultationRequest(BaseModel):
    id: Optional[str] = Field(None, description="Unique ID")
    name: str = Field(..., min_length=2, description="Customer Name")
    email: EmailStr = Field(..., description="Customer Email")
    social_handle: Optional[str] = Field(None, description="Line ID or Messenger Handle")
    shoe_type: ShoeType = Field(..., description="Type of shoe to customize")
    description: str = Field(..., min_length=10, description="Description of the design idea")
    budget_range: Optional[str] = Field(None, description="Expected budget")
    status: ConsultationStatus = Field(ConsultationStatus.PENDING, description="Request Status")
    created_at: Optional[str] = Field(None, description="Creation timestamp")
