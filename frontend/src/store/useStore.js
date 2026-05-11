import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { materializeSeed } from "@/data/roadmapSeed";

const DEFAULT_PERSONA = "transformation_manager";

const newId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "id_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
};

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

      // Roadmap items — global, filterable by moduleId
      roadmapItems: [],
      roadmapSeeded: false,

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
          reports: [{ id: newId(), createdAt: new Date().toISOString(), ...report }, ...s.reports].slice(0, 25),
        })),
      removeReport: (id) =>
        set((s) => ({ reports: s.reports.filter((r) => r.id !== id) })),

      // Roadmap CRUD
      seedRoadmapIfEmpty: () => {
        const s = get();
        if (!s.roadmapSeeded && s.roadmapItems.length === 0) {
          set({ roadmapItems: materializeSeed(), roadmapSeeded: true });
        }
      },
      resetRoadmap: () => set({ roadmapItems: materializeSeed(), roadmapSeeded: true }),
      addRoadmapItem: (item) =>
        set((s) => ({
          roadmapItems: [
            {
              id: newId(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              status: "backlog",
              priority: "medium",
              effort: "M",
              impact: "M",
              tags: [],
              ...item,
            },
            ...s.roadmapItems,
          ],
        })),
      updateRoadmapItem: (id, patch) =>
        set((s) => ({
          roadmapItems: s.roadmapItems.map((it) =>
            it.id === id ? { ...it, ...patch, updatedAt: new Date().toISOString() } : it
          ),
        })),
      removeRoadmapItem: (id) =>
        set((s) => ({ roadmapItems: s.roadmapItems.filter((it) => it.id !== id) })),
      moveRoadmapItem: (id, status) =>
        set((s) => ({
          roadmapItems: s.roadmapItems.map((it) =>
            it.id === id ? { ...it, status, updatedAt: new Date().toISOString() } : it
          ),
        })),
    }),
    {
      name: "aiops-os-store",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        theme: s.theme,
        persona: s.persona,
        sidebarCollapsed: s.sidebarCollapsed,
        maturityAnswers: s.maturityAnswers,
        observabilityInputs: s.observabilityInputs,
        roiInputs: s.roiInputs,
        reports: s.reports,
        roadmapItems: s.roadmapItems,
        roadmapSeeded: s.roadmapSeeded,
      }),
    }
  )
);
