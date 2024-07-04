import React, { useState, useEffect } from "react";
import WheelAndHamster from "./Animations/WheelAndHamster";

interface DelayedComponentProps {
  delay: number;
  children: React.ReactNode;
}

const PDFDelayedComponent = ({ delay, children }: DelayedComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <WheelAndHamster />
        <span>PDF wird generiert...</span>
      </div>
    );
  }

  return children;
};

export default PDFDelayedComponent;
