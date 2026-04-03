import { type FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import type { SkillLevel } from "../types/player";
import { SKILL_OPTIONS } from "../types/player";
import { SkillDots } from "./SkillDots";

const menuItemSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  "&:hover": {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    "& .skill-dot-active": { bgcolor: "common.white" },
    "& .skill-dot-inactive": { bgcolor: "rgba(255,255,255,0.45)" },
  },
  "&.Mui-selected": {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    "& .skill-dot-active": { bgcolor: "common.white" },
    "& .skill-dot-inactive": { bgcolor: "rgba(255,255,255,0.45)" },
  },
  "&.Mui-selected:hover": {
    bgcolor: "primary.dark",
    color: "primary.contrastText",
    "& .skill-dot-active": { bgcolor: "common.white" },
    "& .skill-dot-inactive": { bgcolor: "rgba(255,255,255,0.45)" },
  },
};

type AddPlayerSectionProps = {
  onAdd: (name: string, skill: SkillLevel) => void;
};

export const AddPlayerSection: FC<AddPlayerSectionProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState<SkillLevel>(3);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, skill);
    setName("");
    setSkill(3);
  };

  const handleSkillChange = (event: SelectChangeEvent<SkillLevel>) => {
    setSkill(Number(event.target.value) as SkillLevel);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2.5 }}>
          Добавить игрока
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { sm: "flex-start" },
            gap: 2,
          }}
        >
          <TextField
            label="Имя игрока"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            fullWidth
            sx={{ flex: { sm: "1 1 0" } }}
            slotProps={{ htmlInput: { "aria-label": "Имя игрока" } }}
          />
          <FormControl sx={{ flex: { sm: "1 1 0" }, minWidth: { xs: "100%", sm: 220 } }}>
            <InputLabel id="skill-level-label">Уровень игры</InputLabel>
            <Select<SkillLevel>
              labelId="skill-level-label"
              label="Уровень игры"
              value={skill}
              onChange={handleSkillChange}
              renderValue={(value) => {
                const opt = SKILL_OPTIONS.find((o) => o.value === value);
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pr: 1,
                    }}
                  >
                    <span>{opt?.label}</span>
                    <SkillDots level={value} />
                  </Box>
                );
              }}
            >
              {SKILL_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value} sx={menuItemSx}>
                  <span>{opt.label}</span>
                  <SkillDots level={opt.value} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PersonAddAltIcon />}
            onClick={handleSubmit}
            disabled={!name.trim()}
            sx={{
              flexShrink: 0,
              alignSelf: { xs: "stretch", sm: "flex-start" },
              py: 1.25,
              px: 2,
            }}
          >
            Добавить
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
