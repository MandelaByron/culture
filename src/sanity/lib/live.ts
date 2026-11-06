// Querying with "sanityFetch" will keep content automatically updated.
// Render "<SanityLive />" in the root layout.
// https://github.com/sanity-io/next-sanity#live-content-api


import {defineLive} from 'next-sanity/live'
import {client} from './client'
import {token} from './token'

export const {SanityLive, sanityFetch} = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
