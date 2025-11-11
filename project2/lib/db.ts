import { connect } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('MongoDB Url is not found');
}

let cached = global.mongoose;
//? creating types.d.ts file for defining mongoose in global

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log('Database Connected Successfully [Cached]');
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connect(MONGO_URI).then((c) => c.connection);
  }
  try {
    cached.conn = await cached.promise;
    console.log('Database Connected Successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectDB;
/* 
How to Connect MongoDb in Next JS

Step 1 – Basic idea
"Sabse pehle samjho — Next.js ek full-stack framework hai.
Matlab ye frontend ke saath backend APIs bhi handle karta hai.

Jab hum backend part me MongoDB se connect karte hain,
to hume mongoose.connect() call karna padta hai.

Lekin Next.js me ek problem anti hai —
wo hot reload karta hai.
Har baar file change hone ya new API call pe backend dobara run hota hai,
aur agar humne seedha mongoose.connect() likh diya to
har baar ek naya database connection banega ✅"
-----------------------------------------------------------
Step 2 – Problem samjho (Visual Example)
"Maan lo tumhare paas ek API route hai /api/user.
Har request ke time Next.js backend ko reload karta hai
aur tumhara code fir se run hota hai.
Matlab agar tumne likha:

mongoose.connect(MONGO_URL)

to ye line har baar execute hog! 😊

Result: MongoDB me multiple open connections
→ app slow, crash, aur warning 'Too many connections'."
------------------------------------------------------------
Step 3 – Solution idea (Connection reuse)
"Ab iska simple solution ye hai —
Ek baar connection bana lo,
aur usko cache me store kar lo.

Agli baar jab code chale to check karo:

"Agar pehle se connection hai → use karo 🟧"

"Agar nahi hai → naya banao 🟧"

Ye caching hum global object me karte hain."

*/
