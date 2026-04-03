export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Player = {
  id: string;
  name: string;
  skill: SkillLevel;
};

export type BalancedTeam = {
  index: number;
  players: Player[];
  totalSkill: number;
};

export const SKILL_OPTIONS: { value: SkillLevel; label: string }[] = [
  { value: 1, label: "Новичок" },
  { value: 2, label: "Любитель" },
  { value: 3, label: "Средний" },
  { value: 4, label: "Хороший" },
  { value: 5, label: "Профи" },
];

export const getSkillLabel = (skill: SkillLevel): string =>
  SKILL_OPTIONS.find((o) => o.value === skill)?.label ?? "";
