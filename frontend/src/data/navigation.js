// Navigation manifest for the AIOps Transformation OS sidebar
import {
  LayoutDashboard,
  Gauge,
  Network,
  AlertTriangle,
  Workflow,
  Sparkles,
  Layers,
  Cloud,
  Radio,
  ShieldCheck,
  Scale,
  Calculator,
  Lock,
  FileText,
  Users,
  Rocket,
} from "lucide-react";

export const NAV_GROUPS = [
  {
    label: "Command",
    items: [
      { id: "command-center", label: "Executive Command", icon: LayoutDashboard, path: "/command-center", badge: "LIVE" },
      { id: "maturity", label: "Maturity Assessment", icon: Gauge, path: "/maturity" },
    ],
  },
  {
    label: "Operate",
    items: [
      { id: "observability", label: "Observability Arch.", icon: Network, path: "/observability" },
      { id: "incidents", label: "Incidents & MTTR", icon: AlertTriangle, path: "/incidents" },
      { id: "automation", label: "Automation Discovery", icon: Workflow, path: "/automation" },
      { id: "predictive", label: "Predictive Intelligence", icon: Sparkles, path: "/predictive", badge: "AI" },
    ],
  },
  {
    label: "Transform",
    items: [
      { id: "itil", label: "ITIL Transformation", icon: Layers, path: "/itil" },
      { id: "cloud", label: "Cloud Operations", icon: Cloud, path: "/cloud" },
      { id: "noc", label: "NOC / Telecom", icon: Radio, path: "/noc" },
      { id: "sre", label: "SRE Reliability", icon: ShieldCheck, path: "/sre" },
    ],
  },
  {
    label: "Strategy",
    items: [
      { id: "delivery-kit", label: "Delivery Kit", icon: Rocket, path: "/delivery-kit", badge: "NEW" },
      { id: "build-buy-partner", label: "Build · Buy · Partner", icon: Scale, path: "/build-buy-partner" },
      { id: "roi", label: "ROI Calculator", icon: Calculator, path: "/roi" },
      { id: "governance", label: "Governance & Compliance", icon: Lock, path: "/governance" },
      { id: "reports", label: "Executive Reports", icon: FileText, path: "/reports" },
      { id: "personas", label: "Personas", icon: Users, path: "/personas" },
    ],
  },
];
