import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ListingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState(null);

  useEffect(() => {
    if (!id) return;

    const stored = localStorage.getItem('listings');
    if (stored) {
      const listings = JSON.parse(stored);
      const found = listings.find(l => l.id === id);
      setListing(found || null);
    }
  }, [id]);

  if (!listing) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Listing not found</p>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to listings
        </Link>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div>
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to listings
      </Link>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="aspect-video w-full bg-gray-200 overflow-hidden">
          <img
            src={listing.image || 'https://images.unsplash.com/photo-1560185127-6d0ff5f3f023?w=800'}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="bg-gray-100 px-3 py-1 rounded-lg">{listing.category}</span>
                <span>📍 {listing.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">${listing.price}</div>
              <div className="text-sm text-gray-500 mt-1">Posted {formatDate(listing.createdAt)}</div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
          </div>

          <div className="border-t mt-6 pt-6">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium">
              Contact Seller
            </button>
            <p className="text-center text-sm text-gray-500 mt-2">
              In a real app, this would open a contact form or messaging interface
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
