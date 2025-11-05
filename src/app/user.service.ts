import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  users = signal<any[]>([]);
  loading = signal(false);
   selectedUser = signal<any | null>(null);

  loadUsers() {
    this.loading.set(true);
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (res: any[]) => this.users.set(res),
        complete: () => this.loading.set(false)
      });
  }

   loadUserById(id: number) {
    this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .subscribe(user => this.selectedUser.set(user));
  }

  clearSelection() {
    this.selectedUser.set(null);
  }
}
