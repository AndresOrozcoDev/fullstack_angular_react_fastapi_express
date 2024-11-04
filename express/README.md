# Gestion de tareas

Proyecto backend creado basado en Node v3.13.0 con Express v4.21.1 para la gestion de usuarios en una base de datos SQLite3.

## Construido

En esta sección se deben incluir los principales frameworks y bibliotecas que se utilizaron para iniciar el proyecto. Los complementos y plugins se pueden dejar para la sección de agradecimientos. A continuación se muestran algunos ejemplos.

* [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)]
* [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)]

## Ejecucion de desarrollo

```bash
npm run dev
```

## Documentacion de API Rest

#### Post login

```bash
  POST /api/users/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API-KEY` | `string` | **Required**. Your API key |

```bash
Request Body:
    {
        "username": "testuser",
        "password": "testpassword"
    }
```

```bash
Response:
    {
        "auth": true,
        "token": "eyJhb........"
    }
```

#### Post register

```bash
  POST /api/users/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API-KEY` | `string` | **Required**. Your API key |

```bash
Request Body:
    {
        "username": "testuser",
        "password": "testpassword"
    }
```

```bash
Response:
    {
        "username": "testuser",
        "password": "testpassword"
    }
```

#### Get me

```bash
  POST /api/users/me
```

| Parameter | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `API-KEY`        | `string` | **Required**. Your API key |
| `x-access-token` | `string` | **Required**. Your token   |

```bash
Response:
    {
        "id": 1,
        "username": "testuser",
        "password": "$2a$08$fr90......"
    }
```