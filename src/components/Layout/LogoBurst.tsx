import React from "react";
import logo from "../../assets/logo.png";

type LogoBurstProps = {
  size?: number;
  style?: React.CSSProperties;
};

const LogoBurst: React.FC<LogoBurstProps> = ({ size = 60, style }) => {
  return (
    <img
      src={logo}
      alt="Save'nDeliver logo"
      style={{
        width: size,
        height: "auto",
        objectFit: "contain",
        borderRadius: 8,
        ...style,
      }}
    />
  );
};

export default LogoBurst;
