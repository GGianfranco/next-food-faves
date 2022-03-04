import type { NextPage } from "next";
import styles from "../styles/FoodWindowOverlay.module.css";
import Image from "next/image";

type FoodWindowOverlayProps = {
  name: string;
  image: string;
  description: string;
  stringRating: string;
  setShow: (any: boolean) => void;
};

const FoodWindowOverlay: NextPage<FoodWindowOverlayProps> = (props) => {
  const { name, image, description, stringRating, setShow } = props;

  const myLoader = ({ src }) => {
    return src;
  };

  return (
    <>
      <div className={styles.container} onClick={() => setShow(false)}>
        <div className={styles.modal}>
          <div className={styles.image}>
            <Image
              src={image}
              loader={myLoader}
              alt={image}
              width={500}
              height={500}
              layout="responsive"
            />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{name}</div>
            <div className={styles.rating}>{stringRating}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodWindowOverlay;
