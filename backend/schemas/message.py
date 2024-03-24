from pydantic import BaseModel


# Shared properties
class MessageBase(BaseModel):
    message: str


# Properties to receive via API on creation
class MessageCreate(MessageBase):
    pass


# Properties to receive via API on update
class MessageUpdate(MessageBase):
    pass
