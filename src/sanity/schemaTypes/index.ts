import {type SchemaTypeDefinition} from 'sanity'

import {aboutPage} from './aboutPage'
import {accessibleImage} from './accessibleImage'
import {category} from './category'
import {homePage} from './homePage'
import {siteSettings} from './siteSettings'
import {story} from './story'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [accessibleImage, category, story, homePage, aboutPage, siteSettings],
}

export const singletonTypes = new Set(['homePage', 'aboutPage', 'siteSettings'])
