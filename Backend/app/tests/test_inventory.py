import pytest


# ============================================================
# INVENTORY FLOW TESTS
# ============================================================

def test_purchase_reduces_stock(client, vehicle_payload):

    created = client.post(
        "/vehicles",
        json=vehicle_payload
    )

    vehicle_id = created.json()["id"]

    client.post(
        f"/vehicles/{vehicle_id}/purchase",
        json={"quantity": 2}
    )

    vehicle = client.get(
        f"/vehicles/{vehicle_id}"
    ).json()

    assert vehicle["stock"] == vehicle_payload["stock"] - 2


def test_multiple_purchases(client, vehicle_payload):

    created = client.post(
        "/vehicles",
        json=vehicle_payload
    )

    vehicle_id = created.json()["id"]

    client.post(
        f"/vehicles/{vehicle_id}/purchase",
        json={"quantity": 1}
    )

    client.post(
        f"/vehicles/{vehicle_id}/purchase",
        json={"quantity": 2}
    )

    vehicle = client.get(
        f"/vehicles/{vehicle_id}"
    ).json()

    assert vehicle["stock"] == vehicle_payload["stock"] - 3


def test_restock_increases_stock(client, vehicle_payload):

    created = client.post(
        "/vehicles",
        json=vehicle_payload
    )

    vehicle_id = created.json()["id"]

    client.post(
        f"/vehicles/{vehicle_id}/restock",
        json={"quantity": 5}
    )

    vehicle = client.get(
        f"/vehicles/{vehicle_id}"
    ).json()

    assert vehicle["stock"] == vehicle_payload["stock"] + 5


# ============================================================
# AUTHORIZATION
# ============================================================

def test_non_admin_cannot_create_vehicle(
    user_client,
    vehicle_payload
):

    response = user_client.post(
        "/vehicles",
        json=vehicle_payload
    )

    assert response.status_code == 403


def test_non_admin_cannot_update_vehicle(
    user_client,
    update_payload
):

    response = user_client.put(
        "/vehicles/1",
        json=update_payload
    )

    assert response.status_code == 403


def test_non_admin_cannot_delete_vehicle(
    user_client
):

    response = user_client.delete(
        "/vehicles/1"
    )

    assert response.status_code == 403


def test_anonymous_cannot_create_vehicle(
    anonymous_client,
    vehicle_payload
):

    response = anonymous_client.post(
        "/vehicles",
        json=vehicle_payload
    )

    assert response.status_code == 401


def test_anonymous_cannot_delete_vehicle(
    anonymous_client
):

    response = anonymous_client.delete(
        "/vehicles/1"
    )

    assert response.status_code == 401


# ============================================================
# VALIDATION
# ============================================================

def test_purchase_negative_quantity(
    client,
    vehicle_payload
):

    created = client.post(
        "/vehicles",
        json=vehicle_payload
    )

    vehicle_id = created.json()["id"]

    response = client.post(
        f"/vehicles/{vehicle_id}/purchase",
        json={
            "quantity": -5
        }
    )

    assert response.status_code in [400, 422]


def test_restock_negative_quantity(
    client,
    vehicle_payload
):

    created = client.post(
        "/vehicles",
        json=vehicle_payload
    )

    vehicle_id = created.json()["id"]

    response = client.post(
        f"/vehicles/{vehicle_id}/restock",
        json={
            "quantity": -10
        }
    )

    assert response.status_code in [400, 422]


# ============================================================
# DATABASE INTEGRITY
# ============================================================

def test_delete_then_fetch_returns_404(
    client,
    vehicle_payload
):

    created = client.post(
        "/vehicles",
        json=vehicle_payload
    )

    vehicle_id = created.json()["id"]

    client.delete(
        f"/vehicles/{vehicle_id}"
    )

    response = client.get(
        f"/vehicles/{vehicle_id}"
    )

    assert response.status_code == 404


def test_database_consistency_after_purchase(
    client,
    vehicle_payload
):

    created = client.post(
        "/vehicles",
        json=vehicle_payload
    )

    vehicle_id = created.json()["id"]

    client.post(
        f"/vehicles/{vehicle_id}/purchase",
        json={
            "quantity": 1
        }
    )

    first = client.get(
        f"/vehicles/{vehicle_id}"
    ).json()

    second = client.get(
        f"/vehicles/{vehicle_id}"
    ).json()

    assert first["stock"] == second["stock"]


def test_database_consistency_after_restock(
    client,
    vehicle_payload
):

    created = client.post(
        "/vehicles",
        json=vehicle_payload
    )

    vehicle_id = created.json()["id"]

    client.post(
        f"/vehicles/{vehicle_id}/restock",
        json={
            "quantity": 4
        }
    )

    vehicle = client.get(
        f"/vehicles/{vehicle_id}"
    ).json()

    assert vehicle["stock"] == vehicle_payload["stock"] + 4


# ============================================================
# TRANSACTION SAFETY
# ============================================================

def test_purchase_invalid_vehicle_returns_error(
    client
):

    response = client.post(
        "/vehicles/999999/purchase",
        json={
            "quantity": 1
        }
    )

    assert response.status_code in [400, 404]


def test_restock_invalid_vehicle_returns_error(
    client
):

    response = client.post(
        "/vehicles/999999/restock",
        json={
            "quantity": 5
        }
    )

    assert response.status_code in [400, 404]


def test_inventory_list_endpoint(client):

    response = client.get("/vehicles")

    assert response.status_code == 200

    assert isinstance(
        response.json(),
        list
    )