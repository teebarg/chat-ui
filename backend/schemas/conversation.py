from pydantic import BaseModel


# Shared properties
class ConversationBase(BaseModel):
    slug: str
    excerpt: str


# Properties to receive via API on creation
class ConversationCreate(BaseModel):
    message: str


# Properties to receive via API on update
class ConversationUpdate(BaseModel):
    excerpt: str
