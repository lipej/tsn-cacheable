import { KEY_SUFFIX } from "../application/config/guards";
import { RepositoryInstance } from "../application/singletons/repository-instance";

export function Cacheable(keyPreffix: string, index = 0) {
    const repository = RepositoryInstance.get()
    return (_target: unknown, _key: string, propDesc: PropertyDescriptor): any => {
        const originalFunction = propDesc.value as () => void
        propDesc.value = async function () {
            const keySuffix = arguments[index]
            if (!KEY_SUFFIX.allowed.includes(typeof keySuffix)) throw new Error(KEY_SUFFIX.error)

            const cacheKey = keyPreffix.concat('-', keySuffix)
            const value = await repository.get(cacheKey)

            return value ? value : originalFunction.apply(this, arguments).then(async (result: any) => {
                if (result) {
                    await repository.set(cacheKey, result)
                }
                return result
            })

        }
        return propDesc
    }
}
