from typing import Union, Any

from sqlalchemy import String
from sqlmodel import Field, Relationship, Column

from models.base import BaseModel
from models.user import User


# Shared properties
class ConversationBase(BaseModel):
    slug: str = Field(sa_column=Column(String))
    excerpt: str = Field(sa_column=Column(String))

    class Config:
        from_attributes = True


class Conversation(ConversationBase, table=True):
    id: int = Field(primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id")
    user: User | None = Relationship(back_populates="conversations")
    messages: list["Message"] = Relationship(back_populates="conversation")


class ConversationOut(ConversationBase):
    id: int
    messages: list[Any] = []
