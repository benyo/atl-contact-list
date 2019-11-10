import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { IContact } from 'src/app/contact.interface';
import { ContactService } from 'src/app/services/contact/contact.service';

export interface DialogData {
  contact: IContact
}

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {

  contactForm = this.fb.group({
    id: [''],
    avatar: ['', Validators.required],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$')]],
    phone: ['', [Validators.required]],
  });
  
constructor(public dialogRef: MatDialogRef<ContactDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData, public fb: FormBuilder, public contactService: ContactService) {}
  

  ngOnInit() {
    if(this.isEditContact) {
      this.contactForm.setValue({
        id: this.data.contact.id,
        avatar: this.data.contact.avatar,
        name: this.data.contact.name,
        email: this.data.contact.email,
        phone: this.data.contact.phone,
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.contactForm.invalid)
      return;
      
    if (this.isEditContact) {
      this.contactService.edit(this.contactForm.getRawValue());
    } else {
      this.contactService.add(this.contactForm.getRawValue());
    }
    this.dialogRef.close();
  }

  get isEditContact(): boolean {
    return !!(this.data && this.data.contact);
  }
}
