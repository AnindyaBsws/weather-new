import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import User from './models/User.js';
import ExpressError from './utils/ExpressError.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import LocalStrategy from 'passport-local';

//SSE import for no-database sensor data showing
import SSE from 'express-sse';

//dotenv configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

app.use(express.json());

//Mongo Configuration
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600
});
store.on('error', err => {
  console.log('Mongo Store Error:', err);
});

//Session Configuration
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: false
  }
};
app.use(session(sessionOptions));

//Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.get('/api', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ loggedIn: true, user: req.user });
  }
  res.json({ loggedIn: false });
});

//Sensor Routes


//SSE configuration
    const sse = new SSE();
    let latestData = {}; // Store the latest sensor data in memory

    // Endpoint for ESP8266 to send sensor data
    app.post('/api/sensor-data', (req, res) => {
      latestData = req.body; // Update with new sensor data
      sse.send(latestData);  // Send to all connected clients
      res.sendStatus(200);
    });

    // SSE endpoint for the frontend to connect to
    app.get('/stream', sse.init);

    //loacal server for sensor data
    app.listen(3000, () => {
    console.log('Server running on port 3000');
    });

//MongoDB connected Message
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
