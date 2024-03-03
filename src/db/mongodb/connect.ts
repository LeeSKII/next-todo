import mongoose from "mongoose";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const { host, port, name, authSource, user, password } = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  authSource: process.env.DB_AUTH_SOURCE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const url = `mongodb://${user}:${password}@${host}:${port}/${name}`;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * 参照mongoose官网的next.js使用写法
 */
export default async function connect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      authSource,
    };
    cached.promise = mongoose.connect(url, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
