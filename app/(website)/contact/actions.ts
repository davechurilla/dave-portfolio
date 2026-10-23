'use server'

import {Resend} from 'resend'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real users never fill this in.
  if (formData.get('website')) return {status: 'success', message: 'Thanks, message sent.'}

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !EMAIL_PATTERN.test(email) || message.length < 10) {
    return {status: 'error', message: 'Please enter your name, a valid email, and a message.'}
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return {status: 'error', message: 'One of the fields is too long.'}
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>'
  if (!apiKey || !to) {
    return {status: 'error', message: 'The contact form is not configured yet.'}
  }

  const resend = new Resend(apiKey)
  const {error} = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  if (error) {
    return {status: 'error', message: 'Something went wrong sending your message. Please try again.'}
  }
  return {status: 'success', message: 'Thanks, your message has been sent.'}
}
