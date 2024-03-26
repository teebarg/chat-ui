from typing import Union

from sqlalchemy import String
from sqlmodel import Column, Field, Relationship, SQLModel

from models.base import BaseModel
from models.user import User
from models.conversation import Conversation


# Shared properties
class MessageBase(BaseModel):
    # message: Union[str, None] = None
    message: str = Field(sa_column=Column(String))
    ai: bool = Field(default=False)

    class Config:
        from_attributes = True


# Properties to receive via API on creation
class MessageCreate(MessageBase):
    conversation_id: int


# Properties to receive via API on update, all are optional
class MessageUpdate(MessageBase):
    pass


# Properties to return via API, id is always required
class MessageOut(MessageBase):
    id: int


# Database model, database table inferred from class name
class Message(MessageBase, table=True):
    id: Union[int, None] = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id")
    user: User | None = Relationship(back_populates="messages")
    conversation_id: int | None = Field(default=None, foreign_key="conversation.id")
    conversation: Conversation | None = Relationship(back_populates="messages")
