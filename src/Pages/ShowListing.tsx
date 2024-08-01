import ShowCard, { IShow } from "@/components/ShowCard";
import { useLoaderData } from "react-router-dom";

export const showListLoader = async () => {
  try {
    const shows = (await fetch("https://api.tvmaze.com/shows?page=0")).json();
    return shows;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const ShowListing = () => {
  const data = useLoaderData() as IShow[];
  console.log(data);
  return (
    <div className="flex flex-wrap gap-5 m-20">
      {data.map((show) => (
        <ShowCard
          id={show.id}
          name={show.name}
          rating={show.rating}
          premiered={show.premiered}
          image={show.image}
        />
      ))}
    </div>
  );
};

export default ShowListing;
