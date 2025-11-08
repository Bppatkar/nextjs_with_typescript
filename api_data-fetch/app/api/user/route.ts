import { NextRequest, NextResponse } from 'next/server';

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  title?: string;
  message?: string;
  statusCode: number;
  data?: T;
}

interface UsersData {
  users: User[];
}

interface NewUser {
  name: string;
  email: string;
}

interface UpdateUser {
  id: number;
  name?: string;
  email?: string;
}

export async function GET(): Promise<NextResponse<ApiResponse<UsersData>>> {
  const payload: ApiResponse<UsersData> = {
    title: 'Data',
    statusCode: 200,
    data: {
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
      ],
    },
  };
  return NextResponse.json(payload, { status: 200 });
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
];

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ user: User }>>> {
  const body = (await request.json()) as NewUser;
  if (!body?.name || !body?.email) {
    return NextResponse.json(
      { message: 'Invalid Input', statusCode: 400 },
      { status: 400 }
    );
  }
  const newUser: User = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name: body.name,
    email: body.email,
  };
  users.push(newUser);

  return NextResponse.json(
    {
      message: 'User created successfully',
      statusCode: 201,
      data: { user: newUser },
    },
    { status: 201 }
  );
}

export async function PUT(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ user: User }>>> {
  const { id, name, email } = (await request.json()) as UpdateUser;
  if (!id) {
    return NextResponse.json(
      {
        message: 'Missing Id',
        statusCode: 400,
      },
      { status: 400 }
    );
  }
  const updatedUser: User = {
    id,
    name: name || 'Unknown',
    email: email || 'unknown@gmail.com',
  };
  return NextResponse.json(
    {
      message: 'User Updated Successfully',
      statusCode: 200,
      data: { user: updatedUser },
    },
    { status: 200 }
  );
}

export async function DELETE(): Promise<NextResponse<ApiResponse<null>>> {
  return NextResponse.json(
    {
      message: 'User deleted successfully',
      statusCode: 200,
    },
    { status: 200 }
  );
}
