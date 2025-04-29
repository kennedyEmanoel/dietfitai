import { NextRequest, NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";

interface Food {
  id: string;
  nameFood: string;
  protein: number;
  carbohydrate: number;
  fat: number;
}

const foods: Food[] = [];

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

    const newFood: Food = {
      id: uuidv4(),
      nameFood,
      protein,
      carbohydrate,
      fat,
    };

    foods.push(newFood);

    return NextResponse.json(
      { message: "Alimento adicionado com sucesso!", foods },
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
    const { nameFood } = await request.json();

    if (!nameFood || typeof nameFood !== "string") {
      return NextResponse.json(
        { message: "Campo 'nameFood' inválido ou ausente." },
        { status: 400 }
      );
    }

    const index = foods.findIndex((food) => food.nameFood === nameFood);

    if (index === -1) {
      return NextResponse.json(
        { message: "Alimento não encontrado." },
        { status: 404 }
      );
    }

    foods.splice(index, 1);

    return NextResponse.json(
      { message: `Alimento '${nameFood}' removido com sucesso!`, foods },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json(
      { message: "Erro ao deletar o alimento" },
      { status: 500 }
    );
  }
}

export async function PUT(response: NextResponse) {
  try {
    const { id, nameFood, protein, carbohydrate, fat } = await response.json();

    if (
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

    const index = foods.findIndex((food) => food.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Alimento não encontrado." },
        { status: 404 }
      );
    }

    foods[index] = {
      id,
      nameFood,
      protein,
      carbohydrate,
      fat,
    };

    return NextResponse.json(
      { message: "Alimento atualizado com sucesso!", foods },
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
