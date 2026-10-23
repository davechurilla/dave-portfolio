import {type QueryParams} from 'next-sanity'
import {defineLive} from 'next-sanity/live'
import {client} from './client'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  throw new Error('Missing SANITY_API_TOKEN')
}

export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  strict: true,
})

// Cached published-only fetch for generateStaticParams, generateMetadata and sitemap.
export async function sanityFetchPublished<const Q extends string>({
  query,
  params = {},
}: {
  query: Q
  params?: QueryParams
}) {
  'use cache'
  const {data} = await sanityFetch({query, params, perspective: 'published', stega: false})
  return {data}
}
