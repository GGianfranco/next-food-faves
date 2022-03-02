import type { NextPage } from "next";
import styles from "../styles/FoodCard.module.css";

type FoodCardProps = {
  name: string;
  image: string;
  description: string;
  rating: number;
};

const generateRatingEmoji = function (rating: FoodCardProps["rating"]): string {
  const upvote = "⭐";

  const ratingEmoji = Array(rating)
    .fill(null)
    .map(() => upvote)
    .join("");

  return ratingEmoji;
};

const FoodCard: NextPage<FoodCardProps> = (props) => {
  const { name, image, description, rating } = props;

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.rating}>{generateRatingEmoji(rating)}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default FoodCard;
