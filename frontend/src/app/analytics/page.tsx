"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import api from "@/services/api";
import WinRateChart from "@/components/analytics/WinRateChart";
import PositionChart from "@/components/analytics/PositionChart";
import ActionChart from "@/components/analytics/ActionChart";
import SessionTable from "@/components/analytics/SessionTable";
import StatsCards from "@/components/analytics/StatsCards";
import StyleProfile from "@/components/analytics/StyleProfile";

interface DashboardData {
  overall: {
    total_hands: number;
    win_rate: number;
    wins: number;
    losses: number;
    ties: number;
    total_sessions: number;
    vpip: number;
    aggression_factor: number;
  };
  positions: {
    positions: Array<{
      position: string;
      total_hands: number;
      wins: number;
      losses: number;
      ties: number;
      win_rate: number;
    }>;
  };
  actions: {
    actions: Array<{
      action: string;
      total_hands: number;
      wins: number;
      losses: number;
      ties: number;
      win_rate: number;
      distribution: number;
    }>;
  };
  timeline: {
    timeline: Array<{
      hand_number: number;
      date: string;
      win_rate: number;
      cumulative_wins: number;
      cumulative_hands: number;
    }>;
  };
  style: {
    vpip: number;
    aggression_factor: number;
    fold_frequency: number;
    raise_frequency: number;
    tight_loose: string;
    passive_aggressive: string;
    style_rating: string;
  };
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-[#0e1117] border border-[#1e2530] p-5">
      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/analytics/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-65px)] bg-[#080a0d] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  if (!dashboardData || dashboardData.overall.total_hands === 0) {
    return (
      <div className="min-h-[calc(100vh-65px)] bg-[#080a0d] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-[#0e1117] border border-[#1e2530] flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-5 h-5 text-slate-600" />
          </div>
          <p className="text-white font-medium mb-1">No data yet</p>
          <p className="text-slate-500 text-sm">
            Start logging hands to see your analytics
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-65px)] p-4 sm:p-8 bg-[#080a0d]">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-sm text-slate-500">
            {dashboardData.overall.total_hands} hands across{" "}
            {dashboardData.overall.total_sessions} sessions
          </p>
        </div>

        <StatsCards stats={dashboardData.overall} />

        <SectionCard title="Win Rate Over Time">
          <WinRateChart data={dashboardData.timeline.timeline} />
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SectionCard title="Win Rate by Position">
            <PositionChart data={dashboardData.positions.positions} />
          </SectionCard>
          <SectionCard title="Action Distribution">
            <ActionChart data={dashboardData.actions.actions} />
          </SectionCard>
        </div>

        <SectionCard title="Playing Style">
          <StyleProfile style={dashboardData.style} />
        </SectionCard>

        <SectionCard title="Recent Sessions">
          <SessionTable />
        </SectionCard>
      </div>
    </div>
  );
}
