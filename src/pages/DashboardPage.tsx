import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { TrendingUp, Package, Users, DollarSign } from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  totalSales: number;
  activeProducts: number;
  activeEmployees: number;
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: any;
  label: string;
  value: string | number;
  change?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && <p className="text-xs text-green-600 font-semibold mt-1">{change}</p>}
        </div>
        <div className="bg-amber-100 p-3 rounded-lg">
          <Icon size={24} className="text-amber-600" />
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalSales: 0,
    activeProducts: 0,
    activeEmployees: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [orders, products, employees] = await Promise.all([
          supabase.from('pedido').select('id_pedido, pedido_monto_total'),
          supabase.from('producto').select('id_producto'),
          supabase.from('empleado').select('id_empleado'),
        ]);

        const totalSales = orders.data?.reduce(
          (sum, order: any) => sum + (parseFloat(order.pedido_monto_total) || 0),
          0
        ) || 0;

        setStats({
          totalOrders: orders.data?.length || 0,
          totalSales,
          activeProducts: products.data?.length || 0,
          activeEmployees: employees.data?.length || 0,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bienvenido al Sistema S&OP de Don Mamino</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={DollarSign}
          label="Ventas Totales"
          value={`S/. ${stats.totalSales.toFixed(2)}`}
          change="+12% respecto a mes anterior"
        />
        <StatCard
          icon={Package}
          label="Pedidos"
          value={stats.totalOrders}
          change="+8 nuevos pedidos"
        />
        <StatCard
          icon={TrendingUp}
          label="Productos Activos"
          value={stats.activeProducts}
          change="8 categorías"
        />
        <StatCard
          icon={Users}
          label="Empleados Activos"
          value={stats.activeEmployees}
          change="En operaciones"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Módulos Disponibles</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Gestión de Ventas B2B y Clientes
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Control de Inventario y Productos
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Gestión de Producción y Turnos
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Administración de Recursos Humanos
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Control de Logística y Ubicaciones
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Información del Sistema</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Versión del Sistema:</span>
              <span className="font-semibold text-gray-900">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Última actualización:</span>
              <span className="font-semibold text-gray-900">
                {new Date().toLocaleDateString('es-PE')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado del Sistema:</span>
              <span className="font-semibold text-green-600">Operativo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
