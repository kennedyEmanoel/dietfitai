import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { nameFood, protein, carbohydrate, fat } = await request.json();

    if (
      !nameFood ||
      typeof nameFood !== "string" ||
      typeof protein !== "number" ||
      typeof carbohydrate !== "number" ||
      typeof fat !== "number"
    ) {
      return NextResponse.json(
        { message: "Dados inválidos." },
        { status: 400 }
      );
    }

    const newFood = await prisma.food.create({
      data: {
        nameFood,
        protein,
        carbohydrate,
        fat,
      },
    });

    return NextResponse.json(
      { message: "Alimento adicionado com sucesso!", food: newFood },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no POST:", error);
    return NextResponse.json(
      { message: "Erro ao processar o alimento" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const foods = await prisma.food.findMany();

    if (foods.length === 0) {
      return NextResponse.json(
        { message: "Nenhum alimento cadastrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ foods }, { status: 200 });
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json(
      { message: "Erro ao buscar alimentos" },
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

    const deleteFood = await prisma.food.delete({
      where: { id },
    });

    if (!deleteFood) {
      return NextResponse.json(
        { message: "Alimento não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Alimento '${deleteFood.nameFood}' removido com sucesso!` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no DELETE:", error);
    return NextResponse.json(
      { message: "Erro ao deletar alimento" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, nameFood, protein, carbohydrate, fat } = await request.json();

    if (
      !id ||
      !nameFood ||
      typeof nameFood !== "string" ||
      typeof protein !== "number" ||
      typeof carbohydrate !== "number" ||
      typeof fat !== "number"
    ) {
      return NextResponse.json(
        { message: "Dados inválidos. Verifique os campos." },
        { status: 400 }
      );
    }

    const updatedFood = await prisma.food.update({
      where: { id },
      data: {
        nameFood,
        protein,
        carbohydrate,
        fat,
      },
    });

    return NextResponse.json(
      { message: "Alimento atualizado com sucesso!", food: updatedFood },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no PUT:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar alimento" },
      { status: 500 }
    );
  }
}
