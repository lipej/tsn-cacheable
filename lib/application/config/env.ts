export const envs = {
    provider: <'REDIS'>process.env.TSN_CACHEABLE_PROVIDER ?? 'REDIS',
    redisHost: <string>process.env.TSN_CACHEABLE_REDIS_HOST,
    redisPort: <string>process.env.TSN_CACHEABLE_REDIS_PORT,
    redisUsername: <string>process.env.TSN_CACHEABLE_REDIS_USERNAME,
    redisPassword: <string>process.env.TSN_CACHEABLE_REDIS_PASSWORD,
    TTL: <string>process.env.TSN_CACHEABLE_TTL,
    TTLEnable: <string>process.env.TSN_CACHEABLE_USE_TTL ?? 'false'
}

export const getEnv = (env: keyof typeof envs) => {
    return envs[env]
}