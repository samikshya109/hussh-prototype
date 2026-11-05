import uuid
from datetime import datetime, timezone
from typing import Literal

from pydantic import BaseModel, EmailStr, Field

SignupSource = Literal["agent_one", "tag_one"]


class SignupCreate(BaseModel):
    email: EmailStr
    source: SignupSource


class Signup(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    source: SignupSource
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
