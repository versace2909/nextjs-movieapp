export interface IMovie {
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export interface IResultMovie {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
