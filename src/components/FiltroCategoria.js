import React, { useState, useEffect } from 'react';

function FiltroCategorias({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://api.mercadolibre.com/sites/MLA/categories');
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <select onChange={(e) => onCategorySelect(e.target.value)}>
        <option value="">Todas</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroCategorias;
