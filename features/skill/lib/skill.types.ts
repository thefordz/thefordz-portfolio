import { SkillCategoriesType } from "../server/get-skill-categories";
import { SkillLevel } from "./skill.validation";

export type SkillCategoryType = SkillCategoriesType[number];

export interface SkillItemType {
  id: string;
  name: string;
  level: SkillLevel | null;
  yearsOfExperience: number | null;
}

export interface SkillOption {
  id: string;
  name: string;
}

export interface SkillCategoryOption {
  id: string;
  name: string;
  skills: SkillOption[];
}
