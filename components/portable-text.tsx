import Image from 'next/image'
import {PortableText} from 'next-sanity'
import {urlFor} from '@/sanity/lib/image'

type BodyImage = {
  asset?: {_ref: string}
  alt?: string
  caption?: string
  dimensions?: {width: number; height: number} | null
}

export function CaseStudyBody({value}: {value: Parameters<typeof PortableText>[0]['value']}) {
  return (
    <PortableText
      value={value}
      components={{
        types: {
          image: ({value}: {value: BodyImage}) => {
            if (!value?.asset || !value.dimensions) return null
            const width = 1200
            const height = Math.round((width * value.dimensions.height) / value.dimensions.width)
            return (
              <figure className="my-8">
                <Image
                  src={urlFor(value).width(width).url()}
                  alt={value.alt ?? ''}
                  width={width}
                  height={height}
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="w-full rounded-lg"
                />
                {value.caption && (
                  <figcaption className="mt-2 text-sm opacity-70">{value.caption}</figcaption>
                )}
              </figure>
            )
          },
        },
      }}
    />
  )
}