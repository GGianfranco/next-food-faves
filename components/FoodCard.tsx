import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  const [firstLoadAnimate, setFirstLoadAnimate] = useState(0);
  const [onClickAnimate, setOnClickAnimate] = useState(0);
  const foodCardRef = useRef();

  useEffect(() => {
    if (window.sessionStorage.getItem("firstLoadAnimated") === null) {
      setFirstLoadAnimate(1);
    } else {
      setFirstLoadAnimate(0);
    }
  }, []);

  const handleClickOutside = (event: Event) => {
    if (foodCardRef.current && !foodCardRef.current.contains(event.target)) {
      return setOnClickAnimate(0);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <div
      className={styles.container}
      onClick={() => setOnClickAnimate(1)}
      wobble={firstLoadAnimate}
      zoomCard={onClickAnimate}
      ref={foodCardRef}
    >
      <div className={styles.image}>
        {/* <img src={image} alt={name} /> */}
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
  );
};

export default FoodCard;
