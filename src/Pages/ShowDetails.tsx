import CircularRating from "@/components/CircularRating";
import { IShow } from "@/components/ShowCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SHOW_DETAILS_URL } from "@/lib/constants";
import { useMemo } from "react";
import { Link, ScrollRestoration, useLoaderData } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function showloader({ params }: any) {
  try {
    const show = (await fetch(`${SHOW_DETAILS_URL}/${params.showId}?embed=cast`)).json();
    return show;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const ShowDetails = () => {
  const show = useLoaderData() as IShow;
  const releaseYear = useMemo(() => new Date(show.premiered).getFullYear(), [show.premiered]);
  return (
    <>
      <div
        className={`flex flex-wrap w-full bg-stone-800 text-white`}
        style={{
          backgroundImage: `url(${show.image.original})`,
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="w-full sm:w-[20vw] shadow-none rounded-sm m-14 relative">
          <Skeleton className="h-full w-full absolute " />
          <img src={show.image.medium} width={300} alt={show.name} />
          <div className="p-2 bg-blue-950 rounded flex justify-center items-center">
            <img
              className="w-10 h-10 object-cover rounded-md"
              src="https://v3img.voot.com/v3Storage/assets/jc_logo_stack-1682163295957.jpg"
              alt="Jio Cinema"
            />
            <div className="ml-2">
              <p className="text-1xl font-medium mb-[-6px] tracking-tight text-gray-400">
                Now Streaming
              </p>
              <p className="text-1xl font-semibold tracking-tight">
                <Link to={show?.officialSite || "#"} target="_blank">
                  Watch Now
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="sm:w-[60vw] mt-10">
          <div className="sm:mt-[20vh]">
            <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              {show.name}
              <span className="text-gray-400 font-normal"> ({releaseYear}) </span>
            </h2>
            <p className="text-gray-400">{show.genres?.join(", ")}</p>
          </div>
          {show.rating.average && (
            <div className="flex my-4 mr-4">
              <CircularRating rating={show.rating.average} />
              <p className="w-10 ml-3 font-semibold">User Score</p>
            </div>
          )}
          <p className="text-2xl font-semibold tracking-tight">Overview</p>
          <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: show.summary }}></div>
        </div>
      </div>
      <div className="my-10 mx-10">
        <h2 className="my-5 text-2xl font-normal">Series Cast</h2>
        <div className="flex gap-3 overflow-auto pb-3">
          {show?._embedded?.cast.map((cast, i) => (
            <Card className="w-[180px]" key={cast.character.name + i}>
              <div className=" w-[180px] h-[252px] relative">
                <Skeleton className="h-full w-full absolute " />
                <img
                  src={cast.person.image.medium}
                  alt={cast.person.name}
                  className="rounded-t-md z-10"
                />
              </div>
              <CardContent className="pt-4 px-2">
                <p className="font-bold">{cast.person.name}</p>
                <p>{cast.character.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default ShowDetails;
