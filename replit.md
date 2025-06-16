# Point of Sale (PDV) System - Mateus Armazém

## Overview

This is a Point of Sale (PDV) system built for Mateus Armazém, a retail store. The application is a full-stack web application built with React (frontend) and Express.js (backend), featuring a modern UI component library and PostgreSQL database integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: Zustand for client-side state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom brand colors
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: TanStack Query (React Query) for server state management
- **PDF Generation**: jsPDF for receipt generation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured for Neon Database)
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot reloading with Vite integration

### Build System
- **Bundler**: Vite for frontend, esbuild for backend
- **Package Manager**: npm
- **TypeScript**: Full TypeScript support across the stack

## Key Components

### Database Schema
The system uses three main tables:
- **Users**: Authentication and user management (`id`, `username`, `password`)
- **Products**: Product catalog (`id`, `name`, `price`, `barcode`, `image`)
- **Transactions**: Sales records (`id`, `total`, `paymentMethod`, `customerCPF`, `invoiceRequested`)

### Frontend Components
- **PDV Page**: Main point of sale interface with step-by-step workflow
- **Question Panel**: Left sidebar for customer interaction and data input
- **Action Panel**: Right panel for product selection and payment processing
- **Header**: Store branding and real-time clock display

### Core Features
- Multi-step checkout process (initial → products → payment → complete)
- Barcode scanning simulation
- Multiple payment methods (credit, debit, voucher, PIX)
- Optional invoice generation with CPF validation
- PDF receipt generation
- Real-time cart management

## Data Flow

1. **Customer Interaction**: Customer begins checkout process through the question panel
2. **Product Selection**: Products are added via barcode scanning or manual selection
3. **Payment Processing**: Payment method selection and processing simulation
4. **Receipt Generation**: PDF receipt creation and transaction recording
5. **State Reset**: System returns to initial state for next customer

### State Management Flow
- **Global State**: Zustand store manages PDV workflow state
- **Server State**: TanStack Query handles API calls and caching
- **Form State**: React Hook Form manages form inputs and validation

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management

### Development Tools
- **Drizzle Kit**: Database schema management and migrations
- **TSX**: TypeScript execution for development
- **Vite Plugins**: Runtime error overlay, Replit cartographer integration

### Database
- **Neon Database**: Serverless PostgreSQL provider
- **Connection Pooling**: Built-in connection management

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20
- **Database**: PostgreSQL 16
- **Hot Reloading**: Vite dev server with Express integration
- **Port Configuration**: Application runs on port 5000

### Production Deployment
- **Build Process**: 
  1. Vite builds frontend to `dist/public`
  2. esbuild bundles backend to `dist/index.js`
- **Deployment Target**: Replit Autoscale
- **Environment Variables**: Database URL configuration required
- **Asset Serving**: Static file serving from Express

### Database Management
- **Schema**: Defined in `shared/schema.ts` with Drizzle ORM
- **Migrations**: Generated in `./migrations` directory
- **Push Command**: `npm run db:push` for schema updates

## Recent Changes

- June 16, 2025: Enhanced PDV interface with improved user flow
  - Added step-by-step question flow (nota fiscal → CPF)
  - Implemented SIM/NÃO buttons for user decisions
  - Added camera simulation and manual barcode entry options
  - Enhanced final thank you screen with purchase summary
  - Updated step indicator to show all 6 workflow stages
  - Improved visual design with Mateus Armazém branding

## Changelog

- June 16, 2025: Initial setup and enhanced PDV interface

## User Preferences

Preferred communication style: Simple, everyday language.