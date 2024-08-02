import { useCallback, useState } from "react";
import SearchIcon from "./SearchIcon";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { debounce } from "@/lib/utils";
import TvIcon from "./TvIcon";
import CloseIcon from "./CloseIcon";
import { SHOWS_SEARCH_URL } from "@/lib/constants";

function searchLoader(duration: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cache: Record<string, any> = {};
  return async function (url: string) {
    try {
      if (cache[url]) {
        console.log("served from cache", url);
        return cache[url];
      } else {
        const shows = (await fetch(url)).json();
        cache[url] = shows;
        setTimeout(() => {
          console.log("cleared cache", url);
          delete cache[url];
        }, duration);
        return cache[url];
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}
const fetcher = searchLoader(10000);

interface IsearchResult {
  show: {
    id: number;
    name: string;
    premiered: string;
  };
}

function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      setSearch(e?.target?.value);
    },
    [setSearch]
  );
  const debouncedSearch = debounce(handleSearch, 1000);

  const { data, isLoading } = useSWR<IsearchResult[]>(`${SHOWS_SEARCH_URL}?q=${search}`, fetcher);
  const getReleaseYear = useCallback((date: string) => new Date(date).getFullYear(), []);
  return (
    <div className="sticky top-0 z-50">
      <div className="flex justify-between  bg-[#042542] text-[#4EB1DE] p-5 ">
        <h1 className="text-2xl tracking-tight font-extrabold">STREAM IT</h1>
        {open ? (
          <CloseIcon
            height={24}
            width={24}
            fill="#4EB1DE"
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer"
          />
        ) : (
          <SearchIcon
            height={24}
            width={24}
            fill="#4EB1DE"
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer"
          />
        )}
      </div>

      <Card className={`${open ? "block" : "hidden"} sticky top-0 z-20`}>
        <CardContent>
          <div className="relative mb-3 ml-5 border-b border-gray-300 ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon height={18} width={18} />
            </div>
            <form onChange={debouncedSearch}>
              <input
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border-none focus:outline-none"
                placeholder="person of in"
                required
              />
            </form>
          </div>
          {!isLoading && (
            <ul className="ml-8" onClick={() => setOpen(false)}>
              {data?.map((show) => (
                <li
                  key={show.show.id}
                  className=" flex border-b border-gray-300 p-2 cursor-pointer"
                >
                  <TvIcon height={18} width={18} />
                  <p className="ml-2">
                    <Link to={`shows/${show.show.id}`}>
                      {show.show.name}{" "}
                      <span className="text-muted-foreground">
                        ({getReleaseYear(show.show.premiered)})
                      </span>
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Header;
