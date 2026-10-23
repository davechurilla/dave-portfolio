import {defineQuery} from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(sortOrder asc, year desc){
    _id, title, "slug": slug.current, summary, client, role, year,
    category, confidential, coverImage,
    "technologies": technologies[]->{_id, name}
  }
`)

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]{"slug": slug.current}
`)

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id, title, summary, client, role, year, category, confidential,
    coverImage, outcomes, links,
    gallery[]{
      ...,
      "dimensions": asset->metadata.dimensions
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        "dimensions": asset->metadata.dimensions
      }
    },
    "technologies": technologies[]->{_id, name, category}
  }
`)
export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && featured == true && defined(slug.current)] | order(sortOrder asc, year desc){
    _id, title, "slug": slug.current, summary, client, role, year,
    category, confidential, coverImage
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    siteTitle, headline, intro, bio, profileImage, contactEmail,
    "resumeUrl": resume.asset->url,
    socialLinks[]{_key, platform, url},
    seoDescription
  }
`)

export const EXPERIENCE_QUERY = defineQuery(`
  *[_type == "experience"] | order(startDate desc){
    _id, company, title, location, startDate, endDate, highlights,
    "technologies": technologies[]->{_id, name}
  }
`)

export const TECHNOLOGIES_QUERY = defineQuery(`
  *[_type == "technology"] | order(category asc, name asc){_id, name, category}
`)
