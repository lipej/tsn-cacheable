export const envs = {
    provider: <'REDIS'>process.env.NODE_CACHEABLE_PROVIDER ?? 'REDIS',
    redisHost: <string>process.env.NODE_CACHEABLE_REDIS_HOST,
    redisPort: <string>process.env.NODE_CACHEABLE_REDIS_PORT,
    TTL: <string>process.env.NODE_CACHEABLE_TTL,
    TTLEnable: <string>process.env.NODE_CACHEABLE_USE_TTL ?? 'false'
}

export const getEnv = (env: keyof typeof envs) => {
    const value = envs[env]

    if (!value) throw new Error(`Environment variable: "${env}" was not found`)

    return value
}