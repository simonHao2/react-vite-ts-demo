import env from './config';
const concatWithHost = (host: any, action: any) => host.concat(action);
export const APIS = {
    getUserList: (params: any) => concatWithHost(env.apiHost, `/user?${params}`)
}
