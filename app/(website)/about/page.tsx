import type {Metadata} from 'next'
import {PortableText} from 'next-sanity'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {EXPERIENCE_QUERY, SITE_SETTINGS_QUERY, TECHNOLOGIES_QUERY} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, experience, and skills of Dave Churilla, Senior Web Developer.',
}

function formatMonth(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold">About</h1>
      <Bio />
      <Experience />
      <Skills />
    </main>
  )
}

async function Bio() {
  'use cache'
  const {data: settings} = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    perspective: 'published',
    stega: false,
  })
  if (!settings) return null

  return (
    <section className="mt-8">
      {settings.profileImage?.asset && (
        <Image
          src={urlFor(settings.profileImage).width(320).height(320).fit('crop').url()}
          alt={settings.profileImage.alt ?? ''}
          width={320}
          height={320}
          sizes="160px"
          className="mb-6 size-40 rounded-full object-cover"
        />
      )}
      <div className="space-y-4">{settings.bio && <PortableText value={settings.bio} />}</div>
      {settings.resumeUrl && (
        <p className="mt-6">
          <a href={`${settings.resumeUrl}?dl=`} className="underline">
            Download resume (PDF)
          </a>
        </p>
      )}
    </section>
  )
}

async function Experience() {
  'use cache'
  const {data: jobs} = await sanityFetch({
    query: EXPERIENCE_QUERY,
    perspective: 'published',
    stega: false,
  })
  if (!jobs.length) return null

  return (
    <section className="mt-14" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="text-2xl font-semibold">
        Experience
      </h2>
      <ol className="mt-6 space-y-8">
        {jobs.map((job) => (
          <li key={job._id}>
            <h3 className="text-lg font-semibold">
              {job.title} · {job.company}
            </h3>
            <p className="text-sm opacity-70">
              {formatMonth(job.startDate)} – {job.endDate ? formatMonth(job.endDate) : 'Present'}
              {job.location ? ` · ${job.location}` : ''}
            </p>
            {job.highlights?.length ? (
              <ul className="mt-3 list-disc space-y-1 pl-6">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

async function Skills() {
  'use cache'
  const {data: techs} = await sanityFetch({
    query: TECHNOLOGIES_QUERY,
    perspective: 'published',
    stega: false,
  })
  if (!techs.length) return null

  const groups = Map.groupBy(techs, (t) => t.category ?? 'Other')

  return (
    <section className="mt-14" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-2xl font-semibold">
        Skills
      </h2>
      <dl className="mt-6 space-y-4">
        {[...groups].map(([category, items]) => (
          <div key={category}>
            <dt className="text-sm font-medium capitalize opacity-70">{category}</dt>
            <dd className="mt-1">{items.map((t) => t.name).join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
