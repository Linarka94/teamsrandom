import { type FC } from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import type { BalancedTeam } from "../types/player";
import { getSkillLabel } from "../types/player";
import { SkillDots } from "./SkillDots";

type TeamsResultSectionProps = {
  teams: BalancedTeam[] | null;
};

const initial = (name: string) => name.trim().charAt(0).toUpperCase() || "?";

export const TeamsResultSection: FC<TeamsResultSectionProps> = ({ teams }) => {
  if (!teams || teams.length === 0) return null;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 2,
      }}
    >
      {teams.map((team) => (
        <Card key={team.index}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
              Команда {team.index + 1}{" "}
              <Typography component="span" variant="body2" color="text.secondary">
                (сумма уровней: {team.totalSkill})
              </Typography>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {team.players.map((p) => (
                <Box
                  key={p.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 0.5,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "common.black",
                      color: "common.white",
                      fontSize: "0.875rem",
                    }}
                    aria-hidden
                  >
                    {initial(p.name)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" noWrap>
                      {p.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                      <Typography variant="caption" color="text.secondary">
                        {getSkillLabel(p.skill)}
                      </Typography>
                      <SkillDots level={p.skill} size="small" />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
