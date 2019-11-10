import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ContactResolver } from './services/contact/contact.service';


const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    resolve: {
      contactResolver: ContactResolver
    },
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
