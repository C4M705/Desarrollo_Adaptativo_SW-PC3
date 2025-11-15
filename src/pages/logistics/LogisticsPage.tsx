import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DataTable } from '../../components/DataTable';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { Alert } from '../../components/Alert';
import { Plus } from 'lucide-react';

interface Location {
  id_ubicacion: string;
  ubicacion_distrito: string;
  ubicacion_lote: string;
  ubicacion_manzana: string;
}

export function LogisticsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    ubicacion_distrito: '',
    ubicacion_lote: '',
    ubicacion_manzana: '',
  });

  const loadLocations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('ubicacion').select('*');
      if (error) throw error;
      setLocations(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleOpenModal = (location?: Location) => {
    if (location) {
      setEditingLocation(location);
      setFormData({
        ubicacion_distrito: location.ubicacion_distrito,
        ubicacion_lote: location.ubicacion_lote,
        ubicacion_manzana: location.ubicacion_manzana,
      });
    } else {
      setEditingLocation(null);
      setFormData({ ubicacion_distrito: '', ubicacion_lote: '', ubicacion_manzana: '' });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingLocation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingLocation) {
        const { error } = await supabase
          .from('ubicacion')
          .update(formData)
          .eq('id_ubicacion', editingLocation.id_ubicacion);
        if (error) throw error;
        setSuccess('Ubicación actualizada exitosamente');
      } else {
        const { error } = await supabase.from('ubicacion').insert([formData]);
        if (error) throw error;
        setSuccess('Ubicación creada exitosamente');
      }
      handleCloseModal();
      loadLocations();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (location: Location) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) return;

    try {
      const { error } = await supabase
        .from('ubicacion')
        .delete()
        .eq('id_ubicacion', location.id_ubicacion);
      if (error) throw error;
      setSuccess('Ubicación eliminada exitosamente');
      loadLocations();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const columns = [
    { key: 'ubicacion_distrito', label: 'Distrito', sortable: true },
    { key: 'ubicacion_lote', label: 'Lote', sortable: true },
    { key: 'ubicacion_manzana', label: 'Manzana', sortable: true },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Logística y Ubicaciones</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={20} />
          Nueva Ubicación
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
          data={locations}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingLocation ? 'Editar Ubicación' : 'Nueva Ubicación'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Distrito"
            value={formData.ubicacion_distrito}
            onChange={(e) => setFormData({ ...formData, ubicacion_distrito: e.target.value })}
            placeholder="Ej: Lima"
            required
          />
          <Input
            label="Lote"
            value={formData.ubicacion_lote}
            onChange={(e) => setFormData({ ...formData, ubicacion_lote: e.target.value })}
            placeholder="Ej: 123"
            required
          />
          <Input
            label="Manzana"
            value={formData.ubicacion_manzana}
            onChange={(e) => setFormData({ ...formData, ubicacion_manzana: e.target.value })}
            placeholder="Ej: A"
            required
          />
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingLocation ? 'Actualizar' : 'Crear'}
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
