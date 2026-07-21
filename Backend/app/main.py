from fastapi import FastAPI

app = FastAPI(
    title="Car Dealership Inventory API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Car Dealership Inventory System API Running"
    }