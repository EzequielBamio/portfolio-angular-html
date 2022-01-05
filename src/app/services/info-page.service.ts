import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPage } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPage = {};
  loaded: boolean = false;

  team: any[] = [];

  constructor( private http: HttpClient) 
  {
    this.getLoadInfo();
    this.getLoadTeam();
  }

  private getLoadInfo()
  {
    this.http.get( 'assets/data/data-page.json' ).subscribe( (resp: InfoPage) => {
      this.loaded = true;
      this.info = resp;
    });
  }

  private getLoadTeam()
  {
    this.http.get('https://angular-html-9ea60-default-rtdb.firebaseio.com/team.json').subscribe( (resp: any) => {

      this.team = resp;
    });
  }

  

}
