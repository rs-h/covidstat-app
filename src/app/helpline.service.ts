import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelplineService {

  constructor(private http: HttpClient) { }

  getStates(): Observable<any[]> {
    // TODO: send the message _after_ fetching the heroes
  return this.http.get('');
  }

  getCities(): Observable<any> {
    // TODO: send the message _after_ fetching the heroes
  return this.http.get('https://gist.github.com/vrajroham/eab31d10690a3436a5d4');
  }

  getLiveAll(): Observable<any> {
    return this.http.get('https://api.covid19api.com/country/south-africa/status/confirmed/live?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z');
    
  }

  getSummary(): Observable<any> {
    return this.http.get('https://api.covid19api.com/summary');
    
  }

  getCountries(): Observable<any> {
    return this.http.get('https://api.covid19api.com/countries');
  }

  getCountryStatus(country): Observable<any> {
    return this.http.get(`https://api.covid19api.com/dayone/country/${country}`);
  }

  getIndiaStats(): Observable<any> {
    return this.http.get(`https://api.data.gov.in/resource/cd08e47b-bd70-4efb-8ebc-589344934531?limit=all&api-key=579b464db66ec23bdd000001cdc3b564546246a772a26393094f5645&format=viz`);
  }

  getIndiaSummary(): Observable<any> {
    return this.http.get(`https://api.data.gov.in/resource/677ea746-7a41-4a98-9de9-777a2a071d81?limit=1&api-key=579b464db66ec23bdd000001cdc3b564546246a772a26393094f5645&format=json`);
  }

}