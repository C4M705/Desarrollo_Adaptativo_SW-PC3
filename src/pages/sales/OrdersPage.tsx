import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Order {
  id_pedido: string;
  pedido_fecha_pedido: string;
  pedido_monto_total: number;
  id_cliente: string;
  id_estado: string;
  id_forma_pago: string;
}

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data, error } = await supabase.from('pedido').select('*');
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
      key: 'pedido_fecha_pedido',
      label: 'Fecha',
      render: (value: string) => new Date(value).toLocaleDateString('es-PE'),
    },
    { key: 'pedido_monto_total', label: 'Monto Total', render: (value: number) => `S/. ${value.toFixed(2)}` },
    { key: 'id_estado', label: 'Estado' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nuevo Pedido
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
