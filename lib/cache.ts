import {getToken} from "@/lib/db";

export const tokenCache = new Map<string, string>();

//expiry time 1 hour
export const TOKEN_EXPIRY_TIME = 60 * 60 * 1000;
export function setTokenInCache(token: string) {
    const now = Date.now();
    tokenCache.set(token, now.toString());
}

export function getTokenFromCache(token: string): boolean {
    const timestamp = tokenCache.get(token);
    if (!timestamp) {
        return false;
    }
    const now = Date.now();
    if (now - parseInt(timestamp) > TOKEN_EXPIRY_TIME) {
        tokenCache.delete(token);
        return false;
    }
    return true;
}

export async function validateToken(token:string): Promise<boolean>{
    let result = getTokenFromCache(token);
    if (result){
        console.log("Token found in cache");
        return true;
    }
    console.log("Token not found in cache, checking database");
    result = await getToken(token);
    if (result) {
        console.log("Token found in database, adding to cache");
        setTokenInCache(token);
        return true;
    }
    console.log("Token not found in database");
    return false;
}
