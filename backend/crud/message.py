import schemas
from crud.base import CRUDBase
from models.message import Message


class CRUDMessage(CRUDBase[Message, schemas.MessageCreate, schemas.MessageUpdate]):
    pass


message = CRUDMessage(Message)
