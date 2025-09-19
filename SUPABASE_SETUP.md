# Configuración de Supabase

## Pasos para configurar la base de datos

### 1. Crear proyecto en Supabase
1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Espera a que se configure (puede tomar unos minutos)

### 2. Crear la tabla `roles`
Ejecuta el siguiente SQL en el editor SQL de Supabase:

```sql
-- 1. Crear tabla roles (si no existe)
CREATE TABLE IF NOT EXISTS roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  rol TEXT NOT NULL CHECK (rol IN ('director', 'estudiante')),
  nombre TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear índice para búsquedas rápidas por wallet_address
CREATE INDEX IF NOT EXISTS idx_roles_wallet_address ON roles(wallet_address);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- 4. Eliminar políticas existentes (si las hay)
DROP POLICY IF EXISTS "Permitir lectura a todos" ON roles;
DROP POLICY IF EXISTS "Permitir inserción a todos" ON roles;
DROP POLICY IF EXISTS "Permitir actualización propia" ON roles;

-- 5. Crear políticas nuevas
CREATE POLICY "Permitir lectura a todos" ON roles
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción a todos" ON roles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización propia" ON roles
  FOR UPDATE USING (true);

-- 6. Verificar que la tabla existe
SELECT * FROM roles LIMIT 5;
```

### 2.1. Verificar estructura de la tabla
Para verificar que la tabla se creó correctamente:

```sql
-- Verificar estructura de la tabla
\d roles;

-- O alternativamente:
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'roles'
ORDER BY ordinal_position;
```

### 3. Configurar variables de entorno
1. Copia el archivo `.env.example` como `.env.local`
2. Ve a tu proyecto en Supabase → Settings → API
3. Copia la URL del proyecto y la clave pública (anon key)
4. Completa las variables en `.env.local`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica_aqui
```

### 4. Estructura de la tabla
La tabla `roles` tiene la siguiente estructura:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único (auto-generado) |
| wallet_address | TEXT | Dirección de la wallet (único) |
| rol | TEXT | Rol del usuario ('director' o 'estudiante') |
| nombre | TEXT | Nombre completo del usuario |
| created_at | TIMESTAMP | Fecha de creación (auto-generado) |

### 5. Verificar conexión
Una vez configurado, la aplicación debería conectarse automáticamente a Supabase. 
Los datos se almacenarán tanto en Supabase como en localStorage como respaldo.

## Funcionalidades implementadas

- ✅ Registro de nuevos usuarios
- ✅ Verificación de usuarios existentes
- ✅ Actualización de datos de usuario
- ✅ Fallback a localStorage si Supabase no está disponible
- ✅ Manejo de errores y reconexión automática