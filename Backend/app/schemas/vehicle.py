from datetime import datetime
from pydantic import BaseModel, Field


class VehicleCreate(BaseModel):
    make: str = Field(..., min_length=2, max_length=50)
    model: str = Field(..., min_length=1, max_length=50)
    category: str = Field(..., min_length=2, max_length=50)
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=0)


class VehicleUpdate(BaseModel):
    make: str | None = None
    model: str | None = None
    category: str | None = None
    price: float | None = Field(default=None, gt=0)
    quantity: int | None = Field(default=None, ge=0)


class VehicleResponse(BaseModel):
    id: int
    make: str
    model: str
    category: str
    price: float
    quantity: int
    created_at: datetime
from pydantic import BaseModel, Field

class PurchaseRequest(BaseModel):
    quantity: int = Field(..., gt=0)


class RestockRequest(BaseModel):
    quantity: int = Field(..., gt=0)

    model_config = {
        "from_attributes": True
    }