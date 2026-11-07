import BeautifulPeople from '@/components/beautiful_people'
import FeaturedStory from '@/components/featurestory'
import Hero from '@/components/hero'
import ImageBreak from '@/components/imagebreak'
import StoryCards from '@/components/story-cards'
import ViewAll from '@/components/viewall'
import {sanityFetch} from '@/sanity/lib/live'
import {
  toBeautifulPeoplePhotos,
  toFeaturedStory,
  toStoryCardItems,
} from '@/sanity/lib/mappers'
import {resolveAccessibleImage} from '@/sanity/lib/image'
import {HOME_PAGE_QUERY} from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'

export default async function Home(){
  const {data} = await sanityFetch({query: HOME_PAGE_QUERY})
  const home = data.home
  if (!home) notFound()
  const recentStories = toStoryCardItems(data?.recentStories)

  const hero = resolveAccessibleImage(home.heroImage, 2400)
  const featured = toFeaturedStory(home?.featuredStory, home?.featuredBackground)
  const beautifulPeoplePhotos = toBeautifulPeoplePhotos(home?.beautifulPeople?.photos)
  const imageBreak = resolveAccessibleImage(home.imageBreak, 2000)

  return (
    <main>
      {hero ? <Hero src={hero.src} alt={hero.alt} /> : null}
      <StoryCards items={recentStories} />
      <ViewAll />
      {featured ? <FeaturedStory story={featured} /> : null}
      <BeautifulPeople
        heading={home?.beautifulPeople?.heading ?? 'Beautiful People'}
        photos={beautifulPeoplePhotos}
      />
      {imageBreak ? (
        <ImageBreak
          src={imageBreak.src}
          alt={imageBreak.alt}
        />
      ) : null}
    </main>
  )
}
