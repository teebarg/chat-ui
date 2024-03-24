import schemas
import openai
import json
import logging

from crud.base import CRUDBase
from models.conversation import Conversation


class CRUDConversation(
    CRUDBase[Conversation, schemas.ConversationCreate, schemas.ConversationUpdate]
):
    def call_openai(self, messages: list[dict[str, str]], new_message: str) -> str:
        # Combine previous messages with the new message
        # prompt_text = f"{self.get_prompt(messages=messages)}\nUser: {new_message}\nAI:"

        conversations = [
            {"role": "user" if msg["ai"] == False else "AI", "content": msg["message"]}
            for msg in messages
        ]
        conversations.insert(
            0,
            {
                "role": "system",
                "content": "You are helping a programmer solve a problem. The programmer describes the problem and asks for your help. You can ask questions to understand the problem and provide a solution.",
            },
        )
        # Append the new user message
        conversations.append({"role": "user", "content": new_message})

        # Call OpenAI API
        try:
            openai.api_key = "sk-1234567890abcdef1234567890abcdef"
            response = openai.ChatCompletion.create(
                model="gpt-4-1106-preview",
                messages=conversations,
                max_tokens=4096,
                temperature=0.7,
                n=1
                # response_format={"type": "json_object"},
            )
            # Extract and return the generated AI response
            # ai_response = response.choices[-1].text.strip()
            return json.loads(response.choices[0].message.content)
        except Exception as error:
            logging.error(f"{error}")
            raise Exception(
                f"An error occurred while getting summary from openai: {error}"
            )

    def get_prompt(self, messages: list[dict[str, str]]) -> str:
        prompt = ""
        for message in messages:
            if message["ai"]:
                prompt += f"AI: {message['message']}\n"
            else:
                prompt += f"User: {message['message']}\n"
        return prompt


conversation = CRUDConversation(Conversation)
