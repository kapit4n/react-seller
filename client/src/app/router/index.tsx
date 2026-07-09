import {lazy} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {ProtectedRoute} from './ProtectedRoute'

const AppLayout = lazy(() => import('@/app/layouts/AppLayout').then((m) => ({default: m.AppLayout})))
const AuthLayout = lazy(() => import('@/app/layouts/AuthLayout').then((m) => ({default: m.AuthLayout})))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))
const ProductListPage = lazy(() => import('@/features/products/pages/ProductListPage'))
const ProductShowPage = lazy(() => import('@/features/products/pages/ProductShowPage'))
const ProductAddPage = lazy(() => import('@/features/products/pages/ProductAddPage'))
const ProductEditPage = lazy(() => import('@/features/products/pages/ProductEditPage'))
const CustomerListPage = lazy(() => import('@/features/customers/pages/CustomerListPage'))
const CustomerShowPage = lazy(() => import('@/features/customers/pages/CustomerShowPage'))
const CustomerAddPage = lazy(() => import('@/features/customers/pages/CustomerAddPage'))
const CustomerEditPage = lazy(() => import('@/features/customers/pages/CustomerEditPage'))
const VendorListPage = lazy(() => import('@/features/vendors/pages/VendorListPage'))
const VendorShowPage = lazy(() => import('@/features/vendors/pages/VendorShowPage'))
const VendorAddPage = lazy(() => import('@/features/vendors/pages/VendorAddPage'))
const VendorEditPage = lazy(() => import('@/features/vendors/pages/VendorEditPage'))
const CartCurrentPage = lazy(() => import('@/features/sales/pages/CartCurrentPage'))
const CartListPage = lazy(() => import('@/features/sales/pages/CartListPage'))
const CartShowPage = lazy(() => import('@/features/sales/pages/CartShowPage'))
const NotFoundPage = lazy(() => import('@/features/dashboard/pages/NotFoundPage'))

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/products" element={<ProductListPage />} />
        <Route path="/dashboard/products/new" element={<ProductAddPage />} />
        <Route path="/dashboard/products/:id" element={<ProductShowPage />} />
        <Route path="/dashboard/products/:id/edit" element={<ProductEditPage />} />
        <Route path="/dashboard/customers" element={<CustomerListPage />} />
        <Route path="/dashboard/customers/new" element={<CustomerAddPage />} />
        <Route path="/dashboard/customers/:id" element={<CustomerShowPage />} />
        <Route path="/dashboard/customers/:id/edit" element={<CustomerEditPage />} />
        <Route path="/dashboard/vendors" element={<VendorListPage />} />
        <Route path="/dashboard/vendors/new" element={<VendorAddPage />} />
        <Route path="/dashboard/vendors/:id" element={<VendorShowPage />} />
        <Route path="/dashboard/vendors/:id/edit" element={<VendorEditPage />} />
        <Route path="/dashboard/sales" element={<CartListPage />} />
        <Route path="/dashboard/sales/current" element={<CartCurrentPage />} />
        <Route path="/dashboard/sales/:id" element={<CartShowPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
