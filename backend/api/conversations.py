# api/conversation.py

from typing import Any
import logging

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy.exc import IntegrityError

import uuid
import crud
import deps
import schemas
from models.conversation import ConversationOut

# Create a router for Conversation
router = APIRouter()


@router.get("/", response_model=dict[str, Any])
async def index(
    db: deps.SessionDep,
    name: str = "",
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
):
    """
    Get all Conversations.

    :param db: The database session dependency.
    :param name: Optional name parameter to filter Conversations by name.
    :param page: Optional page parameter for pagination.
    :param per_page: Optional per_page parameter for pagination (default: 20, max: 100).
    :return: A dictionary containing the list of Conversations, page, and per_page.
    """
    queries = {"name": name}

    conversations = crud.conversation.get_multi(
        db=db, queries=queries, per_page=per_page, offset=(page - 1) * per_page
    )
    return {
        "conversations": conversations,
        "page": page,
        "per_page": per_page,
    }


@router.get("/{id}", response_model=ConversationOut)
async def show(conversation: deps.CurrentConversation):
    """
    Get a specific Conversation by ID.
    """
    return conversation


@router.post("/", response_model=ConversationOut, status_code=201)
async def create(
    data: schemas.ConversationCreate,
    db: deps.SessionDep,
    current_user: deps.CurrentUser,
):
    """
    Create a new Conversation.
    """
    user_id = current_user.id
    update = {
        "slug": str(uuid.uuid4()),
        "excerpt": "This is a conversation between two people.",
        "user_id": user_id,
    }
    try:
        conversation = crud.conversation.create(db=db, obj_in=update)
        crud.message.create(
            db=db,
            obj_in={
                "message": data.message,
                "conversation_id": conversation.id,
                "user_id": user_id,
            },
        )

        # Get the response from OpenAI
        try:
            oai_message = crud.conversation.call_openai(
                messages=conversation.messages, new_message=data.message
            )
            crud.message.create(
                db=db,
                obj_in={
                    "message": oai_message,
                    "ai": True,
                    "conversation_id": conversation.id,
                    "user_id": user_id,
                },
            )

        except Exception as e:
            logging.error(f"Error processing conversation: {e}")

        return conversation
    except IntegrityError as e:
        raise HTTPException(
            status_code=422, detail=f"An error occurred, {e.orig.pgerror}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred, {e}")


@router.put("/{id}", response_model=ConversationOut)
async def update(
    update: schemas.ConversationUpdate,
    db: deps.SessionDep,
    conversation: deps.CurrentConversation,
):
    """
    Update a specific Conversation by ID.
    """
    try:
        return crud.conversation.update(db=db, db_obj=conversation, obj_in=update)
    except IntegrityError as e:
        raise HTTPException(
            status_code=422, detail=f"Error updating Conversation, {e.orig.pgerror}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating Conversation, {e}")


@router.put("/{id}/message", response_model=ConversationOut)
async def patch(
    payload: schemas.ConversationCreate,
    db: deps.SessionDep,
    current_user: deps.CurrentUser,
    conversation: deps.CurrentConversation,
):
    """
    Push a new message to a specific Conversation by ID.
    """
    try:
        crud.message.create(
            db=db,
            obj_in={
                "message": payload.message,
                "conversation_id": conversation.id,
                "user_id": current_user.id,
            },
        )
        return conversation
    except IntegrityError as e:
        raise HTTPException(
            status_code=422, detail=f"Error updating Conversation, {e.orig.pgerror}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating Conversation, {e}")


@router.delete("/{id}", response_model=ConversationOut)
async def delete(db: deps.SessionDep, conversation: deps.CurrentConversation):
    """
    Delete a specific Conversation by ID.
    """
    try:
        return crud.conversation.remove(db=db, id=conversation.id)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting Conversation, invalid Conversation id, {e}",
        )