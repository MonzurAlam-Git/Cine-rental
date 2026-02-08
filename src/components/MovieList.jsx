import { useState } from "react";
import { movieLists } from "../Data/movieLists";
import Movie from "./Movie";

export default function MovieList() {
  const [movieList, setMovieList] = useState(movieLists);
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [movieToDisplay, setmovieToDisplay] = useState(null);

  return (
    <div className="content">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
        {movieLists.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            setShowMovieDetails={setShowMovieDetails}
          />
        ))}
      </div>
    </div>
  );
}
