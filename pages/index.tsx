import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import FoodCard from "../components/FoodCard";
import styles from "../styles/Home.module.css";

const foodFaves = [
  {
    name: "Coleslaw",
    image: "/coleslaw.webp",
    description:
      "The fact that it's a vegetable is already enough for me to like to eat it but the combination of well cut strips of cabbage and carrots with a little bit of lemon and oozing mayonnaise makes me like to eat it more!",
    rating: 5,
  },
  {
    name: "Burnt Sunny Side Up!",
    image: "/sunny-side-up.jpg",
    description:
      "I like sunny side up especially when it is slightly burnt. The crunchiness of the burnt area might sound but it significantly adds a pleasant texture to the mouth",
    rating: 5,
  },
  {
    name: "Buttery Scrambled Egg",
    image: "/scrambled.jpg",
    description:
      "Buttery Scrambled Egg gives the opposite feeling of what the Burnt Sunny Side Up! offers. The creamy texture from the scrambled egg is perfect to partner with a toasted garlic bread.",
    rating: 4,
  },
  {
    name: "Shanghai",
    image: "/shanghai.webp",
    description:
      "One of the three legends in children parties (with Hotdog and Spaghetti). Shanghai I would say is the best.",
    rating: 5,
  },
  {
    name: "Vinegar",
    image: "/vinegar.jpg",
    description:
      'The "good taste" it is known for I don\'t think overweighs the "not so good smell" it comes with. So I\'ll just give it a one for existing.',
    rating: 1,
  },
  {
    name: "Angel's Burger",
    image: "/burger.jpg",
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
  const [list, setList] = useState(foodFaves);
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
        <h1 className={styles.title}>Vegetables and eggs forever. 🍳</h1>
        <input
          className={styles.search}
          type="search"
          onChange={(event) => filterList(event.target.value)}
          placeholder="Search by keyword"
        />
        {sortedTopRatingFirst ? (
          <button onClick={sortWorstRatingFirst}>
            Sort by worst rating first
          </button>
        ) : (
          <button onClick={sortTopRatingFirst}>Sort by top rating first</button>
        )}
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
