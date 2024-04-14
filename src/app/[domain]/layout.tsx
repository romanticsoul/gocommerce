import { ReactNode } from 'react'

export default function SiteLayout({
  params,
  children,
}: {
  params: { domain: string }
  children: ReactNode
}) {
  const domain = decodeURIComponent(params.domain)

  return (
    <div>
      SUBDOMAIN {domain} PAGE {children}
    </div>
  )
}
