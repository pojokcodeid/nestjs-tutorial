import { Prisma } from '@prisma/client';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ name: 'EmailExists', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  private prisma = new PrismaService();
  async validate(value: string, args?: ValidationArguments): Promise<boolean> {
    const { table, field } = args?.constraints[0] as {
      table: string;
      field: string;
    };
    const record: [] = await this.prisma.$queryRaw`
      select * from  ${Prisma.raw(table)} where ${Prisma.raw(field)} = ${value}
    `;
    if (record.length == 0) {
      return true;
    }
    return false;
  }
  defaultMessage?(): string {
    return '$property already exists';
  }
}

export type IsUniqueInput = {
  table: string;
  field: string;
};

export function IsUnique(
  property: IsUniqueInput,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsUniqueConstraint,
    });
  };
}
