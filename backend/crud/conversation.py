import schemas
import openai
import logging

from core.config import settings
from crud.base import CRUDBase
from models.conversation import Conversation


class CRUDConversation(
    CRUDBase[Conversation, schemas.ConversationCreate, schemas.ConversationUpdate]
):
    def call_openai(self, messages: list[Conversation]) -> str:
        # Combine previous messages with the new message
        # prompt_text = f"{self.get_prompt(messages=messages)}\nUser: {new_message}\nAI:"

        conversations = [
            {"role": "user" if msg.ai == False else "assistant", "content": msg.message}
            for msg in messages
        ]
        # Append the new user message

        # Call OpenAI API
        try:
            openai.api_key = settings.OPENAI_API_KEY
            response = openai.ChatCompletion.create(
                model="gpt-4-1106-preview",
                messages=conversations,
                max_tokens=4096,
                temperature=0.7,
                n=1,
                # response_format={"type": "json_object"},
            )
            return response.choices[0].message.content
        except Exception as error:
            logging.error(f"{error}")
            raise Exception(
                f"An error occurred while getting summary from openai: {error}"
            )

    def get_prompt(self, messages: list[Conversation]) -> str:
        prompt = ""
        for message in messages:
            if message["ai"]:
                prompt += f"AI: {message['message']}\n"
            else:
                prompt += f"User: {message['message']}\n"
        return prompt


conversation = CRUDConversation(Conversation)
