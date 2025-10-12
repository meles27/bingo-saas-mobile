export const urls = {
  // Base API URL for all requests
  getGlobalBaseUrl: () => "http://localhost.test:3000",

  // Base API URL (tenant-independent)
  getTenantBaseUrl: () => "http://localhost.test:3000",

  // Socket.io URL (no namespace/subdomain)
  getSockBaseUrl: () => `http://localhost.test:3000`,

  /**
   * =================================================================
   *                     GLOBAL API ENDPOINTS
   * =================================================================
   */
  getTenantsUrl: () => "/api/v1/global/tenants",

  /**
   * =================================================================
   *                     TENANT SPECIFIC API ENDPOINTS
   * =================================================================
   */
  // Auth
  getAuthTokenUrl: () => "/api/v1/tenant/auth/token",
  getAuthRefreshTokenUrl: () => "/api/v1/tenant/auth/token/refresh",
  getAuthForgetPasswordUrl: () => "/api/v1/tenant/auth/reset-password",
  getAuthConfirmForgetPasswordUrl: () =>
    "/api/v1/tenant/auth/confirm-reset-password",

  // Users
  getUsersUrl: () => "/api/v1/tenant/users",
  getUserUrl: (userId: string) => `/api/v1/tenant/users/${userId}`,
  getActivateUserUrl: (userId: string) =>
    `/api/v1/tenant/users/${userId}/activate`,
  getChangeUserStatusUrl: (userId: string) =>
    `/api/v1/tenant/users/${userId}/change-status`,
  getChangeUserRoleUrl: (userId: string) =>
    `/api/v1/tenant/users/${userId}/change-role`,

  // transction and wallet
  getTransactionsUrl: () => "/api/v1/tenant/transactions",

  getMyWalleteUrl: () => `/api/v1/tenant/wallet/balance`,

  getUserWalletUrl: (userId: string) =>
    `/api/v1/tenant/wallet/user/${userId}/balance`,

  getDepositUrl: () => `/api/v1/tenant/wallet/deposit`,

  getWithdrawUrl: () => `/api/v1/tenant/wallet/withdraw`,
  // Tenant Settings

  getTenantSettingsUrl: () => "/api/v1/tenant/settings",
  getUpgradePlanUrl: () => "/api/v1/tenant/settings/upgrade-plan",

  // Roles
  getRolesUrl: () => "/api/v1/tenant/roles",
  getRoleUrl: (roleId: string) => `/api/v1/tenant/roles/${roleId}`,
  getRolePermissionsUrl: (roleId: string) =>
    `/api/v1/tenant/roles/${roleId}/permissions`,

  // Permissions
  getPermissionsUrl: () => "/api/v1/tenant/permissions",
  getPermissionUrl: (permissionId: string) =>
    `/api/v1/tenant/permissions/${permissionId}`,

  /**
   * *************************** bingo related settings *********************
   */
  // Permissions
  getPatternsUrl: () => "/api/v1/tenant/patterns",
  getPatternUrl: (patternId: string) => `/api/v1/tenant/patterns/${patternId}`,

  getCardTemplatesUrl: () => "/api/v1/tenant/card-templates",
  getCardTemplateUrl: (cardTemplateId: string) =>
    `/api/v1/tenant/card-templates/${cardTemplateId}`,

  getGamesUrl: () => "/api/v1/tenant/games",
  getActiveGameUrl: () => "/api/v1/tenant/games/active-game",
  getGameUrl: (gameId: string) => `/api/v1/tenant/games/${gameId}`,
  getGameCardsUrl: (gameId: string) => `/api/v1/tenant/games/${gameId}/cards`,
  getGameCardUrl: (gameId: string, cardId: string) =>
    `/api/v1/tenant/games/${gameId}/cards/${cardId}`,
  getGameCallsUrl: (gameId: string) =>
    `/api/v1/tenant/games/${gameId}/bingo-calls`,
  getGameCallUrl: (gameId: string, callId: string) =>
    `/api/v1/tenant/games/${gameId}/bingo-calls/${callId}`,
  getGameWinnersUrl: (gameId: string) =>
    `/api/v1/tenant/games/${gameId}/winners`,
  getGameWinnerUrl: (gameId: string, winnerId: string) =>
    `/api/v1/tenant/games/${gameId}/winners/${winnerId}`,

  /**
   * =================================================================
   *                      STATIC CONFIGURATION VALUES
   * =================================================================
   */
  DEFAULT_ACCESS_TOKEN: "",
  DEFAULT_REFRESH_TOKEN: "",

  // Frontend Paths
  USER_LOGIN_REDIRECT: "/",
  ADMIN_LOGIN_REDIRECT: "/dashboard",
  LOGOUT_REDIRECT: "/signin",

  // Tenant Identifier
  TENANT_IDENTIFIER: "subdomain",

  // currency options
  CurrencyOptions: ["ETB", "USD", "EUR", "GBP"],
};
