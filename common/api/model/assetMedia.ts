/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { Asset } from './asset';
import type { MediaType } from './mediaType';

export interface AssetMedia {
  asset?: Asset;
  assetId?: number;
  id?: number;
  mediaType?: MediaType;
  order?: number;
  uri?: string | null;
}
