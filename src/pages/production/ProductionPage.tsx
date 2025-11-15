import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export function ProductionPage() {
  const tabs = [
    { id: 'orders', label: 'Órdenes de Producción', path: '/production/orders' },
    { id: 'shifts', label: 'Turnos', path: '/production/shifts' },
    { id: 'incidents', label: 'Incidencias', path: '/production/incidents' },
    { id: 'shift-employees', label: 'Asignación de Turnos', path: '/production/shift-employees' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Producción</h1>
        <div className="border-b border-gray-200">
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) =>
                  `px-4 py-3 font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-amber-600 text-amber-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
