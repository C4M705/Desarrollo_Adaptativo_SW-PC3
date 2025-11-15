import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Quote {
  id_cotizacion: string;
  cot_total_estimado: number;
  cot_vigencia: number;
  cot_estado: string;
}

export function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const { data, error } = await supabase.from('cotizacion').select('*');
        if (error) throw error;
        setQuotes(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();
  }, []);

  const columns = [
    { key: 'cot_total_estimado', label: 'Total Estimado', render: (value: number) => `S/. ${value.toFixed(2)}` },
    { key: 'cot_vigencia', label: 'Vigencia (días)' },
    { key: 'cot_estado', label: 'Estado' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cotizaciones</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nueva Cotización
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={quotes} loading={loading} />
      </div>
    </div>
  );
}
