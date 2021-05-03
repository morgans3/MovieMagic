import { Component, Input, OnInit } from "@angular/core";
import { Movie } from "../_models/movie";
import { OMDBApiService } from "../_services/omdbapi.service";

@Component({
  selector: "app-moviedisplay",
  templateUrl: "./moviedisplay.component.html",
  styleUrls: ["./moviedisplay.component.css"],
})
export class MovieDisplayComponent implements OnInit {
  @Input() movie: Movie;
  @Input() mode?: string;
  movielist: Movie[];
  posterlinks = [];
  dataLoaded = false;
  selectedMode: string;

  constructor(private omdbService: OMDBApiService) {}

  ngOnInit() {
    this.selectedMode = this.mode || "search";
    this.getPoster(this.movie.title, this.movie.year);
  }

  getPoster(title: string, year: number) {
    this.omdbService.getByTitleAndYear(title, year.toString()).subscribe((res: any) => {
      this.posterlinks.push({ title: title, poster: res.Poster });
      console.log(res);
    });
  }

  thisPoster(movie: Movie) {
    if (this.posterlinks.find((x) => x.title === movie.title)) {
      return this.posterlinks.find((x) => x.title === movie.title).poster;
    }
    return "../../assets/bridges.jpg";
  }
}
