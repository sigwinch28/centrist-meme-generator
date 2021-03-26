import React from "react";

interface ButtonProps {
  onClick?: React.MouseEventHandler;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={
      "rounded-full px-3 py-1 bg-centrist-blue text-white hover:bg-blue-800 focus:ring-4 focus:outline-none " +
      className
    }
  >
    {children}
  </button>
);

export default Button;
