import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RetailService } from './retail_api/retail.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { OrdersModule } from './orders/orders.module'
import { ReferenceModule } from './reference/reference.module'

const { join } = require('path')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }
    ),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    OrdersModule,
    ReferenceModule,
  ],
  controllers: [AppController],
  providers: [AppService, RetailService, OrdersModule],
})
export class AppModule {}
