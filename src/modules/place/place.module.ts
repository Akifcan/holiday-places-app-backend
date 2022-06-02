import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from './schemas/place.schema';
import { PlaceResolver } from './place.resolver';
import { PlaceService } from './place.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }])],
    providers: [PlaceResolver, PlaceService],
})
export class PlaceModule { }
