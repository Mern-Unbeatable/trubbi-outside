import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SCROLL_REVEAL_ONCE } from '../../hooks/useLandingAnimations'
import {
  galleryLarge,
  galleryMedium,
  galleryNarrow,
  galleryTall,
  galleryWide,
} from '../../assets/landing'

const galleryImages = {
  galleryWide,
  galleryNarrow,
  galleryTall,
  galleryMedium,
  galleryLarge,
}

function GalleryTile({ imageKey, className = '' }) {
  return (
    <div
      className={`gallery-item shrink-0 overflow-hidden rounded-3xl ${className}`}
    >
      <img
        src={galleryImages[imageKey]}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  )
}

function GalleryBentoUnit({ clone = false, primary = false }) {
  return (
    <div
      className={`gallery-bento flex shrink-0 gap-[30px]${primary ? ' gallery-bento-primary' : ''}`}
      aria-hidden={clone}
    >
      <div className="flex w-[1148px] flex-col gap-[22px]">
        <div className="flex gap-[30px]">
          <GalleryTile
            imageKey="galleryWide"
            className="h-[309px] w-[709px]"
          />
          <GalleryTile
            imageKey="galleryNarrow"
            className="h-[309px] w-[409px]"
          />
        </div>

        <div className="flex gap-[26px]">
          <GalleryTile
            imageKey="galleryMedium"
            className="h-[309px] w-[464px]"
          />
          <GalleryTile
            imageKey="galleryLarge"
            className="h-[309px] w-[658px]"
          />
        </div>
      </div>

      <GalleryTile
        imageKey="galleryTall"
        className="h-[640px] w-[748px]"
      />
    </div>
  )
}

export default function GalleryMarquee() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const track = trackRef.current
      if (!track) return

      const units = gsap.utils.toArray('.gallery-bento', track)
      if (units.length < 2) return

      const distance = track.scrollWidth / 2

      gsap.set(track, { force3D: true })

      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -distance,
          duration: 120,
          repeat: -1,
          ease: 'none',
        },
      )
    },
    { scope: sectionRef },
  )

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.gallery-bento-primary .gallery-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          ...SCROLL_REVEAL_ONCE,
        },
        autoAlpha: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.04,
        ease: 'power2.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-bg-primary py-10 lg:py-16"
    >
      <div className="gallery-viewport relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="h-[333px] overflow-hidden md:h-[397px] lg:h-[525px] min-[1440px]:h-auto">
          <div className="origin-top-left scale-[0.52] max-[767px]:origin-top-left sm:scale-[0.62] lg:scale-[0.82] min-[1440px]:scale-100">
            <div
              ref={trackRef}
              className="gallery-track flex w-max items-start gap-[30px] will-change-transform"
            >
              <GalleryBentoUnit primary />
              <GalleryBentoUnit clone />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
