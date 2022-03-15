import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../styles/Movies.module.css";
import { IMovie, IResultMovie } from "../../../interfaces/list.interface";

const MoviePage = (props) => {
  const data: IResultMovie = props.data;
  const { page, results } = data;
  const router = useRouter();
  const onNextPage = () => {
    router.push(`/movies/${page + 1}`);
  };

  const onPreviousPage = () => {
    router.push(`/movies/${Math.max(page - 1, 1)}`);
  };
  return (
    <>
      <button onClick={() => onPreviousPage()}>Previous</button>
      <button onClick={() => onNextPage()}>Next</button>
      <div className={styles.movies}>
        {results.map((movie: any) => {
          const divStyle = {
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
            backgroundSize: "cover",
          };
          return (
            <Link key={movie.id} href={`/movies/${page}/${movie.id}`}>
              <a className={styles["movie-item"]} key={movie.id}>
                <div style={divStyle} className={styles["movie-item-content"]}>
                  <div className={styles.overlay}>
                    <h2>{movie.original_title}</h2>
                    <p>Release date: {movie.release_date}</p>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = context.params?.page;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=575fe42afb99519dca44ad51c337b911&language=en-US&page=${page}`
  );

  const data = await response.json();
  return {
    props: {
      data: data,
    },
  };
}

// export async function getStaticPaths() {
//   const response = await fetch(
//     "https://api.themoviedb.org/3/movie/popular?api_key=575fe42afb99519dca44ad51c337b911&language=en-US"
//   );
//   const data: IResultMovie = await response.json();

//   const { total_pages } = data;
//   const newArray = Array.from({ length: 50 }, (_, item) => item + 1);
//   const paths = newArray.map((item: any) => {
//     return {
//       params: { page: item.toString() },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: false, // false or 'blocking'
//   };
// }

// export const getStaticProps = async (
//   context: GetStaticPropsContext
// ): Promise<{
//   props: {
//     data: IResultMovie;
//   };
// }> => {
//   const page = context.params?.page;

//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/popular?api_key=575fe42afb99519dca44ad51c337b911&language=en-US&page=${page}`
//   );
//   const data = await response.json();
//   return {
//     props: {
//       data: data,
//     },
//   };
// };

export default MoviePage;
