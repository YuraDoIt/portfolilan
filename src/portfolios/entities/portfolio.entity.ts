import { Column, DataType, ForeignKey, Model, Table, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Image } from 'src/images/entity/image.entity';

export interface PortfolioCreationAttrs {
    title: string;
    description?: string;
    userId: number;
}

@Table({ tableName: 'portfolios', paranoid: true })
export class Portfolio extends Model<Portfolio, PortfolioCreationAttrs> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    description: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Image)
    images: Image[];
}
