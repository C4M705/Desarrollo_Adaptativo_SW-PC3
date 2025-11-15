import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Category {
  id_cat_producto: string;
  cp_nombre: string;
  cp_descripcion?: string;
}

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data, error } = await supabase.from('categoria_producto').select('*');
        if (error) throw error;
        setCategories(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const columns = [
    { key: 'cp_nombre', label: 'Nombre', sortable: true },
    { key: 'cp_descripcion', label: 'Descripción' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categorías de Productos</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nueva Categoría
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={categories} loading={loading} />
      </div>
    </div>
  );
}
