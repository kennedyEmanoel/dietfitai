import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function invalidData() {
  return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      role,
      sex,
      height,
      weight,
      age,
      PhysicalActivity,
      Objective,
    } = await request.json();

    if (
      typeof name !== "string" ||
      name.trim() ||
      typeof email !== "string" ||
      email.trim() ||
      typeof password !== "string" ||
      password.trim() ||
      typeof role !== "string" ||
      role.trim()
    ) {
      invalidData();
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        sex,
        height,
        weight,
        age,
        PhysicalActivity,
        Objective,
      },
    });
    return NextResponse.json(
      { message: "User adicionado com sucesso!", newUser },
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

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Nenhum user cadastrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json(
      { message: "Erro ao buscar users" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { message: "Campo 'id' inválido ou ausente." },
        { status: 400 }
      );
    }

    const deleteUser = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: `User '${deleteUser.name}' removido com sucesso!` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no DELETE:", error);
    return NextResponse.json(
      { message: "Erro ao deletar user" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, password } = await request.json();

    if (
      !id ||
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof password !== "string" ||
      password.trim() === ""
    ) {
      invalidData();
    }

    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        password,
      },
    });

    return NextResponse.json(
      { message: "User atualizado com sucesso!", user: updateUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no PUT:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar user" },
      { status: 500 }
    );
  }
}
