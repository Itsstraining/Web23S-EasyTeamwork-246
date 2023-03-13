import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NotificationModel } from 'src/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiURL = environment.baseURL+"/notifications";

  notificationsCount = 0;

  constructor(private http: HttpClient) { }

  getNotis(){
    return this.http.get(`${this.apiURL}/all`) as Observable<NotificationModel[]>;
  }

  getNoti(noti_id: string | null){
    return this.http.get(`${this.apiURL}/${noti_id}`) as Observable<NotificationModel[]>;
  }

  getNotisByUserId(uid: string){
    return this.http.get(`${this.apiURL}/byUser/${uid}`) as Observable<NotificationModel[]>;
  }

  getNotisByProjectId(project_id: string){
    return this.http.get(`${this.apiURL}/project/${project_id}`)  as Observable<NotificationModel[]>;
  }

  createNoti(newNoti: any) {
    return this.http.post(`${this.apiURL}`, newNoti) as Observable<NotificationModel>;
  }

  updateNotiById(noti_id: string, updatedNoti: any) {
    return this.http.put(`${this.apiURL}/${noti_id}`, updatedNoti)  as Observable<NotificationModel>;
  }

  deleteNotiById(noti_id: string) {
    return this.http.delete(`${this.apiURL}/${noti_id}`) as Observable<string>;
  }
}
