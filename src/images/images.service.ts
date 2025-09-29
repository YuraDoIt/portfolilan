import { Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PortfoliosService } from "src/portfolios/portfolios.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { Image, ImageCreationAttrs } from "./entity/image.entity";

@Injectable()
export class ImagesService {
    constructor(
        @InjectModel(Image)
        private imageModel: typeof Image,
        private portfoliosService: PortfoliosService,
    ) { }

    async create(
        createImageDto: CreateImageDto,
        userId: number,
    ): Promise<Image> {
        const portfolio = await this.portfoliosService.findOne(createImageDto.portfolioId, userId);

        if (!portfolio) {
            throw new NotFoundException('Portfolio not found or does not belong to user');
        }

        return this.imageModel.create(createImageDto);
    }

    async remove(imageId: number, userId: number) {
        const image = await this.imageModel.findByPk(imageId, { include: { all: true } });
        if (!image || image.portfolio.userId !== userId) {
            throw new ForbiddenException('You are not allowed to delete this image');
        }
        await image.destroy();
        return { message: 'Deleted' };
    }
}
