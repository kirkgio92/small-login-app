import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { dbConnection } from "../../../../utils/dbConnection";
import User from "../../../models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnection(); // Ensure DB connection is established

        const { username, password } = credentials;
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
          // Compare hashed password
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  strategy: "jwt",
  pages: {
    signIn: "/signIn",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.username = user.username;
        token.id = user._id;
        token.favorites = user.favorites;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      if (session.user) {
        session.user.username = token.username;
        session.user.id = token.id;
        session.user.favorites = token.favorites;
      }
      return session;
    },
  },
  // secret: process.env.NEXTAUTH_SECRET,
  async redirect({ url, baseUrl }) {
    console.log("NextAuth Redirect callback", {
      millis: Date.now(),
      url,
      baseUrl,
    });
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`;
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url;

    return baseUrl;
  },
};

export default NextAuth(authOptions);
