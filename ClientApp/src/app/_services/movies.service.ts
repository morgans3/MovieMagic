import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
declare var window: any;

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  baseUrl: string;
  _theme = "Movies";

  constructor(private http: HttpClient) {
    const parsedUrl = window.location.href;
    this.baseUrl = this.combineURL(parsedUrl);
  }

  private combineURL(origin: string) {
    const domain = origin.split("//")[1].split("/")[0].replace("www", "");
    return "https://" + domain + "/api/" + this._theme;
  }

  public getAll() {
    return this.http.get(this.baseUrl + "getall/");
  }

  public getByProperty(property: string, value: string) {
    return this.http.get(
      this.baseUrl + "/getbyproperty?property=" + property + "&value=" + value
    );
  }
}
