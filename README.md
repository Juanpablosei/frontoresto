# RestoManager - Sistema de Gestión de Restaurantes

Sistema completo para la administración de restaurantes con control de mesas, productos, menús, empleados y estadísticas en tiempo real.

## 🚀 Tecnologías

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción moderna
- **Tailwind CSS** - Framework de CSS utilitario
- **Zustand** - Gestión de estado
- **React Router** - Enrutamiento
- **React Hook Form** - Manejo de formularios
- **i18next** - Internacionalización
- **React Icons** - Iconografía

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🛠️ Scripts Disponibles

### `npm run dev`
Inicia el servidor de desarrollo en modo Vite.\
Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación en el navegador.

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.\
Optimiza el bundle para el mejor rendimiento.

### `npm run preview`
Sirve la aplicación construida localmente para previsualización.

### `npm run lint`
Ejecuta ESLint para verificar el código.

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── auth/           # Componentes de autenticación
│   ├── dashboard/      # Componentes del dashboard
│   ├── restaurant/     # Componentes de restaurantes
│   ├── theme/          # Componentes de tema
│   └── ...
├── pages/              # Páginas de la aplicación
│   ├── auth/           # Páginas de autenticación
│   ├── dashboard/      # Dashboard principal
│   ├── restaurants/    # Gestión de restaurantes
│   └── admin/          # Panel de administración
├── store/              # Estado global (Zustand)
├── hooks/              # Hooks personalizados
├── i18n/               # Configuración de internacionalización
├── mock/               # Datos de prueba
└── types/              # Definiciones de tipos TypeScript
```

## 🌍 Internacionalización

El proyecto soporta múltiples idiomas:
- **Español** (por defecto)
- **Inglés**

Los archivos de traducción se encuentran en `src/i18n/locales/`.

## 🎨 Temas

El sistema incluye múltiples temas de colores que se pueden cambiar dinámicamente desde la interfaz.

## 📱 Características

- ✅ **Dashboard Unificado** - Vista única para admin y propietarios
- ✅ **Gestión de Restaurantes** - CRUD completo
- ✅ **Gestión de Empleados** - Asignación y transferencias
- ✅ **Gestión de Menús** - Creación y edición de menús
- ✅ **Gestión de Platos** - Configuración de platos
- ✅ **Gestión de Productos** - Inventario de productos
- ✅ **Horarios Detallados** - Wizard de configuración de turnos
- ✅ **Estadísticas** - Métricas en tiempo real
- ✅ **Multi-idioma** - Soporte completo para i18n
- ✅ **Temas Dinámicos** - Cambio de colores en tiempo real

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Servir Build Local
```bash
npm run preview
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
