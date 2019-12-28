import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
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
});

export default mongoose.model('Address', AddressSchema);
