from sqlalchemy.orm import Session
from sqlalchemy import and_

from app.models.vehicle import Vehicle


class VehicleRepository:

    @staticmethod
    def create(db: Session, vehicle: Vehicle):
        db.add(vehicle)
        db.commit()
        db.refresh(vehicle)
        return vehicle

    @staticmethod
    def get_all(db: Session):
        return db.query(Vehicle).all()

    @staticmethod
    def get_by_id(db: Session, vehicle_id: int):
        return (
            db.query(Vehicle)
            .filter(Vehicle.id == vehicle_id)
            .first()
        )

    @staticmethod
    def update(db: Session, vehicle: Vehicle):
        db.commit()
        db.refresh(vehicle)
        return vehicle

    @staticmethod
    def delete(db: Session, vehicle: Vehicle):
        db.delete(vehicle)
        db.commit()

    @staticmethod
    def search(
        db: Session,
        make=None,
        model=None,
        category=None,
        min_price=None,
        max_price=None,
    ):
        query = db.query(Vehicle)

        if make:
            query = query.filter(Vehicle.make.ilike(f"%{make}%"))

        if model:
            query = query.filter(Vehicle.model.ilike(f"%{model}%"))

        if category:
            query = query.filter(Vehicle.category.ilike(f"%{category}%"))

        if min_price is not None:
            query = query.filter(Vehicle.price >= min_price)

        if max_price is not None:
            query = query.filter(Vehicle.price <= max_price)

        return query.all()