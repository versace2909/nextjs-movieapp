import {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";

const MovieDetail = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div>{data.title}</div>
      <div>{data.overview}</div>
      <div>{data.original_title}</div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const movieid = context.params?.movieid;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieid}?api_key=575fe42afb99519dca44ad51c337b911&language=en-US`
  );

  const data = await response.json();

  return {
    props: {
      data: data,
    },
  };
}
export default MovieDetail;
