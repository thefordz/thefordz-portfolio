import { SkillCategoriesType } from "../server/get-skill-categories";
import { SkillLevel } from "./skill.validation";

export type SkillCategoryType = SkillCategoriesType[number];

export type SkillItemType = {
  id: string;
  name: string;
  level: SkillLevel | null;
  yearsOfExperience: number | null;
};
