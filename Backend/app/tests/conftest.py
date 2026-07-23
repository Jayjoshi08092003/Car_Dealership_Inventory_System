import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database.database import Base, get_db
from app.core.security import get_current_user, get_current_admin
from app.models.user import User

TEST_DATABASE_URL = (
    "postgresql://postgres:jay123@localhost:5432/car_inventory"
)

engine = create_engine(TEST_DATABASE_URL)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


@pytest.fixture(scope="session", autouse=True)
def setup_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def admin_user():
    return User(
        id=1,
        username="admin",
        email="admin@test.com",
        role="admin",
        is_active=True,
    )


@pytest.fixture
def normal_user():
    return User(
        id=2,
        username="user",
        email="user@test.com",
        role="customer",
        is_active=True,
    )


@pytest.fixture
def client(admin_user):
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = lambda: admin_user
    app.dependency_overrides[get_current_admin] = lambda: admin_user

    with TestClient(app) as c:
        yield c

    app.dependency_overrides.clear()


@pytest.fixture
def user_client(normal_user):
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = lambda: normal_user

    with TestClient(app) as c:
        yield c

    app.dependency_overrides.clear()


@pytest.fixture
def anonymous_client():
    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as c:
        yield c

    app.dependency_overrides.clear()


@pytest.fixture
def vehicle_payload():
    return {
        "make": "Toyota",
        "model": "Corolla",
        "year": 2024,
        "category": "Sedan",
        "price": 22000,
        "stock": 5,
    }