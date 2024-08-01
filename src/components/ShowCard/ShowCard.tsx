import { Link } from "react-router-dom";
import CircularRating from "../CircularRating";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export interface IImage {
  medium: string;
  original: string;
}

export interface ICast {
  person: {
    name: string;
    image: IImage;
  };
  character: {
    name: string;
  };
}

export interface IShow {
  id: number;
  name: string;
  rating: {
    average: number | null;
  };
  image: IImage;
  premiered: string;
  _embedded: {
    cast: ICast[];
  };
  backgroundColor?: string;
  officialSite: string;
  summary: string;
  genres: string[];
}

export default function ShowCard({ id, name, rating, image, premiered }: Partial<IShow>) {
  return (
    <Card className="w-[200px] relative">
      <Skeleton className="h-full w-full absolute z-[-1]" />
      <Link to={`/shows/${id}`} className="h-[278px]">
        <img src={image?.medium} alt="name" />
      </Link>
      <CardContent className="pt-8 relative">
        {rating?.average && (
          <div className="absolute top-[-30px]">
            <CircularRating rating={rating.average} />
          </div>
        )}

        <h2 className="leading-7 font-bold">
          {" "}
          <Link to={`/shows/${id}`}>{name} </Link>
        </h2>
        <p className="text-sm text-muted-foreground ">{premiered}</p>
      </CardContent>
    </Card>
  );
}
