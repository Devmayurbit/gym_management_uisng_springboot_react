# Maruti Nandan - Spiritual Akhada Fitness Platform

## 🔥 Quick Setup Guide

### Prerequisites
- **Java 21** (upgrade completed)
- **Node.js 18+** 
- **MySQL 8.0+**
- **Maven 3.9.11** (via wrapper)

---

## 🚀 BACKEND SETUP

### Step 1: Database Setup
```bash
# Open MySQL and create database (optional - will auto-create)
mysql -u root
CREATE DATABASE maruti_nandan;
EXIT;
```

### Step 2: Build Backend
```bash
cd gym-backend

# Using Maven Wrapper (Java 21 ready)
./mvnw clean package -DskipTests

# Or using Maven directly
mvn clean package -DskipTests
```

### Step 3: Run Backend
```bash
# Using Maven Wrapper
./mvnw spring-boot:run

# Or using packaged JAR
java -jar target/gym-backend-0.0.1-SNAPSHOT.jar
```

Backend will start at: **http://localhost:8080**

---

## 🎨 FRONTEND SETUP

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

Frontend will start at: **http://localhost:5173** (or shown in terminal)

---

## 🔐 KEY API ENDPOINTS

### Public Endpoints (No Login Required)
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/send-otp` - Send OTP to email
- `POST /api/v1/auth/verify-otp` - Verify OTP
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/akhada/content` - Get Akhada workouts & mantra
- `GET /api/v1/subscriptions/plans` - Get subscription plans

### Protected Endpoints (Login Required - Bearer Token)
- `GET /api/v1/dashboard/me` - User dashboard data
- `GET /api/v1/subscriptions/status` - Subscription status
- `POST /api/v1/payments/order` - Create Razorpay order
- `POST /api/v1/payments/verify` - Verify payment & activate subscription

---

## 🔐 OTP FLOW EXPLANATION

### How OTP Works:
1. User clicks "Send OTP" on registration page
2. OTP is generated and **printed to backend console** (for testing)
3. User enters OTP in the field (check console output)
4. Click "Create Account" - this verifies OTP and creates account
5. User can then login with email and password

### To Enable Real Email OTP:
Update `AuthService.java` to use Spring Mail instead of console logging.

---

## 💳 RAZORPAY INTEGRATION

### Test Keys (Already Configured):
- **Key ID**: `rzp_test_1smW9t3P5xKcGo`
- **Key Secret**: Configured in `application.properties`

### Test Card Details:
- Card Number: `4111 1111 1111 1111`
- Expiry: `12/25`
- CVV: `123`
- OTP: `123456`

---

## 📱 USER FLOW

### 1. Registration
```
/register → Fill name, email, password
         → Click "Send OTP"
         → Check backend console for OTP
         → Enter OTP in field
         → Click "Create Account"
```

### 2. Login
```
/login → Enter email & password → Get JWT token stored in localStorage
```

### 3. Dashboard
```
/dashboard → View XP, level, streak, discipline score (protected route)
```

### 4. Subscriptions
```
/subscription → View plans → Click "Pay with Razorpay"
             → Complete payment on Razorpay checkout
             → Subscription activated + XP awarded
```

---

## 🐛 TROUBLESHOOTING

### Backend won't start:
```
Error: java.lang.IllegalStateException: Unable to find a single main class
→ Run: ./mvnw clean compile first
```

### OTP not working:
- Check backend console for OTP code (printed there for testing)
- Verify `/api/v1/auth/send-otp` endpoint is accessible
- Check application.properties has JWT secret configured

### Frontend can't reach backend:
- Verify backend is running on port 8080
- Check CORS is enabled in `SecurityConfig.java`
- Verify `.env.local` has correct API URL

### Payment not working:
- Use test Razorpay credentials
- Check console for order ID and signature verification errors
- Verify Razorpay keys are correct in `application.properties`

---

## 🎯 TESTING CHECKLIST

- [ ] Backend starts without errors
- [ ] Frontend loads at localhost:5173
- [ ] Can navigate to /register page
- [ ] OTP sends (check backend console)
- [ ] Can register with valid OTP
- [ ] Can login with registered credentials
- [ ] Dashboard loads and shows stats
- [ ] Can view subscription plans
- [ ] Razorpay payment dialog opens
- [ ] Can complete test payment with test card

---

## 📁 PROJECT STRUCTURE

```
GYM_FULL_STACK/
├── frontend/                    # React + Vite
│   ├── src/
│   │   ├── pages/              # Home, Dashboard, Akhada, Subscription, Auth
│   │   ├── Components/         # Navbar, ScrollReveal, ChakraLoader
│   │   ├── api/                # API client with JWT interceptor
│   │   └── index.css           # Maruti Nandan theme + animations
│   └── .env.local              # API URL config
│
└── gym-backend/                 # Spring Boot 3.5.7 + Java 21
    ├── src/main/java/
    │   └── com/example/gym_backend/
    │       └── mn/
    │           ├── model/      # AppUser, Subscription, PaymentRecord
    │           ├── repository/ # JPA repositories
    │           ├── service/    # Auth, Dashboard, Akhada, Payment
    │           ├── controller/ # REST endpoints
    │           ├── security/   # JWT, UserDetails
    │           └── config/     # Security, CORS
    ├── pom.xml                 # Maven dependencies (JWT, Razorpay, etc.)
    └── application.properties  # Config with JWT secret & Razorpay keys
```

---

## 🚀 DEPLOYMENT

### Frontend (Netlify/Vercel):
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/AWS/GCP):
```bash
mvn clean package
java -jar target/gym-backend-0.0.1-SNAPSHOT.jar
```

---

## 📞 SUPPORT

For issues or questions:
1. Check backend console for error logs
2. Check browser console for frontend errors
3. Verify MySQL is running
4. Verify both frontend and backend URLs match `.env.local`

Happy Building! 🙏 Jai Hanuman! 💪
