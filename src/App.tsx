/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Activity, Music as MusicIcon } from 'lucide-react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { DUMMY_TRACKS } from './constants';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden selection:bg-cyan-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[#08080a]" />
      </div>

      {/* Header */}
      <header className="relative z-10 h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-widest uppercase text-cyan-400">
            Rhythm Snake <span className="text-white/40 font-light font-mono text-sm ml-2">v0.1.0</span>
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-tighter text-white/40">Current Score</span>
            <span className="text-2xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
              {score.toString().padStart(6, '0')}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-tighter text-white/40">High Score</span>
            <span className="text-2xl font-mono font-bold text-white/90">
              {highScore.toString().padStart(6, '0')}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex overflow-hidden">
        {/* Sidebar: Playlist */}
        <aside className="w-72 border-r border-white/5 bg-black/20 flex flex-col">
          <div className="p-6 overflow-y-auto">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
              <MusicIcon size={12} /> Neural Playlist
            </h2>
            <div className="space-y-2">
              {DUMMY_TRACKS.map((track, index) => (
                <div 
                  key={track.id}
                  onClick={() => setCurrentTrackIndex(index)}
                  className={`group cursor-pointer p-3 rounded-lg border transition-all ${
                    currentTrackIndex === index 
                    ? 'bg-white/5 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                    : 'hover:bg-white/5 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      currentTrackIndex === index ? 'bg-cyan-900/50 text-cyan-400' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      <MusicIcon size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${currentTrackIndex === index ? 'text-white' : 'text-white/60'}`}>{track.title}</p>
                      <p className="text-[10px] text-white/30 uppercase truncate">{track.artist}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto p-6 border-t border-white/5">
            <div className="w-full h-32 rounded-xl bg-gradient-to-b from-cyan-500/10 to-purple-500/10 border border-white/10 flex flex-col items-center justify-center text-center p-4">
              <p className="text-[10px] uppercase tracking-widest text-cyan-300">Neural Engine</p>
              <p className="text-xs font-mono mt-2 text-white/60">MODEL_ALPHA_9</p>
              <div className="flex items-end gap-1 mt-3 h-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: isPlaying ? [10, 20, 15, 25, 10][i-1] : 4 }}
                    transition={{ repeat: Infinity, duration: 0.5 + i*0.1 }}
                    className="w-1 bg-cyan-400/60 rounded-t-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Snake Game Container */}
        <section className="flex-1 flex flex-col items-center justify-center bg-black p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <div className="relative">
            <div className="absolute -top-3 left-6 px-3 py-1 bg-[#0c0c0e] border border-white/10 rounded-full flex items-center gap-2 z-10 shrink-0">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_5px_#22d3ee] animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">Engine Ready</span>
            </div>
            
            <SnakeGame onScoreChange={handleScoreChange} gameActive={true} />
            
            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/30">
              <div className="flex gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[9px]">W</kbd>
                <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[9px]">A</kbd>
                <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[9px]">S</kbd>
                <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[9px]">D</kbd>
              </div>
              <span className="text-[9px] uppercase tracking-tighter">Control</span>
            </div>
          </div>
        </section>

        {/* Right Sidebar: Details */}
        <aside className="w-64 border-l border-white/5 bg-black/20 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-3">System Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-white/40">Entities Eaten</span>
                <span className="text-cyan-400 font-mono">{(score / 10).toString().padStart(3, '0')}</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-white/40">Core Status</span>
                <span className="text-green-400 font-mono uppercase">Optimal</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-white/40">Clock Rate</span>
                <span className="text-purple-400 font-mono">150Hz</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-3">Health</h3>
            <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
              <div className="text-center mb-3">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Processing Volume</p>
                <p className="text-xl font-mono mt-1">{(score * 124).toLocaleString()}</p>
              </div>
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-purple-500 shadow-[0_0_8px_#a855f7]"
                  initial={{ width: '10%' }}
                  animate={{ width: `${Math.min(20 + (score/10) * 5, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={14} className="text-cyan-400" />
                <span className="text-[10px] font-bold uppercase text-white/60">Achievement</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-mono">Collect 10 cores to initialize Overdrive Mode.</p>
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom Player Bar */}
      <footer className="h-24 bg-[#0a0a0c] border-t border-white/10 flex items-center z-10">
        <MusicPlayer 
          currentTrack={DUMMY_TRACKS[currentTrackIndex]}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onNext={nextTrack}
          onPrev={prevTrack}
        />
      </footer>
    </div>
  );
}

