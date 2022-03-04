import type { NextPage } from "next";
import styles from "../styles/FoodForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  name: yup.string().max(10).required("Please input food name."),
  image: yup.string().url().required("Please input an image URL."),
  description: yup.string().max(215).required("Please input food description."),
  rating: yup.mixed().oneOf(["0", "1", "2", "3", "4", "5"]),
});

type Food = {
  name: string;
  image: string;
  description: string;
  rating: number;
};

type FoodFormProps = {
  foodFaves: Food[];
  setFoodFaves: (food: Food[]) => void;
};

const FoodForm: NextPage<FoodFormProps> = (props) => {
  const { foodFaves, setFoodFaves } = props;
  const nameMaxChars = 10;
  const descriptionMaxChars = 150;
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Food>({
    resolver: yupResolver(schema),
  });
  const onSubmitSuccess = (data: Food) => {
    toast.success(`${data.name} successfully added!`);
    setName("");
    setImage("");
    setDescription("");
    const newFoodFaves = [...foodFaves];
    newFoodFaves.push({ ...data, rating: Number(data.rating) });
    setFoodFaves(newFoodFaves);
  };

  useEffect(() => {
    if (errors.name) toast.error(errors.name.message);
    if (errors.image) toast.error(errors.image.message);
    if (errors.description) toast.error(errors.description.message);
    if (errors.rating) toast.error(errors.rating.message);
  }, [errors]);

  return (
    <div className={styles.container}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <p>Add Food</p>
      <form onSubmit={handleSubmit(onSubmitSuccess)} className={styles.form}>
        <input
          {...register("name")}
          maxLength={nameMaxChars}
          placeholder="Food name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            setName(event.target.value)
          }
          value={name}
        />
        <caption>{`${name.length}/${nameMaxChars}`}</caption>
        <input
          {...register("image")}
          placeholder="Image URL"
          value={image}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            setImage(event.target.value)
          }
        />
        <textarea
          {...register("description", {
            required: true,
            max: descriptionMaxChars,
            min: 5,
          })}
          placeholder="Description"
          maxLength={descriptionMaxChars}
          rows={10}
          value={description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setDescription(event.target.value)
          }
        />
        <caption>{`${description.length}/${descriptionMaxChars}`}</caption>
        <label htmlFor="rating">Rate (5 stars highest)</label>
        <select {...register("rating")}>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option selected={true} value="3">
            ⭐⭐⭐
          </option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
          <option value="0">No rating</option>
        </select>
        <input type="submit" id="submit" className={styles.submit} />
      </form>
    </div>
  );
};

export default FoodForm;
