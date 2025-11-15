import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Payment {
  id_numero_cuota: string;
  numero_cuota: number;
  pago_fecha_pago: string;
  pago_monto: number;
}

export function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const { data, error } = await supabase.from('pago').select('*');
        if (error) throw error;
        setPayments(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  const columns = [
    { key: 'numero_cuota', label: 'Nº Cuota' },
    {
      key: 'pago_fecha_pago',
      label: 'Fecha de Pago',
      render: (value: string) => new Date(value).toLocaleDateString('es-PE'),
    },
    { key: 'pago_monto', label: 'Monto', render: (value: number) => `S/. ${value.toFixed(2)}` },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pagos</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Registrar Pago
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={payments} loading={loading} />
      </div>
    </div>
  );
}
