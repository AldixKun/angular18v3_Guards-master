import { Component, inject, effect } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { UserService } from '../user.service';


@Component({
  standalone: true,
  selector: 'app-users',
  template: `
  <h2>Users</h2>
<button (click)="service.loadUsers()">Reload</button>

@if (service.loading()) {
  <p>Loading users...</p>
} @else {
  <ul>
    @for (user of service.users(); track user.id) {
      <app-child
        [message]="user.name"
        [userId]="user.id"
        (send)="onChildMsg($event)">
      </app-child>
    }
  </ul>
}

<!-- Panel con detalle del usuario seleccionado -->
@if (service.selectedUser()) {
  <div class="modal">
    <h3>{{ service.selectedUser().name }}</h3>
    <p><strong>Email:</strong> {{ service.selectedUser().email }}</p>
    <p><strong>Phone:</strong> {{ service.selectedUser().phone }}</p>
    <p><strong>Company:</strong> {{ service.selectedUser().company.name }}</p>
    <button (click)="closeDetail()">Close</button>
  </div>
}


  
  `,
  imports: [ChildComponent]
})
export class UsersComponent {
   service = inject(UserService);

  onChildMsg(userId: number) {
    this.service.loadUserById(userId);
  }

  closeDetail() {
    this.service.clearSelection();
  }
}
