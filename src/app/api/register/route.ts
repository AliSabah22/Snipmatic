import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// Initialize Prisma Client with logging
// const prisma = new PrismaClient({
//   log: [
//     { emit: 'stdout', level: 'query' },
//     { emit: 'stdout', level: 'info' },
//     { emit: 'stdout', level: 'warn' },
//     { emit: 'stdout', level: 'error' },
//   ],
// });

// TEMPORARY DIAGNOSTIC: Hardcode DATABASE_URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:postgres@localhost:5432/Snipmatic",
    },
  },
  log: [
    { emit: 'stdout', level: 'query' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
    { emit: 'stdout', level: 'error' },
  ],
});

export async function POST(request: Request) {
  console.log("[REGISTER_API_ROUTELOADED_ENV_DATABASE_URL]", process.env.DATABASE_URL);
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Diagnostic log:
    console.log("[REGISTER_API_DATABASE_URL_USED]", process.env.DATABASE_URL);
    // You might also want to log the prisma client's internal datasource URL if accessible,
    // though process.env.DATABASE_URL is what it should be picking up.

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });

    // Don't send the password back in the response
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 