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
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem('listings');
    if (stored) {
      setListings(JSON.parse(stored));
    } else {
      localStorage.setItem('listings', JSON.stringify(SAMPLE_LISTINGS));
      setListings(SAMPLE_LISTINGS);
    }
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      const updated = listings.filter(l => l.id !== id);
      setListings(updated);
      localStorage.setItem('listings', JSON.stringify(updated));
    }
  };

  const categories = ['All', ...new Set(listings.map(l => l.category))];
  
  let filteredListings = listings;

  // Filter by category
  if (selectedCategory !== 'All') {
    filteredListings = filteredListings.filter(l => l.category === selectedCategory);
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredListings = filteredListings.filter(l =>
      l.title.toLowerCase().includes(query) ||
      l.description.toLowerCase().includes(query) ||
      l.location.toLowerCase().includes(query)
    );
  }

  // Filter by price range
  if (priceRange !== 'all') {
    filteredListings = filteredListings.filter(l => {
      if (priceRange === 'under50') return l.price < 50;
      if (priceRange === '50-200') return l.price >= 50 && l.price <= 200;
      if (priceRange === '200-500') return l.price > 200 && l.price <= 500;
      if (priceRange === 'over500') return l.price > 500;
      return true;
    });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Browse Listings
        </h1>
        <p className="text-gray-600">Find great deals in your local area</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search listings by title, description, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filters Row */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Category Filter */}
        <div className="flex-1">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition transform hover:scale-105 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="sm:w-48">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          >
            <option value="all">All Prices</option>
            <option value="under50">Under $50</option>
            <option value="50-200">$50 - $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="over500">Over $500</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || priceRange !== 'all' || selectedCategory !== 'All') && (
        <div className="mb-4 text-sm text-gray-600">
          Found {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'}
        </div>
      )}

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 text-lg mb-2">No listings found</p>
          <p className="text-gray-400 text-sm mb-4">Try adjusting your filters or search query</p>
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setPriceRange('all'); setSelectedCategory('All'); }}
              className="text-blue-600 hover:underline text-sm"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
