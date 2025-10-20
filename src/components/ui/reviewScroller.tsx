import { useMediaQuery } from "@/hook/useMediaQuery";
import React from "react";

// --- Data Interfaces ---

interface Review {
  id: number;
  component: React.ReactNode;
}

interface InfiniteReviewsScrollerProps {
  reviews: Review[];
}

export const InfiniteReviewsScroller: React.FC<
  InfiniteReviewsScrollerProps
> = ({ reviews }) => {
  // Set the fixed width for each review card. This is essential for the animation math.
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  const cardWidth = isMobile ? 200 : 350; // Each card will be 350px wide.

  // To create a seamless loop, you need at least two copies of the review list.

  // Calculate the total width of the *original* review list.
  const originalScrollWidth = cardWidth * reviews.length;
  // Use the full width for the animation duration calculation to control speed.
  //const totalScrollWidth = cardWidth * allCards.length;

  return (
    <>
      {/* Injecting the necessary CSS for the animation.
        This uses the total width of the *original* set for the transform.
      */}
      <style>{`
        /* Keyframes for the infinite horizontal scroll */
        @keyframes reviewScroll {
          0% {
              transform: translateX(0);
          }
          /* Scroll the width of the original review set (one full loop) */
          100% {
              transform: translateX(calc(-${originalScrollWidth}px));
          }
        }

        .animate-review-scroll {
            /* Duration determined by the number of cards to keep speed consistent */
            animation: reviewScroll ${
              isMobile ? reviews.length * 4 : reviews.length * 5
            }s linear infinite;
        }
        
        /* Pause on hover */
        .scroller-reviews:hover .animate-review-scroll {
            animation-play-state: paused;
        }
      `}</style>

      <div className="w-full py-16 font-sans">
        {/* The main scroller container */}
        <div className="w-full max-w-full mx-auto">
          {/* Scroller container with a gradient mask and overflow hidden */}
          <div
            className="scroller-reviews w-full overflow-hidden py-4"
            // Adding the gradient mask for the seamless fade effect on the edges
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 5%, white 20%, white 80%, transparent 95%)",
              maskImage:
                "linear-gradient(to right, transparent 5%, white 20%, white 80%, transparent 95%)",
            }}
          >
            {/* The element that gets animated */}
            <div className="animate-review-scroll flex w-max items-center">
              {/* Render the duplicated review cards for the infinite loop */}
              {reviews.map((review, idx) => (
                <div key={idx}>{review.component}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfiniteReviewsScroller;
