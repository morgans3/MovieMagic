export interface Movie {
  year: number;
  title: string;
  info: Information;
}

export interface Information {
  directors?: string[];
  release_date?: Date;
  rating: number;
  genres?: string[];
  image_url?: string;
  plot: string;
  rank: number;
  running_time_secs: number;
  actors?: string[];
}
