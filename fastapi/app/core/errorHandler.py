from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


def Standard_response(status_code: int, message: str, data: any):
    return JSONResponse(
        status_code=status_code,
        content={
            "status_code": status_code,
            "message": message,
            "data": jsonable_encoder(data)
        }
    )