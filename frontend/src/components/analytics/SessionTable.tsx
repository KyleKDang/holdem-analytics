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
      <div className="text-gray-400 text-center py-4 text-sm sm:text-base">
        Loading...
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4 text-sm sm:text-base">
        No sessions found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 sm:py-3 px-3 sm:px-4 text-gray-400 font-semibold text-xs sm:text-sm">
                Session
              </th>
              <th className="py-2 sm:py-3 px-3 sm:px-4 text-gray-400 font-semibold text-xs sm:text-sm">
                Date
              </th>
              <th className="py-2 sm:py-3 px-3 sm:px-4 text-gray-400 font-semibold text-center text-xs sm:text-sm">
                Hands
              </th>
              <th className="py-2 sm:py-3 px-3 sm:px-4 text-gray-400 font-semibold text-center text-xs sm:text-sm">
                W-L-T
              </th>
              <th className="py-2 sm:py-3 px-3 sm:px-4 text-gray-400 font-semibold text-center text-xs sm:text-sm">
                Win Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr
                key={session.session_id}
                className="border-b border-gray-700 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-2 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm">
                  {session.notes || `Session #${session.session_id}`}
                </td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 text-gray-300 text-xs sm:text-sm whitespace-nowrap">
                  {new Date(session.start_time).toLocaleDateString()}
                </td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 text-center text-white font-semibold text-xs sm:text-sm">
                  {session.total_hands}
                </td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 text-center text-gray-300 text-xs sm:text-sm whitespace-nowrap">
                  {session.wins}-{session.losses}-{session.ties}
                </td>
                <td className="py-2 sm:py-3 px-3 sm:px-4 text-center">
                  <span
                    className={`font-bold text-xs sm:text-sm ${
                      session.win_rate >= 50
                        ? "text-green-400"
                        : session.win_rate >= 40
                          ? "text-yellow-400"
                          : "text-red-400"
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
    </div>
  );
}
