import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Shift {
  id_turno: string;
  turno_fecha: string;
  turno_hora_inicio: string;
  turno_hora_fin: string;
  turno_tipo_evento: string;
  turno_estado: string;
}

export function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadShifts = async () => {
      try {
        const { data, error } = await supabase.from('turno').select('*');
        if (error) throw error;
        setShifts(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadShifts();
  }, []);

  const columns = [
    {
      key: 'turno_fecha',
      label: 'Fecha',
      render: (value: string) => new Date(value).toLocaleDateString('es-PE'),
    },
    { key: 'turno_hora_inicio', label: 'Hora Inicio' },
    { key: 'turno_hora_fin', label: 'Hora Fin' },
    { key: 'turno_tipo_evento', label: 'Tipo de Evento' },
    { key: 'turno_estado', label: 'Estado' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Turnos</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nuevo Turno
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={shifts} loading={loading} />
      </div>
    </div>
  );
}
