import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  // Fungsi untuk mendapatkan semua pengguna
  getAllUsers() {
    return this.users;
  }

  // Fungsi untuk mendapatkan pengguna berdasarkan ID
  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
