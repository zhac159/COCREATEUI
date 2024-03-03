/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { CoordinateSequenceFactory } from './coordinateSequenceFactory';
import type { NtsGeometryServices } from './ntsGeometryServices';
import type { PrecisionModel } from './precisionModel';

export interface GeometryFactory {
  coordinateSequenceFactory?: CoordinateSequenceFactory;
  geometryServices?: NtsGeometryServices;
  precisionModel?: PrecisionModel;
  readonly srid?: number;
}
