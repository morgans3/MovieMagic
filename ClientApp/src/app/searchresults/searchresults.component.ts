import { Component, DoCheck } from "@angular/core";
import { Movie } from "../_models/movie";
import { MoviesService } from "../_services/movies.service";
import { NotificationService } from "../_services/notification.service";

@Component({
  selector: "app-searchresults",
  templateUrl: "./searchresults.component.html",
  styleUrls: ["./searchresults.component.css"],
})
export class SearchResultsComponent implements DoCheck {
  movielist: Movie[] = [];

  constructor(private movieService: MoviesService, private notificationService: NotificationService) {}

  ngDoCheck(): void {
    if (localStorage.getItem("@searchresults")) {
      this.movielist = JSON.parse(localStorage.getItem("@searchresults"));
      localStorage.removeItem("@searchresults");
    }
  }
}
