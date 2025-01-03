from fastapi import Request, HTTPException
from fastapi.exceptions import RequestValidationError
from app.core.errorHandler import Standard_response

def add_exception_handlers(app):

    # Manejador para errores HTTPException
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return Standard_response(exc.status_code, "Error procesando la solicitud", exc.detail)

    # Manejador para errores de validación (RequestValidationError)
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        return Standard_response(422, "Datos de entrada no válidos", exc.errors())

    # Manejador para cualquier excepción inesperada
    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        return Standard_response(500, "Ocurrió un error inesperado", str(exc))
