import { useEffect, useState } from 'react';
import ListingCard from '@/components/ListingCard';

const SAMPLE_LISTINGS = [
  {
    id: '1',
    title: 'Vintage Road Bike - Great Condition',
    price: 250,
    category: 'Bikes',
    location: 'Downtown',
    description: 'Classic road bike in excellent condition. New tires and recently serviced.',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600',
    createdAt: Date.now() - 3600000,
  },
  {
    id: '2',
    title: 'Comfortable Office Chair',
    price: 120,
    category: 'Furniture',
    location: 'West Side',
    description: 'Ergonomic office chair, barely used. Perfect for home office.',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600',
    createdAt: Date.now() - 7200000,
  },
  {
    id: '3',
    title: 'Canon DSLR Camera with Lens',
    price: 450,
    category: 'Electronics',
    location: 'East End',
    description: 'Canon EOS Rebel with 18-55mm lens. Great starter camera.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
    createdAt: Date.now() - 86400000,
  },
];

export default function Home() {
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const stored = localStorage.getItem('listings');
    if (stored) {
      setListings(JSON.parse(stored));
    } else {
      localStorage.setItem('listings', JSON.stringify(SAMPLE_LISTINGS));
      setListings(SAMPLE_LISTINGS);
    }
  }, []);

  const categories = ['All', ...new Set(listings.map(l => l.category))];
  const filteredListings = selectedCategory === 'All'
    ? listings
    : listings.filter(l => l.category === selectedCategory);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Listings</h1>
        <p className="text-gray-600">Find great deals in your local area</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No listings yet. Be the first to post!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
