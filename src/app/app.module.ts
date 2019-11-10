import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask'
import {
  MatSliderModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatMenuModule,
  MatSnackBarModule,
  MatDialogModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactService, ContactResolver } from './services/contact/contact.service';
import { ContactDialogComponent } from './contact/contact-dialog/contact-dialog.component';
import { ContactFilterPipe } from './pipes/contact/contact.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactDialogComponent,
    ContactFilterPipe,
  ],
  entryComponents: [
    ContactDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({
      showMaskTyped: true,
    }),
    MatSliderModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    ContactService,
    ContactResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
