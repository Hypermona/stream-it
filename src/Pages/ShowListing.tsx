import LoadingSkeleton from "@/components/LoadingSkeleton";
import ShowCard, { IShow } from "@/components/ShowCard";
import { useCallback, useEffect, useRef, useState } from "react";
import useSwr from "swr";

const showListLoader = async (url: string) => {
  try {
    const shows = (await fetch(url)).json();
    return shows;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const ShowListing = () => {
  const [page, setPage] = useState(0);
  const [shows, setShows] = useState<IShow[]>([]);
  const { data, isLoading } = useSwr<IShow[]>(
    `https://api.tvmaze.com/shows?page=${page}`,
    showListLoader
  );
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (data) {
      setShows((prev) => [...prev, ...data]);
    }
  }, [data]);

  const lastShowRef = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
          observer.current?.disconnect();
        }
      });
      if (e) {
        observer.current.observe(e);
      }
    },
    [isLoading]
  );

  return (
    <>
      <div className="flex flex-wrap justify-between m-auto gap-x-2 gap-y-10 w-[85vw] mt-10">
        {shows?.map((show, index) => (
          <div ref={shows.length - 1 === index ? lastShowRef : null} key={`${show.id}`}>
            <ShowCard
              id={show.id}
              name={show.name}
              rating={show.rating}
              premiered={show.premiered}
              image={show.image}
            />
          </div>
        ))}
        {isLoading &&
          Array(20)
            .fill(0)
            .map((_, index) => <LoadingSkeleton key={index} />)}
      </div>
    </>
  );
};

export default ShowListing;
