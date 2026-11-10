import StoryCards, {type StoryCardItem} from '@/components/story-cards'

export type FeaturedStoryCard = StoryCardItem

type FeaturedStoriesProps = {
  items: FeaturedStoryCard[]
  heading?: string
}

/**
 * FeaturedStories reuses the centralized StoryCards component to keep card rendering DRY.
 */
export function FeaturedStories({items, heading = 'Featured Stories'}: FeaturedStoriesProps) {
  return <StoryCards items={items} heading={heading} />
}

export default FeaturedStories
