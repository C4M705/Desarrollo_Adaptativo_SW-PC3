import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export function HRPage() {
  const tabs = [
    { id: 'employees', label: 'Empleados', path: '/hr/employees' },
    { id: 'roles', label: 'Roles', path: '/hr/roles' },
    { id: 'competencies', label: 'Competencias', path: '/hr/competencies' },
    { id: 'certifications', label: 'Certificaciones', path: '/hr/certifications' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Recursos Humanos</h1>
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
