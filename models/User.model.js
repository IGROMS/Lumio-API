const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_ROUNDS = 10

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required!"],
            minLength: 3,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required!"],
            minLength: 3,
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
            match: [EMAIL_PATTERN, "Email is not valid!"],
            unique: [true, "Invalid credential"],
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            minLength: [8, "Password must contain at least 8 characters"]
        },
    },
    {
        toJSON: {
          //virtuals: true,
          transform: (doc, ret) => {
            delete ret.__v;
            delete ret.password;
    
            return ret
          }
        }
      }
)

UserSchema.pre("save", function (next) {
    const user = this;
    if (user.isModified("password")) {
      bcrypt
        .hash(user.password, SALT_ROUNDS)
        .then((hash) => {
          user.password = hash;
          next();
        })
        .catch((err) => next(err));
    } else {
      next();
    }
  });
  
  UserSchema.methods.checkPassword = function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User