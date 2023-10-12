import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// import { login } from "@/application/user/server/use-case";
//validacion de datos
const USER_VALID_CREDENTIALS = { password: '123', email: "walter@gmail.com" };
const user_valid_jcu= {password:'1254' , email:"servicejcu@gmail.com"};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        // const user = await login({ email, password });
        const valid =
          USER_VALID_CREDENTIALS.password === password &&
          USER_VALID_CREDENTIALS.email === email;

        if (valid) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: '0',
            email: USER_VALID_CREDENTIALS.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/",
  },

  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
