import mongoose from 'mongoose';

export default mongoose.model('Task', {
  name: String,
});