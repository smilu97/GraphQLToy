import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { KakaoContextRepository } from '../repositories/KakaoContext';
import { KakaoContext } from '../models/KakaoContext';

@Service()
export class KakaoContextService {

    constructor(
        @OrmRepository() private kakaoContextRepository: KakaoContextRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<KakaoContext[]> {
        this.log.info('Find all contexts');
        return this.kakaoContextRepository.find();
    }

    public findOne(id: string): Promise<KakaoContext | undefined> {
        this.log.info('Find a context');
        return this.kakaoContextRepository.findOne({ id });
    }

    public async create(context: KakaoContext): Promise<KakaoContext> {
        this.log.info('Create a new context => ', context.toString());
        const newContext = await this.kakaoContextRepository.save(context);
        return newContext;
    }

    public update(id: string, context: KakaoContext): Promise<KakaoContext> {
        this.log.info('Update a KakaoContext');
        context.id = id;
        return this.kakaoContextRepository.save(context);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a pet');
        await this.kakaoContextRepository.delete(id);
        return;
    }

}
