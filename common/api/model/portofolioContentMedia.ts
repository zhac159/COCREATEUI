/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { MediaType } from './mediaType';
import type { PortofolioContent } from './portofolioContent';

export interface PortofolioContentMedia {
  id?: number;
  mediaType?: MediaType;
  order?: number;
  portofolioContent?: PortofolioContent;
  portofolioContentId?: number;
  uri?: string | null;
}
