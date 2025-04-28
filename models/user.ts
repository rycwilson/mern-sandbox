import mongoose, { type SchemaDefinition, Schema, model } from 'mongoose';
import config from '../config/config.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';

interface UserInterface {
  firstName: string,
  lastName?: string,
  email: string,
  password: string,
  fullName: string,
  createJWT: () => string,
  comparePassword: (candidatePass: string) => Promise<boolean>
}

const userAttributes: SchemaDefinition = {
  firstName: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: 50,
    trim: true
  },
  lastName: {
    type: String,
    maxlength: 50,
    default: '',
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,   // not actually a validation
    trim: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
};

const userSchema = new Schema<UserInterface>(userAttributes, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.virtual('fullName').get(function (this: UserInterface) { return `${this.firstName} ${this.lastName}`.trim(); });

// note that this middleware will not run when using updateOne or findOneAndUpdate
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods = {
  createJWT() {
    return jwt.sign(
      { id: this._id, role: this.role, name: this.fullName }, 
      config.JWT_SECRET, 
      { expiresIn: config.JWT_EXPIRES_IN }
    );
  },
  async comparePassword(candidatePassword: string) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  },
  // toJSON() {
  //   const userObject = this.toObject();
  //   delete userObject.password; 
  //   return userObject;
  // }
}

// all schema configurations (above) must be defined before creating the model
const User = model<UserInterface>('User', userSchema);

export const registrationValidation = ([
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name must be at most 50 characters long'),
  body('lastName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Last name must be at most 50 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .custom(async (value) => {
      const userExists = await mongoose.models.User.exists({ email: value });
      if (userExists) {
        throw new Error('Email is already in use');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage("Role must be either 'user' or 'admin'")
]);

export const loginValidation = ([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
]);

export const updateUserValidation = ([
  body('firstName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('First name must be at most 50 characters long'),
  body('lastName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Last name must be at most 50 characters long'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address')
    .custom(async (value, { req }) => {  
      const userExists = await mongoose.models.User.exists({ email: value, _id: { $ne: req.user.id } });
      if (userExists) {
        throw new Error('Email is already in use');
      } else {
        return true;
      }
    })
]);

export default User;