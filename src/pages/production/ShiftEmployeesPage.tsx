import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface ShiftEmployee {
  id_turno_empl: string;
  te_estado: string;
  te_observaciones?: string;
  id_turno: string;
  id_empleado: string;
  id_rol: string;
}

export function ShiftEmployeesPage() {
  const [shiftEmployees, setShiftEmployees] = useState<ShiftEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadShiftEmployees = async () => {
      try {
        const { data, error } = await supabase.from('turno_empleado').select('*');
        if (error) throw error;
        setShiftEmployees(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadShiftEmployees();
  }, []);

  const columns = [
    { key: 'te_estado', label: 'Estado' },
    { key: 'te_observaciones', label: 'Observaciones' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Asignación de Turnos a Empleados</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Asignar Turno
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={shiftEmployees} loading={loading} />
      </div>
    </div>
  );
}
