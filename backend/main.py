from fastapi import FastAPI

# from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware

from api.auth import router as auth_router
from api.users import router as users_router
from api.messages import router as messages_router
from api.conversations import router as conversations_router
from core.config import settings


def custom_generate_unique_id(route: APIRoute) -> str:
    tag = route.tags[0] if route.tags else ""
    return f"{tag}-{route.name}"


app = FastAPI(title=settings.PROJECT_NAME)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url="/api/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)

# Mount the routers under their respective paths
app.include_router(
    users_router, prefix="/api/users", tags=["users"]
)  # Include the user router
app.include_router(
    auth_router, prefix="/auth", tags=["auth"]
)  # Include the auth router
app.include_router(
    messages_router, prefix="/api/messages", tags=["messages"]
)  # Include the message router
app.include_router(
    conversations_router, prefix="/api/conversations", tags=["conversations"]
)  # Include the conversation router

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root path
@app.get("/")
async def root():
    return {"message": "Hello World!!!"}


@app.get("/api/health-check")
async def health_check():
    return {"message": "Server is running"}
