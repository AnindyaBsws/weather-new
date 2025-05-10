import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  online: {
    type: String,
    required: true
  }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
export default User;
