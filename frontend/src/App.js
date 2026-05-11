import "@/App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import DashboardLayout from "@/layouts/DashboardLayout";
import ExecutiveCommandCenter from "@/pages/ExecutiveCommandCenter";
import MaturityAssessment from "@/pages/MaturityAssessment";
import ObservabilityArchitecture from "@/pages/ObservabilityArchitecture";
import IncidentMTTR from "@/pages/IncidentMTTR";
import AutomationDiscovery from "@/pages/AutomationDiscovery";
import PredictiveIntelligence from "@/pages/PredictiveIntelligence";
import ITILTransformation from "@/pages/ITILTransformation";
import CloudOperations from "@/pages/CloudOperations";
import NOCTelecom from "@/pages/NOCTelecom";
import SREReliability from "@/pages/SREReliability";
import BuildBuyPartner from "@/pages/BuildBuyPartner";
import ROICalculator from "@/pages/ROICalculator";
import Governance from "@/pages/Governance";
import ReportExport from "@/pages/ReportExport";
import Personas from "@/pages/Personas";
import DeliveryKit from "@/pages/DeliveryKit";
import { Toaster } from "@/components/ui/sonner";

function ThemeBoot({ children }) {
  const theme = useStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);
  return children;
}

function App() {
  return (
    <ThemeBoot>
      <div className="app-shell font-sans antialiased">
        <HashRouter>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Navigate to="/command-center" replace />} />
              <Route path="/command-center" element={<ExecutiveCommandCenter />} />
              <Route path="/maturity" element={<MaturityAssessment />} />
              <Route path="/observability" element={<ObservabilityArchitecture />} />
              <Route path="/incidents" element={<IncidentMTTR />} />
              <Route path="/automation" element={<AutomationDiscovery />} />
              <Route path="/predictive" element={<PredictiveIntelligence />} />
              <Route path="/itil" element={<ITILTransformation />} />
              <Route path="/cloud" element={<CloudOperations />} />
              <Route path="/noc" element={<NOCTelecom />} />
              <Route path="/sre" element={<SREReliability />} />
              <Route path="/build-buy-partner" element={<BuildBuyPartner />} />
              <Route path="/roi" element={<ROICalculator />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/reports" element={<ReportExport />} />
              <Route path="/personas" element={<Personas />} />
              <Route path="/delivery-kit" element={<DeliveryKit />} />
              <Route path="*" element={<Navigate to="/command-center" replace />} />
            </Route>
          </Routes>
        </HashRouter>
        <Toaster position="bottom-right" richColors />
      </div>
    </ThemeBoot>
  );
}

export default App;
