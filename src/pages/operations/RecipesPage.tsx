import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Alert } from '../../components/Alert';

interface Recipe {
  id_receta: string;
  receta_cantidad_est: number;
  id_producto: string;
  id_insumo: string;
}

export function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const { data, error } = await supabase.from('receta_producto').select('*');
        if (error) throw error;
        setRecipes(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const columns = [
    { key: 'receta_cantidad_est', label: 'Cantidad Estimada' },
    { key: 'id_producto', label: 'ID Producto' },
    { key: 'id_insumo', label: 'ID Insumo' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Recetas de Productos</h1>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={recipes} loading={loading} />
      </div>
    </div>
  );
}
