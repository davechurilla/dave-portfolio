import type {MetadataRoute} from 'next'
import {sanityFetchPublished} from '@/sanity/lib/live'
import {PROJECT_SLUGS_QUERY} from '@/sanity/lib/queries'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio.davechurilla.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {data: projects} = await sanityFetchPublished({query: PROJECT_SLUGS_QUERY})
  const pages = ['', '/projects', '/about', '/contact'].map((path) => ({url: `${siteUrl}${path}`}))
  return [...pages, ...projects.map((p) => ({url: `${siteUrl}/projects/${p.slug}`}))]
}
