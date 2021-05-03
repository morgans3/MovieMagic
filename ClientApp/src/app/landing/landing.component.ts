import { Component, OnInit } from "@angular/core";
import { Movie } from "../_models/movie";
import { MoviesService } from "../_services/movies.service";
import { NotificationService } from "../_services/notification.service";
import { OMDBApiService } from "../_services/omdbapi.service";
import async from "async";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
  movielist: Movie[];
  posterlinks = [];
  dataLoaded = false;

  constructor(private movieService: MoviesService, private notificationService: NotificationService, private omdbService: OMDBApiService) {}

  ngOnInit() {
    this.loadNewReleases();
  }

  loadNewReleases() {
    this.movieService.getByProperty("year", "2014").subscribe((res: Movie[]) => {
      this.movielist = res.slice(0, 4);
      console.log(res);
      async.mapSeries(
        this.movielist,
        (values, outerCB) => {
          this.omdbService.getByTitleAndYear(values.title, values.year.toString()).subscribe((res: any) => {
            this.posterlinks.push({ title: values.title, poster: res.Poster });
            outerCB(null, res);
          });
        },
        (err, results) => {
          if (err) {
            this.notificationService.error("Unable to load all Movie Images");
          }
          this.dataLoaded = true;
        }
      );
    });
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
    return "../../assets/sm2.jpg";
  }
}
