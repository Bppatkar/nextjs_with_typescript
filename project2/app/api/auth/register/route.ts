import User from '@/app/model/user.model';
import connectDB from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exist' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
    });
    return NextResponse.json(
      {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        message: 'User Created Successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    NextResponse.json(
      { message: 'Error while creating user' },
      { status: 500 }
    );
  }
}
