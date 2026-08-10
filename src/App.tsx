import {useEffect, useState} from "react";
import ServiceList from "./components/ServiceList";
import CategoryFilterRow from "./components/CategoryFilterRow";
import { ALL_CATEGORIES,ANY_RATING, type Category,
type Service, type CategoryFilterValue,type RatingFilterValue } from "./types";


import RatingFilterRow from "./components/RatingFilterRow";

import db from "../mock-server/db.json"

const API_BASE_URL = "http://localhost:3000";

function App() {
  // first render ma "ALL-category" ma initial state basxa as ALL in UI
  // becoz of this line useState<CategoryFilterValue>(ALL_CATEGORIES)
  // categoryFilter ma current state ko value xa meaning ALL, 
  // ani setfunc bhitra chai state change bhako category basxa

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterValue>(ALL_CATEGORIES)
  const [ratingFilter, setRatingFilter] = useState<RatingFilterValue>(ANY_RATING);


  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<String | null>(null);

  const [services, setServices] = useState<Service[]> ([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [serviceError, setServicesError] = useState<String | null> (null);


  useEffect(() =>{
    const fetchCategories = async () => {
      try{
        setCategoriesLoading(true);
        setCategoriesError(null);
        const res = await fetch(`${API_BASE_URL}/categories`);
        if(!res.ok) throw new Error(`Status ${res.status}`);
        setCategories(await res.json());
      }
      catch(err)
      {
        setCategoriesError(err instanceof Error ? err.message : "Failed to load categories ");
      }
      finally{
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  },[]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        setServicesError(null);
        const res = await fetch(`${API_BASE_URL}/services`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        setServices(await res.json());
      } catch (err) {
        setServicesError(err instanceof Error ? err.message : "Failed to load services");
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (

   <div className="min-h-screen bg-gray-100 p-6">
      {categoriesLoading ? (
        <p className="text-gray-400 text-sm">Loading categories…</p>
      ) : categoriesError ? (
        <p className="text-red-500 text-sm">{categoriesError}</p>
      ) : (
        <CategoryFilterRow
          categories={categories}
          selected={categoryFilter}
          onSelect={setCategoryFilter}
        />
      )}

      <RatingFilterRow selected={ratingFilter} onSelect={setRatingFilter} />

      {servicesLoading ? (
        <p className="text-gray-400 text-center py-12">Loading services…</p>
      ) : serviceError ? (
        <p className="text-red-500 text-center py-12">{serviceError}</p>
      ) : (
        <ServiceList 
        services={services} categoryFilter={categoryFilter} 
        ratingFilter={ratingFilter}
        />
      )}

      <p className="mt-4 text-sm text-gray-500">Selected: {categoryFilter}</p>
    </div>


  );
}

export default App;
