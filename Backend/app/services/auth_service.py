from sqlalchemy.orm import Session

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.models.user import User
from app.repositories.user_repository import UserRepository


class AuthService:

    @staticmethod
    def register(
        db: Session,
        username: str,
        email: str,
        password: str
    ):

        if UserRepository.get_by_email(db, email):
            raise ValueError("Email already registered")

        if UserRepository.get_by_username(db, username):
            raise ValueError("Username already exists")

        user = User(
            username=username,
            email=email,
            password_hash=hash_password(password),
            role="customer"
        )

        return UserRepository.create(
            db,
            user
        )

    @staticmethod
    def login(
        db: Session,
        email: str,
        password: str
    ):

        user = UserRepository.get_by_email(
            db,
            email
        )

        if user is None:
            raise ValueError("Invalid email or password")

        if not verify_password(
            password,
            user.password_hash
        ):
            raise ValueError("Invalid email or password")

        access_token = create_access_token(
            {
                "sub": user.email,
                "role": user.role
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }