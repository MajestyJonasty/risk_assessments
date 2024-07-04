import React, { useState, useEffect } from "react";
import { Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import "./AstronautErrorAnimation.css";

interface AstronautAnimationProps {
  errorStatus: number;
  errorMessage: string;
}

const AstronautErrorAnimation = ({
  errorStatus,
  errorMessage,
}: AstronautAnimationProps) => {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 125,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const animateAstronaut = () => {
      setPosition((prevPos) => ({
        x: prevPos.x + Math.sin(Date.now() / 1000) * 2,
        y: prevPos.y + Math.cos(Date.now() / 1000) * 2,
      }));
    };

    const intervalId = setInterval(animateAstronaut, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="astronaut-container">
      {[1, 2, 3, 4].map((boxNum) => (
        <div key={boxNum} className={`box-of-star${boxNum}`}>
          {[1, 2, 3, 4, 5, 6, 7].map((starNum) => (
            <div key={starNum} className={`star star-position${starNum}`}></div>
          ))}
        </div>
      ))}
      <Typography variant="h1" className="error-title">
        Oops!
      </Typography>
      <div
        data-js="astro"
        className="astronaut"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.05s linear",
        }}
      >
        <div className="head"></div>
        <div className="arm arm-left"></div>
        <div className="arm arm-right"></div>
        <div className="body">
          <div className="panel"></div>
        </div>
        <div className="leg leg-left"></div>
        <div className="leg leg-right"></div>
        <div className="schoolbag"></div>
      </div>
      <div className="error-content">
        <Typography variant="h2" className="mb-4">
          {errorStatus}: {errorMessage}
        </Typography>
        <Typography variant="body1" className="mb-4">
          Sorry, an unexpected error has occurred.
        </Typography>
        <MuiLink component={Link} to="/" className="home-link">
          Go back to homepage
        </MuiLink>
      </div>
    </div>
  );
};

export default AstronautErrorAnimation;
