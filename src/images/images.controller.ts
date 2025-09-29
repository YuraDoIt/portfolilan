import { UseGuards, Controller, Post, Body, Delete, Param, ParseIntPipe, Request } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateImageDto } from "./dto/create-image.dto";
import { ImagesService } from "./images.service";

@UseGuards(JwtAuthGuard)
@ApiTags('images')
@ApiBearerAuth('access-token')
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) { }

    @Post()
    create(@Body() createImageDto: CreateImageDto, @Request() req) {
        return this.imagesService.create(createImageDto, req.user.userId);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.imagesService.remove(id, req.user.userId);
    }
}
