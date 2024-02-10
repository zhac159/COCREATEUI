/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { User } from './user';
import type { Enquiry } from './enquiry';
import type { Project } from './project';
import type { SeenMatches } from './seenMatches';
import type { SkillType } from './skillType';

export interface ProjectRole {
  assignee?: User;
  assigneeId?: number | null;
  cost?: number;
  description?: string | null;
  effort?: number;
  enquiries?: Enquiry[] | null;
  fileSrcs?: string[] | null;
  id?: number;
  latitude?: number;
  longitude?: number;
  name?: string | null;
  project?: Project;
  projectId?: number;
  remote?: boolean;
  seenMatches?: SeenMatches[] | null;
  skillType?: SkillType;
  uris?: string[] | null;
}
