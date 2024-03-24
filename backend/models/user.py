from typing import Union

from pydantic import EmailStr
from sqlalchemy import String
from sqlmodel import Column, Field, Relationship, SQLModel

from models.base import BaseModel


# Shared properties
class UserBase(BaseModel):
    # email: EmailStr = Field(unique=True, index=True)
    email: EmailStr = Field(sa_column=Column(String))
    is_active: bool = True
    is_superuser: bool = False
    firstname: Union[str, None] = None
    lastname: Union[str, None] = None

    class Config:
        from_attributes = True


# Properties to receive via API on creation
class UserCreate(UserBase):
    pass


class UserCreateOpen(SQLModel):
    email: str
    password: str
    firstname: Union[str, None] = None
    lastname: Union[str, None] = None


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: Union[str, None] = None


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: Union[int, None] = Field(default=None, primary_key=True)
    conversations: list["Conversation"] = Relationship(back_populates="user")
    messages: list["Message"] = Relationship(back_populates="user")


# Properties to return via API, id is always required
class UserOut(UserBase):
    id: int
    conversations: list["Conversation"] = []
