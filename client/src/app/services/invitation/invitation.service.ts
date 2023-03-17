import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InvitationModel } from 'src/models/invitation.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient) {}

  url = `${environment.baseURL}invitations/`;

  send(invitation: InvitationModel, idReceiver: string){
    return this.http.post(`${this.url}createInvitations/${idReceiver}`, invitation);
  }

  get(id: string){
    return this.http.get(`${this.url}invitationsById/${id}`) as Observable<InvitationModel[]>;
  }

  accept(idProject: string, idReciever: string, idInvitation: string, invitation: InvitationModel){
    return this.http.put(`${this.url}accept/${idProject}/${idReciever}/${idInvitation}`,{invitation});
  }

  decline(idInvitation: string){
    return this.http.put(`${this.url}decline/${idInvitation}`,{});
  }
}
