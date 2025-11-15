import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Role {
  id_rol: string;
  rol_nombre: string;
  rol_nivel: number;
  rol_descripcion?: string;
  rol_activo: boolean;
}

export function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const { data, error } = await supabase.from('rol').select('*');
        if (error) throw error;
        setRoles(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRoles();
  }, []);

  const columns = [
    { key: 'rol_nombre', label: 'Nombre', sortable: true },
    { key: 'rol_nivel', label: 'Nivel' },
    { key: 'rol_descripcion', label: 'Descripción' },
    { key: 'rol_activo', label: 'Activo', render: (value: boolean) => (value ? '✓' : '✗') },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Roles</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nuevo Rol
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={roles} loading={loading} />
      </div>
    </div>
  );
}
