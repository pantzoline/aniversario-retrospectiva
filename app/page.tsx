"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SLIDES,
  isStatSlide,
  isQuizSlide,
  isMemorySlide,
  isRevealSlide,
  isFinaleSlide,
} from "@/lib/game-data";
import { IntroScreen } from "@/components/intro-screen";
import { StoryProgress } from "@/components/story-progress";
import { StatSlideView } from "@/components/slide-stat";
import { QuizSlideView } from "@/components/slide-quiz";
import { MemorySlideView } from "@/components/slide-memory";
import { RevealSlideView } from "@/components/slide-reveal";
import { FinaleSlideView } from "@/components/slide-finale";
import { MusicPlayer } from "@/components/music-player";

type Screen = "intro" | "story";

export default function GamePage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isFinaleAudioPlaying, setIsFinaleAudioPlaying] = useState(false);
  const [hasCompletedJourney, setHasCompletedJourney] = useState(false);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
  const [direction, setDirection] = useState(1);

  const handleStart = useCallback(() => {
    setScreen("story");
    setCurrentSlideIdx(0);
  }, []);

  const goNext = useCallback(() => {
    setIsQuizAnswered(false);
    setDirection(1);
    setCurrentSlideIdx((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const handleRestart = useCallback(() => {
    setDirection(-1);
    setCurrentSlideIdx(0);
    setIsFinaleAudioPlaying(false);
    setIsQuizAnswered(false);
    setHasCompletedJourney(true);
    setTimeout(() => {
      setScreen("intro");
    }, 600);
  }, []);

  const handleJumpTo = useCallback((index: number) => {
    setDirection(1);
    setCurrentSlideIdx(index);
    setIsQuizAnswered(false);
    setScreen("story");
  }, []);

  const currentSlide = SLIDES[currentSlideIdx];

  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? "60%" : "-60%",
      opacity: 0,
      scale: 0.92,
      filter: "blur(12px)",
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      y: dir > 0 ? "-25%" : "25%",
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
    }),
  };

  function renderSlide() {
    if (!currentSlide) return null;

    if (isStatSlide(currentSlide)) {
      return <StatSlideView slide={currentSlide} onNext={goNext} />;
    }
    if (isQuizSlide(currentSlide)) {
      return <QuizSlideView slide={currentSlide} onNext={goNext} onAnswered={() => setIsQuizAnswered(true)} />;
    }
    if (isMemorySlide(currentSlide)) {
      return <MemorySlideView slide={currentSlide} onNext={goNext} />;
    }
    if (isRevealSlide(currentSlide)) {
      return <RevealSlideView slide={currentSlide} onNext={goNext} />;
    }
    if (isFinaleSlide(currentSlide)) {
      return <FinaleSlideView onRestart={handleRestart} onPlayAudio={() => setIsFinaleAudioPlaying(true)} />;
    }
    return null;
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <IntroScreen 
            key="intro" 
            onStart={handleStart} 
            hasCompletedJourney={hasCompletedJourney} 
            onJumpTo={handleJumpTo} 
          />
        )}
      </AnimatePresence>

      {screen === "story" && (
        <>
          {/* Top progress bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
          >
            <StoryProgress current={currentSlideIdx} total={SLIDES.length} />
          </motion.div>

          {/* Slide counter - liquid glass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="fixed top-7 right-4 z-50"
          >
            <div className="liquid-glass px-4 py-1.5 rounded-full">
              <span className="text-[10px] font-sans font-semibold text-foreground/35 tabular-nums tracking-wider">
                {currentSlideIdx + 1} / {SLIDES.length}
              </span>
            </div>
          </motion.div>

          {/* Slides with premium transitions */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.65,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="absolute inset-0"
            >
              {renderSlide()}
            </motion.div>
          </AnimatePresence>

          {/* Music Player & Lyrics Panel */}
          {(currentSlide?.type === "quiz" && currentSlide.category === "music") && (
            <MusicPlayer 
              activeTrackIndex={
                currentSlide?.id === 2 ? 0 :
                currentSlide?.id === 8 ? 1 :
                currentSlide?.id === 12 ? 2 :
                currentSlide?.id === 17 ? 3 :
                undefined
              } 
              isTitleHidden={!isQuizAnswered}
            />
          )}

          {currentSlide?.type === "finale" && isFinaleAudioPlaying && (
            <MusicPlayer activeTrackIndex={4} isTitleHidden={false} />
          )}
        </>
      )}
    </main>
  );
}
