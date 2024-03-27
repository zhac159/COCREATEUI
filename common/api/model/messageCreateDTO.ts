/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { ChatType } from './chatType';
import type { MediaType } from './mediaType';

export interface MessageCreateDTO {
  chatId?: number;
  chatType?: ChatType;
  content?: string | null;
  date?: string;
  id?: string;
  mediaType?: MediaType;
  nonce?: string | null;
  uri?: string | null;
}
