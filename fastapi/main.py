from fastapi import FastAPI
from app.database import engine, Base
from app.routes.main import api_router


app = FastAPI()

app.include_router(api_router)
Base.metadata.create_all(bind=engine)