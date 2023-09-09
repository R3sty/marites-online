import { db } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { nanoid } from 'nanoid'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Define authentication options for NextAuth
export const authOptions: NextAuthOptions = {
  // Set Prisma as the adapter for NextAuth, connecting it to your database
  adapter: PrismaAdapter(db),
  
  // Define how sessions should be handled; here, using JSON Web Tokens (JWT)
  session: {
    strategy: 'jwt',
  },
  
  // Define custom path for the sign-in page
  pages: {
    signIn: '/sign-in',
  },
  
  // Define the providers for authentication; in this case, Google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  // Define callback functions to manage auth flow
  callbacks: {
    // Define how session data should be handled and populated
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }

      return session
    },

    // Define how JSON Web Tokens (JWT) should be created and handled
    async jwt({ token, user }) {
      // Look for an existing user in the database with the same email
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      // If no existing user is found, set the ID in the token
      if (!dbUser) {
        token.id = user!.id
        return token
      }

      // If the user exists but has no username, create a new username for them
      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
        })
      }

      // Return a token with the user's data
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      }
    },
    
    // Define the URL to redirect to after sign-in or sign-out
    redirect() {
      return '/'
    },
  },
}

// Export a function to get the authentication session in the server
export const getAuthSession = () => getServerSession(authOptions)
