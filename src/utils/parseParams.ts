export const parseParams = (params) => {
    const tempParams: any = [];
    for(const i in params){
        if(`${params[i]}` ==="" || `${params[i]}` === 'undefined'){
            continue;
        }
        tempParams.push(`${i}=${encodeURIComponent(params[i])}`);
    }
    tempParams.join('&');
    return tempParams;
}