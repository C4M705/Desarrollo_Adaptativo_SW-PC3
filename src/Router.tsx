import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';

import { SalesPage } from './pages/sales/SalesPage';
import { ClientsPage } from './pages/sales/ClientsPage';
import { RepresentativesPage } from './pages/sales/RepresentativesPage';
import { ContactsPage } from './pages/sales/ContactsPage';
import { OrdersPage } from './pages/sales/OrdersPage';
import { QuotesPage } from './pages/sales/QuotesPage';
import { PromotionsPage } from './pages/sales/PromotionsPage';
import { PaymentsPage } from './pages/sales/PaymentsPage';

import { OperationsPage } from './pages/operations/OperationsPage';
import { ProductsPage } from './pages/operations/ProductsPage';
import { CategoriesPage } from './pages/operations/CategoriesPage';
import { InventoryPage } from './pages/operations/InventoryPage';
import { SuppliersPage } from './pages/operations/SuppliersPage';
import { IngredientsPage } from './pages/operations/IngredientsPage';
import { RecipesPage } from './pages/operations/RecipesPage';

import { ProductionPage } from './pages/production/ProductionPage';
import { ProductionOrdersPage } from './pages/production/ProductionOrdersPage';
import { ShiftsPage } from './pages/production/ShiftsPage';
import { IncidentsPage } from './pages/production/IncidentsPage';
import { ShiftEmployeesPage } from './pages/production/ShiftEmployeesPage';

import { HRPage } from './pages/hr/HRPage';
import { EmployeesPage } from './pages/hr/EmployeesPage';
import { RolesPage } from './pages/hr/RolesPage';
import { CompetenciesPage } from './pages/hr/CompetenciesPage';
import { CertificationsPage } from './pages/hr/CertificationsPage';

import { LogisticsPage } from './pages/logistics/LogisticsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

        <Route path="/sales" element={<ProtectedRoute><SalesPage /></ProtectedRoute>}>
          <Route path="clients" element={<ClientsPage />} />
          <Route path="representatives" element={<RepresentativesPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="quotes" element={<QuotesPage />} />
          <Route path="promotions" element={<PromotionsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route index element={<Navigate to="clients" />} />
        </Route>

        <Route path="/operations" element={<ProtectedRoute><OperationsPage /></ProtectedRoute>}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="ingredients" element={<IngredientsPage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route index element={<Navigate to="products" />} />
        </Route>

        <Route path="/production" element={<ProtectedRoute><ProductionPage /></ProtectedRoute>}>
          <Route path="orders" element={<ProductionOrdersPage />} />
          <Route path="shifts" element={<ShiftsPage />} />
          <Route path="incidents" element={<IncidentsPage />} />
          <Route path="shift-employees" element={<ShiftEmployeesPage />} />
          <Route index element={<Navigate to="orders" />} />
        </Route>

        <Route path="/hr" element={<ProtectedRoute><HRPage /></ProtectedRoute>}>
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="competencies" element={<CompetenciesPage />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route index element={<Navigate to="employees" />} />
        </Route>

        <Route path="/logistics" element={<ProtectedRoute><LogisticsPage /></ProtectedRoute>} />

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
