from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle
from app.repositories.vehicle_repository import VehicleRepository


class VehicleService:

    @staticmethod
    def create(db: Session, data):
        vehicle = Vehicle(
            make=data.make,
            model=data.model,
            category=data.category,
            price=data.price,
            quantity=data.quantity,
        )

        return VehicleRepository.create(db, vehicle)

    @staticmethod
    def get_all(db: Session):
        return VehicleRepository.get_all(db)

    @staticmethod
    def get_by_id(db: Session, vehicle_id: int):
        vehicle = VehicleRepository.get_by_id(db, vehicle_id)

        if vehicle is None:
            raise ValueError("Vehicle not found")

        return vehicle

    @staticmethod
    def update(db: Session, vehicle_id: int, data):
        vehicle = VehicleRepository.get_by_id(db, vehicle_id)

        if vehicle is None:
            raise ValueError("Vehicle not found")

        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(vehicle, key, value)

        return VehicleRepository.update(db, vehicle)

    @staticmethod
    def delete(db: Session, vehicle_id: int):
        vehicle = VehicleRepository.get_by_id(db, vehicle_id)

        if vehicle is None:
            raise ValueError("Vehicle not found")

        VehicleRepository.delete(db, vehicle)

    @staticmethod
    def search(
        db: Session,
        make=None,
        model=None,
        category=None,
        min_price=None,
        max_price=None,
    ):
        return VehicleRepository.search(
            db,
            make,
            model,
            category,
            min_price,
            max_price,
        )