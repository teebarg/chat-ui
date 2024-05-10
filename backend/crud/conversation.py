import schemas
import openai
from core.logging import logger

from core.config import settings
from crud.base import CRUDBase
from models.conversation import Conversation
from fastapi import BackgroundTasks


class CRUDConversation(
    CRUDBase[Conversation, schemas.ConversationCreate, schemas.ConversationUpdate]
):    
    async def call_openai(self, messages: list[Conversation], job, background_tasks: BackgroundTasks):
        conversations = [
            {"role": "user" if msg.ai == False else "assistant", "content": msg.message}
            for msg in messages
        ]
        # Append the new user message

        try:
            openai.api_key = settings.OPENAI_API_KEY
            response = openai.ChatCompletion.create(
                model='gpt-4-1106-preview',
                messages=conversations,
                temperature=0.7,
                max_tokens=4096,
                n=1,
                stream=True
            )
            message = ""
            for chunk in response:
                # sourcery skip: use-named-expression
                content = chunk["choices"][0].get("delta", {}).get("content", "")
                if content:
                    message += content
                    yield content
            background_tasks.add_task(job, message)
        except Exception as error:
            logger.error(error)
            yield str(error)

conversation = CRUDConversation(Conversation)
