import { ReviewDB } from "@/types/Review";
import { createContext } from "react";

interface ReviewContextType {
  reviews: ReviewDB[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewDB[]>>;
}

const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  setReviews: () => {},
});
export { ReviewContext };
