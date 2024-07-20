import React from "react";
import { Indicators } from "../types";

interface HeaderProps {
  indicators: Indicators;
}

const Header: React.FC<HeaderProps> = ({ indicators }) => (
  <header id="header">
    {Object.entries(indicators).map(([indicator, value], index) => (
      <div className="item" key={index}>
        <h2 className="indicator">{indicator.toUpperCase()}: </h2>
        <p className="value">{value}</p>
      </div>
    ))}
  </header>
);

export default Header;
