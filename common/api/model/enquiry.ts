/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { ProjectRole } from './projectRole';
import type { User } from './user';

export interface Enquiry {
  createAt?: string;
  id?: number;
  projectRole?: ProjectRole;
  projectRoleId?: number;
  user?: User;
  userId?: number;
}
