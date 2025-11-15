import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface ProductionOrder {
  id_orden_prod: string;
  op_fecha_prod: string;
  op_fecha_limite: string;
  op_cant_programada: number;
  op_cant_producida: number;
  op_estado: string;
}

export function ProductionOrdersPage() {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data, error } = await supabase.from('orden_produccion').select('*');
        if (error) throw error;
        setOrders(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const columns = [
    {
      key: 'op_fecha_prod',
      label: 'Fecha de Producción',
      render: (value: string) => new Date(value).toLocaleDateString('es-PE'),
    },
    {
      key: 'op_fecha_limite',
      label: 'Fecha Límite',
      render: (value: string) => new Date(value).toLocaleDateString('es-PE'),
    },
    { key: 'op_cant_programada', label: 'Cantidad Programada' },
    { key: 'op_cant_producida', label: 'Cantidad Producida' },
    { key: 'op_estado', label: 'Estado' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Órdenes de Producción</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nueva Orden
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={orders} loading={loading} />
      </div>
    </div>
  );
}
