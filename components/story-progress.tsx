"use client";

interface StoryProgressProps {
  current: number;
  total: number;
}

export function StoryProgress({ current, total }: StoryProgressProps) {
  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex-1 progress-bar-wrapped">
          <div
            className="progress-bar-wrapped-fill"
            style={{
              width: i < current ? "100%" : i === current ? "50%" : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
}
