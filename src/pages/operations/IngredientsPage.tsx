import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Ingredient {
  id_insumo: string;
  insumo_nombre: string;
  insumo_unidad_medida: string;
  id_proveedor: string;
}

export function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const { data, error } = await supabase.from('insumo').select('*');
        if (error) throw error;
        setIngredients(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadIngredients();
  }, []);

  const columns = [
    { key: 'insumo_nombre', label: 'Nombre', sortable: true },
    { key: 'insumo_unidad_medida', label: 'Unidad de Medida' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Insumos</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nuevo Insumo
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={ingredients} loading={loading} />
      </div>
    </div>
  );
}
