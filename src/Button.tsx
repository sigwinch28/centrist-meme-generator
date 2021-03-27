import React from "react";

interface ButtonProps {
  onClick?: React.MouseEventHandler;
  className?: string;
  bgColor?: string | null;
  hoverBgColor?: string | null;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  bgColor,
  hoverBgColor,
  className,
  disabled,
}) => {
  bgColor = bgColor || "centrist-blue";
  hoverBgColor = hoverBgColor || "blue-800";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        `rounded-full px-3 py-1 bg-${bgColor} text-white hover:bg-${hoverBgColor} focus:ring-4 focus:outline-none ` +
        className
      }
    >
      {children}
    </button>
  );
};

export default Button;
