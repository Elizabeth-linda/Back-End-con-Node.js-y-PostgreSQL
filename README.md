# API REST - Sistema de Gestión de Usuarios

API REST desarrollada con Node.js, Express y PostgreSQL para la gestión de usuarios.

---

## Requisitos Previos

Para instalar y ejecutar este proyecto, es necesario contar con:

- Node.js 
- npm 
- PostgreSQL 
- pgAdmin 4 (

---

## Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Elizabeth-linda/Back-End-con-Node.js-y-PostgreSQL.git
cd backend-usuarios
```

### 2. Instalar Dependencias
```bash
npm install
```

Este comando instalará las siguientes dependencias:
- express
- cors
- pg

### 3. Configurar la Base de Datos

#### 3.1 Crear la Base de Datos

Abrir pgAdmin o psql y ejecutar:
```sql
CREATE DATABASE usuarios_db;
```

#### 3.2 Crear la Tabla

Conectarse a la base de datos `usuarios_db` y ejecutar:
```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  correo VARCHAR(100),
  contraseña VARCHAR(100)
);
```

### 4. Configurar la Conexión

Editar el archivo `db.js` y actualizar las credenciales de PostgreSQL:
```javascript
const pool = new Pool({
  user: 'postgres',           
  host: 'localhost',         
  database: 'usuarios_db',   
  password: 'aqui se debe poner la contraseña',  
  port: 5432,                
});
```


---

## Ejecución

### Iniciar el Servidor

Para iniciar el servidor, ejecutar:
```bash
node server.js
```

### Verificar el Funcionamiento

Si la configuración es correcta, se mostrará:
```
✅ Conexión exitosa a PostgreSQL
🚀 Servidor corriendo en http://localhost:3000
📝 Endpoints disponibles:
   GET    /usuarios
   POST   /usuarios
```

### Probar los Endpoints en el Navegador

Acceder a las siguientes URLs:

- **Ruta principal:** http://localhost:3000/
- **Listar usuarios:** http://localhost:3000/usuarios

---

## Uso de la API

### Endpoint GET - Listar Usuarios

**URL:** http://localhost:3000/usuarios

**Método:** GET

**Respuesta esperada:**
```json
{
  "total": 2,
  "usuarios": [
    {
      "id": 1,
      "nombre": "Linda Espinoza",
      "correo": "linda18@gmail.com",
      "fecha_registro": "2025-11-01T..."
    }
  ]
}
```

### Endpoint POST - Registrar Usuario

**URL:** http://localhost:3000/usuarios

**Método:** POST

**Headers requeridos:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "María García",
  "correo": "maria2@gmail.com",
  "contraseña": "123456L@"
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "✅ Usuario registrado exitosamente",
  "usuario": {
    "id": 2,
    "nombre": "María García",
    "correo": "maria2@gmail.com",
    "fecha_registro": "2025-11-01T..."
  }
}
```

---

## Pruebas con Postman

### GET - Listar Usuarios

1. Abrir Postman
2. Seleccionar método `GET`
3. Ingresar URL: `http://localhost:3000/usuarios`
4. Hacer clic en "Send"

### POST - Registrar Usuario

1. Abrir Postman
2. Seleccionar método `POST`
3. Ingresar URL: `http://localhost:3000/usuarios`
4. Ir a la pestaña "Body"
5. Seleccionar "raw" y "JSON"
6. Ingresar:
```json
{
  "nombre": "Linda Espinoza",
  "correo": "linda18@gmail.com",
  "contraseña": "123456L@"
}
```
7. Hacer clic en "Send"

---

## Verificación en la Base de Datos

Para verificar que los datos se guardaron correctamente:

1. Abrir pgAdmin
2. Conectarse al servidor PostgreSQL
3. Navegar a: PostgreSQL → usuarios_db → Schemas → public → Tables → usuarios
4. Clic derecho en "usuarios" → View/Edit Data → All Rows
5. Verificar que los usuarios aparecen en la tabla

---

## Estructura del Proyecto
```
backend-usuarios/
├── node_modules/          # Dependencias instaladas
├── db.js                  # Configuración de PostgreSQL
├── server.js              # Servidor Express con endpoints
├── package.json           # Metadatos y dependencias
├── package-lock.json      # Versiones de dependencias
└── README.md              # Este archivo
```

---


**Nota:** Este proyecto fue desarrollado con fines académicos para la Unidad 3 del curso.
