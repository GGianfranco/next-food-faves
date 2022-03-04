import type { NextPage } from "next";
import styles from "../styles/FoodWindowOverlay.module.css";
import Image from "next/image";

type FoodWindowOverlayProps = {
  name: string;
  image: string;
  description: string;
  stringRating: string;
  show: boolean;
  setShow: (show: boolean) => void;
};

const FoodWindowOverlay: NextPage<FoodWindowOverlayProps> = (props) => {
  const { name, image, description, stringRating, show, setShow } = props;

  return (
    show && (
      <>
        <div className={styles.container} onClick={() => setShow(false)}>
          <div className={styles.modal}>
            <div className={styles.image}>
              <Image
                src={image}
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
    )
  );
};

export default FoodWindowOverlay;
