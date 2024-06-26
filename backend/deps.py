from typing import Annotated, Any, Generator

import firebase_admin
import pyrebase
import requests
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from firebase_admin import auth, credentials, storage
from sqlmodel import Session

import crud
import schemas
from core.config import settings
from core.logging import logger
from db.engine import engine
from models.user import User
from models.conversation import Conversation
from models.message import Message

reusable_oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/login/access-token")


def get_db() -> Generator:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_auth() -> Generator:
    try:
        if not firebase_admin._apps:  # Check if the app is not already initialized
            cred = credentials.Certificate(settings.FIREBASE_CRED)
            firebase_admin.initialize_app(
                cred, {"storageBucket": settings.STORAGE_BUCKET}
            )
        firebase = pyrebase.initialize_app(settings.FIREBASE_CONFIG)

        # Get a reference to the auth service
        yield firebase.auth()
    except Exception as e:
        logger.error(f"An error occurred while trying to initialize auth. Error: {e}")
        raise HTTPException(
            status_code=int(e.status_code)
            if hasattr(e, "status_code")
            else status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=e.detail
            if hasattr(e, "detail")
            else f"An error occurred while trying to initialize auth, {e}",
        )
    finally:
        logger.info("auth closed")


def get_storage() -> Generator:
    try:
        if not firebase_admin._apps:  # Check if the app is not already initialized
            cred = credentials.Certificate(settings.FIREBASE_CRED)
            firebase_admin.initialize_app(
                cred, {"storageBucket": settings.STORAGE_BUCKET}
            )

        # Get a reference to the bucket
        yield storage.bucket()
    except Exception as e:
        logger.error(f"storage init error, {e}")
    finally:
        logger.debug("storage closed")


def get_current_user(
    db: SessionDep, token: TokenDep, auth2: Any = Depends(get_auth)
) -> User:
    try:
        if token is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Token cannot be none",
            )

        data = auth.verify_id_token(token)
        if "email" in data:
            if user := crud.get_user_by_email(db=db, email=data["email"]):
                return user
        elif user := crud.user.get(db=db, id=data["uid"]):
            return user

        else:
            raise HTTPException(status_code=404, detail="User not found")
    except requests.exceptions.HTTPError as err:
        logger.error(f"Get current user error, ${err}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    except Exception as e:
        logger.error(f"Get current user error, ${e}")
        if "Token expired" in str(e):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Token expired",
            )
        if "Wrong number of segments in token" in str(e):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Provide a valid token",
            )
        if "Could not verify token signature." in str(e):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not verify token signature.",
            )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"An error occurred while trying to validate credentials, {e}",
        )


def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
) -> User:
    if not current_user:
        raise HTTPException(status_code=401, detail="Unauthenticated user")
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


CurrentUser = Annotated[User, Depends(get_current_active_user)]


def get_conversation_path_param(
    slug: str, db: SessionDep, current_user: CurrentUser
) -> Conversation:
    if conversation := crud.conversation.get_by_slug(db=db, slug=slug):
        # if current user is not a participant in the conversation, raise unauthorized
        if current_user.id != conversation.user_id:
            raise HTTPException(
                status_code=401, detail="Unauthorized to access this conversation."
            )
        return conversation
    raise HTTPException(status_code=404, detail="Conversation not found.")


def get_message_path_param(
    id: str, db: SessionDep, current_user: CurrentUser
) -> Message:
    if message := crud.message.get(db=db, id=id):
        if current_user.id != message.user_id:
            raise HTTPException(
                status_code=401, detail="Unauthorized to access this message."
            )
        return message
    raise HTTPException(status_code=404, detail="Message not found.")


CurrentConversation = Annotated[Conversation, Depends(get_conversation_path_param)]
CurrentMessage = Annotated[Message, Depends(get_message_path_param)]


def get_current_active_superuser(
    current_user: schemas.User = Depends(get_current_user),
) -> schemas.User:
    if not crud.user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user
