import { Redis } from 'ioredis';
import { getEnv } from "../config/env";

export class RedisInstance {
    private static instance: Redis
    static get() {
        if (!this.instance) {
            this.instance = new Redis({
                host: getEnv('redisHost'),
                port: Number(getEnv('redisPort')),
                username: getEnv('redisUsername'),
                password: getEnv('redisPassword')
            })
        }

        return this.instance
    }
}