from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.api.users import router as user_router
from app.api.vehicle import router as vehicle_router

app = FastAPI(
    title="Car Dealership Inventory System",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(vehicle_router)


@app.get("/")
def root():
    return {
        "message": "Car Dealership Inventory System API"
    }