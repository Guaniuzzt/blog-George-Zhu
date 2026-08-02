import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <p className="text-xl mb-2">Page not found</p>
      <p className="text-gray-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/eng"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-white font-semibold text-sm hover:bg-gray-700 transition-all duration-300"
      >
        ← Back home
      </Link>
    </div>
  )
}
