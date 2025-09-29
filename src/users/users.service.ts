import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';
import { Image } from 'src/images/entity/image.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Portfolio) private portfolioRepository: typeof Portfolio,
    @InjectModel(Image) private imageRepository: typeof Image,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return user;
  }


  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    let updatedFields = { ...updateUserDto };

    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updatedFields = { ...updatedFields, password: hashedPassword };
    }

    await user.update(updatedFields);
    return user;
  }

  async removeUser(userId: number): Promise<void> {
    const portfolios = await this.portfolioRepository.findAll({
      where: { userId },
      include: [{ model: Image }],
    });

    for (const portfolio of portfolios) {
      for (const image of portfolio.images) {
        await image.destroy();
      }
      await portfolio.destroy();
    }

    const user = await this.userRepository.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');

    await user.destroy();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
