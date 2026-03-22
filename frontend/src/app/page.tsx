"use client";

import { useState, useEffect } from "react";
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  PointerSensor, TouchSensor, useSensor, useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";

import api from "@/services/api";
import Card from "@/components/Card";
import Deck from "@/components/Deck";
import DroppableArea from "@/components/DroppableArea";
import ResultsPanel from "@/components/ResultsPanel";
import HandLoggerModal from "@/components/HandLoggerModal";

type Odds = { win: number; tie: number; loss: number };

const suits = ["S", "H", "D", "C"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

export default function HomePage() {
  const [deck, setDeck] = useState<string[]>([]);
  const [holeCards, setHoleCards] = useState<string[]>([]);
  const [boardCards, setBoardCards] = useState<string[]>([]);
  const [numOpponents, setNumOpponents] = useState<number>(1);
  const [handRank, setHandRank] = useState<string>();
  const [odds, setOdds] = useState<Odds | null>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showLogger, setShowLogger] = useState(false);
  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const [showDisabledMessage, setShowDisabledMessage] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 10 } }),
  );

  useEffect(() => {
    setDeck(suits.flatMap((s) => ranks.map((r) => r + s)));
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const sortDeck = (deck: string[]) =>
    deck.sort((a, b) => {
      const rankA = ranks.indexOf(a[0]), rankB = ranks.indexOf(b[0]);
      const suitA = suits.indexOf(a[1]), suitB = suits.indexOf(b[1]);
      return suitA - suitB || rankA - rankB;
    });

  const handleDragStart = (event: DragStartEvent) =>
    setActiveCard(event.active.id.toString().replace("deck-", ""));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);
    if (!over) return;
    const cardCode = active.id.toString().replace("deck-", "");
    const fromHole = holeCards.includes(cardCode);
    const fromBoard = boardCards.includes(cardCode);
    const fromDeck = deck.includes(cardCode);

    switch (over.id) {
      case "hole":
        if (holeCards.length < 2 && !fromHole) {
          setHoleCards((prev) => [...prev, cardCode]);
          if (fromBoard) setBoardCards((prev) => prev.filter((c) => c !== cardCode));
          if (fromDeck) setDeck((prev) => prev.filter((c) => c !== cardCode));
        }
        break;
      case "board":
        if (boardCards.length < 5 && !fromBoard) {
          setBoardCards((prev) => [...prev, cardCode]);
          if (fromHole) setHoleCards((prev) => prev.filter((c) => c !== cardCode));
          if (fromDeck) setDeck((prev) => prev.filter((c) => c !== cardCode));
        }
        break;
      case "deck":
        if (!fromDeck) {
          setDeck((prev) => sortDeck([...prev, cardCode]));
          if (fromHole) setHoleCards((prev) => prev.filter((c) => c !== cardCode));
          if (fromBoard) setBoardCards((prev) => prev.filter((c) => c !== cardCode));
        }
        break;
    }
  };

  const evaluateHand = async () => {
    try {
      const response = await api.post("/tools/evaluate", { hole_cards: holeCards, board_cards: boardCards });
      setHandRank(response.data.hand);
    } catch (err) { console.log(err); }
  };

  const calculateOdds = async () => {
    setIsCalculating(true);
    try {
      const response = await api.post("/tools/odds", { hole_cards: holeCards, board_cards: boardCards, num_opponents: numOpponents });
      setOdds(response.data);
    } catch (err) { console.log(err); }
    finally { setIsCalculating(false); }
  };

  const isLogHandDisabled = !isLoggedIn || holeCards.length !== 2 || boardCards.length < 3;

  const handleLogHandClick = () => {
    if (isLogHandDisabled) {
      setShowDisabledMessage(true);
      setTimeout(() => setShowDisabledMessage(false), 3000);
      return;
    }
    if (!localStorage.getItem("token")) {
      setShowAuthMessage(true);
      setTimeout(() => setShowAuthMessage(false), 3000);
      return;
    }
    setShowLogger(true);
  };

  const getLogHandTooltip = () => {
    if (!isLoggedIn) return "Sign in to save hands";
    if (holeCards.length !== 2) return "Select 2 hole cards first";
    if (boardCards.length < 3) return "Select at least 3 board cards";
    return "";
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-[calc(100vh-65px)] p-4 sm:p-6 bg-[#080a0d]">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Top row: Controls + Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Setup — order-2 on mobile so droppables sit below results */}
            <div className="rounded-xl bg-[#0e1117] border border-[#1e2530] p-5 flex flex-col justify-between gap-5 order-2 lg:order-1">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold mb-3">
                  Opponents
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={9}
                    value={numOpponents}
                    onChange={(e) => setNumOpponents(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-[#1e2530] rounded-full appearance-none cursor-pointer accent-[#d4af37]"
                  />
                  <span className="text-[#d4af37] font-bold text-lg tabular-nums min-w-[24px] text-right">
                    {numOpponents}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold mb-2">
                  Hole Cards
                </p>
                <DroppableArea id="hole" cards={holeCards} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold mb-2">
                  Board Cards
                </p>
                <DroppableArea id="board" cards={boardCards} />
              </div>
            </div>

            {/* Right: Results + Actions — order-1 on mobile so it appears first */}
            <div className="flex flex-col gap-4 order-1 lg:order-2">
              <ResultsPanel handRank={handRank} odds={odds} isCalculating={isCalculating} />

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={evaluateHand}
                  className="px-3 py-2.5 rounded-lg bg-[#0e1117] border border-[#1e2530] text-white text-sm font-medium hover:border-[#d4af37]/30 hover:text-[#d4af37] transition-all duration-150"
                >
                  Evaluate
                </button>
                <button
                  onClick={calculateOdds}
                  disabled={isCalculating}
                  className="px-3 py-2.5 rounded-lg bg-[#0e1117] border border-[#1e2530] text-white text-sm font-medium hover:border-[#d4af37]/30 hover:text-[#d4af37] disabled:opacity-40 transition-all duration-150"
                >
                  {isCalculating ? "Calculating…" : "Calculate Odds"}
                </button>
                <button
                  onClick={handleLogHandClick}
                  className="px-3 py-2.5 rounded-lg bg-[#0e1117] border border-[#1e2530] text-white text-sm font-medium hover:border-[#d4af37]/30 hover:text-[#d4af37] transition-all duration-150"
                >
                  Log Hand
                </button>
              </div>
            </div>
          </div>

          {/* Deck */}
          <div className="rounded-xl bg-[#0e1117] border border-[#1e2530] p-5">
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-semibold mb-3">
              Deck — drag cards to set up your hand
            </p>
            <Deck deck={deck} />
          </div>
        </div>
      </div>

      {/* Toasts */}
      {showDisabledMessage && (
        <div className="fixed bottom-6 right-6 left-6 sm:left-auto sm:w-auto bg-[#0e1117] border border-[#d4af37]/30 text-[#d4af37] px-5 py-3 rounded-xl shadow-xl z-50 text-sm font-medium">
          {getLogHandTooltip()}
        </div>
      )}
      {showAuthMessage && (
        <div className="fixed bottom-6 right-6 bg-[#0e1117] border border-rose-500/30 text-rose-400 px-5 py-3 rounded-xl shadow-xl z-50 text-sm font-medium">
          Sign in to save hands
        </div>
      )}

      <HandLoggerModal
        isOpen={showLogger}
        onClose={() => setShowLogger(false)}
        holeCards={holeCards}
        boardCards={boardCards}
      />

      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeCard ? <Card code={activeCard} id={`overlay-${activeCard}`} size={72} /> : null}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}