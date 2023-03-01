import sinon, { SinonSpy } from 'sinon'
import chaiAsPromised from "chai-as-promised";
import chai, { expect } from 'chai'
import { Cacheable } from '../../lib/main';
import { Repository } from '../../lib/core/interfaces/repository';
import { RepositoryInstance } from '../../lib/application/singletons/repository-instance';

chai.use(chaiAsPromised)

class FakeDB {
    findById(id: string) {
        return Promise.resolve({
            id,
            name: 'John Doe'
        })
    }
}

class FakeRepository implements Repository {
    private inMemory = {
        'user-data-cb60a452-99e6-4a99-8a47-ee2da283b50d': { id: 'cb60a452-99e6-4a99-8a47-ee2da283b50d', name: 'Jane Doe' }
    }

    async get(key: string) {
        return this.inMemory[key]
    }

    async set(key: string, value: unknown) {
        this.inMemory[key] = value
    }
}

interface UserController {
    getUserById: (userId: string) => Promise<{ id: string, name: string }>
}

describe('Cacheable', () => {
    const sandbox = sinon.createSandbox()
    let controller: UserController
    let repositorySpy: SinonSpy

    beforeEach(async () => {
        sandbox.restore()

        repositorySpy = sandbox.spy(FakeDB.prototype, 'findById')
        sandbox.stub(RepositoryInstance, 'get').returns(new FakeRepository())

        class FakeUserController {
            constructor(private readonly db: FakeDB) { }

            @Cacheable(`user-data`)
            async getUserById(userId: string) {
                return this.db.findById(userId)
            }
        }

        controller = new FakeUserController(new FakeDB())
    })

    it('it should call repository when dont have cache', async () => {
        const id = 'a0546a73-e52e-4bdd-8266-72118f3533f2'
        const result = await controller.getUserById(id)

        expect(result).to.deep.equal({ id, name: 'John Doe' })
        sinon.assert.calledOnceWithExactly(repositorySpy, id)
    })


    it('it should not call repository when already have cache', async () => {
        const id = 'cb60a452-99e6-4a99-8a47-ee2da283b50d'
        const result = await controller.getUserById(id)

        expect(result).to.deep.equal({ id, name: 'Jane Doe' })
        sinon.assert.notCalled(repositorySpy)
    })
})
