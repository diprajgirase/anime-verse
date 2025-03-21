import NextAuth, { NextAuthOptions, RequestInternal } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prismaClient'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name?: string | null
    description?: string | null
  }

  interface Session {
    user: User
  }

  interface JWT {
    id?: string
    email?: string
    name?: string | null
  }
}

// Credentials type
interface UserCredentials {
  username: string
  email: string
  password: string
  image: string
}

// NextAuth Configuration
const authConfig: NextAuthOptions = {
  // debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-ignore
      async authorize(
        credentials: Record<'email' | 'username' | 'password', string> | undefined,
        req: Pick<RequestInternal, 'query' | 'body' | 'headers' | 'method'>,
      ) {
        try {
          if (!credentials) return null
          const { email, password, username, image } = credentials as UserCredentials

          // Validate input
          if (!email || !password) {
            throw new Error('Email and password are required')
          }

          // Find existing user
          let user = await prisma.user.findUnique({
            where: { email },
          })

          // If no user, create a new one
          if (!user) {
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10)
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            user = await prisma.user.create({
              data: {
                email,
                password: hashedPassword,
                name: username,
                image: image,
                description: 'Welcome to Anime World!',
              },
            })
          } else {
            // Verify password for existing user
            const isPasswordValid = await bcrypt.compare(password, user.password || '')

            if (!isPasswordValid) {
              throw new Error('Invalid email or password')
            }
          }

          return user
            ? {
                ...user,
                email: user.email,
              }
            : null
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }

      // Handle manual session updates
      if (trigger === 'update') {
        token = { ...token, ...session }
      }

      return token
    },
    async session({ session, token }) {
      // Add user details to session
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string | null
      }
      return session
    },
  },
  events: {
    async signIn(message) {
      console.log('Successful sign-in', {
        user: message.user,
        account: message.account,
      })
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
