/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { MediaDTO } from './mediaDTO';
import type { SkillType } from './skillType';

export interface PortofolioContentDTO {
  description?: string | null;
  id?: number;
  medias?: MediaDTO[] | null;
  skillType?: SkillType;
}
