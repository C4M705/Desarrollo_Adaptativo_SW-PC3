import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Incident {
  id_incidencia: string;
  incidencia_estado: string;
  incidencia_tipo: string;
  incidencia_descripcion: string;
  incidencia_fecha_hora: string;
}

export function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const { data, error } = await supabase.from('incidencia').select('*');
        if (error) throw error;
        setIncidents(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadIncidents();
  }, []);

  const columns = [
    { key: 'incidencia_tipo', label: 'Tipo', sortable: true },
    { key: 'incidencia_descripcion', label: 'Descripción' },
    {
      key: 'incidencia_fecha_hora',
      label: 'Fecha y Hora',
      render: (value: string) => new Date(value).toLocaleString('es-PE'),
    },
    { key: 'incidencia_estado', label: 'Estado' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Incidencias</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Reportar Incidencia
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={incidents} loading={loading} />
      </div>
    </div>
  );
}
