import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OMDBApiService {
  baseUrl = "https://www.omdbapi.com/?apikey=fd23dbbf&";

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get(this.baseUrl + "t=Rush&y=2013");
  }

  public getByTitleAndYear(title: string, year: string) {
    return this.http.get(this.baseUrl + "t=" + title + "&y=" + year);
  }
}
