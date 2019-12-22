import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// eslint-disable-next-line func-names
UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 8);

  return next();
});

export default mongoose.model('User', UserSchema);
