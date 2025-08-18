# Auth Service

## 🔹 Authentication Flow

### Authentication Overview

This project uses **bcrypt** for password hashing and **JWT (JSON Web Tokens)** for stateless authentication.

### 1. Registration (Sign Up)

- Users provide a plain-text password.
- The password is hashed using **bcrypt** with a configurable cost factor (salt rounds).
- The resulting hash (with embedded salt) is stored in the database — **plain passwords are never stored**.

### 2. Login (Sign In)

- Users submit their password for authentication.
- The server compares the submitted password with the stored bcrypt hash using `bcrypt.compare()`.
- If the password matches, the user is authenticated.

### 3. JWT Token Generation

- Upon successful login, the server generates a **JWT** containing user information (e.g., `userId`, `role`).
- The JWT is signed using a secret key stored in `.env` (`JWT_SECRET`) and includes an expiration time (e.g., 1 hour).
- The token is returned to the client and used for subsequent authenticated requests.

### 4. JWT Verification

- For every protected route, the server verifies the JWT signature and expiration.
- If the token is valid, the server grants access and can read the payload.
- Expired or tampered tokens are rejected with a `401 Unauthorized` response.

### 5. Token Expiry and Refresh

- JWTs are short-lived for security reasons.
- On expiry, users must re-login or obtain a new token via a **refresh token mechanism**.
- The secret key ensures that tokens cannot be forged even if the payload is intercepted.

### 6. Security Highlights

- Passwords are securely hashed with bcrypt + salt.
- JWTs are **stateless**, so the backend doesn’t need to maintain sessions.
- Environment variables (`.env`) keep secrets like `JWT_SECRET` secure and configurable.
- Supports **role-based authorization** using claims stored in the token payload.
