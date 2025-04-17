import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function MuiInput({ size, label, type, inputIcon, borderColor }) {
  const [showPassword, setShowPassword] = useState(true);
  const [inputType, setInputType] = useState(type ? type : "text");

  const switchType = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <TextField
      size={size}
      label={label}
      type={inputType}
      variant="outlined"
      fullWidth={true}
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
                  <VisibilityOff sx={{ color: borderColor }} />
                ) : (
                  <Visibility sx={{ color: borderColor }} />
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

export default MuiInput;
