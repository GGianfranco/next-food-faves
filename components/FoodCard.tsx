import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/FoodCard.module.css";
import FoodWindowOverlay from "../components/FoodWindowOverlay";

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
  const [firstLoadAnimate, setFirstLoadAnimate] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setFirstLoadAnimate(1);
  }, []);

  return (
    <>
      {show && (
        <FoodWindowOverlay
          name={name}
          image={image}
          description={description}
          stringRating={generateRatingEmoji(rating)}
          show={show}
          setShow={setShow}
        />
      )}
      <div
        className={styles.container}
        onAnimationEnd={() => setFirstLoadAnimate(0)}
        onClick={() => setShow(true)}
        wobble={firstLoadAnimate}
      >
        <div className={styles.image}>
          <Image
            src={image}
            alt={image}
            width={100}
            height={50}
            layout="responsive"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.rating}>{generateRatingEmoji(rating)}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;
