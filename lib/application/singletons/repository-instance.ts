import { Repository } from "../../core/interfaces/repository";
import { RedisRepository } from "../../infra/repositories/redis";
import { getEnv } from "../config/env";

export class RepositoryInstance {
    private static instance: Repository

    static get() {
        if (!this.instance) {
            switch (getEnv('provider')) {
                case 'REDIS':
                    this.instance = new RedisRepository()
                    break
                default:
                    throw new Error(`Provider not implemented`)
            }
        }

        return this.instance
    }
}