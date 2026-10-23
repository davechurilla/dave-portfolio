import Link from 'next/link'

const links = [
  {href: '/projects', label: 'Work'},
  {href: '/about', label: 'About'},
  {href: '/contact', label: 'Contact'},
]

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold">
          Dave Churilla
        </Link>
        <nav aria-label="Primary">
          <ul className="flex gap-5 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
