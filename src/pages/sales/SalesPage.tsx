import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export function SalesPage() {
  const [activeTab, setActiveTab] = useState('clients');

  const tabs = [
    { id: 'clients', label: 'Clientes', path: '/sales/clients' },
    { id: 'representatives', label: 'Representantes', path: '/sales/representatives' },
    { id: 'contacts', label: 'Contactos', path: '/sales/contacts' },
    { id: 'orders', label: 'Pedidos', path: '/sales/orders' },
    { id: 'quotes', label: 'Cotizaciones', path: '/sales/quotes' },
    { id: 'promotions', label: 'Promociones', path: '/sales/promotions' },
    { id: 'payments', label: 'Pagos', path: '/sales/payments' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Ventas B2B</h1>
        <div className="border-b border-gray-200">
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.path}
                onClick={() => setActiveTab(tab.id)}
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
