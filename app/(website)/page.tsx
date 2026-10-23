import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {FEATURED_PROJECTS_QUERY, SITE_SETTINGS_QUERY} from '@/sanity/lib/queries'
import {ProjectGrid} from '@/components/project-grid'

export default function HomePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-6 py-16">
      <Hero />
      <FeaturedProjects />
    </main>
  )
}

async function Hero() {
  'use cache'
  const {data: settings} = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    perspective: 'published',
    stega: false,
  })

  return (
    <section>
      <h1 className="text-4xl font-bold sm:text-5xl">Dave Churilla</h1>
      <p className="mt-2 text-xl opacity-80">{settings?.headline ?? 'Senior Web Developer'}</p>
      {settings?.intro && <p className="mt-6 max-w-2xl text-lg">{settings.intro}</p>}
      <p className="mt-8 flex gap-4">
        <Link href="/projects" className="rounded bg-foreground px-5 py-2 text-background">
          View my work
        </Link>
        <Link href="/contact" className="rounded border px-5 py-2">
          Get in touch
        </Link>
      </p>
    </section>
  )
}

async function FeaturedProjects() {
  'use cache'
  const {data: projects} = await sanityFetch({
    query: FEATURED_PROJECTS_QUERY,
    perspective: 'published',
    stega: false,
  })
  if (!projects.length) return null

  return (
    <section className="mt-16" aria-labelledby="featured-heading">
      <h2 id="featured-heading" className="text-2xl font-semibold">
        Featured work
      </h2>
      <ProjectGrid projects={projects} />
    </section>
  )
}
