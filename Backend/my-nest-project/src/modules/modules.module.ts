import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesService } from './modules.services';
import { ModulesController } from './modules.controllers';
import { Modules, ModulesSchema } from './models/modules.schema';
import { resource, ResourceSchema } from '../resources/models/resourse.schema';
import { AuthorizationGuard } from '../auth/guards/authorization.gaurd';
import { AuthGuard } from '../auth/guards/authentication.guard';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Modules.name, schema: ModulesSchema },
      { name: resource.name, schema: ResourceSchema },
    ]),
  AuthModule, //Import AuthModule to provide JwtService
  ],
  controllers: [ModulesController],
  providers: [ModulesService, 
      {
        provide: APP_GUARD, 
        useClass: AuthGuard,
      },
      {
        provide: APP_GUARD,
        useClass: AuthorizationGuard, 
      },],
  exports: [ModulesService,MongooseModule],
})
export class ModulesModule {}
