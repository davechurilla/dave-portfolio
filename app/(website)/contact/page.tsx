import type {Metadata} from 'next'
import {ContactForm} from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Dave Churilla about roles and projects.',
}

export default function ContactPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-xl px-6 py-16">
      <h1 className="text-4xl font-bold">Contact</h1>
      <p className="mt-3 opacity-80">
        Interested in working together? Send a message and I&apos;ll get back to you.
      </p>
      <ContactForm />
    </main>
  )
}
