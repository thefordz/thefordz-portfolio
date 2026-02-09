import { ProjectsType } from "../server/get-projects";

export type ProjectType = ProjectsType[number];

export interface ProjectOption {
  id: string;
  title: string;
}
