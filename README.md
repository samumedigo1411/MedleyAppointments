# MedleyAppointments 🩺📅

API REST construida con **NestJS** para la gestión de citas médicas: creación, consulta, edición y eliminación de citas, con especialidad, doctor, fecha, hora y notas.

## ¿Qué hace?

Expone un CRUD completo sobre el recurso `citas`, pensado como backend para un sistema de agendamiento médico. Valida los datos de entrada (formato de fecha `YYYY-MM-DD`, hora `HH:mm`, campos obligatorios) antes de persistirlos en base de datos.

## Stack tecnológico

- **NestJS** 10 (framework backend en TypeScript)
- **TypeORM** + **PostgreSQL** (persistencia)
- **class-validator** / **class-transformer** (validación de DTOs)
- **Jest** (tests unitarios y e2e)

## Estructura del proyecto

```
src/
├── citas/
│   ├── dto/
│   │   ├── create-cita.dto.ts   # Validaciones de creación
│   │   └── update-cita.dto.ts   # Validaciones de actualización (parcial)
│   ├── entities/
│   │   └── citas.entity.ts      # Entidad Cita (TypeORM)
│   ├── citas.controller.ts      # Endpoints REST
│   ├── citas.service.ts         # Lógica de negocio
│   └── citas.module.ts
├── app.module.ts                # Módulo raíz, conexión a DB
└── main.ts                      # Bootstrap de la aplicación
```

## Modelo de datos: Cita

| Campo | Tipo | Obligatorio |
|---|---|---|
| `especialidad` | string | Sí |
| `doctor` | string | Sí |
| `fecha` | date (`YYYY-MM-DD`) | Sí |
| `hora` | string (`HH:mm`) | Sí |
| `notas` | string | No |

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/citas` | Crear una nueva cita |
| `GET` | `/citas` | Listar todas las citas |
| `GET` | `/citas/:id` | Obtener una cita por ID |
| `PUT` | `/citas/:id` | Actualizar una cita existente |
| `DELETE` | `/citas/:id` | Eliminar una cita |

**Ejemplo — crear una cita:**

```bash
curl -X POST http://localhost:3000/citas \
  -H "Content-Type: application/json" \
  -d '{
    "especialidad": "Odontología",
    "doctor": "Dra. Ramírez",
    "fecha": "2026-08-15",
    "hora": "10:30",
    "notas": "Primera consulta"
  }'
```

## Instalación

```bash
git clone https://github.com/samumedigo1411/MedleyAppointments.git
cd MedleyAppointments
npm install
```

Crea un archivo `.env` en la raíz (no lo subas al repo) con la cadena de conexión a tu base de datos PostgreSQL:

```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/medley_db
```

## Correr el proyecto

```bash
# desarrollo (con recarga automática)
npm run start:dev

# producción
npm run start:prod
```

La API queda disponible en `http://localhost:3000`.

## Tests

```bash
npm run test        # unitarios
npm run test:e2e    # end-to-end
npm run test:cov    # cobertura
```

## ⚠️ Antes de producción

- Cambia `synchronize: true` a `false` en `app.module.ts` y usa migraciones de TypeORM; `synchronize` puede alterar o perder datos reales si cambian las entidades.
- Considera agregar autenticación a los endpoints si el servicio va a estar expuesto públicamente.

## Estado del proyecto

En desarrollo 🚧
