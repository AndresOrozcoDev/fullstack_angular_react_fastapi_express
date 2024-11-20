from fastapi import FastAPI, Depends, HTTPException, Security, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyHeader
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError

from app.core.database import engine, Base
from app.api.routes.main import api_router
from app.core.errorHandler import Standard_response


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

# Configuración de CORS y Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Manejador para errores HTTPException
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return Standard_response(
        exc.status_code,
        "Error procesando la solicitud",
        exc.detail
    )

# Manejador para errores de validación (RequestValidationError)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return Standard_response(
        422,
        "Datos de entrada no válidos",
        exc.errors()
    )

# Manejador para cualquier excepción inesperada
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return Standard_response(
        500,
        "Ocurrió un error inesperado",
        str(exc)
    )

# Creacion y esquema de Header
api_key_header = APIKeyHeader(name="API_KEY", auto_error=False)
API_KEY = "dev"

# Función para validar la API key
def get_api_key(api_key: str = Security(api_key_header)):
    if api_key is None or api_key != API_KEY:
        raise HTTPException(
            status_code=403,
            detail="Falta la clave API o no es válida"
        )
    return api_key

# Rutas principales
app.include_router(api_router, dependencies=[Depends(get_api_key)])

# Instancia de la base de datos
Base.metadata.create_all(bind=engine)