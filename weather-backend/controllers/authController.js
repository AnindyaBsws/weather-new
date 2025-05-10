import User from '../models/User.js';
import passport from 'passport';

export const signup = async (req, res) => {
  const { user, email, mobile, password } = req.body;
  console.log(email, mobile, password);

  try {
    const newUser = new User({
      username: user,
      email,
      mobile,
      online: true
    });

    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, err => {
      res.json(err);
    });
    res.locals.currUser = req.user;

    res.json({ message: 'Sign up successful', registeredUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Login successful', user });
    });
    res.locals.currUser = req.user;

  })(req, res, next);
};

export const logout = async (req, res) => {
  req.logout(err => {
    if(err) {
        res.json(err);
    }
  });

  res.json({ message: 'Logged out successful', user: req.user });
};
