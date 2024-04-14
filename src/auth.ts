import NextAuth from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Pool } from '@neondatabase/serverless'

const neon = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({ adapter })

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
  session: {
    strategy: 'jwt',
  },
})
