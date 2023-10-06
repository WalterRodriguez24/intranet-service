import { User } from "@/domain/user/server";
import db from "@/persistence/server";
import { comparePassword, hashPassword } from "@/shared/server/auth/security";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      username: true,
      first_name: true,
      last_name: true,
      password: true,
      email: true,
      user_role: {
        select: {
          name: true,
        },
      },
      job_title: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!user) throw new Error("Invalid email");

  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  return {
    id: user.id,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.user_role.name,
    jobTitle: user.job_title.name,
  };
}

type UserDto = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  roleId: number;
  jobTitleId: number;
};

export async function register(user: UserDto): Promise<User> {
  const { email, password, username, firstName, jobTitleId, lastName, roleId } =
    user;

  const userExists = await db.user.findUnique({ where: { email } });

  if (userExists) throw new Error("User already exists");

  const passwordHash = await hashPassword(password);

  const newUser = await db.user.create({
    data: {
      email,
      password: passwordHash,
      username,
      first_name: firstName,
      last_name: lastName,
      role_id: roleId,
      job_title_id: jobTitleId,
    },
    select: {
      id: true,
      username: true,
      first_name: true,
      last_name: true,
      email: true,
      user_role: {
        select: {
          name: true,
        },
      },
      job_title: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    id: newUser.id,
    username: newUser.username,
    firstName: newUser.first_name,
    lastName: newUser.last_name,
    email: newUser.email,
    role: newUser.user_role.name,
    jobTitle: newUser.job_title.name,
  };
}
