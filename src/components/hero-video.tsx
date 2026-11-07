type HeroVideoProps = {
  /** Direct URL to the video file (mp4, webm, etc.) */
  src: string
  /** Accessible label describing the video content */
  label?: string
  /** Optional poster image */
  poster?: string
}

/**
 * Full-viewport video hero.
 *
 * Sits flush with the top of the page — the fixed navbar floats over it
 * naturally via its own z-50. Gradients ensure navbar legibility at the top
 * and blend smoothly into the dark grain background at the bottom.
 */
export function HeroVideo({src, label = 'Hero video', poster}: HeroVideoProps) {
  return (
    <section
      aria-label={label}
      className="relative h-svh w-full overflow-hidden"
    >
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Top subtle vignette for navbar contrast */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

      {/* Bottom fade — blends the video edge into the dark page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#161616] to-transparent" />
    </section>
  )
}

export default HeroVideo

