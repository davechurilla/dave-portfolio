import type {StructureResolver} from 'sanity/structure'

// Document types that should only ever have one document
export const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
      S.divider(),
      // Everything else, minus the singletons
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() ?? '')
      ),
    ])