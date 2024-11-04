from fastapi import FastAPI, Depends, HTTPException, Security
from fastapi.security import APIKeyHeader

from app.database import engine, Base
from app.routes.main import api_router


app = FastAPI(
    title='FastAPI',
    description='HTTP services.',
    version='0.1.0',
    contact={
        'name': 'Andres Orozco',
        'url': 'https://github.com/AndresOrozcoDev',
        'email': 'andres.orozco.dev@gmail.com',
    },
    servers=[
        {
            "url": "http://localhost:8000",
            "description": "Local server",
        },
    ],
)

api_key_header = APIKeyHeader(name="x-key", auto_error=False)
API_KEY = "dev"

# Función para validar la API key
def get_api_key(api_key: str = Security(api_key_header)):
    if api_key is None or api_key != API_KEY:
        raise HTTPException(
            status_code=403,
            detail="API key inválida"
        )
    return api_key

app.include_router(api_router, dependencies=[Depends(get_api_key)])
Base.metadata.create_all(bind=engine)