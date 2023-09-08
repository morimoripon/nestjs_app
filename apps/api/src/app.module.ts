import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaModule } from 'nestjs-prisma'

import { AuthModule } from './modules/auth/auth.module'
import { ClientsModule } from './modules/clients/clients.module'
import { CommonModule } from './modules/common/common.module'
import { FormSettingsModule } from './modules/formSettings/form-settings.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    PrismaModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './graphql/schema.gql',
      sortSchema: true,
      // TODO: https://github.com/aisaac-lab/ticketx/issues/80
      // hasuraのremoteスキーマを使う時にintrospectionの情報を使う。上記のissueの対応が終えるまでの暫定対処。
      introspection: true,
      // [Todo] 本番ではfalse
      playground: true,
    }),
    AuthModule,
    CommonModule,
    UsersModule,
    FormSettingsModule,
    ClientsModule,
  ],
  controllers: [],
})
export class AppModule {}
