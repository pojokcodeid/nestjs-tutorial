import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ReferenceService } from './reference.service';

@Controller('reference')
export class ReferenceController implements OnModuleInit {
  private referenceServe: ReferenceService;
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    this.referenceServe = this.moduleRef.get(ReferenceService);
  }

  @Get()
  getHello(): string {
    return this.referenceServe.getData();
  }
}
