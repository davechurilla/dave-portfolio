import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@/sanity/lib/image'
import type {PROJECTS_QUERY_RESULT} from '@/sanity.types'

export type CardProject = Omit<PROJECTS_QUERY_RESULT[number], 'technologies'>

export function ProjectCard({project}: {project: CardProject}) {
  const {coverImage} = project
  return (
    <article className="rounded-lg border p-5">
      {coverImage?.asset && (
        <Image
          src={urlFor(coverImage).width(800).height(450).fit('crop').url()}
          alt={coverImage.alt ?? ''}
          width={800}
          height={450}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="mb-4 w-full rounded"
        />
      )}
      <h3 className="text-xl font-semibold">
        <Link href={`/projects/${project.slug}`} className="hover:underline">
          {project.title}
        </Link>
      </h3>
      {project.client && <p className="mt-1 text-sm opacity-70">{project.client}</p>}
      {project.summary && <p className="mt-2 text-sm opacity-80">{project.summary}</p>}
    </article>
  )
}
