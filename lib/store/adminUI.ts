import { create } from 'zustand';

interface AdminUIState {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
}

export const useAdminUIStore = create<AdminUIState>((set) => ({
    sidebarOpen: false, // Hidden by default on mobile? Actually on desktop it's always visible. This state is mostly for mobile toggle.
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
