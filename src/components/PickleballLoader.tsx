import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import "./PickleballLoader.css";
import "./LoadingText.css"
import "./Bounce.css"

interface PickleballLoaderProps {
  children: ReactNode;
  onComplete?: () => void;
}

const PickleballLoader: React.FC<PickleballLoaderProps> = ({
  children,
  onComplete,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    const revealContent = () => {
      startTimer = window.setTimeout(() => {
        loaderRef.current?.classList.add("pickleball-loader--hidden");
        contentRef.current?.classList.add("pickleball-content--ready");

        finishTimer = window.setTimeout(() => {
          if (loaderRef.current) {
            loaderRef.current.style.display = "none";
          }

          onComplete?.();
        }, 700);
      }, 1000);
    };

    if (document.readyState === "complete") {
      revealContent();
    } else {
      window.addEventListener("load", revealContent, { once: true });
    }

    return () => {
      window.removeEventListener("load", revealContent);

      if (startTimer !== undefined) {
        window.clearTimeout(startTimer);
      }

      if (finishTimer !== undefined) {
        window.clearTimeout(finishTimer);
      }
    };
  }, [onComplete]);

  return (
    <>
      <div
        ref={loaderRef}
        className="pickleball-loader"
        role="status"
        aria-label="Loading Paddle Alley"
      >
        <div className="pickleball-animation">
          {/* Bouncing pickleball */}
          <div className="pickleball-ball-stage">
            <div className="pickleball-shadow" />

            <div className="pickleball-ball-bounce">
              <svg
                className="pickleball-ball"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="#d8ff35"
                  stroke="#a5d500"
                  strokeWidth="2"
                />

                <g fill="#7da600" opacity="0.9">
                  <circle cx="19" cy="15" r="2.5" />
                  <circle cx="32" cy="11" r="2.5" />
                  <circle cx="45" cy="16" r="2.5" />
                  <circle cx="13" cy="28" r="2.5" />
                  <circle cx="26" cy="25" r="2.5" />
                  <circle cx="40" cy="28" r="2.5" />
                  <circle cx="51" cy="30" r="2.5" />
                  <circle cx="17" cy="42" r="2.5" />
                  <circle cx="31" cy="40" r="2.5" />
                  <circle cx="45" cy="44" r="2.5" />
                  <circle cx="27" cy="53" r="2.5" />
                  <circle cx="40" cy="54" r="2.5" />
                </g>

                <ellipse
                  cx="23"
                  cy="17"
                  rx="7"
                  ry="4"
                  fill="#fff"
                  opacity="0.45"
                />
              </svg>
            </div>
          </div>

          {/* Horizontal paddle with game name */}
          <div className="pickleball-paddle">
            <div className="paddle-decoration paddle-decoration--left">
              //
            </div>

            <span className="paddle-title">PADDLE ALLEY</span>

            <div className="paddle-decoration paddle-decoration--right">
              //
            </div>
          </div>
        </div>

        <p className="pickleball-loading-text">
          Loading<span className="pickleball-dots">...</span>
        </p>
      </div>

      {/* Website content */}
      <div
        ref={contentRef}
        className="pickleball-content"
      >
        {children}
      </div>
    </>
  );
};

export default PickleballLoader;
