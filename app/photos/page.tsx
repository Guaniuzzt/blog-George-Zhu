import Image, { type StaticImageData } from 'next/image'
import dog1 from './../../public/images/dog1.png'
import dog2 from './../../public/images/dog2.png'
import dog3 from './../../public/images/dog3.png'
import dog4 from './../../public/images/dog4.png'
import H1 from '@/components/h1'
import { MotionItem } from '@/components/page-transition'
import { getTranslation } from '@/lib/i18n'
import useServerLanguage from '@/hooks/use-server-language'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photos',
}

interface Photo {
  src: StaticImageData
  alt: string
  label: string
}

const photos: Photo[] = [
  { src: dog1, alt: 'My dog - photo 1', label: 'Good Boy #1' },
  { src: dog2, alt: 'My dog - photo 2', label: 'Good Boy #2' },
  { src: dog3, alt: 'My dog - photo 3', label: 'Good Boy #3' },
  { src: dog4, alt: 'My dog - photo 4', label: 'Good Boy #4' },
]

export default function PhotosPage() {
  const lang = useServerLanguage()
  const dict = getTranslation(lang) as Record<string, string>
  const t = (key: string): string => dict[key] || key

  return (
    <div>
      <H1>{t('photos.title')}</H1>

      <MotionItem delay={0.1}>
        <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
          {t('photos.desc')}
        </p>
      </MotionItem>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {photos.map((photo, i) => (
          <MotionItem key={i} delay={0.1 * i}>
            <div className="group relative h-72 rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent)]/30 transition-all duration-500">
              <Image
                fill
                src={photo.src}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                alt={photo.alt}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={i < 2}
                quality={50}
                placeholder="blur"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="text-white text-sm font-['Clash_Display'] font-medium">
                  {photo.label}
                </span>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/60 rounded-tr-lg transition-all duration-500" />
            </div>
          </MotionItem>
        ))}
      </div>
    </div>
  )
}