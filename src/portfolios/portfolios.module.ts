// src/portfolios/portfolios.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PortfoliosController } from './portfolios.controller';
import { Portfolio } from './entities/portfolio.entity';
import { PortfoliosService } from './portfolios.service';

@Module({
    imports: [SequelizeModule.forFeature([Portfolio])],
    providers: [PortfoliosService],
    controllers: [PortfoliosController],
    exports: [PortfoliosService],
})
export class PortfoliosModule { }
