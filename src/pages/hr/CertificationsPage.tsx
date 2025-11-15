import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Certification {
  id_certificacion: string;
  certif_nombre: string;
  certif_entidad_emisora: string;
  certif_descripcion?: string;
  certif_duracion: number;
  certif_fecha_emision?: string;
  certif_fecha_vencimiento?: string;
}

export function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const { data, error } = await supabase.from('empleado_certificacion').select('*');
        if (error) throw error;
        setCertifications(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCertifications();
  }, []);

  const columns = [
    { key: 'certif_nombre', label: 'Nombre', sortable: true },
    { key: 'certif_entidad_emisora', label: 'Entidad Emisora', sortable: true },
    { key: 'certif_duracion', label: 'Duración (meses)' },
    {
      key: 'certif_fecha_vencimiento',
      label: 'Fecha de Vencimiento',
      render: (value: string) => (value ? new Date(value).toLocaleDateString('es-PE') : '-'),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Certificaciones</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nueva Certificación
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={certifications} loading={loading} />
      </div>
    </div>
  );
}
