import pytest

from app.models.user import User
from app.core.security import hash_password


# ============================================================
# Registration Tests
# ============================================================

def test_register_success(client, register_payload):

    response = client.post(
        "/auth/register",
        json=register_payload
    )

    assert response.status_code == 201

    data = response.json()

    assert data["username"] == register_payload["username"]
    assert data["email"] == register_payload["email"]
    assert data["role"] == "customer"


def test_register_duplicate_email(client, register_payload):

    client.post(
        "/auth/register",
        json=register_payload
    )

    response = client.post(
        "/auth/register",
        json={
            "username": "anotheruser",
            "email": register_payload["email"],
            "password": "Password@123"
        }
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"


def test_register_duplicate_username(client, register_payload):

    client.post(
        "/auth/register",
        json=register_payload
    )

    response = client.post(
        "/auth/register",
        json={
            "username": register_payload["username"],
            "email": "another@test.com",
            "password": "Password@123"
        }
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Username already exists"


def test_register_missing_field(client):

    response = client.post(
        "/auth/register",
        json={
            "username": "john"
        }
    )

    assert response.status_code == 422


def test_register_invalid_email(client):

    response = client.post(
        "/auth/register",
        json={
            "username": "john",
            "email": "invalid-email",
            "password": "Password@123"
        }
    )

    assert response.status_code == 422


# ============================================================
# Login Tests
# ============================================================

def test_login_success(client, db):

    user = User(
        username="john",
        email="john@test.com",
        password_hash=hash_password("Password@123"),
        role="customer"
    )

    db.add(user)
    db.commit()

    response = client.post(
        "/auth/login",
        data={
            "username": "john@test.com",
            "password": "Password@123"
        }
    )

    assert response.status_code == 200

    token = response.json()

    assert "access_token" in token
    assert token["token_type"] == "bearer"


def test_login_invalid_email(client):

    response = client.post(
        "/auth/login",
        data={
            "username": "unknown@test.com",
            "password": "Password@123"
        }
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"


def test_login_invalid_password(client, db):

    user = User(
        username="john",
        email="john@test.com",
        password_hash=hash_password("Password@123"),
        role="customer"
    )

    db.add(user)
    db.commit()

    response = client.post(
        "/auth/login",
        data={
            "username": "john@test.com",
            "password": "WrongPassword"
        }
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"


def test_login_missing_password(client):

    response = client.post(
        "/auth/login",
        data={
            "username": "john@test.com"
        }
    )

    assert response.status_code == 422


def test_login_missing_username(client):

    response = client.post(
        "/auth/login",
        data={
            "password": "Password@123"
        }
    )

    assert response.status_code == 422