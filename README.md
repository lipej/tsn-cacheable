# tsn-cacheable

tsn-cacheable is a zero-configuration cache abstraction.

### Instalation

For now, tsn-cacheable only supports redis.

You need to have a redis instance running to use, you can get one for free on [Redis Labs](https://app.redislabs.com/#/) or run in docker with:

```bash
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```

Using your favorite package manager just install as project dependency, example using yarn:

```bash
yarn add tsn-cacheable
```

### Usage

Usage is very simple, you need a class and a method to cache.

In the example below we will cache a get method in a controller.

```typescript
export class UserController {
  constructor(private readonly userRepository: Repository<User>) {}

  @Cacheable(`user-data`)
  async getUserById(userId: string) {
    return this.userRepository.findById(userId);
  }
}
```

Very Simple, isn't it?

You only need to annotate your method and if your method has more parameters, you can tell what parameter should be used in cache key, by passing his index.

```typescript
@Cacheable(`user-data`, 1)
    async getUserById(anyOtherParam: string, userId: string) {
        return this.userRepository.findById(userId)
    }
```

**NOTE:** The param to use as cache key with the cache prefix (first argument in Cacheable decorator) needs to be a string or a number.

### Enviroment Variables

Ok I told you it is zero but you need some envs

| Var                          |                   Description                    |                 Required |
| ---------------------------- | :----------------------------------------------: | -----------------------: |
| TSN_CACHEABLE_PROVIDER       | Provider should use to cache, for now only REDIS |                    false |
| TSN_CACHEABLE_REDIS_HOST     |                    Redis host                    |                      yes |
| TSN_CACHEABLE_REDIS_PORT     |                    Redis port                    |                      yes |
| TSN_CACHEABLE_REDIS_USERNAME |                  Redis username                  | false (if running local) |
| TSN_CACHEABLE_REDIS_PASSWORD |                  Redis password                  | false (if running local) |
| TSN_CACHEABLE_TTL            |               Cache TTL in seconds               |                    false |
| TSN_CACHEABLE_USE_TTL        |         If want to use TTL set to `true`         |                    false |
