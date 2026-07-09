# SecureAssess - Frontend Authentication Module

A modern, production-ready frontend authentication module for the Secure Placement Assessment Platform, built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Toast Notifications**: Sonner
- **Animations**: Framer Motion
- **State Management**: React Context API

## Features

- **Authentication Pages**
  - Login with email and password
  - Registration with password strength indicator
  - Role-based access (Student/Admin)
  - Remember me functionality
  - Forgot password link (UI ready)

- **Security**
  - JWT token management in localStorage
  - Automatic token attachment via Axios interceptors
  - 401 Unauthorized handling with auto-redirect
  - Password validation with strength requirements

- **UI/UX**
  - Dark mode by default
  - Glassmorphism design
  - Animated gradient background
  - Smooth Framer Motion animations
  - Responsive design (mobile/tablet/desktop)
  - Accessible (ARIA labels, keyboard navigation)

- **Validation**
  - Zod schema validation
  - Real-time form validation
  - Password strength indicator
  - Backend error display via Sonner toasts

## Project Structure

```
frontend/
├── app/
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── register/
│   │   └── page.tsx          # Registration page
│   ├── layout.tsx            # Root layout with AuthProvider
│   └── globals.css           # Global styles
├── components/
│   └── auth/
│       ├── AuthCard.tsx      # Glassmorphism card component
│       ├── AuthLayout.tsx    # Auth layout wrapper
│       ├── BackgroundAnimation.tsx  # Animated background
│       ├── Button.tsx        # Reusable button
│       ├── Divider.tsx       # Section divider
│       ├── Input.tsx         # Reusable input
│       ├── Logo.tsx          # Brand logo
│       ├── LoadingSpinner.tsx  # Loading indicator
│       ├── PasswordInput.tsx # Input with show/hide
│       ├── PasswordStrength.tsx  # Password strength meter
│       └── SocialButtons.tsx  # Social login buttons (UI)
├── hooks/
│   └── useAuth.ts            # Auth context and hook
├── lib/
│   ├── api.ts                # Axios instance with interceptors
│   ├── token.ts              # Token management utilities
│   ├── utils.ts              # Utility functions
│   └── validations.ts        # Zod validation schemas
├── services/
│   └── auth.service.ts       # API service calls
├── types/
│   └── auth.ts               # TypeScript interfaces
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Backend API running on your server

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
Create a `.env.local` file in the frontend directory with the following:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Replace `http://localhost:5000/api` with your actual backend API URL.

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## API Integration

The frontend integrates with the following backend endpoints:

### Login
- **Endpoint**: `POST /auth/login`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "student"
  }
}
```

### Register
- **Endpoint**: `POST /auth/register`
- **Request Body**:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "role": "student"
}
```
- **Response**: Same as login

## Authentication Flow

1. **Login/Register**:
   - User fills form → Validation → API call
   - On success: Token saved to localStorage, user data stored
   - Redirect based on role:
     - Student → `/dashboard`
     - Admin → `/admin/dashboard`

2. **Token Management**:
   - Token stored in `localStorage` under key `auth_token`
   - User data stored in `localStorage` under key `user_data`
   - Axios interceptor automatically attaches `Authorization: Bearer <token>`

3. **Logout**:
   - Token and user data removed from localStorage
   - Redirect to `/login`

4. **401 Handling**:
   - Automatic token removal
   - Redirect to `/login`

## Password Requirements

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme.

### API Endpoints
Edit `lib/api.ts` to change the base URL or add custom interceptors.

### Validation Rules
Edit `lib/validations.ts` to modify form validation schemas.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the Secure Placement Assessment Platform.
