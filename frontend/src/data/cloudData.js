// Cloud Operations Transformation data

export const CLOUD_SCORECARD = [
  { id: "aws", label: "AWS Operations", maturity: 72, trend: "+6", topGap: "FinOps chargeback maturity" },
  { id: "azure", label: "Azure Operations", maturity: 68, trend: "+4", topGap: "Hybrid identity automation" },
  { id: "gcp", label: "GCP Operations", maturity: 51, trend: "+2", topGap: "Limited service footprint" },
  { id: "k8s", label: "Kubernetes Readiness", maturity: 78, trend: "+9", topGap: "Multi-tenant cost allocation" },
  { id: "iac", label: "IaC Maturity", maturity: 81, trend: "+12", topGap: "Drift remediation automation" },
  { id: "finops", label: "FinOps Maturity", maturity: 58, trend: "+8", topGap: "Engineering-level showback" },
  { id: "governance", label: "Cloud Governance", maturity: 74, trend: "+5", topGap: "Cross-cloud policy parity" },
];

export const CLOUD_EFFICIENCY_TREND = [
  { quarter: "Q1", efficiency: 58, optimized: 220 },
  { quarter: "Q2", efficiency: 62, optimized: 380 },
  { quarter: "Q3", efficiency: 68, optimized: 620 },
  { quarter: "Q4", efficiency: 74, optimized: 940 },
  { quarter: "Q1+1", efficiency: 79, optimized: 1280 },
  { quarter: "Q2+1", efficiency: 84, optimized: 1620 },
];

export const REGION_FOOTPRINT = [
  { region: "US-East", services: 84, availability: 99.96, spend: 6.4 },
  { region: "US-West", services: 62, availability: 99.93, spend: 4.8 },
  { region: "EU-West", services: 51, availability: 99.91, spend: 3.6 },
  { region: "AP-South", services: 38, availability: 99.84, spend: 2.1 },
  { region: "AP-Southeast", services: 44, availability: 99.88, spend: 2.7 },
  { region: "ME-Central", services: 21, availability: 99.78, spend: 1.4 },
];
