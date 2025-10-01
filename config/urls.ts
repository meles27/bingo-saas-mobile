export const urls = {
  // Base URL Generators
  getGlobalBaseUrl: () => "http://localhost.test:3000",
  getTenantBaseUrl: (subdomain?: string) =>
    `http://${subdomain ? subdomain + "." : ""}localhost.test:3000`,

  getSockBaseUrl: (subdomain?: string, namespace?: string) =>
    `http://${subdomain ? subdomain + "." : ""}localhost.test:3000/${
      namespace ? namespace : ""
    }`,

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
   * *************************** pharmacy related settings *********************
   */

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
