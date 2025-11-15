import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Employee {
  id_empleado: string;
  empl_primer_nombre: string;
  empl_apellido_paterno: string;
  empl_apellido_materno: string;
  empl_dni: string;
  empl_disponibilidad: boolean;
  empl_telefono?: string;
  empl_correo?: string;
}

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const { data, error } = await supabase.from('empleado').select('*');
        if (error) throw error;
        setEmployees(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const columns = [
    { key: 'empl_primer_nombre', label: 'Nombre', sortable: true },
    { key: 'empl_apellido_paterno', label: 'Apellido Paterno', sortable: true },
    { key: 'empl_apellido_materno', label: 'Apellido Materno', sortable: true },
    { key: 'empl_dni', label: 'DNI' },
    {
      key: 'empl_disponibilidad',
      label: 'Disponible',
      render: (value: boolean) => (value ? '✓' : '✗'),
    },
    { key: 'empl_telefono', label: 'Teléfono' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Empleados</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nuevo Empleado
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={employees} loading={loading} />
      </div>
    </div>
  );
}
