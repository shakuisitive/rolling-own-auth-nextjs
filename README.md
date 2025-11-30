# Workout Tracker - Custom Authentication Learning Project

A full-stack workout tracking application built with Next.js 16, featuring a **custom authentication system** implemented from scratch. This project was created to learn and understand the fundamentals of building secure authentication without relying on third-party auth providers. Everything was vibe coded except the auth bit! 😃

## 🎯 Project Purpose

The primary goal of this project was to **learn how to roll your own authentication system** from the ground up. Instead of using services like NextAuth, Auth0, or Clerk, this project implements a complete authentication flow using industry-standard practices and libraries.

## 🚀 Features Implemented

### Authentication System
- **User Registration** - Signup with email validation, password hashing, and duplicate user checking
- **User Login** - Email/password authentication with secure password verification
- **Session Management** - JWT (JSON Web Tokens) stored in HTTP-only cookies
- **Password Security** - Bcrypt hashing with salt rounds for secure password storage
- **Route Protection** - Middleware-based route guards for private and public-only routes
- **User Context** - Server-side authentication state management with React cache
- **Logout Functionality** - Secure session invalidation and cookie cleanup

### Workout Tracking (CRUD Operations)
- **Create Workouts** - Add new workouts with name, description, reps, sets, weight, and duration
- **Read Workouts** - View all workouts with user-specific filtering and sorting
- **Update Workouts** - Edit existing workout details
- **Delete Workouts** - Remove workouts with confirmation
- **Workout Statistics** - Display total workouts, total reps, and weekly statistics
- **Form Validation** - Client and server-side validation with error handling

### Technical Implementation
- **Server Actions** - Next.js 16 server actions for form handling and data mutations
- **Server Components** - React Server Components for efficient data fetching
- **Type Safety** - Full TypeScript implementation throughout the application
- **Database ORM** - Prisma with PostgreSQL for type-safe database operations
- **Styling** - Tailwind CSS 4 for modern, responsive UI design
- **React 19** - Latest React features including `useActionState` for form state management
- **Hydration Safety** - Custom date formatting to prevent React hydration mismatches

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.5 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: 
  - JWT (jsonwebtoken) for token generation and verification
  - Bcrypt for password hashing
  - HTTP-only cookies for secure session storage
- **Styling**: Tailwind CSS 4
- **React**: 19.2.0 with Server Components and Server Actions

## 📚 What I Learned

### Authentication Concepts
- How to securely hash and store passwords using bcrypt
- JWT token creation, signing, and verification
- HTTP-only cookie implementation for XSS protection
- Session management and token expiration
- Route protection patterns and middleware implementation
- User authentication state management in server components

### Next.js Patterns
- Server Actions for form submissions and mutations
- Server Components vs Client Components
- React cache for request deduplication
- Revalidation strategies with `revalidatePath`
- Dynamic route handling with Next.js 15+ Promise-based params
- Middleware for route protection

### Database & ORM
- Prisma schema design and relationships
- Type-safe database queries
- User-workout relationship modeling
- Cascade delete operations

### React Patterns
- `useActionState` for form state management
- `useEffect` for side effects (navigation after mutations)
- Proper hydration handling to avoid mismatches
- Client component patterns for interactive UI

## 🔐 Security Features

- Password hashing with bcrypt (10 salt rounds)
- HTTP-only cookies to prevent XSS attacks
- Secure cookie flags (secure, sameSite: 'lax')
- JWT token expiration
- Server-side session verification
- Protected routes with middleware
- User-specific data isolation (users can only access their own workouts)

## 📁 Project Structure

```
src/
├── app/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── actions/        # Login & signup server actions
│   │   │   ├── components/     # Auth UI components
│   │   │   ├── queries/        # getAuth query
│   │   │   └── utils/          # JWT & session utilities
│   │   └── workouts/
│   │       ├── action/         # CRUD server actions
│   │       └── components/     # Workout UI components
│   ├── signin/                 # Login page
│   ├── signup/                 # Registration page
│   └── workouts/               # Workout pages
├── lib/
│   └── prisma.ts               # Prisma client instance
└── proxy.ts                    # Route protection middleware
```

## 🚦 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   DATABASE_URL="your_postgresql_connection_string"
   ```

3. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🎓 Key Takeaways

This project demonstrates that building your own authentication system is entirely feasible and educational. While third-party solutions are often more convenient for production applications, understanding the underlying concepts of authentication, session management, and security best practices is invaluable for any full-stack developer.

The implementation follows industry standards and security best practices, making it a solid foundation for understanding how authentication works under the hood.
