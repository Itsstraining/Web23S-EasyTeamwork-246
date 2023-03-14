import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NotificationModel } from 'src/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiURL = environment.baseURL+"/notifications/";

  notificationsCount = 0;

  constructor(private http: HttpClient) { }

  getNotification(){
    return this.http.get(`${this.apiURL}allNotification`) as Observable<NotificationModel[]>;
  }

  getNotificationById(notification_id: string | null){
    return this.http.get(`${this.apiURL}invitationsById/${notification_id}`) as Observable<NotificationModel[]>;
  }

  getNotificationByUserId(uid: string){
    return this.http.get(`${this.apiURL}/byUser/${uid}`) as Observable<NotificationModel[]>;
  }

  createNotification(newNotification: any) {
    return this.http.post(`${this.apiURL}createInvitation`, newNotification) as Observable<NotificationModel>;
  }

  updateNotificationById(notification_id: string, updatedNoti: any) {
    return this.http.put(`${this.apiURL}updateNotification/${notification_id}`, updatedNoti)  as Observable<NotificationModel>;
  }

  deleteNotificationById(notification_id: string) {
    return this.http.delete(`${this.apiURL}deleteNotification/${notification_id}`) as Observable<string>;
  }
}
