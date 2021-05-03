import { Routes } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { MovieFullComponent } from "./moviedisplay/moviefull.component";
import { SearchResultsComponent } from "./searchresults/searchresults.component";

export const AppRoutes: Routes = [
  { path: "", component: LandingComponent, pathMatch: "full" },
  { path: "search", component: SearchResultsComponent },
  { path: "movie/:year/:title", component: MovieFullComponent },
];
