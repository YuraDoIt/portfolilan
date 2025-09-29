import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfoliosService } from './portfolios.service';

@ApiTags('portfolios')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('portfolios')
export class PortfoliosController {
    constructor(private readonly portfoliosService: PortfoliosService) { }

    @Post()
    async create(@Request() req, @Body() createPortfolioDto: CreatePortfolioDto) {
        const userId = req.user.userId;
        console.log('1111111111', req.user.userId)
        return this.portfoliosService.create(userId, createPortfolioDto);
    }

    @Get()
    findAll(@Request() req) {
        return this.portfoliosService.findAllByUser(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.portfoliosService.findOne(id, req.user.userId);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Request() req, @Body() updatePortfolioDto: UpdatePortfolioDto) {
        return this.portfoliosService.update(id, req.user.userId, updatePortfolioDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.portfoliosService.remove(id, req.user.userId);
    }
}
