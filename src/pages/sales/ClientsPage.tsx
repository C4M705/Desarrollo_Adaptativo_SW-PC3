import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Client {
  id_cliente: string;
  cliente_ruc: string;
  cliente_razon_social: string;
  id_ubicacion: string;
  id_representante: string;
}

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    cliente_ruc: '',
    cliente_razon_social: '',
  });

  const loadClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('cliente').select('*');
      if (error) throw error;
      setClients(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleOpenModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        cliente_ruc: client.cliente_ruc,
        cliente_razon_social: client.cliente_razon_social,
      });
    } else {
      setEditingClient(null);
      setFormData({ cliente_ruc: '', cliente_razon_social: '' });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingClient(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingClient) {
        const { error } = await supabase
          .from('cliente')
          .update(formData)
          .eq('id_cliente', editingClient.id_cliente);
        if (error) throw error;
        setSuccess('Cliente actualizado exitosamente');
      } else {
        const { error } = await supabase.from('cliente').insert([formData]);
        if (error) throw error;
        setSuccess('Cliente creado exitosamente');
      }
      handleCloseModal();
      loadClients();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (client: Client) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este cliente?')) return;

    try {
      const { error } = await supabase.from('cliente').delete().eq('id_cliente', client.id_cliente);
      if (error) throw error;
      setSuccess('Cliente eliminado exitosamente');
      loadClients();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const columns = [
    { key: 'cliente_ruc', label: 'RUC', sortable: true },
    { key: 'cliente_razon_social', label: 'Razón Social', sortable: true },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={20} />
          Nuevo Cliente
        </Button>
      </div>

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      {success && (
        <div className="mb-4">
          <Alert type="success" message={success} onClose={() => setSuccess('')} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable
          columns={columns}
          data={clients}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal} title={editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="RUC"
            value={formData.cliente_ruc}
            onChange={(e) => setFormData({ ...formData, cliente_ruc: e.target.value })}
            placeholder="12345678901"
            required
          />
          <Input
            label="Razón Social"
            value={formData.cliente_razon_social}
            onChange={(e) => setFormData({ ...formData, cliente_razon_social: e.target.value })}
            placeholder="Nombre de la empresa"
            required
          />
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingClient ? 'Actualizar' : 'Crear'}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCloseModal} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
