from fastapi import APIRouter, HTTPException

from lib.db import db
from models.signup import Signup, SignupCreate

router = APIRouter()


@router.post("/signups", response_model=Signup, status_code=201)
async def create_signup(payload: SignupCreate):
    email = payload.email.strip().lower()
    if await db.signups.find_one({"email": email, "source": payload.source}):
        raise HTTPException(status_code=409, detail="This email is already on the list.")
    signup = Signup(email=email, source=payload.source)
    await db.signups.insert_one(signup.model_dump())
    return signup
