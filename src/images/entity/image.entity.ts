import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';

export interface ImageCreationAttrs {
    name: string;
    description?: string;
    portfolioId: number;
}

@Table({ tableName: 'images', paranoid: true })
export class Image extends Model<Image, ImageCreationAttrs> {
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    description: string;

    @ForeignKey(() => Portfolio)
    @Column({ type: DataType.INTEGER, allowNull: false })
    portfolioId: number;

    @BelongsTo(() => Portfolio)
    portfolio: Portfolio;

    // @HasMany(() => Comment)
    // comments: Comment[];
}
