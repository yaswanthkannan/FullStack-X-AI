require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('./models/User');
const {db} = require('./config/db');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const app = express();
const communityRoutes = require('./routes/community');
const discussionRoutes = require('./routes/discussionRoutes');
const User = require('./models/User');

// Basic middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup with more robust configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    sameSite: 'lax'
  },
  name: 'moneyverse.sid' // Custom session name
}));

// Debug middleware to log session data
app.use((req, res, next) => {
  console.log('=== Session Debug ===');
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', {
    userId: req.session.userId,
    cookie: req.session.cookie
  });
  console.log('===================');
  next();
});

// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// User middleware
app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findUserByEmail(req.session.userId);
      if (user) {
        const userData = {
          id: user.id,
          name: user.name || user.email.split('@')[0],
          email: user.email
        };
        req.session.user = userData;
        req.user = userData; // Set both for consistency
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  next();
});

// Make user available in all EJS views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/community', communityRoutes);
app.use('/api/discussions', discussionRoutes);

// Public routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Protected routes with session check
app.get('/explore', (req, res) => {
  console.log('Explore route - User:', req.session.user ? 'Logged in' : 'Not logged in');
  if (!req.session.user) return res.redirect('/login');
  res.render('explore');
});

app.get('/community', (req, res) => {
  console.log('Community route - User:', req.session.user ? 'Logged in' : 'Not logged in');
  if (!req.session.user) return res.redirect('/login');
  res.render('community');
});

app.get('/dashboard', (req, res) => {
  console.log('Dashboard route - User:', req.session.user ? 'Logged in' : 'Not logged in');
  if (!req.session.user) return res.redirect('/dashboard');
  res.render('dashboard');
});

// Auth routes (rendering views)
app.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('login', { error: null });
});

app.get('/signup', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('signup', { error: null });
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log('Signup attempt for:', email);
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.render('signup', { error: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { 
      name: username,
      email, 
      password: hashedPassword,
      balance: 0,
      monthlySavings: 0,
      investmentReturns: 0,
      recentActivity: [],
      createdAt: new Date()
    };
    
    await createUser(newUser);
    req.session.userId = email;
    console.log('Session after signup:', req.session);
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Signup error:', error);
    res.render('signup', { error: 'Error creating user.' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for:', email);

  if (!email || !password) {
    return res.render('login', { error: 'Email and password are required.' });
  }

  try {
    const user = await findUserByEmail(email);
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      return res.render('login', { error: 'No user found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');

    if (!isMatch) {
      return res.render('login', { error: 'Incorrect password.' });
    }

    // Set both session.userId and session.user
    req.session.userId = email;
    req.session.user = {
      id: user.id,
      name: user.name || user.email.split('@')[0],
      email: user.email
    };
    
    console.log('Session after login:', req.session);
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'Error logging in.' });
  }
});

app.get('/logout', (req, res) => {
  console.log('Logout - Session before destroy:', req.session);
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    console.log('Session destroyed');
    res.redirect('/');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

