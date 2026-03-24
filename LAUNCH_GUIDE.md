# 🎯 Maruti Nandan - Setup & Launch Guide

## ✅ Completed Setup
- **Razorpay Integration:** Test keys configured (`rzp_test_SV2QSXvz6qDZLd`)
- **Frontend:** React app with premium glassmorphism UI and animations
- **Backend:** Spring Boot 3.5.7 with Java 21, JWT auth, subscription system
- **Database:** MySQL configuration with automatic table creation

---

## 🚀 Quick Start

### Backend (Spring Boot API)
```bash
cd gym-backend

# Option 1: Run with Maven (Recommended)
./mvnw clean package -DskipTests
java -jar target/gym-backend-0.0.1-SNAPSHOT.jar

# Option 2: Direct Spring Boot run
./mvnw spring-boot:run

# Server runs on http://localhost:8080/api
```

**Available Endpoints:**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/subscriptions/plans` - View subscription plans
- `POST /api/v1/payments/order` - Create Razorpay order
- `POST /api/v1/payments/verify` - Verify payment

### Frontend (React + Vite)
```bash
cd frontend

# Install dependencies (if not done)
npm install

# Start development server
npm run dev

# App runs on http://localhost:5173
# API connects to http://localhost:8080/api/v1 (configured in .env.local)
```

---

## 🔧 Database Setup

### MySQL Config (Auto-created)
- **Host:** localhost:3306
- **Database:** maruti_nandan (auto-created)
- **User:** root
- **Password:** jaxsky&2705

### Tables Auto-Created by Hibernate
- `mn_users` - User accounts with roles
- `mn_subscriptions` - Subscription records
- `mn_payment_records` - Payment logs

---

## 🧪 Test the Full Payment Flow

1. **Register & Login**
   - Go to http://localhost:5173
   - Click "Sign Up"
   - Enter email, password, send OTP
   - Enter OTP and register
   - Login with credentials

2. **View Subscription Plans**
   - Dashboard shows plan options (BASIC ₹999, PREMIUM ₹2499)

3. **Test Razorpay Payment** (Test Mode - No Real Charges)
   - Click "Pay with Razorpay"
   - Use Razorpay test card: **4111 1111 1111 1111**
   - Any future expiry date
   - Any CVV (e.g., 123)
   - Payment will be processed in test mode

---

## 🌟 UI Features

### Glassmorphism Effects
- Premium glass-card components with blur & gradient overlay
- Smooth transitions on all interactive elements
- Hover effects with scale, glow, and shimmer

### Animations
- Hero section: Fade-in with slide animations
- Grid items: Cascading bounce-in effect
- Progress bars: Pulsing glow animation
- Buttons: Multi-layer shimmer sweep on hover
- Navigation: Animated underline indicators

### Responsive
- Mobile-first design (max-width: 900px breakpoint)
- Sticky navigation that hides on scroll
- Touch-friendly interactive elements

---

## 📱 API Base URL
- Development: `http://localhost:8080/api/v1`
- Configured in: `frontend/.env.local`

---

## 🐛 Troubleshooting

### Backend won't start
1. Check MySQL is running: `mysql -u root -p`
2. Verify credentials in `gym-backend/src/main/resources/application.properties`
3. Check port 8080 is available: No other services on port 8080

### Frontend can't connect to API
1. Ensure backend is running on port 8080
2. Check CORS settings in `SecurityConfig.java`
3. Verify `VITE_API_BASE_URL` in `.env.local`

### Payment flow fails
1. Verify Razorpay credentials in `application.properties`
2. Check PaymentService.verifyPayment() returns success
3. Inspect browser console for errors

---

## 📊 Architecture

```
Maruti Nandan (Spiritual Fitness Platform)
├── Frontend (React 19 + Vite)
│   ├── Pages: Home, Akhada, Subscription, Dashboard, Auth
│   └── Features: JWT auth, OTP verify, Razorpay checkout
├── Backend (Spring Boot 3 + Java 21)
│   ├── Auth: JWT tokens, role-based access
│   ├── Payment: Razorpay integration
│   ├── Subscription: Plans & XP rewards
│   └── Database: MySQL + Hibernate ORM
└── Payment: Razorpay Test Gateway
    └── Test Mode: No real charges
```

---

## ✨ Next Steps
1. Verify both services start without errors
2. Test full registration → payment flow
3. Customize branding/content in components
4. Deploy to production when ready

**Enjoy building! ॐ**
