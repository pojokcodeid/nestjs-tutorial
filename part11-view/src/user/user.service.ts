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

  addUser(name: string) {
    const id = this.users.length + 1;
    this.users.push({ id, name });
    return { id, name };
  }

  updateUser(id: number, name: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      user.name = name;
      return user;
    }
    return null;
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
