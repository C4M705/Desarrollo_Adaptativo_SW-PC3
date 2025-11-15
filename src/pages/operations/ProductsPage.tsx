import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Product {
  id_producto: string;
  prod_nombre: string;
  prod_precio_base: number;
  prod_unidad_medida: string;
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data, error } = await supabase.from('producto').select('*');
        if (error) throw error;
        setProducts(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const columns = [
    { key: 'prod_nombre', label: 'Nombre', sortable: true },
    { key: 'prod_precio_base', label: 'Precio Base', render: (value: number) => `S/. ${value.toFixed(2)}` },
    { key: 'prod_unidad_medida', label: 'Unidad de Medida' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nuevo Producto
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={products} loading={loading} />
      </div>
    </div>
  );
}
