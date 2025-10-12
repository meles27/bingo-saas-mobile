import { create } from "zustand";

const initialState = {
  tenantId: "764d0518-6c72-4393-a4d6-31c40992a7b1",
};

type TenantState = typeof initialState;

type TenantActions = {
  setTenantId: (tenantId: string) => void;
  reset: () => void;
};

type TenantStore = TenantState & TenantActions;

export const useTenantStore = create<TenantStore>((set) => ({
  ...initialState,
  setTenantId: (tenantId: string) => set({ tenantId }),
  reset: () => set(initialState),
}));
