import User from '../models/User.js';

export const show = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

export const edit = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.user);
    const { name, mobile, email, image, oldpassword, newpassword } = req.body;
    let err = {};

    const user = await User.findById(req.user._id);

    if(name && name != req.user.username) {
      const temp = await User.findByUsername(name);
      if(temp) err.user = 'Username already exist';
    }

    if(mobile && mobile != req.user.mobile) {
      const temp = await User.findOne({mobile})
      if(temp) err.mobile = 'Phone number already exist';
    }

    if(email && email != req.user.email) {
      const temp = await User.findOne({email})
      if(temp) err.email = 'Email already exist';
    }

    if(name) user.username = name;
    else err.user = 'Name is empty';
    if(mobile) user.mobile = mobile;
    else err.mobile = 'Mobile is empty';
    if(email) user.email = email;
    else err.email = 'Email is empty';
    console.log((Object.keys(err).length === 0 && err.constructor === Object));
    
    if(oldpassword && newpassword && (Object.keys(err).length === 0 && err.constructor === Object)) {
      await user.changePassword(oldpassword, newpassword, function(e) {
        if (e) err.password = 'Old password is incorrect or error';
      });
    }
    console.log(err);
    if((Object.keys(err).length === 0 && err.constructor === Object)) await user.save();
    else throw Error(err.user ? err.user : '' + '\n' + err.email ? err.email : '' + '\n' + err.mobile ? err.mobile : '' + '\n' + err.password ? err.password : '');
    
    req.login(user, {session: false}, function(e) {
      if(e) return e;
      console.log('Sab changa si');
    });

    res.status(200).json({message: 'All Changes are successful', user});
  } catch (error) {
    res.status(500).json({ error: 'Failed to update', message: error.message});
  }
}
