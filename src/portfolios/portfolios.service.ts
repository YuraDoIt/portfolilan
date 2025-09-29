// src/portfolios/portfolios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';

@Injectable()
export class PortfoliosService {
    constructor(@InjectModel(Portfolio) private portfolioModel: typeof Portfolio) { }

    async create(userId: number, createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
        return this.portfolioModel.create({ ...createPortfolioDto, userId });
    }

    async findAllByUser(userId: number): Promise<Portfolio[]> {
        return this.portfolioModel.findAll({ where: { userId } });
    }

    async findOne(id: number, userId: number): Promise<Portfolio> {
        const portfolio = await this.portfolioModel.findOne({ where: { id, userId } });
        if (!portfolio) {
            throw new NotFoundException(`Portfolio with id ${id} not found`);
        }
        return portfolio;
    }

    async update(id: number, userId: number, updateDto: UpdatePortfolioDto): Promise<Portfolio> {
        const portfolio = await this.findOne(id, userId);
        await portfolio.update(updateDto);
        return portfolio;
    }

    async remove(id: number, userId: number): Promise<void> {
        const portfolio = await this.findOne(id, userId);
        await portfolio.destroy();
    }
}
