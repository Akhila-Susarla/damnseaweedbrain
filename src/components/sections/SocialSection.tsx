'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/layout/Section';
import { usePortfolioStore } from '@/lib/store';

gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'akhilasusarla@gmail.com';
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScbwr5UOd-Tn0W1GrY5MXrDtyZ1h0IIrYbHsnYiLaKeg3cv0g/formResponse';

function LinkedInSmall() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
function GitHubSmall() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>;
}

const contactLinks = [
  { platform: 'LinkedIn', label: 'Akhila Susarla', url: 'https://linkedin.com/in/akhila-susarla-1803b41b6/', Icon: LinkedInSmall },
  { platform: 'GitHub', label: 'akhilasusarla', url: 'https://github.com/akhilasusarla', Icon: GitHubSmall },
];

export default function SocialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', linkedin: '', message: '' });

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>('.contact-item');
      if (!els.length) return;
      gsap.set(els, { opacity: 1, x: 0 });
      if (reducedMotion) return;
      gsap.fromTo(els,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    const body = new FormData();
    body.append('entry.123965284', formData.name);
    body.append('entry.1235116438', formData.email);
    body.append('entry.1047666285', formData.message);
    if (formData.linkedin) {
      body.append('entry.1649072721', formData.linkedin);
    }

    try {
      await fetch(GOOGLE_FORM_ACTION, { method: 'POST', body, mode: 'no-cors' });
    } catch {
      // no-cors always "fails" but the form submits
    }
    setFormState('sent');
    setFormData({ name: '', email: '', linkedin: '', message: '' });
    setTimeout(() => setFormState('idle'), 3000);
  };

  return (
    <Section id="social" depth={4}>
      <div ref={containerRef} className="mx-auto max-w-[900px] px-4">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-heading text-3xl tracking-wide text-cream tablet:text-4xl desktop:text-5xl">
            Get in Touch
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-slate/25 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2">
          {/* Left: Direct contact — blue accent */}
          <div className="rounded-xl border border-slate/20 bg-slate/[0.04] backdrop-blur-sm p-6 tablet:p-8">
            <p className="mb-6 text-sm text-cream/50">
              Interested in working together? Feel free to reach out.
            </p>

            {/* Email — clipboard copy */}
            <div className="contact-item mb-4">
              <button
                onClick={handleCopyEmail}
                className="group flex w-full items-center gap-4 rounded-lg border border-slate/20 bg-slate/5 p-4 text-left transition-all duration-300 hover:border-orange/30 hover:bg-slate/10 cursor-none"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate/25 text-slate-light transition-all duration-300 group-hover:border-orange/40 group-hover:bg-orange/10 group-hover:text-orange">
                  {/* Gmail / mail icon */}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="flex flex-col">
                  <span className="font-nav text-[10px] uppercase tracking-widest text-slate/70">Email</span>
                  <span className="text-sm text-cream/70">{EMAIL}</span>
                </span>
                <span className="ml-auto rounded-full border border-slate/15 bg-slate/5 px-3 py-1 font-nav text-[10px] uppercase tracking-wider text-slate-light transition-all duration-300 group-hover:border-orange/30 group-hover:text-orange">
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>

            {/* Other links */}
            {contactLinks.map((link) => (
              <div key={link.platform} className="contact-item">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contact via ${link.platform}`}
                  className="group flex items-center gap-4 rounded-lg border border-transparent p-4 text-cream/70 transition-all duration-300 hover:border-slate/15 hover:bg-slate/5 hover:text-orange"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate/25 text-slate-light transition-all duration-300 group-hover:border-orange/40 group-hover:bg-orange/10 group-hover:text-orange">
                    <link.Icon />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-nav text-[10px] uppercase tracking-widest text-slate/70">{link.platform}</span>
                    <span className="text-sm">{link.label}</span>
                  </span>
                  <svg className="ml-auto h-4 w-4 text-cream/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          {/* Right: Custom form — orange accent */}
          <div className="rounded-xl border border-orange/15 bg-orange/[0.02] backdrop-blur-sm p-6 tablet:p-8">
            <h3 className="mb-2 font-nav text-sm font-semibold uppercase tracking-wider text-orange">
              Send a Message
            </h3>
            <p className="mb-6 text-sm text-cream/40">
              Drop me a note and I&apos;ll get back to you.
            </p>

            {formState === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange/10 text-orange">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-nav text-sm font-semibold text-orange">Message sent!</p>
                <p className="mt-1 text-sm text-cream/40">I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-cream/10 bg-base/40 px-4 py-3 font-nav text-sm text-cream placeholder:text-cream/25 transition-all duration-300 focus:border-orange/40 focus:outline-none focus:ring-1 focus:ring-orange/20"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-cream/10 bg-base/40 px-4 py-3 font-nav text-sm text-cream placeholder:text-cream/25 transition-all duration-300 focus:border-orange/40 focus:outline-none focus:ring-1 focus:ring-orange/20"
                  />
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="Your LinkedIn profile (optional)"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full rounded-lg border border-cream/10 bg-base/40 px-4 py-3 font-nav text-sm text-cream placeholder:text-cream/25 transition-all duration-300 focus:border-orange/40 focus:outline-none focus:ring-1 focus:ring-orange/20"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-lg border border-cream/10 bg-base/40 px-4 py-3 font-nav text-sm text-cream placeholder:text-cream/25 transition-all duration-300 focus:border-orange/40 focus:outline-none focus:ring-1 focus:ring-orange/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="group relative h-11 w-full overflow-hidden rounded-lg border border-orange/40 bg-orange/10 font-nav text-sm font-semibold uppercase tracking-wider text-orange transition-all duration-300 hover:bg-orange/20 hover:shadow-[0_0_20px_rgba(255,133,51,0.1)] disabled:opacity-50 cursor-none"
                >
                  {formState === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
