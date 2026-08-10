import ServiceCard from "./ServiceCard";
import type { Service, CategoryFilterValue } from "../types";
import {ALL_CATEGORIES} from "../types";


interface ServiceListProps{
  services : Service[];
  categoryFilter : CategoryFilterValue;
}

export default function ServiceList({services,
  categoryFilter}:ServiceListProps) {
  const filteredServices = categoryFilter === ALL_CATEGORIES
  ? services
  : services.filter((service) => service.category === categoryFilter);
  
  if (filteredServices.length == 0)
  {
  return(
    <p className = "mt-6 text-center text-gray-500">
      No services found in this category
    </p>
  )
}


// map ma array loop garna milxa 
      // each service ko servicecard bhanxa ani automatically object sanga link hunxa
      // {service} uta servicecard bata aako const= blah blah 
return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}