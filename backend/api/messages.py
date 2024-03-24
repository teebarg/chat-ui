# api/message.py

from typing import Any

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy.exc import IntegrityError

import crud
import deps
import schemas
from models.message import MessageOut

# Create a router for Message
router = APIRouter()


@router.get("/", response_model=dict[str, Any])
async def index(
    db: deps.SessionDep,
    name: str = "",
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
):
    """
    Get all Messages.

    :param db: The database session dependency.
    :param name: Optional name parameter to filter Messages by name.
    :param page: Optional page parameter for pagination.
    :param per_page: Optional per_page parameter for pagination (default: 20, max: 100).
    :return: A dictionary containing the list of Messages, page, and per_page.
    """
    queries = {"name": name}

    messages = crud.message.get_multi(
        db=db, queries=queries, per_page=per_page, offset=(page - 1) * per_page
    )
    return {
        "messages": messages,
        "page": page,
        "per_page": per_page,
    }


@router.get("/{id}", response_model=MessageOut)
async def show(current_message: deps.CurrentMessage):
    """
    Get a specific Message by ID.
    """
    return current_message


@router.put("/{id}", response_model=MessageOut)
async def update(
    update: schemas.MessageUpdate,
    db: deps.SessionDep,
    current_message: deps.CurrentMessage,
):
    """
    Update a specific Message by ID.
    """
    try:
        return crud.message.update(db=db, db_obj=current_message, obj_in=update)
    except IntegrityError as e:
        raise HTTPException(
            status_code=422, detail=f"Error updating Message, {e.orig.pgerror}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating Message, {e}")


@router.delete("/{id}", response_model=MessageOut)
async def delete(db: deps.SessionDep, current_message: deps.CurrentMessage):
    """
    Get a specific Message by ID.
    """
    try:
        return crud.message.remove(db=db, id=current_message.id)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error deleting Message, invalid Message id, {e}"
        )
