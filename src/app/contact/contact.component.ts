import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ContactService } from '../services/contact/contact.service';
import { IContact } from '../contact.interface';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  filterTerm: string = '';
  constructor(public contactService: ContactService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {  }

  deleteContact(contact: IContact) {
    const snackBar = this.snackBar.open(`Seguro que desea eliminar a ${contact.name}`, "Cancelar", {
      duration: 3000,
    })
    
    snackBar.afterDismissed()
      .subscribe((data: any) => {
        if(!data.dismissedByAction) {
          this.contactService.delete(contact);
        }
      });
  }

  newContact(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '600px',
      data: {}
    });
  }

  editContact(contact: IContact): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '600px',
      data: { contact }
    });
  }
}
