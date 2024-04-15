import schemas
import openai
import logging

from core.config import settings
from crud.base import CRUDBase
from models.conversation import Conversation
from fastapi import BackgroundTasks


class CRUDConversation(
    CRUDBase[Conversation, schemas.ConversationCreate, schemas.ConversationUpdate]
):
    async def call_openai(self, messages: list[Conversation], job, background_tasks: BackgroundTasks):
        # Combine previous messages with the new message
        # prompt_text = f"{self.get_prompt(messages=messages)}\nUser: {new_message}\nAI:"

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
                content = chunk["choices"][0].get("delta", {}).get("content", "")
                if content:
                    message += content
                    yield content
            background_tasks.add_task(job, message)
        except Exception as error:
            logging.error(error)
            yield str(error)

    def get_prompt(self, messages: list[Conversation]) -> str:
        prompt = ""
        for message in messages:
            if message["ai"]:
                prompt += f"AI: {message['message']}\n"
            else:
                prompt += f"User: {message['message']}\n"
        return prompt


conversation = CRUDConversation(Conversation)
