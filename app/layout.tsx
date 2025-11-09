export const metadata = {
  title: 'Invoice Analytics Dashboard',
  description: 'Analytics dashboard for invoice management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{margin: 0, fontFamily: 'system-ui, sans-serif'}}>{children}</body>
    </html>
  )
}