import React, { useEffect } from "react";
import "./Top.scss";

export default function Top() {
  // Scroll to top function (using smooth scrolling)
  const TopEvent = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to toggle button visibility based on scroll position
  const scrollFunction = () => {
    const topButton = document.getElementById("topButton");
    if (!topButton) return; // Ensure the element exists before accessing style

    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
      topButton.style.visibility = "visible";
    } else {
      topButton.style.visibility = "hidden";
    }
  };

  // Attach the scroll event listener after the component mounts
  useEffect(() => {
    // Call scrollFunction once on mount to set the initial state
    scrollFunction();

    // Attach the scroll event listener
    window.addEventListener("scroll", scrollFunction);

    // Cleanup: remove the event listener on unmount
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
      <button onClick={TopEvent} id="topButton" title="Go to top">
        <i className="fas fa-hand-point-up" aria-hidden="true"></i>
      </button>
  );
}
