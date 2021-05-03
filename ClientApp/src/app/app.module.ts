import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { NotificationService } from "./_services/notification.service";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MoviesService } from "./_services/movies.service";
import { AppRoutes } from "./app.routing";
import { LandingComponent } from "./landing/landing.component";
import { OMDBApiService } from "./_services/omdbapi.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BreakPointRegistry, FlexLayoutModule, FlexStyleBuilder, LayoutAlignStyleBuilder, LayoutStyleBuilder, MediaMarshaller, PrintHook, StylesheetMap, StyleUtils } from "@angular/flex-layout";
import { SearchComponent } from "./search/search.component";
import { SearchResultsComponent } from "./searchresults/searchresults.component";
import { MovieDisplayComponent } from "./moviedisplay/moviedisplay.component";
import { MovieFullComponent } from "./moviedisplay/moviefull.component";

@NgModule({
  declarations: [AppComponent, NavMenuComponent, LandingComponent, SearchComponent, SearchResultsComponent, MovieDisplayComponent, MovieFullComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: "toast-bottom-full-width",
      preventDuplicates: true,
    }),
    NgbModule,
    FlexLayoutModule,
  ],
  providers: [NotificationService, MoviesService, OMDBApiService, PrintHook, StyleUtils, StylesheetMap, LayoutAlignStyleBuilder, LayoutStyleBuilder, FlexStyleBuilder, MediaMarshaller, BreakPointRegistry],
  bootstrap: [AppComponent],
})
export class AppModule {}
