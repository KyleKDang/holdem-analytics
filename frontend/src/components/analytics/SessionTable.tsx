"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";

interface SessionData {
  session_id: number;
  notes: string | null;
  start_time: string;
  total_hands: number;
  wins: number;
  losses: number;
  ties: number;
  win_rate: number;
}

export default function SessionTable() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await api.get("/analytics/sessions");
      setSessions(response.data.sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-slate-500 text-sm text-center py-6">Loading...</p>
    );
  }

  if (sessions.length === 0) {
    return (
      <p className="text-slate-600 text-sm text-center py-6">
        No sessions found
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr style={{ borderBottom: "1px solid #1e2530" }}>
            {["Session", "Date", "Hands", "W · L · T", "Win Rate"].map(
              (h, i) => (
                <th
                  key={h}
                  className={`pb-3 text-[10px] uppercase tracking-[0.12em] text-slate-500 font-semibold ${
                    i >= 2 ? "text-center" : ""
                  } ${i === 0 ? "pr-4" : "px-4"}`}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr
              key={session.session_id}
              className="group transition-colors"
              style={{ borderBottom: "1px solid #13161d" }}
            >
              <td className="py-3 pr-4 text-sm text-white font-medium">
                {session.notes || `Session #${session.session_id}`}
              </td>
              <td className="py-3 px-4 text-sm text-slate-400 whitespace-nowrap">
                {new Date(session.start_time).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="py-3 px-4 text-sm text-white text-center tabular-nums font-medium">
                {session.total_hands}
              </td>
              <td className="py-3 px-4 text-center">
                <span className="text-xs tabular-nums text-slate-400">
                  <span className="text-emerald-400">{session.wins}</span>
                  {" · "}
                  <span className="text-rose-400">{session.losses}</span>
                  {" · "}
                  <span className="text-slate-500">{session.ties}</span>
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`text-sm font-bold tabular-nums ${
                    session.win_rate >= 50
                      ? "text-emerald-400"
                      : session.win_rate >= 40
                        ? "text-[#d4af37]"
                        : "text-rose-400"
                  }`}
                >
                  {session.win_rate.toFixed(1)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
