import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });

    return NextResponse.json(
      { message: "User adicionado com sucesso!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no POST:", error);
    return NextResponse.json(
      { message: "Erro ao processar o user" },
      { status: 400 }
    );
  }
}
