import os
import uvicorn

from fastapi.security import APIKeyHeader
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi import FastAPI, Depends, HTTPException, Security, HTTPException, Request

from app.core.database import engine, Base
from app.api.routes.main import api_router
from app.core.errorHandler import Standard_response
from app.core.exception_handlers import add_exception_handlers


# Variables de entorno
PORT_FASTAPI = int(os.getenv("PORT_FASTAPI", 8000))

# Configuracion de Swagger
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
            "url": f"http://localhost:{PORT_FASTAPI}",
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

# Agregar manejadores de excepciones
add_exception_handlers(app)

# Rutas principales
app.include_router(api_router)

# Instancia de la base de datos
Base.metadata.create_all(bind=engine)

# Ejecución de la aplicación
if __name__ == "__main__":
    port = int(os.getenv("PORT", PORT_FASTAPI))
    uvicorn.run("main:app", host="0.0.0.0", port=port)