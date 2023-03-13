import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InvitationModel } from 'src/models/invitation.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private apiURL = environment.baseURL + "/invitations";

  countUnReadInvitations: number = 0;
  invitations: InvitationModel[] = [];

  constructor(private http: HttpClient,) { }

  getInvitations() {
    return this.http.get(`${this.apiURL}/all`) as Observable<InvitationModel[]>;
  }

  getInvitation(invitation_id: string | null) {
    return this.http.get(`${this.apiURL}/${invitation_id}`) as Observable<InvitationModel>;
  }

  getInvitationsByUserId(uid: string) {
    console.log("getInvitationsByUserId: ", uid);
    return this.http.get(`${this.apiURL}/byUser/${uid}`) as Observable<InvitationModel[]>;
  }

  getInvitationsByProjectId(project_id: string) {
    return this.http.get(`${this.apiURL}/project/${project_id}`) as Observable<InvitationModel[]>;
  }

  createInvitation(newInvitation: InvitationModel) {
    return this.http.post(`${this.apiURL}`, newInvitation) as Observable<string>;
  }

  updateInvitationById(invitation_id: string, updatedInvitation: any) {
    return this.http.put(`${this.apiURL}/${invitation_id}`, updatedInvitation);
  }

  deleteInvitationById(invitation_id: string) {
    return this.http.delete(`${this.apiURL}/${invitation_id}`) as Observable<string>;
  }
}
