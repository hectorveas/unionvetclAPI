import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTipDTO, UpdateTipDTO } from './dto/tip.dto';
import { Tip } from './interfaces/tip.interface';

@Injectable()
export class TipService {
    constructor(
        @InjectModel('Tip') private readonly tipModel: Model<Tip>,
      ) {}
    
      async createTip(createTipDTO: CreateTipDTO): Promise<Tip> {
        const newTip = new this.tipModel(createTipDTO);
        return newTip.save();
      }
    
      async getTips(): Promise<Tip[]> {
        const tips = await this.tipModel.find();
        return tips;
      }
    
      async getTip(id: string): Promise<Tip> {
        const tip = await this.tipModel.findById(id);
        return tip;
      }
    
      async deleteTip(id: string): Promise<any> {
        const tip = await this.tipModel.findByIdAndDelete(id);
        return tip;
      }
    
      async updateTip(
        id: string,
        updateTipDTO: UpdateTipDTO,
      ): Promise<Tip> {
        const updatedTip = await this.tipModel
          .findByIdAndUpdate(id, { $set: updateTipDTO }, { new: true })
          .exec();
        return updatedTip;
      }
}
