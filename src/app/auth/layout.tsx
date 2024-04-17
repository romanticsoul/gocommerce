import { ReactNode } from 'react'

export default function AuthLayout({
  children,
}: {
  params: { domain: string }
  children: ReactNode
}) {
  return children
}
