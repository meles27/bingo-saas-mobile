import { useAppSidebarStore } from "@/store/app-sidebar-store";

export function useSidebar() {
  const { isOpen, toggleSidebar, openSidebar, closeSidebar } =
    useAppSidebarStore();

  // Derived UI state
  const status = isOpen ? "expanded" : "collapsed";

  return {
    isOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    status,
  };
}
