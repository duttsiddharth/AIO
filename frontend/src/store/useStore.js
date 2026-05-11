import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const DEFAULT_PERSONA = "transformation_manager";

export const useStore = create(
  persist(
    (set, get) => ({
      theme: "dark",
      persona: DEFAULT_PERSONA,
      sidebarCollapsed: false,
      organization: {
        name: "Helios Global Operations",
        industry: "Telecommunications",
        regions: 14,
        services: 318,
      },

      // Maturity self-assessment answers persisted across sessions
      maturityAnswers: {},
      // Observability generator inputs
      observabilityInputs: {
        cloudModel: "hybrid",
        industry: "telecom",
        environment: "production",
        compliance: "high",
        k8s: true,
        scale: "enterprise",
      },
      // ROI inputs
      roiInputs: {
        ticketsPerMonth: 12500,
        avgHandleMinutes: 42,
        engineerHourlyCost: 92,
        currentAutomationPct: 18,
        targetAutomationPct: 62,
        toolingSpendAnnual: 4200000,
        cloudSpendAnnual: 18500000,
        mttrCurrentMinutes: 78,
        mttrTargetMinutes: 28,
      },
      // Saved report snapshots
      reports: [],

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      setPersona: (persona) => set({ persona }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

      setMaturityAnswer: (key, value) =>
        set((s) => ({ maturityAnswers: { ...s.maturityAnswers, [key]: value } })),
      resetMaturity: () => set({ maturityAnswers: {} }),

      setObservabilityInput: (key, value) =>
        set((s) => ({ observabilityInputs: { ...s.observabilityInputs, [key]: value } })),

      setROIInput: (key, value) =>
        set((s) => ({ roiInputs: { ...s.roiInputs, [key]: Number(value) || 0 } })),

      addReport: (report) =>
        set((s) => ({
          reports: [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...report }, ...s.reports].slice(0, 25),
        })),
      removeReport: (id) =>
        set((s) => ({ reports: s.reports.filter((r) => r.id !== id) })),
    }),
    {
      name: "aiops-os-store",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        theme: s.theme,
        persona: s.persona,
        sidebarCollapsed: s.sidebarCollapsed,
        maturityAnswers: s.maturityAnswers,
        observabilityInputs: s.observabilityInputs,
        roiInputs: s.roiInputs,
        reports: s.reports,
      }),
    }
  )
);
