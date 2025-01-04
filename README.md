# Plataforma Fullstack para Gestión de Tareas

## Estructura del Proyecto

El proyecto está compuesto por dos frontends y dos backends que trabajan en conjunto para proporcionar una solución completa para la autenticación y la gestión de tareas.

### Frontends

#### **Angular**
- **Funcionalidad principal:** Autenticación.
- **Características:**
  - Registro, inicio de sesión y recuperación de contraseña.
  - Control de acceso según roles (`admin` o `user`).
  - Interfaz adaptable a cualquier dispositivo (responsive).
  - Notificaciones visuales para éxitos, errores o advertencias.

#### **React**
- **Funcionalidad principal:** Gestión de tareas.
- **Características:**
  - CRUD de tareas (crear, leer, actualizar y eliminar).
  - Marcar tareas como completadas.
  - Interfaz adaptable a cualquier dispositivo (responsive).
  - Notificaciones visuales para éxitos, errores o advertencias.

### Backends

#### **Express**
- **Funcionalidad principal:** Gestión de usuarios.
- **Características:**
  - API RESTful para gestión de usuarios.
  - Seguridad mediante JWT para protección de contraseñas.
  - Rutas protegidas por un `header API_KEY`.
  - Manejo de errores con mensajes claros y estados de respuesta adecuados.
  - Documentacion con Swagger.

#### **FastAPI**
- **Funcionalidad principal:** Gestión de tareas.
- **Características:**
  - API RESTful para el CRUD de tareas.
  - Rutas protegidas por un `header API_KEY`.
  - Manejo de errores con mensajes claros y estados de respuesta adecuados.
  - Documentacion con Swagger.

### Base de Datos
- **SQLite**
  - **Tabla `user`:** Maneja usuarios con campos como `id`, `nombre`, `correo`, `rol` y `contraseña` (almacenada como hash).
  - **Tabla `task`:** Maneja tareas con campos como `id`, `título`, `descripción`, `estado`, `fecha_creación`, y `fecha_actualización`.

---

## Ejecución Local

### Dependencias Individuales
Cada carpeta en el directorio raíz (`angular`, `react`, `express`, `fastapi`) contiene un README con instrucciones detalladas y comandos para configurar y ejecutar cada parte del proyecto localmente.

### Ejecución con Docker Compose
Para ejecutar todos los proyectos de forma paralela:
1. Asegúrate de tener instalado Docker Desktop.
2. Ejecuta el siguiente comando desde la raíz del proyecto:

```bash
docker-compose up
```

Esto iniciará todos los servicios (frontends y backends) en contenedores Docker.

---

## Despliegue

- **Frontends:** Desplegados en **Netlify**.
  - [Portal de administrador](https://incomparable-gumdrop-472cf6.netlify.app/)
  - [Panel de Usuarios](https://chimerical-licorice-644a23.netlify.app/)
- **Backends:** Desplegados en **Render**.
  - [Servicios Web Usuarios](https://fullstack-angular-react-fastapi-express-1.onrender.com/docs/)
  - [Servicios Web Tareas](https://fullstack-angular-react-fastapi-express.onrender.com/docs)

---

## Funcionalidades Adicionales

- **Seguridad:**
  - Uso de JWT para autenticación y autorización.
  - Protección de rutas con `API_KEY`.

- **Notificaciones:**
  - Los frontends muestran mensajes de éxito, error o advertencia para todas las operaciones.

- **Manejo de errores:**
  - Mensajes claros y estados de respuesta adecuados en ambos backends.

- **Responsive Design:**
  - Ambos frontends están diseñados para adaptarse a cualquier tamaño de pantalla.

---

## Autor

**Andrés Orozco**
- [GitHub](https://github.com/AndresOrozcoDev)
- [LinkedIn](https://www.linkedin.com/in/andresorozcodev/)

---
