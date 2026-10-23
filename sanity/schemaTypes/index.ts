import { type SchemaTypeDefinition } from 'sanity'
import {siteSettingsType} from './siteSettings'
import {projectType} from './project'
import {technologyType} from './technology'
import {experienceType} from './experience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettingsType, projectType, technologyType, experienceType],
}
