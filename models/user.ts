import { Schema, type SchemaDefinition, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface User {
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
    minlength: 6,
    trim: true
  },
  // company: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Company",
  //   required: true
  // }
};
const options = { timestamps: true };
const userSchema = new Schema<User>(userAttributes, options);

userSchema.virtual('fullName').get(function (this: User) { return `${this.firstName} ${this.lastName}`.trim(); });

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, name: this.fullName }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}

userSchema.methods.comparePassword = async function (candidatePass: string) {
  const isMatch = await bcrypt.compare(candidatePass, this.password);
  return isMatch;
}

export default model<User>('User', userSchema);