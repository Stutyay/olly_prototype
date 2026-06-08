import { useEffect, useRef, useState } from 'react'

const FAST_TRACK_REVIEWS = [
  { id: 1, text: 'Great food!', author: 'Priya M.', rating: 5 },
  { id: 2, text: 'Loved the ambiance', author: 'Rahul S.', rating: 5 },
  { id: 3, text: 'Quick service, will visit again', author: 'Ananya K.', rating: 5 },
]

const CUSTOMER_REVIEW =
  'Bad food taste and poor service. I asked for Puri they gave Bhature! Taste was very mediocre.'

const DRAFT_PARTS = {
  before: 'Hey Piyush! ',
  highlight: 'Sorry the pav and bhaji missed the mark.',
  after:
    " We'll fix it up, promise a tastier experience next time! Reach out to us at +91 12345 12345",
}

const FIX_SENTENCE = 'Sorry about the Puri Bhature mix-up — that was our mistake.'
const REGENERATED_SENTENCE =
  "We're sorry the taste and service didn't meet your expectations."

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg className="h-4 w-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.947c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.947a1 1 0 00-.364-1.118L2.287 9.374c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.947z" />
    </svg>
  )
}

function HighlightPopover({ onFix, onRegenerate, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="animate-fade-in absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[260px] -translate-x-1/2"
    >
      <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
        <p className="mb-2 px-2 pt-1 text-xs font-medium text-slate-500">Suggested fix</p>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={onFix}
            className="rounded-lg bg-sky-50 px-3 py-2 text-left text-sm font-medium text-sky-700 transition-colors hover:bg-sky-100"
          >
            Fix to: Puri Bhature
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            className="rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Regenerate sentence
          </button>
        </div>
      </div>
      <div className="mx-auto h-2 w-2 -translate-y-px rotate-45 border-b border-r border-slate-200 bg-white" />
    </div>
  )
}

function FastTrackSection() {
  const [approved, setApproved] = useState(false)

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">Fast Track</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            3 Standard Reviews Ready for Approval
          </h2>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          Auto-drafted
        </span>
      </div>

      <div className="mb-5 space-y-2">
        {FAST_TRACK_REVIEWS.map((review) => (
          <div
            key={review.id}
            className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
              {review.author.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">"{review.text}"</p>
              <p className="text-xs text-slate-400">{review.author}</p>
            </div>
            <div className="flex shrink-0 gap-0.5">
              {Array.from({ length: review.rating }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {approved ? (
        <div className="flex items-center justify-center gap-2 rounded-full bg-emerald-50 py-3.5 text-sm font-semibold text-emerald-700">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          All 3 replies sent
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setApproved(true)}
          className="w-full rounded-full bg-sky-600 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-[0.98]"
        >
          Approve &amp; Send All 3
        </button>
      )}
    </section>
  )
}

function NeedsReviewSection() {
  const [highlightText, setHighlightText] = useState(DRAFT_PARTS.highlight)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [justUpdated, setJustUpdated] = useState(false)

  function applyFix() {
    setHighlightText(FIX_SENTENCE)
    setIsFixed(true)
    setPopoverOpen(false)
    setJustUpdated(true)
    setTimeout(() => setJustUpdated(false), 600)
  }

  function applyRegenerate() {
    setHighlightText(REGENERATED_SENTENCE)
    setIsFixed(true)
    setPopoverOpen(false)
    setJustUpdated(true)
    setTimeout(() => setJustUpdated(false), 600)
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Needs Review</p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">Complex review — edit before sending</h2>
      </div>

      {/* Reviewer metadata */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
          NC
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Nikhil C</p>
          <p className="text-xs text-slate-400">2 hours ago · Koramangala</p>
        </div>
        <span className="ml-auto rounded-md bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-600">
          Zomato
        </span>
      </div>

      {/* Customer review */}
      <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="mb-1 text-xs font-medium text-slate-400">Customer review</p>
        <p className="text-sm leading-relaxed text-slate-700">{CUSTOMER_REVIEW}</p>
      </div>

      {/* AI draft */}
      <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4">
        <div className="mb-2 flex items-center gap-1.5">
          <SparkleIcon />
          <p className="text-xs font-semibold text-sky-700">AI Draft Response</p>
        </div>

        <p className="text-sm leading-relaxed text-slate-800">
          {DRAFT_PARTS.before}
          <span className="relative inline">
            <button
              type="button"
              onClick={() => setPopoverOpen((open) => !open)}
              className={`cursor-pointer rounded-sm border-b-2 px-0.5 transition-all duration-300 ${
                isFixed
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                  : 'border-amber-400 bg-amber-100/80 text-slate-900 hover:bg-amber-200/80'
              } ${justUpdated ? 'highlight-updated' : ''}`}
            >
              {highlightText}
            </button>
            {popoverOpen && !isFixed && (
              <HighlightPopover
                onFix={applyFix}
                onRegenerate={applyRegenerate}
                onClose={() => setPopoverOpen(false)}
              />
            )}
          </span>
          {DRAFT_PARTS.after}
        </p>

        {!isFixed && (
          <p className="mt-3 text-xs text-slate-400">
            Tap the highlighted phrase to fix or regenerate
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!isFixed}
        className={`mt-5 w-full rounded-full py-3.5 text-sm font-semibold transition-all ${
          isFixed
            ? 'bg-sky-600 text-white shadow-sm hover:bg-sky-700 active:scale-[0.98]'
            : 'cursor-not-allowed bg-slate-100 text-slate-400'
        }`}
      >
        {isFixed ? 'Approve & Send Reply' : 'Fix highlighted issue to continue'}
      </button>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0b14]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/5 bg-[#0a0b14]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-sm font-bold text-white">
              O
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Olly</span>
          </div>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-slate-300">
            Setup Auto-Response
          </h1>
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-lg space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <FastTrackSection />
        <NeedsReviewSection />
      </main>
    </div>
  )
}
