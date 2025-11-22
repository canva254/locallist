import { useState } from 'react';
import { useRouter } from 'next/router';

const CATEGORIES = ['Furniture', 'Electronics', 'Bikes', 'Books', 'Clothing', 'Sports', 'Other'];

export default function CreateListing() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: CATEGORIES[0],
    location: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newListing = {
      id: String(Date.now()),
      ...formData,
      price: parseFloat(formData.price),
      createdAt: Date.now(),
    };

    const stored = localStorage.getItem('listings');
    const listings = stored ? JSON.parse(stored) : [];
    const updated = [newListing, ...listings];
    localStorage.setItem('listings', JSON.stringify(updated));

    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a Listing</h1>
      <p className="text-gray-600 mb-8">Fill out the form below to post your item</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Vintage Road Bike"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Downtown, West Side"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your item..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (optional)
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
          <p className="mt-1 text-sm text-gray-500">
            Paste a direct image URL (e.g., from Unsplash or Imgur)
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Post Listing
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
