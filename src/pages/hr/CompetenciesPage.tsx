import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Competency {
  id_competencia: string;
  competencia_nombre: string;
  competencia_nivel: number;
  competencia_descrip?: string;
}

export function CompetenciesPage() {
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCompetencies = async () => {
      try {
        const { data, error } = await supabase.from('empleado_competencia').select('*');
        if (error) throw error;
        setCompetencies(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCompetencies();
  }, []);

  const columns = [
    { key: 'competencia_nombre', label: 'Nombre', sortable: true },
    { key: 'competencia_nivel', label: 'Nivel' },
    { key: 'competencia_descrip', label: 'Descripción' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Competencias</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nueva Competencia
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={competencies} loading={loading} />
      </div>
    </div>
  );
}
