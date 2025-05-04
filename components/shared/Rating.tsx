interface RatingProps {
  rating: number;
  readOnly?: boolean;
}

export const Rating = ({ rating, readOnly }: RatingProps) => {
  return (
    <div className="rating">
      {[...Array(rating)].map((_, index) => (
        <input
          key={index}
          type="radio"
          name="rating"
          className="mask mask-star"
          disabled={readOnly ? true : undefined}
          value={index + 1}
        />
      ))}
    </div>
  );
};
