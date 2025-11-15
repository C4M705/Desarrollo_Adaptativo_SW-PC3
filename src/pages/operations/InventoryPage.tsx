import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Alert } from '../../components/Alert';

interface Inventory {
  id_inventario: string;
  inv_stock_actual: number;
  inv_stock_seguridad: number;
  inv_tiem_prod_estim: number;
  inv_fecha_ult_act: string;
}

export function InventoryPage() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const { data, error } = await supabase.from('inventario').select('*');
        if (error) throw error;
        setInventory(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, []);

  const columns = [
    { key: 'inv_stock_actual', label: 'Stock Actual' },
    { key: 'inv_stock_seguridad', label: 'Stock de Seguridad' },
    { key: 'inv_tiem_prod_estim', label: 'Tiempo de Producción (hrs)' },
    {
      key: 'inv_fecha_ult_act',
      label: 'Última Actualización',
      render: (value: string) => new Date(value).toLocaleDateString('es-PE'),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Inventario de Productos</h1>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={inventory} loading={loading} />
      </div>
    </div>
  );
}
