import { ReviewDTO } from "@/common/api/model";

export type UserReviewDetails = {
  reviewsReceived: ReviewDTO[];
  rating: number;
  totalReviews: number;
};
