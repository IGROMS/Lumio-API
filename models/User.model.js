const mongoose = require('mongoose');

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            minLength: [8, "Password must contain at least 8 characters"]
        }
    },
    {
        toJSON: {
          virtuals: true,
          transform: (doc, ret) => {
            delete ret.__v;
            delete ret._id;
            delete ret.password;
    
            return ret
          }
        }
      }
)

const User = mongoose.model("User", UserSchema);

module.exports = User