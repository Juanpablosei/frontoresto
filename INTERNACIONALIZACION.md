# 🌍 Sistema de Internacionalización (i18n) - RestoManager

## 📋 Descripción General

Se ha implementado un sistema completo de internacionalización usando **react-i18next** que permite cambiar el idioma de la aplicación dinámicamente. El sistema está diseñado para ser escalable y fácil de mantener.

---

## 🏗️ Estructura del Sistema

### Archivos Principales

```
src/i18n/
├── index.ts                 # Configuración principal de i18n
├── locales/
│   ├── es.json             # Traducciones en español
│   └── en.json             # Traducciones en inglés
└── hooks/
    └── useTranslation.ts    # Hook personalizado para traducciones
```

### Componentes

```
src/components/language/
├── LanguageSelector.tsx     # Selector de idioma
└── index.ts                # Exportaciones
```

---

## 🚀 Configuración Inicial

### 1. Instalación de Dependencias

```bash
npm install react-i18next i18next i18next-browser-languagedetector --legacy-peer-deps
```

### 2. Configuración en `src/i18n/index.ts`

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar archivos de traducción
import es from './locales/es.json';
import en from './locales/en.json';

const resources = {
  es: { translation: es },
  en: { translation: en }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });
```

### 3. Inicialización en `src/index.tsx`

```typescript
import './i18n'; // Importar antes de renderizar la app
```

---

## 📝 Estructura de Traducciones

### Organización por Secciones

Las traducciones están organizadas en secciones lógicas:

```json
{
  "common": {
    "loading": "Cargando...",
    "save": "Guardar",
    "cancel": "Cancelar"
  },
  "auth": {
    "login": "Iniciar Sesión",
    "register": "Registrarse"
  },
  "home": {
    "title": "RestoManager",
    "subtitle": "Sistema de Gestión de Restaurantes"
  },
  "dashboard": {
    "userManagement": "Gestión de Usuarios",
    "myRestaurants": "Mis Restaurantes"
  },
  "restaurant": {
    "create": "Crear Nuevo Restaurante",
    "editRestaurant": "Editar Restaurante"
  },
  "employees": {
    "title": "Empleados",
    "addEmployee": "Agregar Empleado",
    "roles": {
      "MANAGER": "Gerente",
      "WAITER": "Mesero"
    }
  },
  "schedules": {
    "title": "Horarios Detallados",
    "wizard": {
      "step1": {
        "title": "Seleccionar Día",
        "description": "Selecciona el día que quieres configurar"
      }
    }
  }
}
```

---

## 🛠️ Uso en Componentes

### 1. Hook Personalizado

```typescript
import { useTranslation } from '../hooks/useTranslation';

const MyComponent = () => {
  const { t, changeLanguage, getCurrentLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
    </div>
  );
};
```

### 2. Funciones Disponibles

- **`t(key)`**: Traduce una clave
- **`changeLanguage(lang)`**: Cambia el idioma
- **`getCurrentLanguage()`**: Obtiene el idioma actual
- **`getAvailableLanguages()`**: Lista idiomas disponibles

### 3. Interpolación de Variables

```typescript
// En el archivo de traducción
{
  "validation": {
    "minLength": "Debe tener al menos {{min}} caracteres"
  }
}

// En el componente
const { t } = useTranslation();
<p>{t('validation.minLength', { min: 5 })}</p>
```

---

## 🎨 Selector de Idioma

### Componente LanguageSelector

```typescript
import { LanguageSelector } from '../components/language';

// En el header o navbar
<LanguageSelector />
```

### Características

- **Diseño consistente** con el tema de la aplicación
- **Persistencia** del idioma seleccionado en localStorage
- **Detección automática** del idioma del navegador
- **Banderas** para identificación visual

---

## 📚 Agregar Nuevos Idiomas

### 1. Crear Archivo de Traducción

```typescript
// src/i18n/locales/fr.json
{
  "common": {
    "loading": "Chargement...",
    "save": "Sauvegarder",
    "cancel": "Annuler"
  }
  // ... resto de traducciones
}
```

### 2. Actualizar Configuración

```typescript
// src/i18n/index.ts
import fr from './locales/fr.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
  fr: { translation: fr }  // Agregar nuevo idioma
};
```

### 3. Actualizar Hook

```typescript
// src/hooks/useTranslation.ts
const getAvailableLanguages = () => {
  return [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }  // Agregar nuevo idioma
  ];
};
```

---

## 🔧 Migración de Componentes Existentes

### Proceso de Migración

1. **Importar el hook**:
   ```typescript
   import { useTranslation } from '../hooks/useTranslation';
   ```

2. **Usar en el componente**:
   ```typescript
   const { t } = useTranslation();
   ```

3. **Reemplazar textos hardcodeados**:
   ```typescript
   // Antes
   <h1>RestoManager</h1>
   
   // Después
   <h1>{t('home.title')}</h1>
   ```

4. **Agregar traducciones** al archivo correspondiente

### Ejemplo de Migración Completa

```typescript
// Antes
const Home = () => {
  return (
    <div>
      <h1>🍽️ RestoManager</h1>
      <p>Sistema de Gestión de Restaurantes</p>
      <button>🚀 Ingresar</button>
    </div>
  );
};

// Después
const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>🍽️ {t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
      <button>🚀 {t('home.enter')}</button>
    </div>
  );
};
```

---

## 📋 Mejores Prácticas

### 1. Organización de Claves

- **Usar nombres descriptivos**: `home.heroTitle` en lugar de `title`
- **Agrupar por funcionalidad**: `auth.login`, `auth.register`
- **Mantener consistencia**: Usar la misma estructura en todos los idiomas

### 2. Manejo de Plurales

```typescript
// En el archivo de traducción
{
  "items": {
    "one": "{{count}} item",
    "other": "{{count}} items"
  }
}

// En el componente
{t('items', { count: 5 })}
```

### 3. Textos Dinámicos

```typescript
// Para textos que cambian según el contexto
{
  "welcome": "Bienvenido, {{name}}!"
}

// En el componente
{t('welcome', { name: userName })}
```

### 4. Validación de Traducciones

```typescript
// Verificar que todas las claves existen
const { t } = useTranslation();

// En desarrollo, mostrar claves faltantes
if (process.env.NODE_ENV === 'development') {
  console.warn('Missing translation:', key);
}
```

---

## 🚨 Solución de Problemas

### Problemas Comunes

1. **Traducción no aparece**:
   - Verificar que la clave existe en el archivo JSON
   - Revisar la ruta de la clave (ej: `home.title`)

2. **Cambio de idioma no funciona**:
   - Verificar que `changeLanguage()` se está llamando
   - Revisar la configuración de detección en `i18n/index.ts`

3. **Interpolación no funciona**:
   - Verificar sintaxis: `{{variable}}` en el JSON
   - Pasar las variables como segundo parámetro: `t('key', { var: value })`

### Debugging

```typescript
// Habilitar debug en desarrollo
i18n.init({
  debug: process.env.NODE_ENV === 'development'
});
```

---

## 🎯 Próximos Pasos

### Funcionalidades Futuras

1. **Más idiomas**: Francés, Portugués, Alemán
2. **Traducciones automáticas**: Integración con APIs de traducción
3. **Gestión de traducciones**: Panel de administración para traducciones
4. **Validación automática**: Scripts para verificar traducciones faltantes
5. **Lazy loading**: Cargar idiomas bajo demanda

### Optimizaciones

1. **Code splitting**: Cargar solo el idioma necesario
2. **Caché**: Mejorar el sistema de caché de traducciones
3. **Performance**: Optimizar la búsqueda de traducciones

---

## 📞 Soporte

Para agregar nuevas traducciones o resolver problemas:

1. **Revisar la estructura** de archivos existentes
2. **Seguir las convenciones** de nomenclatura
3. **Probar** en ambos idiomas
4. **Documentar** nuevas claves agregadas

¡El sistema está listo para escalar a múltiples idiomas! 🌍✨
