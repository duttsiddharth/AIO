import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { PERSONAS } from "@/data/personas";
import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ModuleRoadmap from "@/components/ModuleRoadmap";

export default function Personas() {
  const navigate = useNavigate();
  const current = useStore((s) => s.persona);
  const setPersona = useStore((s) => s.setPersona);
  return (
    <div data-testid="page-personas">
      <PageHeader
        overline="Persona Operating Surfaces"
        title="One platform · eight operational lenses."
        subtitle="Each persona reshapes KPIs, terminology, narrative, and starting workspace — without splintering the source of truth."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PERSONAS.map((p) => {
          const Icon = p.icon;
          const isActive = current === p.id;
          return (
            <SectionCard
              key={p.id}
              testId={`persona-card-${p.id}`}
              className={cn(isActive && "ring-2 ring-primary")}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                {isActive && <StatusBadge tone="ok"><CheckCircle2 className="h-3 w-3" /> Active</StatusBadge>}
              </div>
              <p className="overline text-primary">{p.label}</p>
              <h3 className="font-heading text-lg leading-tight mt-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{p.focus}</p>
              <p className="text-sm mt-3 italic">"{p.tagline}"</p>
              <div className="mt-4 pt-3 border-t border-border space-y-1.5">
                <p className="overline text-muted-foreground">Primary KPIs</p>
                <ul className="text-xs text-foreground/80 space-y-0.5">
                  {p.primaryKpis.map((k) => (
                    <li key={k} className="font-mono">· {k.replace(/_/g, " ")}</li>
                  ))}
                </ul>
              </div>
              <Button
                className="w-full mt-4"
                size="sm"
                variant={isActive ? "outline" : "default"}
                onClick={() => {
                  setPersona(p.id);
                  navigate(p.landing);
                }}
                data-testid={`activate-${p.id}`}
              >
                {isActive ? "Open workspace" : "Switch & open"} <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </SectionCard>
          );
        })}
      </div>

      <ModuleRoadmap moduleId="personas" />
    </div>
  );
}
