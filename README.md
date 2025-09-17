<div align="center">
  <img src="./src/assets/logo_CertifyChain.jpg" alt="CertifyChain Logo" width="400"/>
  
  [![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://certifi-chain.vercel.app/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
  
  # CertifyChain Frontend
  
  **React Frontend Application for CertifyChain Platform**
  
  � **Modern Web3 interface for blockchain-powered certificate management**
  
  [🚀 Live Demo](https://certifi-chain.vercel.app/) | [� Main Repository](https://github.com/certify-CHAIN/CertifyChain)
</div>

---

## 📱 Frontend Overview

This repository contains the **React frontend application** for CertifyChain, a decentralized platform for academic certificate management. The frontend provides an intuitive Web3 interface that connects users to the blockchain-based certificate system.

### 🎯 **Core Frontend Features**

✅ **Responsive Web3 Interface**: Modern React-based UI for all devices  
✅ **Role-Based Dashboards**: Customized interfaces for Admin, Director, and Student roles  
✅ **Wallet Integration**: Seamless MetaMask and WalletConnect support  
✅ **Real-time Blockchain Interaction**: Live contract state updates  
✅ **IPFS Content Display**: Decentralized certificate image and metadata viewing  

---

## 🎨 Frontend Architecture

### **User Interface Components**

#### 🔐 **RoleSelector Component**
- Detects user wallet role automatically
- Routes users to appropriate dashboard
- Handles wallet connection states

#### 👑 **AdminPanel Component**
- Role management interface
- Add/remove Directors and Students
- System administration controls

#### 🎓 **DirectorPanel Component**
- Certificate creation workflow
- Template-based certificate generation
- IPFS upload integration
- Metadata form management
- Blockchain transaction handling

#### 👨‍🎓 **StudentPanel Component**
- Personal certificate gallery
- NFT import functionality
- Verification tools
- Certificate download options

#### ✨ **AnimatedBackground Component**
- Dynamic visual effects
- Enhanced user experience
- Modern design aesthetics

---

## 🛠 Frontend Technology Stack

### **Core Framework**
- ⚛️ **React 19** - Latest React features with concurrent rendering
- 📝 **TypeScript** - Type-safe development with enhanced IDE support
- 🏃‍♂️ **Vite** - Ultra-fast build tool with HMR

### **Styling & UI**
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach
- 🌈 **Custom Components** - Reusable UI elements

### **Web3 Integration**
- 🌐 **Wagmi** - React hooks for Ethereum
- 🦊 **MetaMask** - Primary wallet integration
- 🔗 **WalletConnect** - Multi-wallet support
- ⚡ **Viem** - TypeScript-first Ethereum library

### **State Management**
- 🔄 **TanStack Query** - Server state management
- � **React Context** - Global state management
- 🎯 **Custom Hooks** - Reusable logic abstraction

### **File Handling**
- 📁 **HTML2Canvas** - Certificate image generation
- 📷 **QR Code Generation** - Verification QR codes
- 🌐 **IPFS Integration** - Decentralized file operations

---

## 📂 Frontend Project Structure

```
Frontend-certify-CHAIN/
├── 📁 public/                   # Static assets
│   ├── 🖼️ logo2.svg
│   └── ⚡ vite.svg
├── 📁 src/
│   ├── 📁 assets/              # Images and resources
│   │   ├── 🎓 certificado.jpg
│   │   ├── � img1.png, img2.png, img3.png
│   │   ├── 🏷️ logo_CertifyChain.jpg
│   │   └── 🔖 Various logo variants
│   ├── �📁 chains/              # Blockchain configurations
│   │   └── ⚙️ chains.ts
│   ├── 📁 components/          # React components
│   │   ├── 👑 AdminPanel.tsx
│   │   ├── ✨ AnimatedBackground.tsx
│   │   ├── 🎓 DirectorPanel.tsx
│   │   ├── 🎯 RoleSelector.tsx
│   │   └── 👨‍🎓 StudentPanel.tsx
│   ├── 📁 contracts/           # Smart contract interfaces
│   │   ├── 📄 CertiChainToken.ts
│   │   ├── 📄 CertifyRoles.ts
│   │   ├── 📄 getContract.ts
│   │   └── 📁 CertifyRoles/
│   │       ├── 📋 CertiChainTokenABI.json
│   │       └── � CertifyRoles.json
│   ├── 🎨 App.css
│   ├── ⚛️ App.tsx              # Main application component
│   ├── 📄 CertificatePage.tsx   # Certificate display page
│   ├── 🎨 index.css
│   ├── 🚀 main.tsx             # Application entry point
│   └── 📝 vite-env.d.ts        # TypeScript declarations
├── 📋 package.json             # Dependencies and scripts
├── ⚙️ vite.config.ts          # Vite configuration
├── 🎨 tailwind.config.js      # TailwindCSS configuration
├── 📝 tsconfig.json           # TypeScript configuration
└── 🌐 vercel.json             # Deployment configuration
```

---

## 🔄 Frontend Data Flow

### **1. Wallet Connection Flow**
```typescript
User connects wallet → Wagmi detects connection → 
Role detection from smart contract → Route to appropriate panel
```

### **2. Certificate Creation Flow (Director)**
```typescript
Template selection → Certificate customization → 
Image generation (HTML2Canvas) → IPFS upload → 
Metadata creation → Smart contract interaction → NFT minting
```

### **3. Certificate Viewing Flow (Student)**
```typescript
Wallet connection → Fetch user NFTs → 
Load IPFS metadata → Display certificates → 
Verification options → Export functionality
```

---

## 🚀 Frontend Development Setup

### Prerequisites
- **Node.js 18+** and npm/yarn
- **Git** for version control
- **MetaMask** browser extension for testing

### Installation & Development

```bash
# Clone the frontend repository
git clone https://github.com/certify-CHAIN/Frontend-certify-CHAIN.git
cd Frontend-certify-CHAIN

# Install dependencies
npm install

# Start development server with hot reload
npm run dev
```

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Pinata IPFS Configuration
VITE_PINATA_JWT=your_pinata_jwt_token
VITE_PINATA_GATEWAY=your_pinata_gateway_url

# Optional: Custom RPC endpoints
VITE_ETHEREUM_RPC_URL=your_custom_rpc_url
```

### Available Scripts

```bash
# Development server
npm run dev

# Type checking
npm run build      # TypeScript compilation + Vite build

# Linting
npm run lint       # ESLint code quality check

# Preview production build
npm run preview    # Preview built application
```

---

## 🎨 Frontend Features Detail

### **Responsive Design**
- 📱 **Mobile-first approach** with breakpoint optimization
- 💻 **Desktop-enhanced experience** with expanded layouts
- 🎯 **Touch-friendly interfaces** for mobile users

### **Web3 UX Enhancements**
- 🔄 **Loading states** for blockchain transactions
- ⚡ **Optimistic UI updates** for better user experience
- 🚨 **Error handling** with user-friendly messages
- 💡 **Transaction status indicators** with real-time updates

### **Certificate Management UI**
- 🎨 **Template-based certificate design** system
- 🖼️ **Real-time preview** of certificate generation
- 📥 **Drag-and-drop** file upload interface
- 🔍 **Certificate verification modal** with QR codes

### **Dashboard Features**
- 📊 **Role-specific analytics** and statistics
- 🔔 **Real-time notifications** for certificate events
- 📋 **Filterable certificate lists** with search
- 🌙 **Dark/light theme** toggle (future feature)

---

## 🧪 Testing & Development

### **Local Development**
```bash
# Hot reload development
npm run dev
# Server runs on http://localhost:5173

# Connect MetaMask to localhost or testnet
# Use testnet ETH for transactions
```

### **Frontend Testing Checklist**
- ✅ Wallet connection flows
- ✅ Role detection accuracy
- ✅ Certificate generation UI
- ✅ IPFS upload/download
- ✅ Smart contract interactions
- ✅ Responsive design testing
- ✅ Error state handling

### **Browser Compatibility**
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari (Limited Web3 support)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔗 Smart Contract Integration

The frontend connects to these deployed smart contracts:

### **Contract Addresses**
- **CertifyRoles**: `0xDaC5fd597801Fe86422fE64D714F9F6452424927`
- **CertiChainToken**: `0x86Ae08076DBD7c1227cBD3d8743062C3bBB91F54`

### **Key Frontend-Contract Interactions**
```typescript
// Role detection
const userRole = await certifyRoles.getRole(userAddress)

// Certificate minting (Director role)
const tx = await certiChainToken.safeMint(studentAddress, tokenURI)

// Certificate fetching (Student role)
const certificates = await certiChainToken.tokensOfOwner(userAddress)
```

---

## � Deployment

### **Production Build**
```bash
# Create production build
npm run build

# Output directory: dist/
# Ready for deployment to Vercel, Netlify, etc.
```

### **Vercel Deployment** (Current)
- 🌐 **Live URL**: [https://certifi-chain.vercel.app/](https://certifi-chain.vercel.app/)
- 🚀 **Auto-deploy** from main branch
- ⚡ **Edge deployment** for global performance

### **Environment Variables for Production**
```env
VITE_PINATA_JWT=production_pinata_jwt
VITE_PINATA_GATEWAY=production_gateway_url
VITE_CONTRACT_ADDRESSES=production_contract_addresses
```

---

## 🤝 Frontend Contributing

### **Development Workflow**
1. Fork the frontend repository
2. Create feature branch (`git checkout -b feature/ui-enhancement`)
3. Implement changes with TypeScript
4. Test across different browsers
5. Ensure responsive design works
6. Submit pull request with screenshots

### **Code Style Guidelines**
- 📝 **TypeScript**: Strict mode enabled
- 🎨 **TailwindCSS**: Utility-first approach
- ⚛️ **React**: Functional components with hooks
- 📁 **File naming**: PascalCase for components, camelCase for utilities

### **Frontend-Specific Contributions**
- 🎨 UI/UX improvements
- 📱 Mobile responsiveness enhancements
- ⚡ Performance optimizations
- 🌐 Web3 integration improvements
- 🧪 Unit/integration tests

---

## 📄 License

This frontend application is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## � Related Repositories

- 📖 **Main Project**: [CertifyChain Organization](https://github.com/certify-CHAIN/CertifyChain)
- ⚙️ **Smart Contracts**: [CertifyChain-Contracts](https://github.com/certify-CHAIN/CertifyChain-Contracts)
- 📱 **Mobile App**: [CertifyChain-Mobile](https://github.com/certify-CHAIN/CertifyChain-Mobile) *(Coming Soon)*

---

## 👥 Frontend Team

**Frontend Development Team**
- 🧑‍💻 **Frontend Lead**: React & TypeScript Development
- 🎨 **UI/UX Designer**: User Interface Design & User Experience
- 🌐 **Web3 Developer**: Blockchain Integration & Wallet Connectivity

---

## 📞 Frontend Support

- 📧 **Frontend Issues**: frontend@certifychain.io
- � **Discord**: [#frontend-development](https://discord.gg/certifychain)
- � **Bug Reports**: [GitHub Issues](https://github.com/certify-CHAIN/Frontend-certify-CHAIN/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/certify-CHAIN/Frontend-certify-CHAIN/discussions)

---

<div align="center">
  
**CertifyChain Frontend** | Built with ⚛️ React + ⚡ Vite + 🎨 TailwindCSS

*Modern Web3 interface for decentralized education*

[🌐 Live Demo](https://certifi-chain.vercel.app/) | [📖 Documentation](https://github.com/certify-CHAIN/CertifyChain) | [🔧 API Docs](https://docs.certifychain.io)

</div>  