'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure, SINGLETONS} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  name: 'dave-portfolio',
  title: 'Dave Churilla Portfolio 2026',

  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],

  document: {
    // Hide singletons from the global "create new" menu
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((template) => !SINGLETONS.includes(template.templateId))
        : prev,
    // Remove actions that don't make sense for singletons
    actions: (prev, {schemaType}) =>
      SINGLETONS.includes(schemaType)
        ? prev.filter(
            ({action}) =>
              action && !['unpublish', 'delete', 'duplicate'].includes(action)
          )
        : prev,
  },
})