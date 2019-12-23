import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    local_name: {
      type: String,
      required: true,
      default: undefined,
    },
    address: {
      type: String,
      required: true,
    },
    geo_location: {
      type: Object,
      required: true,
    },
    image: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.model('Address', AddressSchema);
