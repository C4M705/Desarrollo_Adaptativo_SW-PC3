import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Representative {
  id_representante: string;
  rep_primer_nombre: string;
  rep_apellido_paterno: string;
  rep_apellido_materno: string;
}

export function RepresentativesPage() {
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRepresentatives = async () => {
      try {
        const { data, error } = await supabase.from('representante').select('*');
        if (error) throw error;
        setRepresentatives(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRepresentatives();
  }, []);

  const columns = [
    { key: 'rep_primer_nombre', label: 'Nombre', sortable: true },
    { key: 'rep_apellido_paterno', label: 'Apellido Paterno', sortable: true },
    { key: 'rep_apellido_materno', label: 'Apellido Materno', sortable: true },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Representantes</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nuevo Representante
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={representatives} loading={loading} />
      </div>
    </div>
  );
}
