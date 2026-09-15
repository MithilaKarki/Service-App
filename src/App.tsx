import {useEffect, useState} from "react";
import ServiceList from "./components/ServiceList";
import CategoryFilterRow from "./components/CategoryFilterRow";
import FilterSidebar from "./components/FilterSidebar";
import { ALL_CATEGORIES,ANY_RATING, type Category,
type Service, type CategoryFilterValue,type RatingFilterValue } from "./types";
import { Routes, Route, Navigate } from "react-router-dom";
import Description from "./components/Descpt";
import SearchBar from "./components/SearchBar";
import RatingFilterRow from "./components/RatingFilterRow";
import Login from "./components/Login";
import Signup from "./components/Signup";


const API_BASE_URL = "http://localhost:8000/api";

function App() {
  // first render ma "ALL-category" ma initial state basxa as ALL in UI
  // becoz of this line useState<CategoryFilterValue>(ALL_CATEGORIES)
  // categoryFilter ma current state ko value xa meaning ALL, 
  // ani setfunc bhitra chai state change bhako category basxa

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterValue>(ALL_CATEGORIES)
  const [ratingFilter, setRatingFilter] = useState<RatingFilterValue>(ANY_RATING);


  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [services, setServices] = useState<Service[]> ([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [serviceError, setServicesError] = useState<string | null> (null);

  const [searchQuery, setSearchQuery] = useState("");

  const searchedServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  useEffect(() =>{
    const fetchCategories = async () => {
      try{
        setCategoriesLoading(true);
        setCategoriesError(null);
        const res = await fetch(`${API_BASE_URL}/categories/`);
        if(!res.ok) throw new Error(`Status ${res.status}`);
        const json = await res.json();
        setCategories(json.data ?? json);

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
        const res = await fetch(`${API_BASE_URL}/services/`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const json = await res.json();
        setServices(json.data ?? json);
      } catch (err) {
        setServicesError(err instanceof Error ? err.message : "Failed to load services");
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <Routes>
      <Route
        path="/services"
        element={
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-4 gap-3">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm bg-white shadow-sm"
              >
                ⚙ Filter
              </button>
            </div>

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
                services={searchedServices}
                categoryFilter={categoryFilter}
                ratingFilter={ratingFilter}
              />
            )}

            <p className="mt-4 text-sm text-gray-500">Selected: {categoryFilter}</p>

            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              categories={categories}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              ratingFilter={ratingFilter}
              onRatingChange={setRatingFilter}
            />
          </div>

          
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/service/:id" element={<Description services={services} />} />

      </Routes>
  );
}

export default App;