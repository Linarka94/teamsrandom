import { type FC } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";

type TeamDrawSectionProps = {
  teamCount: number;
  maxTeams: number;
  onTeamCountChange: (value: number) => void;
  onDraw: () => void;
  drawDisabled: boolean;
};

export const TeamDrawSection: FC<TeamDrawSectionProps> = ({
  teamCount,
  maxTeams,
  onTeamCountChange,
  onDraw,
  drawDisabled,
}) => {
  const handleCountChange = (raw: string) => {
    const n = Number.parseInt(raw, 10);
    if (Number.isNaN(n)) {
      onTeamCountChange(2);
      return;
    }
    const clamped = Math.min(Math.max(n, 2), Math.max(2, maxTeams));
    onTeamCountChange(clamped);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2.5 }}>
          Разделить на команды
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { sm: "flex-end" },
            gap: 2,
          }}
        >
          <TextField
            label="Количество команд"
            type="number"
            value={teamCount}
            onChange={(e) => handleCountChange(e.target.value)}
            slotProps={{
              htmlInput: {
                min: 2,
                max: Math.max(2, maxTeams),
                "aria-label": "Количество команд",
              },
            }}
            sx={{ width: { xs: "100%", sm: 200 } }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShuffleIcon />}
            onClick={onDraw}
            disabled={drawDisabled}
            sx={{ py: 1.25, px: 2, alignSelf: { xs: "stretch", sm: "auto" } }}
          >
            Жеребьёвка
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
