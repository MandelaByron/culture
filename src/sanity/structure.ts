import type {StructureResolver} from 'sanity/structure'
import {BookIcon} from '@sanity/icons/Book'
import {CogIcon} from '@sanity/icons/Cog'
import {HomeIcon} from '@sanity/icons/Home'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {TagIcon} from '@sanity/icons/Tag'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage').title('Home Page')),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType('aboutPage').documentId('aboutPage').title('About Page')),
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings'),
        ),
      S.divider(),
      S.listItem()
        .title('Categories')
        .icon(TagIcon)
        .schemaType('category')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Stories')
        .icon(BookIcon)
        .schemaType('story')
        .child(
          S.documentTypeList('story')
            .title('Stories')
            .defaultOrdering([{field: 'date', direction: 'desc'}]),
        ),
    ])
