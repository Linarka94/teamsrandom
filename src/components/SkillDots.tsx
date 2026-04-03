import { type FC } from "react";
import { Box, useTheme } from "@mui/material";
import type { SkillLevel } from "../types/player";

type SkillDotsProps = {
  level: SkillLevel;
  size?: "small" | "medium";
};

export const SkillDots: FC<SkillDotsProps> = ({ level, size = "medium" }) => {
  const theme = useTheme();
  const dot = size === "small" ? { w: 6, h: 6, gap: 0.35 } : { w: 8, h: 8, gap: 0.5 };

  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${dot.gap * 8}px`,
      }}
    >
      {([1, 2, 3, 4, 5] as const).map((n) => (
        <Box
          key={n}
          className={n <= level ? "skill-dot-active" : "skill-dot-inactive"}
          sx={{
            width: dot.w,
            height: dot.h,
            borderRadius: "50%",
            bgcolor: n <= level ? theme.palette.primary.main : "#bdbdbd",
          }}
        />
      ))}
    </Box>
  );
};
