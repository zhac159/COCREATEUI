/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { MediaType } from './mediaType';
import type { Project } from './project';

export interface ProjectMedia {
  id?: number;
  mediaType?: MediaType;
  order?: number;
  project?: Project;
  projectId?: number;
  uri?: string | null;
}
