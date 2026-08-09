import ServiceCard from "./ServiceCard";
import type { Service } from "../types";

const placeholderServices: Service[] = [
  {
    id: "1",
    name: "Oslo Pipe Pros",
    category: "Plumbing",
    rating: 4.6,
    reviewCount: 128,
    address: "Storgata 12, Oslo",
    phone: "+47 900 00 001",
    imageUrl: "https://picsum.photos/seed/1/200",
    price: 120,
    distanceMiles: 0.8,
    tags: ["PLUMBING", "EMERGENCY"],
  },
  {
    id: "3",
    name: "VoltSafe Solutions",
    category: "Electrical",
    rating: 4.8,
    reviewCount: 240,
    address: "Karl Johans Gate 22, Oslo",
    phone: "+47 900 00 003",
    imageUrl: "https://picsum.photos/seed/3/200",
    price: 220,
    distanceMiles: 1.2,
    tags: ["ELECTRICAL", "CERTIFIED"],
  },
  {
    id: "7",
    name: "Sparkle Home Cleaning",
    category: "Cleaning",
    rating: 4.9,
    reviewCount: 312,
    address: "St. Hanshaugen 9, Oslo",
    phone: "+47 900 00 007",
    imageUrl: "https://picsum.photos/seed/7/200",
    price: 80,
    distanceMiles: 0.5,
    tags: ["CLEANING", "ECO-FRIENDLY"],
  },
    
   {
    id: "8",
    name: "Frost Free HVAC",
    category: "HVAC",
    rating: 4.5,
    reviewCount: 96,
    address: "Grünerløkka 14, Oslo",
    phone: "+47 900 00 008",
    imageUrl: "https://loremflickr.com/200/200/plumbing",
    price: 180,
    distanceMiles: 1.6,
    tags: ["HVAC", "EMERGENCY"],
  },
  {
    id: "9",
    name: "GreenLeaf Landscaping",
    category: "Landscaping",
    rating: 4.7,
    reviewCount: 154,
    address: "Frogner Park 3, Oslo",
    phone: "+47 900 00 009",
    imageUrl: "https://picsum.photos/seed/9/200",
    price: 150,
    distanceMiles: 2.1,
    tags: ["LANDSCAPING", "ECO-FRIENDLY"],
  },
  {
    id: "10",
    name: "Nordic Roofing Co",
    category: "Roofing",
    rating: 4.4,
    reviewCount: 88,
    address: "Majorstuen 7, Oslo",
    phone: "+47 900 00 010",
    imageUrl: "https://loremflickr.com/200/200/roofing",
    price: 350,
    distanceMiles: 1.9,
    tags: ["ROOFING", "CERTIFIED"],
  },
  {
    id: "11",
    name: "Fjord Locksmiths",
    category: "Locksmith",
    rating: 4.9,
    reviewCount: 201,
    address: "Bjølsen 5, Oslo",
    phone: "+47 900 00 011",
    imageUrl: "https://loremflickr.com/200/200/locksmith",
    price: 95,
    distanceMiles: 0.9,
    tags: ["LOCKSMITH", "EMERGENCY"],
  },
  {
    id: "12",
    name: "Bright Spark Painting",
    category: "Painting",
    rating: 4.6,
    reviewCount: 132,
    address: "Sagene 18, Oslo",
    phone: "+47 900 00 012",
    imageUrl: "https://picsum.photos/seed/12/200",
    price: 200,
    distanceMiles: 1.4,
    tags: ["PAINTING", "INTERIOR"],
  },
  {
    id: "13",
    name: "Oslo Pest Control",
    category: "Pest Control",
    rating: 4.3,
    reviewCount: 77,
    address: "Tøyen 21, Oslo",
    phone: "+47 900 00 013",
    imageUrl: "https://picsum.photos/seed/13/200",
    price: 110,
    distanceMiles: 2.3,
    tags: ["PEST CONTROL", "CERTIFIED"],
  },

];

export default function ServiceList() {
  return (
      // map ma array loop garna milxa 
      // each service ko servicecard bhanxa ani automatically object sanga link hunxa
      // {service} uta servicecard bata aako const= blah blah 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{placeholderServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}