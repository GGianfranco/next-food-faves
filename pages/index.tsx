import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import FoodForm from "../components/FoodForm";
import styles from "../styles/Home.module.css";

const sampleData = [
  {
    name: "Coleslaw",
    image:
      "https://www.chowhound.com/a/img/resize/62679fa3d1cceba5c0da0c667b3af6a621532df6/2018/06/best-coleslaw-recipe-chowhound.jpg?fit=bounds&height=400&width=400",
    description:
      "The fact that it's a vegetable is already enough for me to like to eat it but the combination of well cut strips of cabbage and carrots with a little bit of lemon and oozing mayonnaise makes me like to eat it more!",
    rating: 5,
  },
  {
    name: "Burnt Sunny Side Up!",
    image:
      "https://static.onecms.io/wp-content/uploads/sites/19/2018/02/13/sunny-side-up-eggs-hero-2000.jpg",
    description:
      "I like sunny side up especially when it is slightly burnt. The crunchiness of the burnt area might sound but it significantly adds a pleasant texture to the mouth",
    rating: 5,
  },
  {
    name: "Buttery Scrambled Egg",
    image:
      "https://www.thespruceeats.com/thmb/qom1mjUXWVYVdyv3mwnXeIQO-Po=/4444x3333/smart/filters:no_upscale()/scrambled-eggs-58a701ac5f9b58a3c91cbebd.jpg",
    description:
      "Buttery Scrambled Egg gives the opposite feeling of what the Burnt Sunny Side Up! offers. The creamy texture from the scrambled egg is perfect to partner with a toasted garlic bread.",
    rating: 4,
  },
  {
    name: "Shanghai",
    image:
      "https://www.kawalingpinoy.com/wp-content/uploads/2017/06/lumpiang-shanghai-4.jpg",
    description:
      "One of the three legends in children parties (with Hotdog and Spaghetti). Shanghai I would say is the best.",
    rating: 5,
  },
  {
    name: "Vinegar",
    image:
      "https://www.thespruceeats.com/thmb/sxilu_dZIoHYwLOLzu1A_x66Zdg=/1495x1121/smart/filters:no_upscale()/Vinegar-twenty20_117eafb1-ad35-44e3-bfda-70f0572bd144-590752e83df78c5456a39f4a.jpg",
    description:
      'The "good taste" it is known for I don\'t think overweighs the "not so good smell" it comes with. So I\'ll just give it a one for existing.',
    rating: 1,
  },
  {
    name: "Angel's Burger",
    image:
      "https://4.bp.blogspot.com/-pqJtCAvHJgw/WsEMT4OenII/AAAAAAAAaKw/Kz1lkutru90_T-b9tDta13LitM2CL0dGQCLcBGAs/s1600/Snapseed_1.jpg",
    description: "My study buddy in my college days. I miss you.",
    rating: 3,
  },
];

type Food = {
  name: string;
  image: string;
  description: string;
  rating: number;
};

const compareByRatingsAscending = (a: Food, b: Food) => {
  if (a.rating < b.rating) {
    return -1;
  }
  if (a.rating > b.rating) {
    return 1;
  }
  return 0;
};

const compareByRatingsDescending = (b: Food, a: Food) => {
  if (a.rating < b.rating) {
    return -1;
  }
  if (a.rating > b.rating) {
    return 1;
  }
  return 0;
};

const Home: NextPage = () => {
  const [foodFaves, setFoodFaves] = useState<Food[]>(sampleData);
  const [list, setList] = useState<Food[]>(foodFaves);
  useEffect(() => {
    setList(foodFaves);
  }, [foodFaves]);

  const [sortedTopRatingFirst, setSortedTopRatingFirst] = useState(false);

  const sortTopRatingFirst = (): void => {
    setList((list) => [...list.sort(compareByRatingsDescending)]);
    setSortedTopRatingFirst(() => true);
  };
  const sortWorstRatingFirst = (): void => {
    setList((list) => [...list.sort(compareByRatingsAscending)]);
    setSortedTopRatingFirst(() => false);
  };

  const filterList = (keyword: string): void => {
    if (keyword === "") {
      setList(() => [...foodFaves]);
      sortedTopRatingFirst ? sortTopRatingFirst() : sortWorstRatingFirst();
      return;
    }

    setList((list) => [
      ...list.filter((foodFave) =>
        foodFave.name.toLowerCase().includes(keyword)
      ),
    ]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Food Faves</title>
        <meta
          name="description"
          content="A simple Next.js application to showcase my favorite foods."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div className={styles.controls}>
          <input
            className={styles.search}
            type="search"
            onChange={(event) => filterList(event.target.value)}
            placeholder="Search by food name"
          />
          {sortedTopRatingFirst ? (
            <button onClick={sortWorstRatingFirst}>
              Sort by worst rating first
            </button>
          ) : (
            <button onClick={sortTopRatingFirst}>
              Sort by top rating first
            </button>
          )}
          <FoodForm foodFaves={foodFaves} setFoodFaves={setFoodFaves} />
        </div>
        <div className={styles.content}>
          {list.map((foodFave, index) => (
            <FoodCard
              key={index}
              name={foodFave["name"]}
              image={foodFave["image"]}
              description={foodFave["description"]}
              rating={foodFave["rating"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
