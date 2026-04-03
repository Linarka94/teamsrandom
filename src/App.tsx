import { type FC, useReducer } from "react";
import { Box, Container } from "@mui/material";
import Header from "./components/header/Header.tsx";
import { AddPlayerSection } from "./components/AddPlayerSection.tsx";
import { PlayersSection } from "./components/PlayersSection.tsx";
import { TeamDrawSection } from "./components/TeamDrawSection.tsx";
import { TeamsResultSection } from "./components/TeamsResultSection.tsx";
import { balanceTeams, findNextTeamSplitForRedraw } from "./utils/balanceTeams.ts";
import type { BalancedTeam, Player, SkillLevel } from "./types/player.ts";

type AppState = {
  players: Player[];
  teamCount: number;
  teamsResult: BalancedTeam[] | null;
};

type AppAction =
  | { type: "add"; player: Player }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "setTeamCount"; value: number }
  | { type: "setTeamsResult"; teams: BalancedTeam[] | null };

const initialState: AppState = {
  players: [],
  teamCount: 2,
  teamsResult: null,
};

const clampTeamCount = (count: number, playerCount: number): number => {
  const maxTeams = playerCount >= 2 ? playerCount : 2;
  return Math.min(Math.max(count, 2), maxTeams);
};

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        players: [...state.players, action.player],
        teamsResult: null,
      };
    case "remove": {
      const players = state.players.filter((p) => p.id !== action.id);
      const teamCount = clampTeamCount(state.teamCount, players.length);
      return { ...state, players, teamCount, teamsResult: null };
    }
    case "clear":
      return { ...state, players: [], teamCount: 2, teamsResult: null };
    case "setTeamCount": {
      const teamCount = clampTeamCount(action.value, state.players.length);
      return { ...state, teamCount, teamsResult: null };
    }
    case "setTeamsResult":
      return { ...state, teamsResult: action.teams };
    default:
      return state;
  }
};

const App: FC = () => {
  const [{ players, teamCount, teamsResult }, dispatch] = useReducer(reducer, initialState);

  const handleAddPlayer = (name: string, skill: SkillLevel) => {
    const id =
      typeof globalThis.crypto !== "undefined" && "randomUUID" in globalThis.crypto
        ? globalThis.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    dispatch({ type: "add", player: { id, name, skill } });
  };

  const maxTeams = players.length;
  const drawDisabled = players.length < 2 || teamCount < 2 || teamCount > players.length;

  const handleDraw = () => {
    if (drawDisabled) return;
    if (!teamsResult) {
      const teams = balanceTeams(players, teamCount);
      dispatch({ type: "setTeamsResult", teams: teams.length ? teams : null });
      return;
    }
    const next = findNextTeamSplitForRedraw(players, teamCount, teamsResult);
    if (next) {
      dispatch({ type: "setTeamsResult", teams: next });
      return;
    }
    window.alert("Лучшего варианта распределения команд уже нет.");
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        <Header />
        <AddPlayerSection onAdd={handleAddPlayer} />
        <PlayersSection
          players={players}
          onRemove={(id) => dispatch({ type: "remove", id })}
          onClearAll={() => dispatch({ type: "clear" })}
        />
        <TeamDrawSection
          teamCount={teamCount}
          maxTeams={maxTeams}
          onTeamCountChange={(value) => dispatch({ type: "setTeamCount", value })}
          onDraw={handleDraw}
          drawDisabled={drawDisabled}
        />
        <TeamsResultSection teams={teamsResult} />
      </Container>
    </Box>
  );
};

export default App;
