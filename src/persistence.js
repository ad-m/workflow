import mongoose from 'mongoose';
import { MONGO_URL } from './config';

const mongo = mongoose.connect(MONGO_URL, { useNewUrlParser: true });

mongoose.set('useFindAndModify', false);

export default mongo;
