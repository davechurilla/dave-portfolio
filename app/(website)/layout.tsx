import {SanityLive} from '@/sanity/lib/live'
import {SiteHeader} from '@/components/site-header'
import {SiteFooter} from '@/components/site-footer'

export default function WebsiteLayout({children}: LayoutProps<'/'>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
      <SanityLive includeDrafts={false} />
    </>
  )
}
