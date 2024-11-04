# Gestion de tareas

Proyecto backend creado basado en Node v3.13.0 con Express v0.115.4 para la gestion de usuarios en una base de datos SQLite3.


### Ejecucion de desarrollo

```bash
npm run dev
```

### Documentacion de API Rest

#### Post login

```http
  POST /api/users/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API-KEY` | `string` | **Required**. Your API key |

```bash
**Request Body**
{
  "username": "string",
  "password": "string"
}
```

#### Post register

```http
  POST /api/users/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API-KEY` | `string` | **Required**. Your API key |

#### Get me

```http
  POST /api/users/me
```

| Parameter | Type     | Description                |
| :--------------- | :------- | :------------------------- |
| `API-KEY`        | `string` | **Required**. Your API key |
| `x-access-token` | `string` | **Required**. Your token   |