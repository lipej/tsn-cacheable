import { Repository } from "../../core/interfaces/repository";
import { RedisInstance } from "../../application/singletons/redis-instance";
import { getEnv } from "../../application/config/env";

export class RedisRepository<T> implements Repository<T> {
    private readonly client: ReturnType<typeof RedisInstance.get>

    constructor() {
        this.client = RedisInstance.get()
    }

    get = async (key: string): Promise<T> => {
        return <T>JSON.parse(await this.client.get(key))
    }

    set = async (key: string, value: T): Promise<void> => {
        await this.client.set(key, JSON.stringify(value))
        if (getEnv('TTLEnable') === 'true') await this.client.expire(key, Number(getEnv('TTL')))
    }

}