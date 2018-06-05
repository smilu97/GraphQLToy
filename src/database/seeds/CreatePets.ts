import { Connection } from 'typeorm';

import { Pet } from '../../../src/api/models/Pet';
import { Factory, Seed } from '../../lib/seed';

export class CreatePets implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        await factory(Pet)().seedMany(10);
    }

}
