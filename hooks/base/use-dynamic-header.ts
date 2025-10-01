import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

export interface HeaderConfig {
  id: string;
  title: string;
  showBackButton: boolean;
  path: string; // use express-style paths for readability
}

export const PATH_CONFIG: HeaderConfig[] = [
  { id: 'home', path: '/', title: 'Prana Pharmacy', showBackButton: true },
  {
    id: 'pharmacies',
    path: '/pharmacies',
    title: 'Pharmacies Nearby',
    showBackButton: true
  },
  {
    id: 'pharmacy-detail',
    path: '/pharmacies/:id',
    title: 'Pharmacy Details',
    showBackButton: true
  },
  {
    id: 'search',
    path: '/search',
    title: 'Search Results',
    showBackButton: true
  },
  {
    id: 'inventory',
    path: '/inventory',
    title: 'Inventory',
    showBackButton: true
  },
  {
    id: 'map',
    path: '/map',
    title: 'Map',
    showBackButton: true
  },

  // --dashboard routes--
  {
    id: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    showBackButton: true
  },
  {
    id: 'roles',
    path: '/dashboard/roles',
    title: 'Roles',
    showBackButton: true
  },

  {
    id: 'users',
    path: '/dashboard/users',
    title: 'Credentials',
    showBackButton: true
  },
  {
    id: 'profile',
    path: '/dashboard/profile',
    title: 'My Profile',
    showBackButton: true
  },
  {
    id: 'favorites',
    path: '/dashboard/favorites',
    title: 'Favorites',
    showBackButton: true
  }
];

const DEFAULT_CONFIG: HeaderConfig = {
  id: 'default',
  title: 'Pharmacy App',
  showBackButton: true,
  path: '*'
};

/**
 * Hook: returns dynamic header config based on the current route
 */
export const useDynamicHeader = (): HeaderConfig => {
  const { pathname } = useLocation();

  return useMemo(() => {
    const match = PATH_CONFIG.find((config) =>
      matchPath({ path: config.path, end: true }, pathname)
    );
    return match ?? DEFAULT_CONFIG;
  }, [pathname]);
};
