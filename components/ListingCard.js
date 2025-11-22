import Link from 'next/link';

export default function ListingCard({ listing }) {
  const { id, title, price, category, location, image, createdAt } = listing;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Link href={`/listing/${id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer overflow-hidden">
        <div className="aspect-video w-full bg-gray-200 overflow-hidden">
          <img
            src={image || 'https://images.unsplash.com/photo-1560185127-6d0ff5f3f023?w=400'}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{title}</h3>
            <span className="text-lg font-bold text-blue-600 ml-2">${price}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">{category}</span>
            <span>{location}</span>
          </div>
          <div className="mt-2 text-xs text-gray-400">{formatDate(createdAt)}</div>
        </div>
      </div>
    </Link>
  );
}
