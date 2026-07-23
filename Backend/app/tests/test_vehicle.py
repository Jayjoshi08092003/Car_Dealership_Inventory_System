import pytest

from app.models.vehicle import Vehicle


# ==========================================================
# CREATE VEHICLE
# ==========================================================

def test_create_vehicle_success(client, vehicle_payload):

    response = client.post(
        "/vehicles",
        json=vehicle_payload,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["make"] == vehicle_payload["make"]
    assert data["model"] == vehicle_payload["model"]
    assert data["stock"] == vehicle_payload["stock"]


def test_create_vehicle_missing_field(client):

    response = client.post(
        "/vehicles",
        json={
            "make": "Toyota"
        },
    )

    assert response.status_code == 422


# ==========================================================
# GET ALL
# ==========================================================

def test_get_all_vehicles(client):

    response = client.get("/vehicles")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


# ==========================================================
# SEARCH
# ==========================================================

def test_search_by_make(client):

    response = client.get(
        "/vehicles/search?make=Toyota"
    )

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_search_by_model(client):

    response = client.get(
        "/vehicles/search?model=Corolla"
    )

    assert response.status_code == 200


def test_search_by_category(client):

    response = client.get(
        "/vehicles/search?category=Sedan"
    )

    assert response.status_code == 200


def test_search_price_range(client):

    response = client.get(
        "/vehicles/search?min_price=10000&max_price=30000"
    )

    assert response.status_code == 200


# ==========================================================
# UPDATE
# ==========================================================

def test_update_vehicle_success(
    client,
    vehicle_payload,
    update_payload,
):

    created = client.post(
        "/vehicles",
        json=vehicle_payload,
    )

    vehicle_id = created.json()["id"]

    response = client.put(
        f"/vehicles/{vehicle_id}",
        json=update_payload,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["make"] == "Honda"
    assert data["model"] == "City"


def test_update_invalid_vehicle(client, update_payload):

    response = client.put(
        "/vehicles/999999",
        json=update_payload,
    )

    assert response.status_code == 404


def test_update_invalid_payload(client):

    response = client.put(
        "/vehicles/1",
        json={
            "year": "invalid"
        },
    )

    assert response.status_code == 422


# ==========================================================
# DELETE
# ==========================================================

def test_delete_vehicle_success(client, vehicle_payload):

    created = client.post(
        "/vehicles",
        json=vehicle_payload,
    )

    vehicle_id = created.json()["id"]

    response = client.delete(
        f"/vehicles/{vehicle_id}"
    )

    assert response.status_code == 200
    assert response.json()["message"] == "Vehicle deleted successfully"


def test_delete_invalid_vehicle(client):

    response = client.delete(
        "/vehicles/999999"
    )

    assert response.status_code == 404


# ==========================================================
# PURCHASE
# ==========================================================

def test_purchase_vehicle_success(
    client,
    vehicle_payload,
):

    created = client.post(
        "/vehicles",
        json=vehicle_payload,
    )

    vehicle_id = created.json()["id"]

    response = client.post(
        f"/vehicles/{vehicle_id}/purchase",
        json={
            "quantity": 1
        },
    )

    assert response.status_code == 200

    vehicle = response.json()

    assert vehicle["stock"] == (
        vehicle_payload["stock"] - 1
    )


def test_purchase_insufficient_stock(
    client,
    vehicle_payload,
):

    created = client.post(
        "/vehicles",
        json=vehicle_payload,
    )

    vehicle_id = created.json()["id"]

    response = client.post(
        f"/vehicles/{vehicle_id}/purchase",
        json={
            "quantity": 999
        },
    )

    assert response.status_code == 400


# ==========================================================
# RESTOCK
# ==========================================================

def test_restock_vehicle_success(
    client,
    vehicle_payload,
):

    created = client.post(
        "/vehicles",
        json=vehicle_payload,
    )

    vehicle_id = created.json()["id"]

    response = client.post(
        f"/vehicles/{vehicle_id}/restock",
        json={
            "quantity": 5
        },
    )

    assert response.status_code == 200

    vehicle = response.json()

    assert vehicle["stock"] == (
        vehicle_payload["stock"] + 5
    )


def test_restock_invalid_vehicle(client):

    response = client.post(
        "/vehicles/999999/restock",
        json={
            "quantity": 10
        },
    )

    assert response.status_code == 400