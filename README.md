# Auth System
 
A full-stack authentication system with OTP email verification, forgot password, and JWT-based login.
 
---
 
## Tech Stack
 
**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (SMTP / Gmail)
- bcryptjs
  
**Frontend**
- React + Vite
- Tailwind CSS
- Axios

## Getting Started
 
### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Gmail account with App Password enabled
- Git
---
 
### Backend Setup
 
**1. Clone and navigate to the backend:**
```bash
git clone <your-repo-url>
cd subscription-expiry-system
```
 
**2. Install dependencies:**
```bash
npm install
```
 
**3. Create `.env` in the root:**
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret_key
 
CLIENT_URL=http://localhost:5173
 
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_16_char_app_password
SMTP_FROM="Auth System <your_gmail@gmail.com>"
 
NODE_ENV=development
```
 
**4. Start the backend:**
```bash
# Development
npm run dev
 
# Production
npm start
```
 
Backend runs on `http://localhost:3000`
 
---
 
### Frontend Setup
 
**1. Navigate to the frontend:**
```bash
cd subscription-expiry-frontend
```
 
**2. Install dependencies:**
```bash
npm install
```
 
**3. Create `.env`:**
```env
VITE_API_BASE_URL=http://localhost:3000/api
```
 
**4. Start the frontend:**
```bash
npm run dev
```
 
Frontend runs on `http://localhost:5173`
 
---
 
## API Endpoints
 
### Auth Routes — `/api/users`
 
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login with email and password | No |
| POST | `/verify-otp` | Verify OTP code | No |
| POST | `/resend-otp` | Resend OTP code | No |
| POST | `/forgot-password` | Request password reset OTP | No |
| POST | `/reset-password` | Reset password with OTP | No |
 
---
 
## Auth Flow
 
**Registration:**
```
Fill form (username, email, password)
  → POST /register
  → OTP sent to email
  → Enter OTP on verify page
  → POST /verify-otp
  → Redirect to login
```
 
**Login:**
```
Fill form (email, password)
  → POST /login
  → JWT token stored
  → Redirect to dashboard
```
 
**Forgot Password:**
```
Enter email
  → POST /forgot-password
  → OTP sent to email
  → Enter OTP + new password
  → POST /reset-password
  → Redirect to login
```
 
---
 
## Environment Variables
 
| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port (default: 3000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLIENT_URL` | Frontend URL for CORS |
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP server port |
| `SMTP_USER` | SMTP email address |
| `SMTP_PASS` | Gmail App Password (no spaces) |
| `SMTP_FROM` | Sender name and email |
| `NODE_ENV` | development or production |
 
---
 
## Security Features
 
- Passwords hashed with **bcryptjs** (salt rounds: 10)
- **JWT tokens** expire after 1 day
- **OTP codes** are 6 digits and expire after 10 minutes
- Used OTPs are marked and cannot be reused
- Rate limiting on login, register, OTP, and password reset routes
- CORS restricted to `CLIENT_URL`
- **Helmet** for HTTP security headers
- Forgot password returns same message whether email exists or not (prevents email enumeration)
- Timing attack prevention on login using dummy hash comparison
---
 
## Gmail SMTP Setup
 
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Create a new App Password — name it anything (e.g. `nodemailer`)
5. Copy the 16-character password and paste it into `SMTP_PASS` **without spaces**
---
 
## Author
Jerwin Macasinag

 
