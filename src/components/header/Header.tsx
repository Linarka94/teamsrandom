import { type FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

export const Header: FC = () => {
  return (
    <Box sx={{ display: "flex", gap: 2.5, mb: 4, alignItems: "center" }}>
      <Avatar
        variant="rounded"
        aria-hidden
        sx={{
          width: 56,
          height: 56,
          bgcolor: "common.black",
          color: "common.white",
          borderRadius: 1.5,
        }}
      >
        <PeopleOutlineIcon sx={{ fontSize: 32 }} aria-hidden />
      </Avatar>
      <Box>
        <Typography variant="h4" component="h1" sx={{ mb: 0.5, lineHeight: 1.2 }}>
          Футбольная жеребьёвка
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Распределение игроков по командам с балансировкой
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
