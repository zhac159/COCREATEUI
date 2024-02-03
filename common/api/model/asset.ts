/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { AssetType } from './assetType';
import type { User } from './user';

export interface Asset {
  assetType?: AssetType;
  cost?: number;
  description?: string | null;
  fileSrc?: string | null;
  id?: number;
  name?: string | null;
  order?: number;
  uri?: string | null;
  user?: User;
  userId?: number;
}
