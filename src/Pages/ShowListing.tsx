import LoadingSkeleton from "@/components/LoadingSkeleton";
import ShowCard, { IShow } from "@/components/ShowCard";
import { SHOWS_LIST_URL } from "@/lib/constants";
import {
  ComponentType,
  DetailedHTMLProps,
  HTMLAttributes,
  RefAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useSwr from "swr";
import { VirtuosoGrid } from "react-virtuoso";
import { Context } from "vm";

const gridComponents: {
  List: ComponentType<
    Pick<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "className" | "style" | "children"
    > & { "data-testid": string } & RefAttributes<HTMLDivElement> & { context?: Context }
  >;
  Item: ComponentType<
    Pick<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "className" | "style" | "children"
    > & { "data-index": number } & RefAttributes<HTMLDivElement> & { context?: Context }
  >;
} = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className="flex flex-wrap justify-start m-auto gap-x-4 gap-y-10 w-[85vw] mt-10"
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div
      {...props}
      style={{
        padding: "0.5rem",
        width: "200px",
        height: 380,
        display: "flex",
        flex: "none",
        alignContent: "stretch",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  ),
};

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
  const { data, isLoading, isValidating } = useSwr<IShow[]>(
    `${SHOWS_LIST_URL}?page=${page}`,
    showListLoader,
    {
      revalidateOnFocus: false,
    }
  );
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (data) {
      setShows([...shows, ...data]);
    }
    () => {
      setShows([]);
      setPage(0);
    };
  }, [data]);

  const lastShowRef = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (isLoading || !data?.length) {
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
    [isLoading, data?.length]
  );

  return (
    <>
      <VirtuosoGrid
        style={{ height: "100vh" }}
        totalCount={shows.length}
        components={{
          ...gridComponents,
          Footer: () => (
            <div className="flex flex-wrap justify-start m-auto gap-x-4 gap-y-10 w-[85vw] mt-10">
              {(isLoading || isValidating) &&
                Array(20)
                  .fill(0)
                  .map((_, index) => <LoadingSkeleton key={index} />)}
            </div>
          ),
        }}
        itemContent={(index: number) => (
          <div ref={shows.length - 1 === index ? lastShowRef : null} key={`${shows[index]?.id}`}>
            <ShowCard
              id={shows[index]?.id}
              name={shows[index]?.name}
              rating={shows[index]?.rating}
              premiered={shows[index]?.premiered}
              image={shows[index]?.image}
            />
          </div>
        )}
      />
      {!isLoading && !data?.length && (
        <p className="text-center text-muted-foreground mt-5">No More Data</p>
      )}
    </>
  );
};

export default ShowListing;
