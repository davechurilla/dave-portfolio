import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {PROJECTS_QUERY} from '@/sanity/lib/queries'
import {ProjectGrid} from '@/components/project-grid'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Case studies of websites and CRM email campaigns.',
}

const CATEGORIES = [
  {value: 'websites', title: 'Websites'},
  {value: 'crm-emails', title: 'CRM Emails'},
]

export default function ProjectsPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold">Work</h1>
      <p className="mt-3 max-w-2xl opacity-80">
        Much of this work is under NDA or from campaigns that have since ended, so these are
        written case studies rather than live links.
      </p>
      <ProjectSections />
    </main>
  )
}

async function ProjectSections() {
  'use cache'
  const {data: projects} = await sanityFetch({
    query: PROJECTS_QUERY,
    perspective: 'published',
    stega: false,
  })

  return (
    <>
      {CATEGORIES.map(({value, title}) => {
        const items = projects.filter((p) => p.category === value)
        if (!items.length) return null
        return (
          <section key={value} className="mt-12" aria-labelledby={`${value}-heading`}>
            <h2 id={`${value}-heading`} className="text-2xl font-semibold">
              {title}
            </h2>
            <ProjectGrid projects={items} />
          </section>
        )
      })}
    </>
  )
}
