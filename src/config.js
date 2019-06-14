import path from "path"

export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/test';

export const DAGS_FOLDER = path.join(__dirname, "..", "dags")

export default {};
