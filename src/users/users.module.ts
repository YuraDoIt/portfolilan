import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';
import { Image } from 'src/images/entity/image.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Portfolio, Image])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }