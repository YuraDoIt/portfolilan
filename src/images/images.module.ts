import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from './entity/image.entity';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Image]),
        PortfoliosModule,
    ],
    providers: [ImagesService],
    controllers: [ImagesController],
    exports: [ImagesService],
})
export class ImagesModule { }
