import { create } from "zustand";
// import { persist } from 'zustand/middleware';

const config = {
  /**
   * UI CONFIGURATIONS
   */
  PAGE_SIZE: 40,
  SEARCH_PAGINATION_LIMIT: 1000,
  CURRENCY: "ETB",
  TOAST_ERROR_TIMEOUT: 3000,
  TOAST_SUCCESS_TIMEOUT: 1000,
  TOAST_DEFAULT_TIMEOUT: 2000,
  SEARCH_INPUT_DELAY: 400,
  STATUS_CODE_GROUP_VALIDATION: [409, 400],
  STATUS_CODE_GROUP_GENERAL: [401, 402, 403, 404, 500],
  AXIOS_JWT_AUTH_PARAM: "jwt",
  SCANNER_TERMINATOR: "Enter",
  SCANNER_DEBOUNCE_TIME: 300,
  UPGRADE_ALERT_TIME: 10 * 1000, // 10 seconds
  JWT_KEY_NAME: "token",
  user: null,
  SUBDOMAIN_POSITION: 0,
  tenantSubdomain: "", // Add a property to store the subdomain
};

type ConfigType = typeof config;

type ConfigStore = ConfigType & {
  /**
   * update configuration dynamically
   */
  updateConfigValue: <K extends keyof ConfigType>(
    key: K,
    value: Partial<ConfigType[K]>
  ) => unknown;
  getTenantNamespace: () => string;
  getPublicNamespace: () => string;
  setTenantSubDomain: (subdomain: string) => void;
  getTenantSubDomain: () => string;
};

export const useConfigStore = create<ConfigStore>((set, get) => ({
  ...config,
  updateConfigValue: async (key, value) => {
    console.log(get);
    set((state) => ({
      ...state,
      [key]: value,
    }));
  },
  setTenantSubDomain: (subdomain) => {
    set({ tenantSubdomain: subdomain });
  },
  getTenantSubDomain() {
    return get().tenantSubdomain;
  },
  getTenantNamespace() {
    return `tenant-${get().getTenantSubDomain()}`;
  },
  getPublicNamespace() {
    return `public-${get().getTenantSubDomain()}`;
  },
}));
