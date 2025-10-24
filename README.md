# Wedding Website - Documentation

## Overview

This is an elegant, romantic wedding website for Bruno & Ana, designed to showcase their love story, manage gift registries, accept Pix donations, and enable guest communication. The website features a modern, emotionally engaging design with soft color palettes (white, beige, blush pink, rose pink, and warm gold) and smooth animations to create a warm, welcoming atmosphere.

The application is built as a full-stack TypeScript project with a React frontend and Express backend, utilizing an in-memory storage system (with database schema defined for future PostgreSQL integration via Drizzle ORM).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**

- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight client-side routing)
- **UI Components:** Shadcn UI (Radix UI primitives with custom styling)
- **Styling:** Tailwind CSS with custom wedding-themed design system
- **State Management:** TanStack React Query v5 for server state
- **Form Handling:** React Hook Form with Zod validation
- **Build Tool:** Vite

**Design System:**

- Custom color palette defined in CSS variables for light mode (romantic wedding theme)
- Typography hierarchy using Google Fonts: Playfair Display (serif), Great Vibes (cursive), Montserrat (sans-serif)
- Component library following "New York" style from Shadcn UI
- Responsive design with mobile-first approach
- Custom animations including floating petals, fade-ins, and countdown timer

**Key Pages:**

- Home: Hero section with couple names, wedding date, countdown timer, love story
- Gifts: Grid view of wedding registry items
- Gift Detail: Individual gift pages with purchase links and reservation functionality
- Contact: Guest message form

### Backend Architecture

**Technology Stack:**

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database ORM:** Drizzle ORM (configured for PostgreSQL)
- **Validation:** Zod schemas
- **Development:** TSX for TypeScript execution

**Storage Strategy:**

- Currently using in-memory storage (`MemStorage` class) for development
- Production-ready schema defined for PostgreSQL migration
- Storage interface (`IStorage`) abstracts data access for easy database swapping

**API Design:**

- RESTful endpoints under `/api` prefix
- JSON request/response format
- Validation using Zod schemas from shared directory
- Error handling with appropriate HTTP status codes

**Key Endpoints:**

- `GET /api/gifts` - Fetch all gifts
- `GET /api/gifts/:id` - Fetch single gift
- `POST /api/gifts/:id/reserve` - Reserve a gift with guest name
- `POST /api/messages` - Submit contact form message

### Data Model

**Database Schema (Drizzle ORM):**

1. **Gifts Table:**
   - id (varchar, primary key)
   - title, description, imageUrl, personalNote (text)
   - purchaseLinks (text array)
   - reserved (boolean, default false)
   - reservedBy (text, nullable)

2. **Messages Table:**
   - id (varchar, primary key)
   - name, email, message (text)
   - createdAt (timestamp, auto-generated)

3. **Reservations Table:**
   - id (varchar, primary key)
   - giftId (varchar, references gifts)
   - guestName (text)
   - createdAt (timestamp, auto-generated)

**Seeded Data:**

- 5 initial gifts with product images stored in `@images/`
- Gifts include: Dinnerware Set, Luxury Bedding, Kitchen Faucet, Cookware Set, Crystal Glasses

### Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components (UI library + custom)
│   │   ├── pages/         # Route components
│   │   ├── lib/           # Utilities and query client
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point with middleware
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data access layer
│   └── vite.ts           # Vite dev server integration
├── shared/               # Shared TypeScript code
│   └── schema.ts         # Drizzle schemas and Zod validators
├── attached_assets/      # Static assets (images, requirements)
└── migrations/           # Database migrations (Drizzle Kit output)
```

### Build and Deployment

**Development Mode:**

- Vite dev server with HMR for frontend
- Express server with automatic TypeScript compilation via TSX
- Integrated via Vite middleware mode

**Production Build:**

- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Static file serving from Express in production

**Configuration:**

- TypeScript path aliases: `@/` for client, `@shared/` for shared code, `@assets/` for assets
- Environment-based configuration (NODE_ENV)
- Database connection via `DATABASE_URL` environment variable

## External Dependencies

### Third-Party UI Libraries

- **Radix UI:** Accessible, unstyled component primitives (accordion, dialog, dropdown, popover, etc.)
- **Shadcn UI:** Pre-styled components built on Radix UI
- **Lucide React:** Icon library for consistent iconography
- **Embla Carousel:** Carousel component (installed but not actively used)

### Data and State Management

- **TanStack React Query:** Server state management with caching and refetching
- **React Hook Form:** Form state management and validation
- **Zod:** Runtime type validation and schema definition
- **@hookform/resolvers:** Integration between React Hook Form and Zod

### Database and ORM

- **Drizzle ORM:** TypeScript ORM for PostgreSQL
- **@neondatabase/serverless:** Serverless PostgreSQL driver (configured but not actively used)
- **Drizzle Kit:** Schema migration tool
- **Drizzle Zod:** Generate Zod schemas from Drizzle tables

### Styling

- **Tailwind CSS:** Utility-first CSS framework
- **class-variance-authority:** Utility for managing component variants
- **clsx & tailwind-merge:** Utility functions for conditional class names

### Development Tools

- **Vite:** Build tool and dev server
- **TypeScript:** Type safety across the stack
- **PostCSS & Autoprefixer:** CSS processing

### Planned Integrations

- **PostgreSQL Database:** Production database (schema defined, connection configured)
- **Pix Payment System:** Brazilian instant payment system for donations (QR code and key displayed, backend integration pending)
- **External Shopping Links:** Amazon, Mercado Livre, Shopee (URLs included in gift data)
