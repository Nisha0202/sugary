const mongoose = require('mongoose')

const moment = require('moment');
 const { Schema } = mongoose;
 const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  date: {
    type: String, // Change type to String to store formatted date
    default: () => moment().format('MM/DD/YYYY hA') // Default format
  }
});

// Pre-save hook to format the date
UserSchema.pre('save', function(next) {
  this.date = moment().format('MM/DD/YYYY h:mm A');
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
