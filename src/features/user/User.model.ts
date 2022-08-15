import { Roles } from '@/config/roles';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';

export interface IUser {
  uid?: string;
  _id: string;
  username: string;
  email: string;
  password: string;
  profileImage: string;
  role: Roles;
  isActive: boolean;
  createdByGoogle: boolean;
  isEmailVerified: boolean;
  isPasswordMatch: (password: string) => Promise<boolean>;
}

interface IUserModel extends mongoose.Model<IUser> {
  isEmailTaken: (email: string, excludeUserId?: string | undefined) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser, IUserModel>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdByGoogle: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUsernameTaken = async function (username: string) {
  const user = await this.findOne({ username });

  return Boolean(user);
};

userSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId?: string | undefined,
) {
  const user = await this.findOne({
    email: email.toLowerCase(),
    _id: { $ne: excludeUserId },
  });

  return Boolean(user);
};

userSchema.methods.isPasswordMatch = async function (password: string) {
  return bcryptjs.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  console.log('pre save');

  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcryptjs.genSalt(12);

  this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.toJSON = function () {
  const {
    __v, // eslint-disable-line @typescript-eslint/naming-convention
    _id, // eslint-disable-line @typescript-eslint/naming-convention
    createdAt,
    createdByGoogle,
    isActive,
    password,
    updatedAt,
    ...user
  } = this.toObject();

  user.uid = _id;

  return user;
};

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
