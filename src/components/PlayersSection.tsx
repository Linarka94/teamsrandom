import { type FC } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Player } from "../types/player";
import { getSkillLabel } from "../types/player";
import { SkillDots } from "./SkillDots";

type PlayersSectionProps = {
  players: Player[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
};

export const PlayersSection: FC<PlayersSectionProps> = ({ players, onRemove, onClearAll }) => {
  const initial = (name: string) => name.trim().charAt(0).toUpperCase() || "?";

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
          mb: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Игроки ({players.length})
        </Typography>
        <Button
          type="button"
          variant="text"
          color="inherit"
          onClick={onClearAll}
          disabled={players.length === 0}
          sx={{ color: "text.secondary", textTransform: "none" }}
        >
          Очистить всё
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        {players.map((p) => (
          <Box
            key={p.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 1.5,
              py: 1,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              minWidth: 200,
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "common.black",
                color: "common.white",
                fontSize: "1rem",
              }}
              aria-hidden
            >
              {initial(p.name)}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap>
                {p.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.25 }}>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {getSkillLabel(p.skill)}
                </Typography>
                <SkillDots level={p.skill} size="small" />
              </Box>
            </Box>
            <IconButton
              size="small"
              aria-label={`Удалить игрока ${p.name}`}
              onClick={() => onRemove(p.id)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
