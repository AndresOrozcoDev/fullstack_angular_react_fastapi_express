# Gestion de tareas

Proyecto backend creado basado en Node v3.13.0 con Express v0.115.4 para la gestion de usuarios en una base de datos SQLite3.


### Ejecucion de desarrollo

```bash
npm run dev
```

### Documentacion de API Rest

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