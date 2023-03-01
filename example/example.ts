import { Cacheable } from "../lib/core/cacheable";

export class UserController {
    private readonly userRepository = {
        findById(id: string) {
            return Promise.resolve({
                id,
                nome: 'John Doe'
            })
        }
    }

    @Cacheable(`user-data`)
    async getUserById(userId: string) {
        console.log('No cache data found, original method was called with args:', { userId })

        return this.userRepository.findById('17a9c259-8fc2-4e38-bf32-6988d6183644')
    }
}

(async () => {
    const classInstance = new UserController()

    const userData = await classInstance.getUserById('123')

    console.log({ userData })
})()