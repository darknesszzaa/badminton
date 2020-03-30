import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {

  private apiURL = '';
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  public login(): Observable<any> {
    let url = this.apiURL + '/authen/signin';
    return this.http.post<any>(url, { username: 'admin', pword: 'P@ssw0rd' });
  }


  public getMembers(): Observable<any> {
    let url = this.apiURL + '/users';
    return this.http.get<any>(url);
  }

  public getTeam(): Observable<any> {
    let url = this.apiURL + '/teams';
    return this.http.get<any>(url);
  }

  public getGenerateTeam(): Observable<any> {
    let url = this.apiURL + '/generate-team';
    return this.http.get<any>(url);
  }

  public getTotalPlayerJoin(): Observable<any> {
    let url = this.apiURL + '/total-join';
    return this.http.get<any>(url);
  }

  public join(input): Observable<any> {
    let data = Object.assign({}, input)
    data.isJoin = !data.isJoin
    let url = this.apiURL + '/member-join';
    return this.http.post<any>(url, data);
  }

  public addMember(input): Observable<any> {
    let url = this.apiURL + '/add-member';
    return this.http.post<any>(url, input);
  }

}
