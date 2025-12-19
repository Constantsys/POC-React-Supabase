# React + Supabase CRUD Proof of Concept (Client-Only)

A **client-only Proof of Concept (POC)** application built with **React** and **Supabase** that demonstrates **authentication, protected routes, and full CRUD operations** without using **Next.js**, **Express**, or any custom backend server.

All communication happens **directly from the browser to Supabase** using the official `@supabase/supabase-js` client.

---

## Tech Stack

### Frontend
- **React**
- **TypeScript**
- **React Router DOM**
- **Vite** (or Create React App)

### Backend / Services
- **Supabase**
  - Authentication (Email & Password)
  - PostgreSQL Database
  - Row Level Security (RLS)

### Architecture
- Client-only application
- No server-side rendering
- No API routes
- No server actions
- No Express / Node backend

---

## Features

### Authentication
- User signup (email & password)
- User login
- User logout
- Session persistence handled by Supabase
- Auth state tracking in React

### Authorization
- Supabase Row Level Security (RLS)
- Users can access **only their own data**
- Secure access using Supabase policies

### Protected Routes
- Public routes: Login, Signup
- Protected routes: Dashboard, CRUD pages
- Automatic redirect for unauthenticated users

### CRUD Operations (POC)
- Create records
- Read records
- Update records
- Delete records
- All operations performed directly against Supabase

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
