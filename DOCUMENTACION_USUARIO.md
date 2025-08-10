# 📚 Documentación de Usuario - RestoManager

## 🎯 Descripción General

**RestoManager** es un sistema completo de gestión para restaurantes que permite administrar empleados, horarios, menús, productos y estadísticas en tiempo real. La aplicación está diseñada con una interfaz moderna e intuitiva que facilita la gestión diaria de tu negocio.

---

## 🚀 Primeros Pasos

### 1. Acceso a la Aplicación

1. **Página de Inicio**: Al abrir la aplicación, verás la página principal con información sobre RestoManager
2. **Botón "Ingresar"**: Haz clic en el botón "🚀 Ingresar" para acceder al sistema
3. **Inicio de Sesión**: Ingresa tus credenciales de usuario

### 2. Tipos de Usuario

La aplicación maneja dos tipos de usuarios principales:

- **👑 Administrador (ADMIN)**: Acceso completo a todos los restaurantes y usuarios
- **🏪 Propietario (CLIENT_OWNER)**: Gestión de sus propios restaurantes

---

## 🏠 Dashboard Principal

### Para Administradores

Al ingresar como administrador, verás:

1. **Lista de Usuarios Propietarios**: Tabla con todos los propietarios registrados
2. **Información Mostrada**:
   - Nombre del propietario
   - Email
   - Cantidad de restaurantes
   - Total de empleados
   - Botón "Ver Detalles"

3. **Navegación**:
   - Haz clic en cualquier fila de usuario para ver sus restaurantes
   - Si el usuario tiene un solo restaurante, irás directamente a su gestión
   - Si tiene múltiples restaurantes, verás una lista para elegir

### Para Propietarios

Al ingresar como propietario, verás:

1. **Mis Restaurantes**: Lista de todos tus restaurantes
2. **Botón "Crear Restaurante"**: Para agregar nuevos establecimientos
3. **Información por Restaurante**:
   - Nombre del restaurante
   - Descripción
   - Dirección
   - Cantidad de empleados

---

## 🏪 Gestión de Restaurantes

### Crear un Nuevo Restaurante

1. Haz clic en "➕ Crear Restaurante"
2. Completa el formulario con:
   - **Nombre del restaurante**
   - **Descripción**
   - **Dirección**
   - **Teléfono**
   - **Email**
3. Haz clic en "Crear Restaurante"

### Gestionar un Restaurante Existente

Al hacer clic en un restaurante, accederás a su panel de gestión con las siguientes pestañas:

---

## 📊 Pestaña: Resumen General

### Información del Restaurante
- **Estado**: Activo/Inactivo
- **Información de contacto**
- **Estadísticas básicas**

### Acciones Disponibles
- **Editar Restaurante**: Modificar información básica
- **Cambiar Estado**: Activar/Desactivar el restaurante

---

## 👥 Pestaña: Empleados

### Ver Empleados
- Lista completa de empleados del restaurante
- Información mostrada:
  - Nombre
  - Email
  - Teléfono
  - Rol
  - Estado (Activo/Inactivo)
  - Fecha de creación

### Agregar Empleado
1. Haz clic en "➕ Agregar Empleado"
2. Completa el formulario:
   - **Nombre completo**
   - **Email**
   - **Teléfono**
   - **Rol** (Manager, Waiter, Cook, Cashier, Host)
   - **Estado**
3. Haz clic en "Agregar Empleado"

### Transferir Empleado
1. Haz clic en el botón "Transferir" junto al empleado
2. Selecciona el restaurante destino
3. Confirma la transferencia

---

## 🕐 Pestaña: Horarios Detallados

### Configurar Horarios

**Nuevo Sistema de Wizard (Recomendado)**

1. **Haz clic en "🚀 Configurar Horarios"** (si no hay horarios configurados)
2. **O haz clic en "✏️ Editar Horarios"** (si ya hay horarios configurados)

### Proceso del Wizard (5 Pasos)

#### Paso 1: Seleccionar Día
- **Solo puedes seleccionar UN día a la vez**
- Haz clic en el día que quieres configurar
- Los días aparecen en orden: Lunes, Martes, Miércoles, etc.

#### Paso 2: Horarios de Apertura
- Define la hora de **apertura** (ej: 08:00)
- Define la hora de **cierre** (ej: 22:00)
- Haz clic en "Siguiente"

#### Paso 3: Configurar Turnos
- **Barra de Progreso**: Muestra el porcentaje de cobertura de turnos
- **Debe llegar al 100%** antes de poder continuar
- **Agregar Turno**: Haz clic en "➕ Agregar Turno"
- **Configurar cada turno**:
  - Nombre del turno
  - Hora de inicio
  - Hora de fin
  - **El sistema sugiere horarios** para llenar los espacios vacíos

#### Paso 4: Asignar Empleados
- **Barra de búsqueda**: Busca empleados por nombre, rol o email
- **Información mostrada**:
  - Nombre del empleado
  - Rol (con icono y color)
  - Email
- **Seleccionar empleados**: Marca las casillas de los empleados que trabajarán en cada turno
- **Todos los turnos deben tener al menos un empleado asignado**

#### Paso 5: Revisar y Guardar
- **Revisa toda la información**:
  - Día seleccionado
  - Horarios de apertura/cierre
  - Turnos configurados
  - Empleados asignados
- **Haz clic en "Guardar Horarios"**

### Ver Horarios Configurados

Después de guardar, verás **tarjetas estéticas** que muestran:

- **Día de la semana** (en orden cronológico)
- **Horarios de apertura y cierre**
- **Cantidad total de turnos**
- **Cantidad total de empleados asignados**
- **Lista de turnos** con sus empleados asignados
- **Botón "✏️ Editar Horarios"** para modificar

### Sistema Anterior (Legacy)

Si prefieres el sistema anterior:
- **Agregar Turno**: Haz clic en "➕ Agregar Turno"
- **Configurar horarios** directamente en la interfaz
- **Asignar empleados** usando el modal de asignación

---

## 🍽️ Pestaña: Menús

### Ver Menús
- Lista de todos los menús del restaurante
- Información mostrada:
  - Nombre del menú
  - Descripción
  - Categoría
  - Precio
  - Estado (Activo/Inactivo)
  - Cantidad de productos
  - Fechas de creación y actualización

### Gestionar Menús
- **Activar/Desactivar**: Cambia el estado del menú
- **Editar**: Modifica la información del menú
- **Eliminar**: Borra el menú (con confirmación)
- **Agregar Menú**: Crea un nuevo menú

---

## 🛍️ Pestaña: Productos

### Ver Productos
- Lista de todos los productos del restaurante
- Información mostrada:
  - Nombre del producto
  - Descripción
  - Categoría
  - Precio
  - Estado (Activo/Inactivo)
  - Stock disponible
  - Fechas de creación y actualización

### Gestionar Productos
- **Activar/Desactivar**: Cambia el estado del producto
- **Editar**: Modifica la información del producto
- **Eliminar**: Borra el producto (con confirmación)
- **Agregar Producto**: Crea un nuevo producto

---

## 🪑 Pestaña: Mesas

### Gestión de Mesas
- **Ver mesas disponibles**
- **Configurar capacidad**
- **Estados de ocupación**
- **Reservas**

---

## 📈 Pestaña: Estadísticas

### Dashboard de Estadísticas
- **Ventas diarias/mensuales**
- **Productos más vendidos**
- **Rendimiento por empleado**
- **Gráficos interactivos**
- **Reportes descargables**

---

## 🎨 Personalización

### Selector de Paleta de Colores
En la página principal encontrarás un **selector de colores** que te permite:
- **Cambiar el tema** de la aplicación
- **Personalizar** la apariencia según tus preferencias
- **Guardar** tu configuración automáticamente

### Temas Disponibles
- **Azul Clásico**
- **Verde Naturaleza**
- **Púrpura Elegante**
- **Naranja Energético**
- **Rosa Moderno**

---

## 🔧 Funcionalidades Avanzadas

### Persistencia de Datos
- **Todos los cambios se guardan automáticamente**
- **Los horarios se mantienen** entre sesiones
- **La configuración personal** se preserva

### Navegación Intuitiva
- **Breadcrumbs** para saber dónde estás
- **Botones de navegación** claros
- **Modales** para acciones específicas

### Validaciones
- **Formularios validados** en tiempo real
- **Mensajes de error** claros
- **Confirmaciones** para acciones importantes

---

## 🚨 Solución de Problemas

### Problemas Comunes

1. **No puedo avanzar en el wizard de horarios**
   - Verifica que la barra de progreso esté al 100%
   - Asegúrate de que todos los turnos tengan empleados asignados

2. **Los horarios no se guardan**
   - Verifica tu conexión a internet
   - Intenta recargar la página
   - Los datos se guardan automáticamente en el navegador

3. **No puedo seleccionar múltiples días**
   - El nuevo sistema solo permite seleccionar un día a la vez
   - Esto es intencional para una mejor gestión

4. **Los empleados no aparecen en la búsqueda**
   - Verifica que los empleados estén activos
   - Usa la barra de búsqueda con diferentes términos

### Comandos Técnicos

Para hacer un build de la aplicación:
```bash
npm run build
```

Para iniciar en modo desarrollo:
```bash
npm start
```

---

## 📞 Soporte

Si tienes problemas o preguntas:

1. **Revisa esta documentación** primero
2. **Verifica la conexión a internet**
3. **Limpia el caché del navegador**
4. **Contacta al equipo de soporte**

---

## 🎉 ¡Listo para Usar!

Ahora tienes toda la información necesaria para usar RestoManager de manera efectiva. La aplicación está diseñada para ser intuitiva y fácil de usar, permitiéndote enfocarte en lo más importante: hacer crecer tu restaurante.

¡Que tengas éxito con tu negocio! 🍽️✨


