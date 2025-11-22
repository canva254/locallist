import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            LocalList
          </Link>
          <Link
            href="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Post a Listing
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} LocalList. Built with Next.js & Tailwind.
        </div>
      </footer>
    </div>
  );
}
