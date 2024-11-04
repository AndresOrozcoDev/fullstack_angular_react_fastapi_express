# Plataforma para gestión de tareas

### Estructura del Proyecto

#### Frontend

- Mini Frontend en Angular (Panel de Administración)
    Autenticación: Login para usuarios administrativos.
    Gestión de Tareas: CRUD de tareas (crear, leer, actualizar y eliminar).
    Filtros por estado de las tareas (pendiente, en progreso, completada).
    Visualización de estadísticas básicas (número de tareas por estado).
- Mini Frontend en React (Panel de Usuarios)
    Autenticación: Registro y login para usuarios regulares.
    Gestión de Tareas: CRUD de tareas (crear, leer, actualizar y eliminar).
    Filtros por nombre de tareas.
    Opción para marcar tareas como completadas.

#### Backend

- FastAPI (Gestión de Tareas)
    API RESTful para CRUD de tareas.
    Implementación de autenticación JWT para proteger las rutas.
    Conexión a la base de datos SQLite para almacenar las tareas.
- Express (Gestión de Usuarios)
    API RESTful para la gestión de usuarios (registro, autenticación y gestión).
    Implementación de autenticación JWT para proteger las rutas.
    Conexión a la base de datos SQLite para almacenar los usuarios.

#### Base de Datos

- SQLite
    Tablas para usuarios (con campos como id, nombre, correo, contraseña hash).
    Tablas para tareas (con campos como id, título, descripción, estado, fecha de creacion, fecha de actualizacion).

#### Seguridad

- JWT
    Utiliza JWT para asegurar las rutas tanto en FastAPI como en Express, permitiendo solo el acceso a los usuarios autenticados.

#### Funcionalidades Adicionales

- Manejo de Errores: Asegúrate de implementar un manejo de errores efectivo en ambas APIs.
- Interfaz de Usuario: Asegúrate de que la interfaz sea intuitiva, con mensajes claros sobre el estado de las acciones (éxitos y errores).
- Pruebas: Incluye pruebas unitarias y de integración para ambos backends y las funciones críticas de los frontends.

### Ejecucion local

Para una ejecucion rapida y sencilla, se desarrollo una contenerizacion en Docker, asi que es necesario que tengas Docker Desktop y ejecutar el siguiente comando

```bash
docker-compose up
```

## Autor

[@AndresOrozcoDev](https://github.com/AndresOrozcoDev)