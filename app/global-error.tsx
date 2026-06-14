'use client'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html>
      <body className="bg-[#0a0a0f] text-[#e8e8ed] flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-6">Please try refreshing the page.</p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-[#ff2d95] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#ff2d95]/25 transition-all"
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  )
}