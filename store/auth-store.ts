import { urls } from "@/config/urls";
import { UserProfileEntity, UserStatus } from "@/types/api/base/user.type";
import { tenantAxiosInstance } from "@/utils/interceptors";
import { universalStorage } from "@/utils/storage-adapter";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { create } from "zustand";

// --- TYPE DEFINITIONS (Unchanged) ---
export interface AuthToken {
  access: string;
  refresh: string;
}
export interface Permissions {
  global: string[];
}
export interface AuthResponse {
  token: AuthToken;
  permissions: Permissions;
  user: UserProfileEntity;
  isSystemUser: boolean;
}
export interface UserJwtPayload extends JwtPayload {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  tenantId: string;
  subdomain: string;
}
type AsyncState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
};
type AsyncResult<T, E = unknown> = [T | null, E | null];

// --- PERSISTENCE LOGIC ---
const AUTH_STORAGE_KEY = "auth-state";

type PersistedAuthState = {
  token: AuthToken | null;
  user: UserProfileEntity | null;
  permissions: Permissions | null;
  isSystemUser: boolean;
};

// --- STORE DEFINITION ---
type AuthStore = PersistedAuthState & {
  loginState: AsyncState;
  refreshState: AsyncState;
  // ACTIONS
  hydrate: () => Promise<void>; // Action to load state from storage on the client
  login: (
    username: string,
    password: string
  ) => Promise<AsyncResult<AuthResponse>>;
  logout: () => Promise<void>;
  refresh: () => Promise<AsyncResult<AuthResponse>>;
  checkPermission: (permission: string) => boolean;
  // GETTERS
  decodeJwtToken: (token: string | undefined) => UserJwtPayload | null;
  isAccessExpired: () => boolean;
  isRefreshExpired: () => boolean;
  isAuthenticated: () => boolean;
};

const initialAsyncState: AsyncState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

// The default state for the store, used on the server and before client-side hydration.
const initialState: PersistedAuthState & {
  loginState: AsyncState;
  refreshState: AsyncState;
} = {
  token: null,
  user: null,
  isSystemUser: false,
  permissions: null,
  loginState: initialAsyncState,
  refreshState: initialAsyncState,
};

// --- STORE IMPLEMENTATION ---
export const useAuthStore = create<AuthStore>()((set, get) => {
  /**
   * A custom implementation of `set` that automatically saves the state to storage.
   */
  const setWithPersistence = async (newState: Partial<AuthStore>) => {
    set(newState);
    const stateToPersist: PersistedAuthState = {
      token: get().token,
      user: get().user,
      permissions: get().permissions,
      isSystemUser: get().isSystemUser,
    };
    await universalStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(stateToPersist)
    );
  };

  return {
    ...initialState,

    hydrate: async () => {
      try {
        const storedState = await universalStorage.getItem(AUTH_STORAGE_KEY);
        if (storedState && typeof storedState === "string") {
          const persistedState = JSON.parse(storedState) as PersistedAuthState;
          set(persistedState);
        }
      } catch (e) {
        console.error("Failed to hydrate auth state from storage.", e);
      }
    },

    login: async (username, password) => {
      set({ loginState: { ...initialAsyncState, isLoading: true } });
      try {
        const response = await tenantAxiosInstance.post<AuthResponse>(
          urls.getAuthTokenUrl(),
          { username, password }
        );
        await setWithPersistence({
          token: response.data.token,
          user: response.data.user,
          isSystemUser: response.data.isSystemUser,
          permissions: response.data.permissions,
          loginState: { ...initialAsyncState, isSuccess: true },
        });
        return [response.data, null];
      } catch (error: any) {
        const errorMessage = error.response?.data?.detail || "Login failed.";
        set({
          ...initialState,
          loginState: {
            ...initialAsyncState,
            isError: true,
            error: errorMessage,
          },
        });
        await universalStorage.removeItem(AUTH_STORAGE_KEY);
        return [null, error];
      }
    },

    logout: async () => {
      set(initialState);
      await universalStorage.removeItem(AUTH_STORAGE_KEY);
    },

    refresh: async () => {
      const currentToken = get().token;
      if (get().refreshState.isLoading || !currentToken?.refresh) {
        return [null, { message: "Refresh not possible." }];
      }
      set({ refreshState: { ...initialAsyncState, isLoading: true } });
      try {
        const response = await tenantAxiosInstance.post<AuthResponse>(
          urls.getAuthRefreshTokenUrl(),
          { refresh: currentToken.refresh }
        );
        await setWithPersistence({
          token: response.data.token,
          user: response.data.user,
          isSystemUser: response.data.isSystemUser,
          permissions: response.data.permissions,
          refreshState: { ...initialAsyncState, isSuccess: true },
        });
        return [response.data, null];
      } catch (error: any) {
        await get().logout(); // Logout will clear state and storage.
        set({
          refreshState: {
            ...initialAsyncState,
            isError: true,
            error: "Session expired.",
          },
        });
        return [null, error];
      }
    },

    // --- GETTERS (updated for null safety) ---
    checkPermission: (permission) =>
      get().permissions?.global.includes(permission) ?? false,

    decodeJwtToken: (token) => {
      if (!token) return null;
      try {
        return jwtDecode<UserJwtPayload>(token);
      } catch (e) {
        return null;
      }
    },

    isAccessExpired: () => {
      const decoded = get().decodeJwtToken(get().token?.access);
      if (!decoded?.exp) return true;
      return decoded.exp < Date.now() / 1000;
    },

    isRefreshExpired: () => {
      const decoded = get().decodeJwtToken(get().token?.refresh);
      if (!decoded?.exp) return true;
      return decoded.exp < Date.now() / 1000;
    },

    isAuthenticated: () => {
      const hasToken = !!get().token?.access;
      return hasToken && !get().isAccessExpired();
    },
  };
});
