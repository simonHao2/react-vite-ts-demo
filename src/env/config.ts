type Config = {
    env: string;
    apiHost: string;
    cmsTag: string;
};

const local = {
    env: 'local',
    apiHost: '',
    cmsTag: `DEV ${process.env.REACT_APP_CMS_TAG}`,
};

const dev = {
    env: 'dev',
    apiHost: "http://192.168.11.236:3000/api/auth",
    cmsTag: `DEV ${process.env.REACT_APP_CMS_TAG}`,
};

const uat = {
    env: 'uat',
    apiHost: '',
    cmsTag: `UAT ${process.env.REACT_APP_CMS_TAG}`,
};

const prod = {
    env: 'prod',
    apiHost: '',
    cmsTag: `PROD ${process.env.REACT_APP_CMS_TAG}`,
    initCompanyTeam: false
};

const env = (): Config => {
    if (process.env.REACT_APP_ENV === 'uat') {
        return uat;
    } else if (process.env.REACT_APP_ENV === 'prod') {
        return prod;
    } else if (process.env.REACT_APP_ENV === 'dev') {
        return dev;
    } else if (process.env.REACT_APP_ENV === undefined) {
        return local;
    }
    return dev;
};

export default env();