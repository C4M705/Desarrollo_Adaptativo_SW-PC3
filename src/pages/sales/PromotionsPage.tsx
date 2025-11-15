import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Promotion {
  id_promocion: string;
  promocion_tipo_desc: string;
  promocion_monto_porc: number;
  promocion_fecha_inicio: string;
  promocion_fecha_fin: string;
}

export function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const { data, error } = await supabase.from('promocion').select('*');
        if (error) throw error;
        setPromotions(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPromotions();
  }, []);

  const columns = [
    { key: 'promocion_tipo_desc', label: 'Descripción', sortable: true },
    { key: 'promocion_monto_porc', label: 'Monto/Porcentaje' },
    {
      key: 'promocion_fecha_inicio',
      label: 'Fecha Inicio',
      render: (value: string) => new Date(value).toLocaleDateString('es-PE'),
    },
    {
      key: 'promocion_fecha_fin',
      label: 'Fecha Fin',
      render: (value: string) => new Date(value).toLocaleDateString('es-PE'),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Promociones</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nueva Promoción
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={promotions} loading={loading} />
      </div>
    </div>
  );
}
