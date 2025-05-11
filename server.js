const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const jwt = require('jsonwebtoken');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Redis client
const redisClient = redis.createClient();

// Session setup
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup
passport.use(
  new GoogleStrategy(
    {
      clientID: 'YOUR_GOOGLE_CLIENT_ID',
      clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user profile here
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/fodasi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Import auth routes
const authRoutes = require('./routes/auth');

// Import product and sale routes
const productRoutes = require('./routes/product');
const saleRoutes = require('./routes/sale');

// Import WhatsApp routes
const whatsappRoutes = require('./routes/whatsapp');

// Use auth routes
app.use('/auth', authRoutes);

// Use product and sale routes
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

// Use WhatsApp routes
app.use('/whatsapp', whatsappRoutes);

// Google Auth routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
