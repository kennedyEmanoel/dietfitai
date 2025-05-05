import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function invalidData() {
  return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
}

// type Roles = "ADMIN" | "USER";
// type Sexs = "MASCULINO" | "FEMININO";
// type PA = "SEDENTARIO" | "MODERADO" | "INTENSO";
// type Objective = "EMAGRECER" | "MANTER" | "GANHAR_MASSA";

// function isValidRole(role: unknown): role is Roles {
//   const allowedRoles: Roles[] = ["ADMIN", "USER"];
//   return typeof role === "string" && allowedRoles.includes(role as Roles);
// }

// function isValidSex(sex: unknown): sex is Sexs {
//   const allowedSexs: Sexs[] = ["MASCULINO", "FEMININO"];
//   return typeof sex === "string" && allowedSexs.includes(sex as Sexs);
// }

// function isValidPA(pa: unknown): pa is PA {
//   const allowedPA: PA[] = ["SEDENTARIO", "MODERADO", "INTENSO"];
//   return typeof pa === "string" && allowedPA.includes(pa as PA);
// }
// function isValidObjective(objective: unknown): objective is Objective {
//   const allowedObjective: Objective[] = ["EMAGRECER", "MANTER", "GANHAR_MASSA"];
//   return (
//     typeof objective === "string" &&
//     allowedObjective.includes(objective as Objective)
//   );
// }

// type UserInput = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
//   role: "USER" | "ADMIN";
//   sex?: "MASCULINO" | "FEMININO";
//   height?: number;
//   weight?: number;
//   age?: number;
//   PhysicalActivity?: "SEDENTARIO" | "MODERADO" | "INTENSO";
//   Objective?: "EMAGRECER" | "MANTER" | "GANHAR_MASSA";
//   BMR?: number;
//   TDEE?: number;
//   RCI?: number;
// };

// function isValidUserInput(obj: unknown): obj is UserInput {
//   if (typeof obj !== "object" || obj === null) {
//     return false;
//   }

//   const user = obj as Partial<UserInput>;

//   const required = ["id", "name", "email", "password", "role"] as const;

//   for (const field of required) {
//     if (
//       typeof user[field] !== "string" ||
//       (user[field] as string).trim() === ""
//     ) {
//       return false;
//     }
//   }

//   if (user.sex !== undefined && typeof user.sex !== "string") return false;
//   if (user.height !== undefined && typeof user.height !== "number")
//     return false;
//   if (user.weight !== undefined && typeof user.weight !== "number")
//     return false;
//   if (user.age !== undefined && typeof user.age !== "number") return false;
//   if (
//     user.PhysicalActivity !== undefined &&
//     typeof user.PhysicalActivity !== "string"
//   )
//     return false;
//   if (user.Objective !== undefined && typeof user.Objective !== "string")
//     return false;

//   return true;
// }

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
