import User from '@/app/model/user.model';
import authOptions from '@/lib/auth';
import connectDb from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);
    // console.log('Session in /api/user:', session);

    if (!session || !session.user.email || !session.user.id) {
      return NextResponse.json(
        { message: 'user does not have session' },
        { status: 400 }
      );
    }

    // console.log('Looking for user with ID:', session.user.id);
    const user = await User.findById(session.user.id).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'user not found' }, { status: 400 });
    }

    // console.log('User found:', user.email);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `user get error ${error}` },
      { status: 500 }
    );
  }
}
