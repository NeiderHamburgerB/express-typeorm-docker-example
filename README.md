# Nodejs Expres typeorm
backend

## Descripción

Este proyecto es un backend desarrollado en Node.js y Express con el uso de TypeORM para la interacción con la base de datos. Proporciona una funcionalidad de autenticación de usuarios con dos roles diferentes: administrador y usuarios normales. El sistema de autenticación se valida mediante un middleware personalizado. Además, se ha configurado la imagen de PostgreSQL en el archivo de Docker Compose para la base de datos.

## Funcionalidades
Crud productos por parte del administrador
Crear compra de productos por parte del usuario normal
Ver todas las compras por parte del administrador

### Roles y Acceso

Se han definido dos roles de usuario: administrador y usuario normal. Cada rol tiene acceso a diferentes funcionalidades:

- **Administrador:**
  - Realizar todas las operaciones CRUD en productos.
  - Ver todas las compras realizadas.

- **Usuario Normal:**
  - Ver la lista de productos disponibles.
  - Realizar compras de productos.
  - Ver el historial de sus compras.

### Middleware de Autenticación

Se ha implementado un middleware de autenticación para verificar los roles y permitir el acceso adecuado a las rutas y funcionalidades correspondientes.

## Installation

```bash
$ docker compose up
  Situese en el proyecto y ejecute docker compose up para iniciar la imagen de la base de datos
```

```bash
$ npm install
  Coloque el .env en la raiz del proyecto
  Situese en el proyecto y ejecute en desarrollo con npm run start:dev, para más opciones ver el package.json
```
