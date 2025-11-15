import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Supplier {
  id_proveedor: string;
  proveedor_nombre: string;
  proveedor_ruc: string;
  proveedor_contacto?: string;
  proveedor_correo?: string;
}

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const { data, error } = await supabase.from('proveedor').select('*');
        if (error) throw error;
        setSuppliers(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, []);

  const columns = [
    { key: 'proveedor_nombre', label: 'Nombre', sortable: true },
    { key: 'proveedor_ruc', label: 'RUC' },
    { key: 'proveedor_contacto', label: 'Contacto' },
    { key: 'proveedor_correo', label: 'Correo' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Proveedores</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nuevo Proveedor
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={suppliers} loading={loading} />
      </div>
    </div>
  );
}
