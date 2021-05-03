import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../_models/movie";
import { MoviesService } from "../_services/movies.service";
import { NotificationService } from "../_services/notification.service";

@Component({
  selector: "app-moviefull",
  template: `<app-moviedisplay *ngIf="movie" mode="detail" [movie]="movie"></app-moviedisplay>`,
})
export class MovieFullComponent implements OnInit {
  movie: Movie;
  year: string;
  title: string;

  constructor(private route: ActivatedRoute, private movieService: MoviesService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.route.params.forEach((params) => {
      this.year = params["year"];
      this.title = params["title"];
      this.getMovie();
    });
  }

  getMovie() {
    if (!this.year || !this.title) {
      this.notificationService.warning("Unable to find selected movie in database, please search again.");
      return;
    }
    this.movieService.getByProperty("title", this.title).subscribe((res: Movie[]) => {
      this.movie = res.find((x) => x.year.toString() === this.year);
    });
  }
}
