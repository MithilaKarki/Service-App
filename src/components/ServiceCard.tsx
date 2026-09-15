import type { Service } from "../types";  //service interface import gareko 
import {Link} from "react-router-dom";

interface ServiceCardProps {    //servicard le service use garnai parxa bhanera we fprce here service interface
  service: Service;
}

//{service} lekhnu ko karan ek ek choti props.service.name, props.service price
// garnu naparos bhanera
export default function ServiceCard({ service }: ServiceCardProps) {
  const { name, category, rating, reviewCount, imageUrl, price, tags } = service;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />
        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
          ★ {rating}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{category.label}</p>
        <p className="text-xs text-gray-400">({reviewCount} reviews)</p>
        <p className="font-bold text-gray-900 mt-1">
          ${price}
          <span className="font-normal text-gray-500">/hr</span>
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

          <Link
          to={`/service/${service.id}`}
          className="mt-3 border border-blue-600 text-blue-600 text-sm font-medium py-1.5 rounded hover:bg-blue-50 transition text-center block"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}