import React, { useState } from "react";
import type { PhonemeToken } from "./types/elkonin";

export default function App() {
  const targetWord = "chat";

  // local state management for phonics scaffolding
  const [tokens, setTokens] = useState<PhonemeToken[]>([
    { id: "t1", sound: "ch", isPlaced: false },
    { id: "t2", sound: "a", isPlaced: false },
    { id: "t3", sound: "t", isPlaced: false },
  ]);

  // drag and drop handlers
  const handleDragStart = (e: React.DragEvent, tokenId: string) => {
    e.dataTransfer.setData("text/plain", tokenId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // required to allow a drop event to fire
  };

  const handleDrop = (e: React.DragEvent, targetBoxIndex: number) => {
    e.preventDefault();
    const tokenId = e.dataTransfer.getData("text/plain");

    setTokens((prevTokens) =>
      prevTokens.map((token) =>
        token.id === tokenId
          ? { ...token, isPlaced: true, assignedBoxIndex: targetBoxIndex }
          : token,
      ),
    );
  };

  // interactive reset functionality to clear the matrix and return tokens to their original state
  const handleReset = () => {
    setTokens((prevTokens) =>
      prevTokens.map((token) => ({
        ...token,
        isPlaced: false,
        assignedBoxIndex: undefined,
      })),
    );
  };

  const trialGraphemeContainers = [0, 1, 2];

  return (
    <div className="min-h-screen bg-[#0b1329] text-[#f8fafc] flex flex-col items-center justify-center p-6 selection:bg-[#38bdf8]/30">
      {/* heading */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-[#38bdf8] to-[#0284c7] bg-clip-text text-transparent">
          Elkonin Sound Matrix
        </h1>
        <p className="text-sm font-medium text-[#64748b] uppercase tracking-widest">
          Cognitive Instructional Design • System Architecture
        </p>
      </header>

      {/* target word instruction */}
      <div className="mb-8 text-center">
        <p className="text-[#94a3b8] text-sm mb-1">Target Word:</p>
        <div className="text-5xl font-black text-white tracking-wide uppercase">
          {targetWord}
        </div>
      </div>

      {/* dynamic sound boxes array */}
      <div className="flex gap-6 mb-16">
        {trialGraphemeContainers.map((boxIndex) => {
          // check if any token has been dropped into this specific box index
          const matchingToken = tokens.find(
            (t) => t.isPlaced && t.assignedBoxIndex === boxIndex,
          );

          return (
            <div
              key={boxIndex}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, boxIndex)}
              className={`w-28 h-28 border-4 rounded-2xl flex items-center justify-center text-3xl font-black uppercase transition-all duration-200 shadow-inner
                ${
                  matchingToken
                    ? "border-[#38bdf8] bg-[#0f172a] text-white scale-100"
                    : "border-dashed border-[#1e293b] bg-[#111c35] text-transparent hover:border-[#38bdf8]/40"
                }`}
            >
              {matchingToken ? matchingToken.sound : ""}
            </div>
          );
        })}
      </div>

      {/* sound token tray */}
      <div className="bg-[#0f172a]/60 border border-[#1e293b] rounded-2xl p-8 w-full max-w-xl flex flex-col items-center shadow-2xl backdrop-blur-sm">
        <p className="text-xs font-semibold text-[#475569] uppercase tracking-wider mb-6">
          Phoneme Token Tray (Drag sounds to boxes)
        </p>

        <div className="flex gap-6 min-h-[64px] items-center justify-center">
          {tokens.map((token) => {
            // only show the token in the tray if it hasn't been placed yet
            if (token.isPlaced) return null;

            return (
              <div
                key={token.id}
                draggable
                onDragStart={(e) => handleDragStart(e, token.id)}
                className="w-16 h-16 bg-gradient-to-b from-[#0284c7] to-[#0369a1] text-white font-black text-xl rounded-full shadow-lg flex items-center justify-center cursor-grab hover:scale-105 active:scale-95 active:cursor-grabbing border border-[#38bdf8]/30 select-none transition-all"
              >
                {token.sound}
              </div>
            );
          })}

          {/* if all tokens are placed, show a clean completion state */}
          {tokens.every((t) => t.isPlaced) && (
            <span className="text-sm font-semibold text-[#10b981] flex items-center gap-2 animate-fade-in">
              ✓ Word Segment Matrix Complete
            </span>
          )}
        </div>
      </div>

      {/* controls */}
      <button
        onClick={handleReset}
        className="mt-12 px-6 py-2.5 border border-[#1e293b] hover:border-[#38bdf8]/30 hover:bg-[#1e293b] text-[#94a3b8] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
      >
        Clear Layout Matrix
      </button>
    </div>
  );
}
