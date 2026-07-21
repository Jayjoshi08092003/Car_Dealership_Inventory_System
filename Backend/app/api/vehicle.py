from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.vehicle import (
    VehicleCreate,
    VehicleUpdate,
    VehicleResponse,
)
from app.services.vehicle_service import VehicleService
from app.core.security import get_current_user, get_current_admin
from app.models.user import User

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


@router.post("", response_model=VehicleResponse)
def create_vehicle(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return VehicleService.create(db, vehicle)


@router.get("", response_model=list[VehicleResponse])
def get_all_vehicles(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return VehicleService.get_all(db)


@router.get("/search", response_model=list[VehicleResponse])
def search_vehicle(
    make: str | None = Query(None),
    model: str | None = Query(None),
    category: str | None = Query(None),
    min_price: float | None = Query(None),
    max_price: float | None = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return VehicleService.search(
        db,
        make,
        model,
        category,
        min_price,
        max_price,
    )


@router.put("/{vehicle_id}", response_model=VehicleResponse)
def update_vehicle(
    vehicle_id: int,
    vehicle: VehicleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return VehicleService.update(db, vehicle_id, vehicle)
    except ValueError:
        raise HTTPException(status_code=404, detail="Vehicle not found")


@router.delete("/{vehicle_id}")
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    try:
        VehicleService.delete(db, vehicle_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    return {"message": "Vehicle deleted successfully"}