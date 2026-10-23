'use client'

import {useActionState} from 'react'
import {sendContactMessage, type ContactState} from '@/app/(website)/contact/actions'

const initialState: ContactState = {status: 'idle'}

const fieldClass = 'mt-1 w-full rounded border bg-transparent px-3 py-2'

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initialState)

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input id="name" name="name" required maxLength={100} autoComplete="name" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className={fieldClass}
        />
      </div>
      {/* Honeypot field, hidden from people and assistive tech. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-foreground px-5 py-2 text-background disabled:opacity-60"
      >
        {pending ? 'Sending…' : 'Send message'}
      </button>
      <p role="status" className={state.status === 'error' ? 'text-red-600' : ''}>
        {state.message}
      </p>
    </form>
  )
}
