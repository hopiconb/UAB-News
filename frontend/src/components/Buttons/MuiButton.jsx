import React from "react";
import { Button } from "@mui/material";

function MuiButton({
  alignItems,
  backgroundColor,
  backgroundColorHover,
  border,
  borderHover,
  borderRadius,
  boxShadow,
  color,
  colorHover,
  cursor,
  display,
  flex,
  fontSize,
  fontWeight,
  gap,
  height,
  icon,
  justifyContent,
  minWidth,
  onClick,
  outline,
  padding,
  size,
  value,
  variant,
  width,
}) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      sx={{
        backgroundColor: backgroundColor,
        color: color,
        width: width,
        height: height,
        fontWeight: fontWeight,
        borderRadius: borderRadius,
        border: border ? border : "1px solid #141450",
        boxShadow: boxShadow,
        fontSize: fontSize,
        padding: padding,
        display: display,
        justifyContent: justifyContent,
        gap: gap,
        alignItems: alignItems,
        cursor: cursor,
        minWidth: minWidth,
        flex: flex,

        "&:focus": {
          outline: outline,
        },
        "&:hover": {
          backgroundColor: backgroundColorHover,
          boxShadow: boxShadow,
          border: borderHover,
          color: colorHover,
        },
      }}
    >
      {value} {icon}
    </Button>
  );
}

export default MuiButton;
