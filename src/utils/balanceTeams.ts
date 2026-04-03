import type { BalancedTeam, Player } from "../types/player";

const shuffleInPlace = <T>(items: T[]): void => {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
};

const sortPlayersWithRandomTies = (players: Player[]): Player[] => {
  const bySkill = new Map<number, Player[]>();
  let maxSkill = 0;
  for (const p of players) {
    const list = bySkill.get(p.skill) ?? [];
    list.push(p);
    bySkill.set(p.skill, list);
    if (p.skill > maxSkill) maxSkill = p.skill;
  }
  const result: Player[] = [];
  for (let s = maxSkill; s >= 1; s -= 1) {
    const list = bySkill.get(s);
    if (!list?.length) continue;
    shuffleInPlace(list);
    result.push(...list);
  }
  return result;
};

export const teamsSpread = (teams: BalancedTeam[]): number => {
  if (teams.length === 0) return 0;
  const sums = teams.map((t) => t.totalSkill);
  return Math.max(...sums) - Math.min(...sums);
};

/**
 * Жадное распределение: сортируем по уровню и отдаём каждого игрока в команду с минимальной суммой очков.
 */
export const balanceTeams = (players: Player[], teamCount: number): BalancedTeam[] => {
  if (teamCount < 2 || players.length < teamCount) {
    return [];
  }

  const sorted = [...players].sort((a, b) => b.skill - a.skill);
  const buckets: Player[][] = Array.from({ length: teamCount }, () => []);
  const totals = new Array(teamCount).fill(0);

  for (const player of sorted) {
    let best = 0;
    for (let i = 1; i < teamCount; i += 1) {
      if (totals[i] < totals[best]) best = i;
    }
    buckets[best].push(player);
    totals[best] += player.skill;
  }

  return buckets.map((list, index) => ({
    index,
    players: list,
    totalSkill: list.reduce((s, p) => s + p.skill, 0),
  }));
};

/**
 * То же жадное правило, но порядок при равном уровне и выбор команды при равных суммах — случайные.
 */
export const balanceTeamsRandomized = (players: Player[], teamCount: number): BalancedTeam[] => {
  if (teamCount < 2 || players.length < teamCount) {
    return [];
  }

  const sorted = sortPlayersWithRandomTies(players);
  const buckets: Player[][] = Array.from({ length: teamCount }, () => []);
  const totals = new Array(teamCount).fill(0);

  for (const player of sorted) {
    let minTotal = Infinity;
    const candidates: number[] = [];
    for (let i = 0; i < teamCount; i += 1) {
      if (totals[i] < minTotal) {
        minTotal = totals[i];
        candidates.length = 0;
        candidates.push(i);
      } else if (totals[i] === minTotal) {
        candidates.push(i);
      }
    }
    const pick = candidates[Math.floor(Math.random() * candidates.length)]!;
    buckets[pick].push(player);
    totals[pick] += player.skill;
  }

  return buckets.map((list, index) => ({
    index,
    players: list,
    totalSkill: list.reduce((s, p) => s + p.skill, 0),
  }));
};

const DEFAULT_REDRAW_TRIALS = 600;

/** Устойчивая подпись разбиения: порядок команд не важен, внутри команды — по id игрока. */
const partitionSignature = (teams: BalancedTeam[]): string => {
  const teamSigs = teams.map((t) => [...t.players.map((p) => p.id)].sort().join(",")).sort();
  return teamSigs.join("|");
};

/**
 * Повторная жеребьёвка:
 * 1) если есть разбиение со строго меньшим разбросом сумм уровней — возвращаем его;
 * 2) иначе ищем другое разбиение с тем же разбросом (другой состав пар, как два профи и напарники);
 * 3) если и это невозможно за число попыток — null (тогда показываем alert).
 */
export const findNextTeamSplitForRedraw = (
  players: Player[],
  teamCount: number,
  currentTeams: BalancedTeam[],
  trials: number = DEFAULT_REDRAW_TRIALS,
): BalancedTeam[] | null => {
  const currentSpread = teamsSpread(currentTeams);
  const currentKey = partitionSignature(currentTeams);

  let bestStrict: BalancedTeam[] | null = null;
  let bestStrictSpread = currentSpread;

  for (let t = 0; t < trials; t += 1) {
    const candidate = balanceTeamsRandomized(players, teamCount);
    if (!candidate.length) continue;
    const spread = teamsSpread(candidate);
    if (spread < bestStrictSpread) {
      bestStrictSpread = spread;
      bestStrict = candidate;
    }
  }

  if (bestStrict != null && bestStrictSpread < currentSpread) {
    return bestStrict;
  }

  for (let t = 0; t < trials; t += 1) {
    const candidate = balanceTeamsRandomized(players, teamCount);
    if (!candidate.length) continue;
    if (teamsSpread(candidate) !== currentSpread) continue;
    if (partitionSignature(candidate) !== currentKey) {
      return candidate;
    }
  }

  return null;
};
