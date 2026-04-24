import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { motion } from 'motion/react';
import { Track } from '../constants';

interface MusicPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function MusicPlayer({ 
  currentTrack, 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrev 
}: MusicPlayerProps) {
  return (
    <div className="w-full flex items-center justify-between px-8">
      {/* Left: Track Info */}
      <div className="flex items-center gap-4 w-1/4">
        <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-purple-600 rounded-lg overflow-hidden shadow-lg group relative">
          <img src={currentTrack.cover} alt={currentTrack.album} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm">
             <Music size={24} className="text-white/80" />
          </div>
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-sm text-white truncate">{currentTrack.title}</h4>
          <p className="text-xs text-cyan-400 font-medium tracking-tight truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Center: Controls & Global Progress */}
      <div className="flex flex-col items-center gap-2 w-1/2">
        <div className="flex items-center gap-8">
          <button 
            onClick={onPrev}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button 
            onClick={onTogglePlay}
            className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
          </button>
          <button 
            onClick={onNext}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
        
        <div className="w-full max-w-md flex items-center gap-3">
          <span className="text-[10px] font-mono text-zinc-500">01:24</span>
          <div className="flex-1 h-1 bg-zinc-800 rounded-full relative">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
              animate={{ width: isPlaying ? '100%' : '33%' }}
              transition={{ duration: isPlaying ? 100 : 0.5, ease: "linear" }}
            />
          </div>
          <span className="text-[10px] font-mono text-zinc-500">03:45</span>
        </div>
      </div>

      {/* Right: Extra Controls */}
      <div className="flex items-center justify-end gap-6 w-1/4">
        <div className="flex items-center gap-3">
          <Music size={16} className="text-zinc-500" />
          <div className="w-20 h-1 bg-zinc-800 rounded-full">
            <div className="w-2/3 h-full bg-zinc-400"></div>
          </div>
        </div>
        <button className="text-cyan-400/50 hover:text-cyan-400 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
        </button>
      </div>
    </div>
  );
}
