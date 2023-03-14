import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule} from '@angular/common/http';
import { userReducer } from 'src/NgRx/Reducers/user.reducer';
import { UserEffect } from 'src/NgRx/Effects/user.effect';
import { TaskReducer } from 'src/NgRx/Reducers/tasks.reducer';
import { TaskEffects } from 'src/NgRx/Effects/tasks.effect';
import { ProjectEffects } from 'src/NgRx/Effects/projects.effect';
import { ProjectReducer } from 'src/NgRx/Reducers/projects.reducer';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    StoreModule.forRoot({
      user : userReducer,
      task: TaskReducer,
      project: ProjectReducer
    }, {}),
    EffectsModule.forRoot([
      UserEffect,
      TaskEffects,
      ProjectEffects
    ]),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
