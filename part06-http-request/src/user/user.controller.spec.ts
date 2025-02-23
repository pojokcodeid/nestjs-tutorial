import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest.fn().mockReturnValue([
              { id: 1, name: 'Alice' },
              { id: 2, name: 'Bob' },
            ]),
            getUserById: jest.fn((id) => ({ id: Number(id), name: 'Alice' })),
            addUser: jest.fn((name: string) => ({ id: 3, name })),
            updateUser: jest.fn((id: number, name: string) => ({ id, name })),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            deleteUser: jest.fn((id) => true),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', () => {
    expect(controller.getAllUsers()).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it('should return a user by id', () => {
    expect(controller.getUserById('1')).toEqual({ id: 1, name: 'Alice' });
  });

  it('should add a user', () => {
    expect(controller.addUser({ name: 'Charlie' })).toEqual({
      id: 3,
      name: 'Charlie',
    });
  });

  it('should update a user', () => {
    expect(controller.updateUser('1', { name: 'David' })).toEqual({
      id: 1,
      name: 'David',
    });
  });

  it('should delete a user', () => {
    expect(controller.deleteUser('1')).toBe(true);
  });
});
