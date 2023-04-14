import { env } from '$env/dynamic/private';

export function load() {
    return {
        region: env.FLY_REGION || "dev",
    };
}