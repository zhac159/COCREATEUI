/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { PrecisionModels } from './precisionModels';

export interface PrecisionModel {
  readonly gridSize?: number;
  readonly isFloating?: boolean;
  readonly maximumSignificantDigits?: number;
  precisionModelType?: PrecisionModels;
  scale?: number;
}
