"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PLAYLIST } from "@/lib/game-data";
import { Play, Pause, SkipBack, SkipForward, Volume2, Mic2, MonitorSpeaker, Heart } from "lucide-react";

interface MusicPlayerProps {
  activeTrackIndex?: number;
}

export function MusicPlayer({ activeTrackIndex }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync with active slide
  useEffect(() => {
    if (activeTrackIndex !== undefined && activeTrackIndex >= 0 && activeTrackIndex < PLAYLIST.length) {
      setCurrentTrack(activeTrackIndex);
      setProgress(0);
      setIsPlaying(true);
      setShowLyrics(true);
      
      const track = PLAYLIST[activeTrackIndex];
      if (track.audioUrl) {
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        audioRef.current.src = track.audioUrl;
        audioRef.current.play().catch(() => {});
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [activeTrackIndex]);

  const togglePlay = () => {
    setIsPlaying((p) => {
      const nextState = !p;
      if (audioRef.current && PLAYLIST[currentTrack].audioUrl) {
        if (nextState) audioRef.current.play();
        else audioRef.current.pause();
      }
      return nextState;
    });
  };

  useEffect(() => {
    const track = PLAYLIST[currentTrack];
    
    if (track.audioUrl && audioRef.current) {
      // Real audio playback sync
      const updateProgress = () => {
        if (audioRef.current && audioRef.current.duration) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      };
      
      const handleEnded = () => setIsPlaying(false);
      
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('ended', handleEnded);
      
      return () => {
        audioRef.current?.removeEventListener('timeupdate', updateProgress);
        audioRef.current?.removeEventListener('ended', handleEnded);
      };
    } else {
      // Fake visual playback for Spotify songs (since we don't have the files)
      if (isPlaying) {
        intervalRef.current = setInterval(() => {
          setProgress((p) => {
            if (p >= 100) {
              setIsPlaying(false);
              return 100;
            }
            return p + 0.5;
          });
        }, 100);
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isPlaying, currentTrack]);

  const track = PLAYLIST[currentTrack];

  // Calculate which lyric line should be active based on progress
  const activeLyricIndex = track.lyrics 
    ? Math.floor((progress / 100) * track.lyrics.length)
    : -1;

  return (
    <>
      {/* =========================================
          LYRICS PANEL (Right Side)
          ========================================= */}
      <AnimatePresence>
        {showLyrics && track.lyrics && (
          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 w-full md:w-[500px] bottom-[90px] p-8 overflow-hidden z-40 pointer-events-none"
            style={{ background: "transparent" }}
          >
            <div className="absolute top-8 right-8 flex items-center gap-2 text-xs font-sans font-bold tracking-widest uppercase" style={{ color: track.color }}>
              <Mic2 size={14} /> Sincronizado
            </div>
            
            <div className="relative h-full w-full flex flex-col justify-center mask-fade-y pt-20">
              <motion.div
                className="flex flex-col gap-8 w-full"
                animate={{
                  y: `calc(30vh - ${activeLyricIndex * 64}px)`,
                }}
                transition={{ type: "spring", stiffness: 60, damping: 25, mass: 1 }}
              >
                {track.lyrics.map((line, i) => {
                  const isActive = i === activeLyricIndex;
                  const isPast = i < activeLyricIndex;
                  
                  return (
                    <motion.p
                      key={i}
                      animate={{
                        scale: isActive ? 1.05 : 0.9,
                        opacity: isActive ? 1 : isPast ? 0.3 : 0.2,
                        filter: isActive ? "blur(0px)" : "blur(2px)",
                        color: isActive ? "#ffffff" : "#ffffff",
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="text-3xl md:text-4xl font-serif italic font-bold leading-[1.1] transition-colors origin-left"
                      style={{
                        textShadow: isActive ? `0 0 30px ${track.color}80` : "none",
                      }}
                    >
                      {line}
                    </motion.p>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          SPOTIFY BOTTOM BAR
          ========================================= */}
      <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-black border-t border-white/10 z-50 flex items-center px-4 justify-between font-sans">
        
        {/* Left: Track Info */}
        <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
          <div 
            className="w-14 h-14 rounded shadow-lg flex items-center justify-center shrink-0"
            style={{ background: `linear-gradient(135deg, ${track.color}, #111)` }}
          >
            <div className="w-4 h-4 rounded-full bg-black/40 animate-pulse" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-sm font-bold text-white hover:underline cursor-pointer truncate">
              {track.title}
            </span>
            <span className="text-xs text-white/60 hover:underline cursor-pointer hover:text-white truncate">
              {track.artist}
            </span>
          </div>
          <Heart size={16} className="text-white/60 hover:text-white cursor-pointer shrink-0 ml-2" />
        </div>

        {/* Center: Controls & Progress */}
        <div className="flex flex-col items-center max-w-[40%] w-full">
          <div className="flex items-center gap-6 mb-2">
            <SkipBack size={18} className="text-white/60 hover:text-white cursor-pointer" onClick={() => {setProgress(0); setIsPlaying(true);}} />
            <button 
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={18} className="fill-black" /> : <Play size={18} className="fill-black ml-1" />}
            </button>
            <SkipForward size={18} className="text-white/60 hover:text-white cursor-pointer" onClick={() => {setProgress(0); setIsPlaying(true);}} />
          </div>
          
          <div className="flex items-center gap-2 w-full text-xs text-white/60 font-mono">
            <span>0:{(Math.floor(progress / 5)).toString().padStart(2, '0')}</span>
            <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden group cursor-pointer relative">
              <div 
                className="h-full bg-white group-hover:bg-[#1ed760] relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md" />
              </div>
            </div>
            <span>0:20</span>
          </div>
        </div>

        {/* Right: Extra Controls */}
        <div className="flex items-center justify-end gap-4 w-[30%] min-w-[180px] text-white/60">
          <Mic2 
            size={16} 
            className={`cursor-pointer transition-colors ${showLyrics ? "text-[#1ed760]" : "hover:text-white"}`} 
            onClick={() => setShowLyrics(!showLyrics)}
          />
          <MonitorSpeaker size={16} className="cursor-pointer hover:text-white" />
          <div className="flex items-center gap-2 w-24">
            <Volume2 size={16} />
            <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden group cursor-pointer">
              <div className="h-full bg-white group-hover:bg-[#1ed760] w-[70%]" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .mask-fade-y {
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
        }
      `}</style>
    </>
  );
}
