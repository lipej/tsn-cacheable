import { RedisMemoryServer } from 'redis-memory-server';
import sinon from 'sinon'
import * as envF from "../../../lib/application/config/env";
import { Repository } from "../../../lib/core/interfaces/repository";
import { RedisRepository } from "../../../lib/infra/repositories/redis";
import chaiAsPromised from "chai-as-promised";
import chai, { expect } from 'chai'

chai.use(chaiAsPromised)

describe('Redis Repository', () => {
    const sandbox = sinon.createSandbox()
    let repository: Repository
    let redisServer: RedisMemoryServer
    let port: number
    let host: string

    before(async () => {
        redisServer = new RedisMemoryServer();
        host = await redisServer.getHost();
        port = await redisServer.getPort();
    })

    beforeEach(async () => {
        const originalEnvF = envF.getEnv
        sandbox.restore()

        sandbox.stub(envF, 'getEnv').callsFake((env) => {
            if (env === 'redisHost') return host
            if (env === 'redisPort') return String(port)

            return originalEnvF(env)
        })

        repository = new RedisRepository()
    })


    after(async () => {
        await redisServer.stop()
    })

    it('should set successfully a new key and value', async () => {
        const key = 'redis-repository-test'
        const value = 'testing'

        await expect(repository.set(key, value)).to.fulfilled

        const result = await repository.get(key)

        expect(result).to.equals(value)
    })
})