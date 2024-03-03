/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { MediaUpdateDTO } from './mediaUpdateDTO';
import type { SkillType } from './skillType';

export interface ProjectRoleUpdateDTO {
  address?: string | null;
  cost?: number;
  description?: string | null;
  effort?: number;
  endDate?: string;
  id?: number;
  keywords?: string[] | null;
  latitude?: number;
  longitude?: number;
  medias?: MediaUpdateDTO[] | null;
  name?: string | null;
  remote?: boolean;
  skillType?: SkillType;
  startDate?: string;
}
