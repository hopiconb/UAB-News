import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "../../Themes/theme.jsx";

export default function MuiInput({
  size,
  label,
  type,
  inputIcon,
  borderColor,
  onChange,
  value,
  width,
  fullWidth,
}) {
  const [showPassword, setShowPassword] = useState(type === "password");
  const [inputType, setInputType] = useState(type || "text");

  const switchType = () => {
    setShowPassword((prev) => !prev);
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <TextField
      size={size}
      label={label}
      type={inputType}
      variant="outlined"
      width={width}
      fullWidth={fullWidth}
      onChange={onChange}
      value={value}
      // required={true}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: ".2em",

          "&:hover fieldset": { borderColor: borderColor },
          "&.Mui-focused fieldset": { borderColor: borderColor },
          "& fieldset": {
            borderColor: borderColor,
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: borderColor,
        },
        "& .MuiInputLabel-root": {
          color: borderColor,
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {type === "password" ? (
              <IconButton
                size="small"
                onClick={switchType}
                edge="end"
                sx={{
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ color: theme.palette.primary.main }} />
                ) : (
                  <Visibility sx={{ color: theme.palette.primary.main }} />
                )}
              </IconButton>
            ) : (
              inputIcon
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
