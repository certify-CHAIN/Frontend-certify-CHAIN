<div align="center">
  <img src="./src/assets/logo_CertifyChain.jpg" alt="CertifyChain Logo" width="400"/>
  
  [![Estado de Cons├── 📁 src/
│   ├── 📁 assets/              # Imágenes y recursos
│   │   ├── 🎓 certificado.jpg
│   │   ├── 🖼️ img1.png, img2.png, img3.png
│   │   ├── 🏷️ logo_CertifyChain.jpg
│   │   └── 🔖 Varias variantes de logo
│   ├── 📁 chains/              # Configuraciones blockchain
│   │   └── ⚙️ chains.ts
│   ├── 📁 components/          # Componentes React
│   │   ├── 👑 AdminPanel.tsx
│   │   ├── ✨ AnimatedBackground.tsx
│   │   ├── 🎨 BenefitsSection.tsx
│   │   ├── 📞 CTASection.tsx
│   │   ├── 🎓 DirectorPanel.tsx
│   │   ├── 🌟 FeaturesSection.tsx
│   │   ├── 🦶 Footer.tsx
│   │   ├── 🔄 HowItWorksSection.tsx
│   │   ├── 🎯 RoleSelector.tsx
│   │   ├── 📊 StatsSection.tsx
│   │   ├── 👨‍🎓 StudentPanel.tsx
│   │   ├── 💬 TestimonialsSection.tsx
│   │   ├── ⌨️ TypewriterText.tsx
│   │   └── 🏛️ UniverityParners.tsxs://img.shields.io/badge/build-passing-brightgreen.svg)](https://certifi-chain.vercel.app/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
  
  # CertifyChain Frontend
  
  **Aplicación Frontend React para la Plataforma CertifyChain**
  
  � **Interfaz Web3 moderna para gestión de certificados basada en blockchain**
  
  [🚀 Demo en Vivo](https://certifi-chain.vercel.app/) | [� Repositorio Principal](https://github.com/certify-CHAIN/CertifyChain)
</div>

---

## 📱 Resumen del Frontend

Este repositorio contiene la **aplicación frontend React** para CertifyChain, una plataforma descentralizada para la gestión de certificados académicos. El frontend proporciona una interfaz Web3 intuitiva que conecta a los usuarios con el sistema de certificados basado en blockchain.

### 🎯 **Características Principales del Frontend**

✅ **Interfaz Web3 Responsiva**: UI moderna basada en React para todos los dispositivos  
✅ **Dashboards Basados en Roles**: Interfaces personalizadas para roles Admin, Director y Estudiante  
✅ **Integración de Billeteras**: Soporte fluido para MetaMask y WalletConnect  
✅ **Interacción Blockchain en Tiempo Real**: Actualizaciones en vivo del estado del contrato  
✅ **Visualización de Contenido IPFS**: Visualización descentralizada de imágenes y metadatos de certificados  
✅ **Soporte Multi-idioma**: Interfaz completamente traducida (Inglés principal, Español disponible)  
✅ **Página de Inicio Moderna**: Landing page profesional con componentes animados  
✅ **Verificación de Certificados**: Sistema de verificación pública de certificados mediante URLs únicas  

---

## 🌐 Internacionalización

### **Soporte de Idiomas**
- 🇺🇸 **Inglés**: Idioma principal con traducción completa de la interfaz
- 🇪🇸 **Español**: Documentación completa en español (README.ESP.md)
- 🔄 **Estado de Traducción**: 100% de la UI traducida al inglés

Toda la interfaz de usuario ha sido traducida profesionalmente del español al inglés, incluyendo:
- Todo el texto y etiquetas de componentes
- Textos de botones y llamadas a la acción
- Mensajes de error y estados de carga
- Contenido y animaciones de la página de inicio
- Páginas de verificación de certificados
- Interfaces del dashboard

### **Componentes Traducidos**
- ✅ Secciones de la página de inicio (Hero, Características, Beneficios, Estadísticas, Testimonios, CTA)
- ✅ Navegación y pie de página
- ✅ Selector de roles y dashboards
- ✅ Interfaces de gestión de certificados
- ✅ Páginas de verificación
- ✅ Todo el texto visible para el usuario y comentarios

---

## 🎨 Arquitectura del Frontend

### **Componentes de Interfaz de Usuario**

#### 🔐 **Componente RoleSelector**
- Detecta automáticamente el rol de la billetera del usuario
- Enruta usuarios al dashboard apropiado
- Maneja estados de conexión de billetera

#### 👑 **Componente AdminPanel**
- Interfaz de gestión de roles
- Agregar/eliminar Directores y Estudiantes
- Controles de administración del sistema

#### 🎓 **Componente DirectorPanel**
- Flujo de trabajo de creación de certificados
- Generación de certificados basada en plantillas
- Integración de carga IPFS
- Gestión de formularios de metadatos
- Manejo de transacciones blockchain

#### 👨‍🎓 **Componente StudentPanel**
- Galería personal de certificados
- Funcionalidad de importación de NFT
- Herramientas de verificación
- Opciones de descarga de certificados

#### ✨ **Componente AnimatedBackground**
- Efectos visuales dinámicos
- Experiencia de usuario mejorada
- Estética de diseño moderno

---

## 🛠 Stack Tecnológico del Frontend

### **Framework Principal**
- ⚛️ **React 19** - Últimas características de React con renderizado concurrente
- 📝 **TypeScript** - Desarrollo con tipos seguros y soporte IDE mejorado
- 🏃‍♂️ **Vite** - Herramienta de construcción ultra-rápida con HMR

### **Estilizado e Interfaz**
- 🎨 **TailwindCSS** - Framework CSS utility-first
- 📱 **Diseño Responsivo** - Enfoque mobile-first
- 🌈 **Componentes Personalizados** - Elementos UI reutilizables

### **Integración Web3**
- 🌐 **Wagmi** - Hooks React para Ethereum
- 🦊 **MetaMask** - Integración principal de billetera
- 🔗 **WalletConnect** - Soporte multi-billetera
- ⚡ **Viem** - Librería Ethereum TypeScript-first

### **Gestión de Estado**
- 🔄 **TanStack Query** - Gestión de estado del servidor
- � **React Context** - Gestión de estado global
- 🎯 **Custom Hooks** - Abstracción de lógica reutilizable

### **Manejo de Archivos**
- 📁 **HTML2Canvas** - Generación de imágenes de certificados
- 📷 **Generación de Códigos QR** - Códigos QR de verificación
- 🌐 **Integración IPFS** - Operaciones de archivos descentralizados

---

## 📂 Estructura del Proyecto Frontend

```
Frontend-certify-CHAIN/
├── 📁 public/                   # Activos estáticos
│   ├── �️ logo2.svg
│   └── ⚡ vite.svg
├── �📁 src/
│   ├── 📁 assets/              # Imágenes y recursos
│   │   ├── 🎓 certificado.jpg
│   │   ├── � img1.png, img2.png, img3.png
│   │   ├── 🏷️ logo_CertifyChain.jpg
│   │   └── 🔖 Varias variantes de logo
│   ├── �📁 chains/              # Configuraciones blockchain
│   │   └── ⚙️ chains.ts
│   ├── 📁 components/          # Componentes React
│   │   ├── 👑 AdminPanel.tsx
│   │   ├── ✨ AnimatedBackground.tsx
│   │   ├── 🎓 DirectorPanel.tsx
│   │   ├── 🎯 RoleSelector.tsx
│   │   └── 👨‍🎓 StudentPanel.tsx
│   ├── 📁 contracts/           # Interfaces de contratos inteligentes
│   │   ├── 📄 CertiChainToken.ts
│   │   ├── 📄 CertifyRoles.ts
│   │   ├── 📄 getContract.ts
│   │   └── 📁 CertifyRoles/
│   │       ├── 📋 CertiChainTokenABI.json
│   │       └── � CertifyRoles.json
│   ├── 🎨 App.css
│   ├── ⚛️ App.tsx              # Componente principal de la aplicación
│   ├── 📄 CertificatePage.tsx   # Página de visualización de certificados
│   ├── 🎨 index.css
│   ├── � main.tsx             # Punto de entrada de la aplicación
│   └── 📝 vite-env.d.ts        # Declaraciones TypeScript
├── 📋 package.json             # Dependencias y scripts
├── ⚙️ vite.config.ts          # Configuración de Vite
├── 🎨 tailwind.config.js      # Configuración de TailwindCSS
├── 📝 tsconfig.json           # Configuración de TypeScript
└── 🌐 vercel.json             # Configuración de despliegue
```

---

## 🔄 Flujo de Datos del Frontend

### **1. Flujo de Conexión de Billetera**
```typescript
Usuario conecta billetera → Wagmi detecta conexión → 
Detección de rol desde contrato inteligente → Enrutar al panel apropiado
```

### **2. Flujo de Creación de Certificados (Director)**
```typescript
Selección de plantilla → Personalización del certificado → 
Generación de imagen (HTML2Canvas) → Carga IPFS → 
Creación de metadatos → Interacción con contrato inteligente → Acuñación NFT
```

### **3. Flujo de Visualización de Certificados (Estudiante)**
```typescript
Conexión de billetera → Obtener NFTs del usuario → 
Cargar metadatos IPFS → Mostrar certificados → 
Opciones de verificación → Funcionalidad de exportación
```

---

## 🚀 Configuración de Desarrollo del Frontend

### Prerrequisitos
- **Node.js 18+** y npm/yarn
- **Git** para control de versiones
- **MetaMask** extensión del navegador para pruebas

### Instalación y Desarrollo

```bash
# Clonar el repositorio frontend
git clone https://github.com/certify-CHAIN/Frontend-certify-CHAIN.git
cd Frontend-certify-CHAIN

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo con hot reload
npm run dev
```

### Configuración del Entorno

Crear archivo `.env.local` en el directorio raíz:

```env
# Configuración IPFS Pinata (Requerido)
VITE_PINATA_JWT=tu_token_jwt_pinata
VITE_PINATA_GATEWAY=tu_url_gateway_pinata

# Configuración Supabase (Requerido)
VITE_SUPABASE_URL=tu_url_proyecto_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_supabase

# Opcional: Endpoints RPC personalizados
VITE_ETHEREUM_RPC_URL=tu_url_rpc_personalizado
```

### Scripts Disponibles

```bash
# Servidor de desarrollo
npm run dev

# Verificación de tipos
npm run build      # Compilación TypeScript + construcción Vite

# Linting
npm run lint       # Verificación de calidad de código ESLint

# Previsualizar construcción de producción
npm run preview    # Previsualizar aplicación construida
```

---

## 🎨 Detalles de Características del Frontend

### **Diseño Responsivo**
- 📱 **Enfoque mobile-first** con optimización de breakpoints
- 💻 **Experiencia mejorada para escritorio** con layouts expandidos
- 🎯 **Interfaces amigables al tacto** para usuarios móviles

### **Mejoras UX Web3**
- 🔄 **Estados de carga** para transacciones blockchain
- ⚡ **Actualizaciones UI optimistas** para mejor experiencia de usuario
- 🚨 **Manejo de errores** con mensajes amigables al usuario
- 💡 **Indicadores de estado de transacción** con actualizaciones en tiempo real

### **UI de Gestión de Certificados**
- 🎨 **Sistema de diseño de certificados** basado en plantillas
- 🖼️ **Vista previa en tiempo real** de la generación de certificados
- 📥 **Interfaz de carga de archivos** drag-and-drop
- 🔍 **Modal de verificación de certificados** con códigos QR

### **Características del Dashboard**
- 📊 **Análisis y estadísticas** específicos por rol
- 🔔 **Notificaciones en tiempo real** para eventos de certificados
- 📋 **Listas de certificados filtrables** con búsqueda
- 🌙 **Toggle de tema oscuro/claro** (característica futura)

---

## 🧪 Testing y Desarrollo

### **Desarrollo Local**
```bash
# Hot reload de desarrollo
npm run dev
# Servidor ejecutándose en http://localhost:5173

# Conectar MetaMask a localhost o testnet
# Usar ETH de testnet para transacciones
```

### **Lista de Verificación de Testing Frontend**
- ✅ Flujos de conexión de billetera
- ✅ Precisión en detección de roles
- ✅ UI de generación de certificados
- ✅ Carga/descarga IPFS
- ✅ Interacciones con contratos inteligentes
- ✅ Testing de diseño responsivo
- ✅ Manejo de estados de error

### **Compatibilidad de Navegadores**
- ✅ Chrome/Edge (Recomendado)
- ✅ Firefox
- ✅ Safari (Soporte Web3 limitado)
- ✅ Navegadores móviles (iOS Safari, Chrome Mobile)

---

## 🔗 Integración con Contratos Inteligentes

El frontend se conecta a estos contratos inteligentes desplegados:

### **Direcciones de Contratos (Somnia Testnet)**

#### 🔐 **Contrato de Roles**
- **Dirección**: `0x786E41e7a24C8B9031b91749F8f1A649457CC1BF`
- **Propósito**: Gestión de control de acceso basado en roles
- **Funciones**: Asignaciones de roles Admin, Director y Estudiante
- **Verificación**: ✅ Verificado y desplegado en Somnia Testnet

#### 🎫 **Contrato ERC721 de Certificados**
- **Dirección**: `0x3942A2e611Cd2C8272Ae9C05A40001aF1903d1aD`
- **Propósito**: Acuñación y gestión de certificados NFT
- **Estándar**: Token compatible con ERC-721
- **Verificación**: ✅ Verificado y desplegado en Somnia Testnet

- **Red**: Somnia Testnet (Chain ID: 50311)

### **Interacciones Clave Frontend-Contrato**
```typescript
// Detección de roles
const userRole = await rolesContract.getRole(userAddress)

// Acuñación de certificados (rol Director)
const tx = await certificateContract.safeMint(studentAddress, tokenURI)

// Obtención de certificados (rol Estudiante)
const certificates = await certificateContract.tokensOfOwner(userAddress)
```

### **Integración de Contratos**
- **Contrato de Roles**: `0x786E41e7a24C8B9031b91749F8f1A649457CC1BF`
- **Contrato de Certificados**: `0x3942A2e611Cd2C8272Ae9C05A40001aF1903d1aD`
const tx = await certiChainToken.safeMint(studentAddress, tokenURI)

// Obtención de certificados (rol Estudiante)
const certificates = await certiChainToken.tokensOfOwner(userAddress)
```

---

## 📱 Despliegue

### **Construcción de Producción**
```bash
# Crear construcción de producción
npm run build

# Directorio de salida: dist/
# Listo para despliegue en Vercel, Netlify, etc.
```

### **Despliegue en Vercel** (Actual)
- 🌐 **URL en Vivo**: [https://certifi-chain.vercel.app/](https://certifi-chain.vercel.app/)
- 🚀 **Auto-deploy** desde rama main
- ⚡ **Despliegue edge** para rendimiento global

### **Variables de Entorno para Producción**
```env
VITE_PINATA_JWT=pinata_jwt_produccion
VITE_PINATA_GATEWAY=url_gateway_produccion
VITE_CONTRACT_ADDRESSES=direcciones_contratos_produccion
```

---

## 🤝 Contribución al Frontend

### **Flujo de Trabajo de Desarrollo**
1. Fork del repositorio frontend
2. Crear rama de característica (`git checkout -b feature/mejora-ui`)
3. Implementar cambios con TypeScript
4. Probar en diferentes navegadores
5. Asegurar que el diseño responsivo funcione
6. Enviar pull request con capturas de pantalla

### **Guías de Estilo de Código**
- 📝 **TypeScript**: Modo estricto habilitado
- 🎨 **TailwindCSS**: Enfoque utility-first
- ⚛️ **React**: Componentes funcionales con hooks
- 📁 **Nomenclatura de archivos**: PascalCase para componentes, camelCase para utilidades

### **Contribuciones Específicas del Frontend**
- 🎨 Mejoras UI/UX
- 📱 Mejoras de responsividad móvil
- ⚡ Optimizaciones de rendimiento
- 🌐 Mejoras de integración Web3
- 🧪 Tests unitarios/integración

---

## � Documentación y Traducción

- 🇪🇸 **Documentación en Español**: Este README.ESP.md
- 📖 **English Documentation**: [README.md](./README.md) (Principal)
- 🌐 **Aplicación en Vivo**: [https://certifi-chain.vercel.app/](https://certifi-chain.vercel.app/)
- 📚 **Documentación API**: [docs.certifychain.io](https://docs.certifychain.io) *(Próximamente)*

### Estado de Traducción
- ✅ **Interfaz de Usuario**: 100% traducida al inglés
- ✅ **Documentación**: Disponible en inglés y español
- ✅ **Comentarios de Código**: Actualizados al inglés
- ✅ **Nombres de Componentes**: Mantenidos en inglés

---

## �📄 Licencia

Esta aplicación frontend está licenciada bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## � Repositorios Relacionados

- 📖 **Proyecto Principal**: [Organización CertifyChain](https://github.com/certify-CHAIN/CertifyChain)
- ⚙️ **Contratos Inteligentes**: [CertifyChain-Contracts](https://github.com/certify-CHAIN/CertifyChain-Contracts)
- 📱 **Aplicación Móvil**: [CertifyChain-Mobile](https://github.com/certify-CHAIN/CertifyChain-Mobile) *(Próximamente)*

---

## � Equipo Frontend

**Equipo de Desarrollo Frontend**
- 🧑‍💻 **Líder Frontend**: Desarrollo React y TypeScript
- 🎨 **Diseñador UI/UX**: Diseño de Interfaz de Usuario y Experiencia de Usuario
- 🌐 **Desarrollador Web3**: Integración Blockchain y Conectividad de Billeteras

---

## 📞 Soporte Frontend

- 📧 **Problemas Frontend**: frontend@certifychain.io
- � **Discord**: [#desarrollo-frontend](https://discord.gg/certifychain)
- � **Reportes de Bugs**: [GitHub Issues](https://github.com/certify-CHAIN/Frontend-certify-CHAIN/issues)
- 💡 **Solicitudes de Características**: [GitHub Discussions](https://github.com/certify-CHAIN/Frontend-certify-CHAIN/discussions)

---

<div align="center">
  
**CertifyChain Frontend** | Construido con ⚛️ React + ⚡ Vite + 🎨 TailwindCSS

*Interfaz Web3 moderna para educación descentralizada*

[🌐 Demo en Vivo](https://certifi-chain.vercel.app/) | [📖 Documentación](https://github.com/certify-CHAIN/CertifyChain) | [🔧 Docs API](https://docs.certifychain.io)

</div>