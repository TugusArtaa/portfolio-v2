import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/sso/safe-access-admin-entry/A7kz9QpL",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "github") {
          const allowedGithubUsers = ["TugusArtaa", "2215323039@pnb.ac.id"];

          const isAllowed =
            allowedGithubUsers.includes(user.email!) ||
            allowedGithubUsers.includes(
              (profile as { login?: string })?.login!
            );

          if (!isAllowed) {
            console.log(
              "GitHub user not allowed:",
              user.email,
              (profile as { login?: string })?.login
            );
            return false;
          }

          try {
            await prisma.user.upsert({
              where: { email: user.email! },
              update: {
                name: user.name,
                image: user.image,
              },
              create: {
                email: user.email!,
                name: user.name,
                image: user.image,
              },
            });
          } catch (dbError) {
            console.error("Database error:", dbError);
            return false;
          }
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
