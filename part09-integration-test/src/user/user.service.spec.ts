import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', () => {
    const users = service.getAllUsers();
    expect(users).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it('should return a user by id', () => {
    const user = service.getUserById(1);
    expect(user).toEqual({ id: 1, name: 'Alice' });
  });

  it('should add a user', () => {
    const newUser = { name: 'Charlie' };
    const user = service.addUser(newUser.name);
    expect(user).toEqual({ id: 3, name: 'Charlie' });
  });

  it('should update a user', () => {
    const updatedUser = { id: 1, name: 'David' };
    const user = service.updateUser(1, updatedUser.name);
    expect(user).toEqual(updatedUser);
  });

  it('should delete a user', () => {
    const user = service.deleteUser(1);
    expect(user).toEqual(true);
    expect(service.getAllUsers()).toEqual([{ id: 2, name: 'Bob' }]);
  });
});
