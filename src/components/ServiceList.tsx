import ServiceCard from "./ServiceCard";
import type { Service, CategoryFilterValue, RatingFilterValue } from "../types";
import {ALL_CATEGORIES,ANY_RATING } from "../types";


interface ServiceListProps{
  services : Service[];
  categoryFilter : CategoryFilterValue;
  ratingFilter: RatingFilterValue;
}

export default function ServiceList({
  services,
  categoryFilter,
  ratingFilter,
}:ServiceListProps) {
    
  const filteredServices = services.filter((service) => {
  const matchesCategory =
    categoryFilter === ALL_CATEGORIES || service.category === categoryFilter;

  const matchesRating =
    ratingFilter === ANY_RATING || service.rating >= ratingFilter;

  return matchesCategory && matchesRating;
});


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