import mongoose from 'mongoose';

interface Iuser {
  _id?: mongoose.Types.ObjectId;
  name?: string;
  image?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// const User = mongoose.model('User', userSchema);

//? that line cause a error in next_js so the solution is that
const User = mongoose?.models?.User || mongoose.model('User', userSchema);

export default User;

/* 
Next.js me problem kyu anti hai
"Ab ye problem Next.js me isliye anti hai kyunki Next.js ka backend part har request ya code change ke time automatically reload ho jata hai.
Matlab agar tumne model import kiya hua hai, toh Next.js us file ko dobara run karega.

Pehli baar to model bana lega,
lekin second time jab Next.js reload karega — toh same model dobara banane ki koshish karega,
aur error aayega 😊

OverwriteModelError: Cannot overwrite "User" model once compiled."
//? so solution is optional channing  ?.
//? if there is a model already then use it, if not then create it
*/
