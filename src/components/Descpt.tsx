import { useParams, Link } from "react-router-dom";
import type { Service } from "../types";

interface DescriptionProps {
  services: Service[];
}

export default function Description({ services }: DescriptionProps) {
  const { id } = useParams(); // reads ":id" from the URL

  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="p-6">
        <p>Service not found.</p>
        <Link to="/" className="text-blue-600">← Back to listings</Link>
      </div>
    );
  }

  const { name, category, rating, reviewCount, imageUrl, price, tags, address, phone } = service;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link to="/" className="text-blue-600 text-sm">← Back</Link>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-4 max-w-xl">
        <img src={imageUrl} alt={name} className="w-full h-60 object-cover" />
        <div className="p-6">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-500">{category}</p>
          <p className="text-sm text-gray-400">★ {rating} ({reviewCount} reviews)</p>
          <p className="mt-2 font-bold text-lg">${price}<span className="font-normal text-gray-500">/hr</span></p>
          <p className="mt-2 text-sm text-gray-600">{address}</p>
          <p className="text-sm text-gray-600">{phone}</p>

          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}