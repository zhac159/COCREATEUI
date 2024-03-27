/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import type { Asset } from './asset';
import type { Enquiry } from './enquiry';
import type { PortofolioContent } from './portofolioContent';
import type { ProjectRole } from './projectRole';
import type { Project } from './project';
import type { Review } from './review';
import type { SeenMatches } from './seenMatches';
import type { Skill } from './skill';

export interface User {
  aboutYou?: string | null;
  address?: string | null;
  assets?: Asset[] | null;
  bannerPictureSrc?: string | null;
  coins?: number;
  email?: string | null;
  enquiries?: Enquiry[] | null;
  latitude?: number;
  longitude?: number;
  password?: string | null;
  portofolioContents?: PortofolioContent[] | null;
  profilePictureSrc?: string | null;
  projectRoles?: ProjectRole[] | null;
  projects?: Project[] | null;
  rating?: number;
  reviewsGiven?: Review[] | null;
  reviewsReceived?: Review[] | null;
  seenMatches?: SeenMatches[] | null;
  skills?: Skill[] | null;
  totalReviews?: number;
  userId?: number;
  username?: string | null;
}
