import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from './db';
import User from '@/app/model/user.model';
import bcrypt from 'bcryptjs';
import Google from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    // multiple providers in array, [google, email-pass [credentials], github]
    CredentialsProvider({
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          console.log('❌ Email or password missing');
          throw new Error('Email and Password not found');
        }

        await connectDB();
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          throw new Error('user not found please signup');
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
          throw new Error('Incorrect Password');
        }
        // Any object returned will be saved in `user` property of the JWT
        // If you return null then an error will be displayed advising the user to check their details.
        // you can also reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter

        return {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser?.image,
        };
      },
    }),

    //? Google login
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider == 'google') {
        await connectDB();
        let existUser = await User.findOne({ email: user?.email });
        if (!existUser) {
          existUser = await User.create({
            name: user.name,
            email: user.email,
          });
        }
        user.id = existUser._id as string;
      }
      return true;
    },
    // callback mein functions  hote hai ,which is called while signin or signout etc funcs
    // token ke ander user details dal rahe
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },

    // session ke andr user dalenge
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  session: {
    // session kaise show krna hai , hm ye try kr rhe
    // first token ke andr data [means new user details] daal denge,
    // fir token , session m daal denge ... so we can use that session in frontend
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
  pages: {
    //  for example we create any custom login page
    // so in that page we use next js signin and singout func
    // and if we found any error in that funcs so where u want to redirect
    signIn: '/login',
    error: '/login',
  },
  // like we create any jwt secret type secret here
  secret: process.env.NEXT_AUTH_SECRET,
};

export default authOptions;
