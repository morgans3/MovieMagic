import { Component } from "@angular/core";
import { Movie } from "../_models/movie";
import { MoviesService } from "../_services/movies.service";
import { NotificationService } from "../_services/notification.service";
import { OMDBApiService } from "../_services/omdbapi.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
  movielist: Movie[];
  posterlinks = [];
  dataLoaded = false;
  searchOptions = [
    { displayname: "title", searchterm: "title" },
    { displayname: "year", searchterm: "year" },
    { displayname: "actor", searchterm: "info.actors" },
    { displayname: "director", searchterm: "info.directors" },
  ];
  currentsearchtype;
  showdrop = false;
  searchbar;

  constructor(private movieService: MoviesService, private notificationService: NotificationService, private omdbService: OMDBApiService, private router: Router) {
    this.currentsearchtype = this.searchOptions[0];
  }

  changesearchtype(selection) {
    this.showdrop = !this.showdrop;
    this.currentsearchtype = this.searchOptions.find((x) => x.displayname === selection.innerHTML);
  }

  searchMovies() {
    const searchvalue = this.searchbar;
    if (!searchvalue || searchvalue.length === 0) return this.notificationService.warning("No search terms entered, please type something to use search.");
    if (this.currentsearchtype === null) return this.notificationService.warning("No search type selected.");

    this.movieService.getByProperty(this.currentsearchtype.searchterm, searchvalue).subscribe(
      (res: Movie[]) => {
        if (res.length === 0) return this.notificationService.warning("No results for this search");

        localStorage.setItem("@searchresults", JSON.stringify(res));
        this.router.navigateByUrl("/search");
      },
      (error) => {
        this.notificationService.warning("No results for this search");
      }
    );
  }
}
