import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import { db } from "@/lib/db";

const prisma = new PrismaClient()


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? ""
    }),
    // Passwordless / email sign in
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        //@ts-ignore
        session.user.id = token.id ;
        //@ts-ignore
        session.user.name = token.name;
        //@ts-ignore
        session.user.email = token.email;
        //@ts-ignore
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {

      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  
}