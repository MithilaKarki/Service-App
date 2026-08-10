import {useState} from "react";
import ServiceList from "./components/ServiceList";
import CategoryFilterRow from "./components/CategoryFilterRow";
import { ALL_CATEGORIES, type CategoryFilterValue } from "./types";
import db from "../mock-server/db.json"


function App() {
  // first render ma "ALL-category" ma initial state basxa as ALL in UI
  // becoz of this line useState<CategoryFilterValue>(ALL_CATEGORIES)
  // categoryFilter ma current state ko value xa meaning ALL, 
  // ani set bhitra chai state change bhako category basxa
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterValue>(ALL_CATEGORIES)

  return (

   <div className="min-h-screen bg-gray-100 p-6">
      <CategoryFilterRow
      categories={db.categories}
      selected={categoryFilter}   //current selected catalog filterrow ma pathauxa
      onSelect={setCategoryFilter}
      />
      <ServiceList services={db.services} categoryFilter = {categoryFilter} />
      <p className="mt-4 text-sm text-gray-500">Selected: {categoryFilter}</p>
    </div>
  );
}

export default App;
