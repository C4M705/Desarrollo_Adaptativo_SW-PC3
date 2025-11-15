# Don Mamino - Sistema S&OP para Panificadora

## Descripción General

Sistema completo de Sales & Operations Planning (S&OP) para la panificadora Don Mamino, desarrollado con React, TypeScript, Tailwind CSS y Supabase.

## Estructura del Proyecto

```
src/
├── lib/
│   ├── supabase.ts              # Cliente de Supabase
│   └── auth.ts                  # Servicios de autenticación
├── contexts/
│   └── AuthContext.tsx          # Context global de autenticación
├── components/
│   ├── Button.tsx               # Componente de botón reutilizable
│   ├── Input.tsx                # Componente de input reutilizable
│   ├── Modal.tsx                # Componente de modal
│   ├── DataTable.tsx            # Componente de tabla con datos
│   ├── Alert.tsx                # Componente de alertas
│   ├── Sidebar.tsx              # Navegación lateral
│   └── Layout.tsx               # Layout principal
├── pages/
│   ├── LoginPage.tsx            # Página de login
│   ├── RegisterPage.tsx         # Página de registro
│   ├── ForgotPasswordPage.tsx   # Página de recuperación de contraseña
│   ├── DashboardPage.tsx        # Dashboard principal
│   ├── sales/                   # Módulo de Ventas B2B
│   │   ├── SalesPage.tsx
│   │   ├── ClientsPage.tsx
│   │   ├── RepresentativesPage.tsx
│   │   ├── ContactsPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── QuotesPage.tsx
│   │   ├── PromotionsPage.tsx
│   │   └── PaymentsPage.tsx
│   ├── operations/              # Módulo de Operaciones
│   │   ├── OperationsPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── CategoriesPage.tsx
│   │   ├── InventoryPage.tsx
│   │   ├── SuppliersPage.tsx
│   │   ├── IngredientsPage.tsx
│   │   └── RecipesPage.tsx
│   ├── production/              # Módulo de Producción
│   │   ├── ProductionPage.tsx
│   │   ├── ProductionOrdersPage.tsx
│   │   ├── ShiftsPage.tsx
│   │   ├── IncidentsPage.tsx
│   │   └── ShiftEmployeesPage.tsx
│   ├── hr/                      # Módulo de Recursos Humanos
│   │   ├── HRPage.tsx
│   │   ├── EmployeesPage.tsx
│   │   ├── RolesPage.tsx
│   │   ├── CompetenciesPage.tsx
│   │   └── CertificationsPage.tsx
│   └── logistics/               # Módulo de Logística
│       └── LogisticsPage.tsx
├── Router.tsx                   # Configuración de rutas
├── App.tsx                      # Componente raíz
├── main.tsx                     # Punto de entrada
└── index.css                    # Estilos globales
```

## Módulos Principales

### 1. Autenticación
- **Login**: Inicio de sesión con email y contraseña
- **Registro**: Creación de nuevas cuentas
- **Recuperación de Contraseña**: Envío de enlaces de recuperación
- **Logout**: Cierre de sesión seguro

### 2. Dashboard
- Estadísticas generales (ventas totales, pedidos, productos, empleados)
- Acceso rápido a todos los módulos
- Información del sistema

### 3. Ventas B2B
- **Clientes**: CRUD completo de clientes
- **Representantes**: Gestión de representantes de ventas
- **Contactos**: Base de datos de contactos
- **Pedidos**: Registro y seguimiento de pedidos
- **Cotizaciones**: Gestión de cotizaciones a clientes
- **Promociones**: Creación y gestión de promociones
- **Pagos**: Registro de pagos y cuotas

### 4. Operaciones
- **Productos**: CRUD de productos panificadores
- **Categorías**: Clasificación de productos
- **Inventario**: Control de stock en tiempo real
- **Proveedores**: Base de datos de proveedores
- **Insumos**: Gestión de ingredientes y materias primas
- **Recetas**: Especificaciones técnicas de productos

### 5. Producción
- **Órdenes de Producción**: Planificación de producción
- **Turnos**: Gestión de turnos de trabajo
- **Incidencias**: Registro de problemas en producción
- **Asignación de Turnos**: Asignación de empleados a turnos

### 6. Recursos Humanos
- **Empleados**: Base de datos de empleados
- **Roles**: Definición de roles y responsabilidades
- **Competencias**: Registro de habilidades de empleados
- **Certificaciones**: Control de certificaciones vigentes

### 7. Logística
- **Ubicaciones**: Gestión de direcciones y ubicaciones

## Características Técnicas

### Base de Datos (Supabase)
- Tablas con UUIDs como claves primarias
- Row Level Security (RLS) en todas las tablas
- Políticas de seguridad para usuarios autenticados
- Relaciones de integridad referencial

### Frontend
- **React 18**: Framework principal
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos modulares y responsivos
- **React Router**: Navegación entre páginas
- **Lucide React**: Iconografía moderna

### Autenticación
- Supabase Auth con email/contraseña
- Contexto global de autenticación
- Protección de rutas
- Manejo de sesiones

### Componentes Reutilizables
- Button: Múltiples variantes (primary, secondary, danger, success, outline)
- Input: Con validación y mensajes de error
- Modal: Para formularios y confirmaciones
- DataTable: Tabla con ordenamiento y CRUD
- Alert: Notificaciones de éxito y error
- Sidebar: Navegación con submenús

## Estilos y Diseño

### Paleta de Colores
- **Primario**: Azul (#3B82F6)
- **Secundario**: Ámbar (#D97706) - Para branding de panificadora
- **Éxito**: Verde (#10B981)
- **Peligro**: Rojo (#EF4444)
- **Advertencia**: Amarillo (#F59E0B)
- **Grises**: Escalas neutrales para fondos y bordes

### Tipografía
- Máximo 3 pesos de fuentes
- Line-height: 150% para cuerpo, 120% para encabezados
- Sistema de espaciado 8px

### Responsividad
- Diseño mobile-first
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Sidebar colapsable en móvil
- Tablas con scroll horizontal en dispositivos pequeños

## Instalación y Uso

### Requisitos
- Node.js 16+
- npm o yarn

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Build
```bash
npm run build
```

### Preview de producción
```bash
npm run preview
```

## Variables de Entorno

```env
VITE_SUPABASE_URL=tu_url_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

## Migraciones de Base de Datos

Las siguientes migraciones han sido aplicadas:

1. **001_create_auth_and_base_tables**: Tablas base con ubicaciones, contactos y formas de pago
2. **002_create_sales_module_tables**: Tablas del módulo de ventas
3. **003_create_operations_module_tables**: Tablas del módulo de operaciones
4. **004_create_production_module_tables**: Tablas del módulo de producción
5. **005_create_hr_module_tables**: Tablas del módulo de RRHH
6. **006_insert_initial_data**: Datos iniciales (formas de pago, estados, roles, etc.)

## Guía de Desarrollo

### Agregar una Nueva Página
1. Crear archivo en `src/pages/nombre/NombrePage.tsx`
2. Importar en `Router.tsx`
3. Agregar ruta en `<Routes>`
4. Agregar enlace en `Sidebar.tsx` si es necesario

### Crear un Nuevo Componente
1. Crear archivo en `src/components/NombreComponente.tsx`
2. Exportar como named export
3. Usar en páginas según sea necesario

### Consultar Base de Datos
```typescript
import { supabase } from '../lib/supabase';

const { data, error } = await supabase
  .from('tabla')
  .select('*')
  .eq('campo', valor);
```

### Usar AuthContext
```typescript
import { useAuth } from '../contexts/AuthContext';

const { user, signIn, signOut } = useAuth();
```

## Datos Iniciales

La base de datos viene con datos iniciales:
- 4 formas de pago
- 5 medios de pago
- 8 estados de pedido
- 8 categorías de productos
- 10 roles predefinidos
- 10 competencias

## Notas de Seguridad

- Todas las tablas tienen RLS habilitado
- Solo usuarios autenticados pueden acceder a datos
- Las claves de Supabase están en variables de entorno
- Los formularios validan datos antes de enviar
- Se implementó protección contra inyección SQL mediante ORM

## Próximos Pasos

1. Implementar formularios completos con validación
2. Agregar búsqueda y filtros avanzados
3. Crear reportes y exportación de datos
4. Implementar notificaciones en tiempo real
5. Agregar gráficos de analíticas
6. Configurar respaldos automáticos
7. Implementar auditoría de cambios

## Soporte

Para reportar bugs o sugerencias, contactar al equipo de desarrollo.
