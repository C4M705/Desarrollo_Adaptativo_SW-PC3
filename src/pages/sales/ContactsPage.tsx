import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Contact {
  id_contacto: string;
  contacto_telefono: string;
  contacto_correo: string;
}

export function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const { data, error } = await supabase.from('contacto').select('*');
        if (error) throw error;
        setContacts(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  const columns = [
    { key: 'contacto_telefono', label: 'Teléfono', sortable: true },
    { key: 'contacto_correo', label: 'Correo', sortable: true },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contactos</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Nuevo Contacto
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable columns={columns} data={contacts} loading={loading} />
      </div>
    </div>
  );
}
