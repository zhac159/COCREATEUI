/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { AssetDTO } from './assetDTO';
import type { EnquiryDTO } from './enquiryDTO';
import type { PortofolioContentDTO } from './portofolioContentDTO';
import type { ProjectDTO } from './projectDTO';
import type { SkillDTO } from './skillDTO';

export interface UserDTO {
  aboutYou?: string | null;
  address?: string | null;
  assets?: AssetDTO[] | null;
  bannerPictureSrc?: string | null;
  coins?: number;
  email?: string | null;
  enquiries?: EnquiryDTO[] | null;
  latitude?: number;
  longitude?: number;
  portofolioContents?: PortofolioContentDTO[] | null;
  profilePictureSrc?: string | null;
  projects?: ProjectDTO[] | null;
  publicKey?: string | null;
  rating?: number;
  skills?: SkillDTO[] | null;
  totalReviews?: number;
  userId?: number;
  username?: string | null;
}
