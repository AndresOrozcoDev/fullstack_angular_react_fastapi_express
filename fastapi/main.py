from fastapi import FastAPI
from app.database import engine, Base

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

Base.metadata.create_all(bind=engine)