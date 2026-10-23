import type {Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {sanityFetch, sanityFetchPublished} from '@/sanity/lib/live'
import {PROJECT_QUERY, PROJECT_SLUGS_QUERY} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import {CaseStudyBody} from '@/components/portable-text'

type Props = {params: Promise<{slug: string}>}

export async function generateStaticParams() {
  const {data} = await sanityFetchPublished({query: PROJECT_SLUGS_QUERY})
  return data
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const {data: project} = await sanityFetchPublished({query: PROJECT_QUERY, params: {slug}})
  return {title: project?.title, description: project?.summary}
}

export default async function ProjectPage({params}: Props) {
  const {slug} = await params
  return <CachedProject slug={slug} />
}

async function CachedProject({slug}: {slug: string}) {
  'use cache'
  const {data: project} = await sanityFetch({
    query: PROJECT_QUERY,
    params: {slug},
    perspective: 'published',
    stega: false,
  })

  if (!project) notFound()

  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold">{project.title}</h1>
      <p className="mt-2 opacity-70">
        {[project.client, project.role, project.year].filter(Boolean).join(' · ')}
      </p>

      {project.confidential && (
        <p className="mt-4 rounded border px-4 py-3 text-sm">
          Details are limited under a confidentiality agreement.
        </p>
      )}

      {project.coverImage?.asset && (
        <Image
          src={urlFor(project.coverImage).width(1200).height(675).fit('crop').url()}
          alt={project.coverImage.alt ?? ''}
          width={1200}
          height={675}
          sizes="(min-width: 768px) 768px, 100vw"
          className="mt-8 w-full rounded-lg"
          priority
        />
      )}

      <p className="mt-8 text-lg">{project.summary}</p>

      {project.technologies?.length ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li key={t._id} className="rounded-full border px-3 py-1 text-sm">
              {t.name}
            </li>
          ))}
        </ul>
      ) : null}

      {project.outcomes?.length ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Highlights</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {project.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.body ? (
        <section className="mt-10 space-y-4">
          <CaseStudyBody value={project.body} />
        </section>
      ) : null}

      {project.gallery?.length ? (
        <section className="mt-12 grid gap-6 sm:grid-cols-2">
          {project.gallery.map((img) => {
            if (!img.asset || !img.dimensions) return null
            const width = 800
            const height = Math.round((width * img.dimensions.height) / img.dimensions.width)
            return (
              <figure key={img._key}>
                <Image
                  src={urlFor(img).width(width).url()}
                  alt={img.alt ?? ''}
                  width={width}
                  height={height}
                  sizes="(min-width: 768px) 372px, 100vw"
                  className="w-full rounded-lg"
                />
                {img.caption && (
                  <figcaption className="mt-2 text-sm opacity-70">{img.caption}</figcaption>
                )}
              </figure>
            )
          })}
        </section>
      ) : null}

      {project.links?.length ? (
        <ul className="mt-10 space-y-1">
          {project.links.map((l) => (
            <li key={l.url}>
              <a href={l.url} className="underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}