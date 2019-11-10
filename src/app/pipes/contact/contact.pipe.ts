import { Pipe, PipeTransform } from '@angular/core';
import { IContact } from 'src/app/contact.interface';
import { Observable } from 'rxjs';
import { ContactService } from 'src/app/services/contact/contact.service';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  constructor(private contactService: ContactService) {}

  transform(value: string, filterTerm: string): Observable<IContact[]> {
    
    return this.contactService.filterContacts(filterTerm);
  }

}
