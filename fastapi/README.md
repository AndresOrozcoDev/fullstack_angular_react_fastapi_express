# Gestion de tareas

Proyecto backend creado basado en Python v3.13.0 con FastAPI v0.115.4 para la gestion de tares en una base de datos SQLite3.

## Construido

En esta sección se deben incluir los principales frameworks y bibliotecas que se utilizaron para iniciar el proyecto. Los complementos y plugins se pueden dejar para la sección de agradecimientos. A continuación se muestran algunos ejemplos.

* [![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff)](#)
* [![FastAPI](https://img.shields.io/badge/FastAPI-009485.svg?logo=fastapi&logoColor=white)](#)
* [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#)

## Demo

Aquí está el enlace para visualizar la documentacion de Swagger: [Servicios Web](https://fullstack-angular-react-fastapi-express.onrender.com/docs)

## Ejecucion de desarrollo

Activar entorno virtual
```bash
env\Scripts\activate
```

```bash
python main.py
```

## Documentacion de API Rest

#### Get tasks

```bash
  GET /api/tasks
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API_KEY` | `string` | **Required**. Your API key |

```bash
Response:
    {
        "status_code": 200,
        "message": "Tak list.",
        "data": []
    }
```

#### Post tasks

```bash
  POST /api/tasks
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API_KEY` | `string` | **Required**. Your API key |

```bash
Request Body:
    {
        "name": "task name",
        "description": "Hacer commit",
        "status": "Completado"
    }
```

```bash
Response:
    {
        "status_code": 200,
        "message": "Tak created.",
        "data": [
            "id": 1,
            "name": "task name",
            "description": "Hacer commit",
            "status": "Completado",
            "created": "2024-11-07",
            "updated": "2024-11-07",
        ]
    }
```

#### Put task

```bash
  PUT /api/tasks/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API_KEY` | `string` | **Required**. Your API key |

```bash
Request Body:
    {
        "name": "task name",
        "description": "Hacer commit",
        "status": "completado"
    }
```

```bash
Response:
    {
        "status_code": 200,
        "message": "Tak updated.",
        "data": [
            "id": 1,
            "name": "task name",
            "description": "Hacer commit",
            "status": "Completado",
            "created": "2024-11-07",
            "updated": "2024-11-07",
        ]
    }
```

#### Delete task

```bash
  DELETE /api/tasks/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API_KEY` | `string` | **Required**. Your API key |
| `id`      | `number` | **Required**. Your ID      |

```bash
Response:
    {
        "status_code": 200,
        "message": "Tak deleted.",
        "data": [
            "id": 1,
            "name": "task name",
            "description": "Hacer commit",
            "status": "Completado",
            "created": "2024-11-07",
            "updated": "2024-11-07",
        ]
    }
```

## Andamio de codigo

Instalar dependencias
```bash
pip install -r requirements.txt
```

Crear o modificar archivo de dependencias
```bash
pip freeze > requirements.txt
```

## Pruebas unitarias

Para la verificacion de codigo se usan pruebas unitarias con la herramienta de Pytest con Httpx y se ejecuta con el siguiente comando:

```bash
pytest
```

## Visualizador de la base de datos
Puedes visualizar el archivo .sqlite con [SQLite Viewer](https://sqliteviewer.app/) subiendo el archivo.

## Autor

[@AndresOrozcoDev](https://github.com/AndresOrozcoDev)