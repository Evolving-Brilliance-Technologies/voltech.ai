import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ProgressSegment {
  label: string;
  percentage: number;
  value: number;
  color: string;
  tooltip?: string;
}

interface ProgressBarProps {
  segments: ProgressSegment[];
  label?: string;
  displayPercent?: number;
  showTooltip?: boolean;
}

export const ProgressBar = ({
  segments,
  label = "Progress",
  displayPercent,
  showTooltip = true,
}: ProgressBarProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
  }>({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  const handleMouseEnter = (content: string) => (e: React.MouseEvent) => {
    const rect = progressBarRef.current?.getBoundingClientRect();
    setTooltip({
      visible: true,
      content,
      x: e.clientX,
      y: rect ? rect.top - 2 : 0,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = progressBarRef.current?.getBoundingClientRect();
    setTooltip((prev) => ({
      ...prev,
      x: e.clientX,
      y: rect ? rect.top - 2 : prev.y,
    }));
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const displayPercentValue =
    displayPercent ??
    Math.round(segments[segments.length - 1]?.percentage ?? 0);

  return (
    <>
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold text-sm">{label}</span>
          <span className="font-bold text-xl">{displayPercentValue}%</span>
        </div>
        <div
          ref={progressBarRef}
          className="relative h-6 overflow-hidden rounded-full bg-progressbar-bg border border-progressbar-border"
        >
          {/* Render segments in order */}
          {[...segments]
            .sort((a, b) => b.percentage - a.percentage)
            .map((segment, index) => (
              <button
                key={segment.label}
                type="button"
                className={cn('absolute top-0 left-0 h-full bg-gradient-to-r transition-all duration-700 cursor-pointer border-0 p-0 focus:outline-none focus:ring-2 focus:ring-offset-1 rounded-full', segment.color)}
                style={{ width: `${segment.percentage}%`, zIndex: index + 1 }}
                aria-label={segment.label}
                onMouseEnter={
                  showTooltip
                    ? handleMouseEnter(
                      segment.tooltip ||
                      `${segment.label}: ${segment.value.toLocaleString()}`
                    )
                    : undefined
                }
                onMouseMove={showTooltip ? handleMouseMove : undefined}
                onMouseLeave={showTooltip ? handleMouseLeave : undefined}
              />
            ))}
        </div>
      </div>

      {/* Tooltip Portal */}
      {tooltip.visible &&
        createPortal(
          <div
            className="fixed z-1000 px-3 py-2 text-sm font-medium rounded-lg shadow-lg pointer-events-none bg-progressbar-tooltip-bg text-progressbar-tooltip-text"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -100%)",
              whiteSpace: "nowrap",
            }}
          >
            {tooltip.content}
            <div
              className="absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-progressbar-tooltip-bg"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "-4px",
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
};
