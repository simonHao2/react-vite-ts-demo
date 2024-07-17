import toastr from "toastr";
import "toastr/build/toastr.min.css";
import i18n from "i18next";

//https://study.duyiedu.com/api/herolist
import { HTTP_REQUEST_TIMEOUT } from "../utils/contstants";
// const HTTP_REQUEST_TIMEOUT = 300000;
export const createFetch = (timeout) => {
    return (resource, options) => {
        const controller = new AbortController();
        options = options || {};
        options.signal = controller.signal;
        setTimeout(() => {
            controller.abort();
        }, timeout)
        return fetch(resource, options);
    }
}
async function httpRequest(url, options) {
    let data: any = {};
    try {
        const response: any = await createFetch(HTTP_REQUEST_TIMEOUT.NORMAL)(url, options).catch((err)=>{
            if (err.name === 'AbortError') {
                toastr.warning(i18n.t("error.500"));
              }
        });
        const typeCsv: any = response.headers.get("Content-Type")?.indexOf("application/csv");
        if (typeCsv > -1) {
            const strArr = url.split("=");
            let id = strArr[1] !== undefined ? strArr[1] + ".csv" : "a123-b456-c789.csv";
            const disposition: any = response.headers.get("Content-Disposition");
            if (disposition.indexOf("filename") > -1) {
                const fileName = disposition.replace(/attachment;.*filename=/, '').replace(/"/g, '');
                id = decodeURIComponent(fileName);
            }
            response.blob().then((blob) => {
                const link = document.createElement("a");
                link.style.display = "none";
                link.href = URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.download = `${id}`;
                link.click();
                // 释放的 URL 对象以及移除 a 标签
                URL.revokeObjectURL(link.href);
                document.body.removeChild(link);
            });
            return response ? { ok: true, code: 200 } : {};
        }
        try {
            data = await response.json();
        } catch (error) {
            return {
                data,
                code: response.status,
                message: response.status
            };
        }
        if (data.code === 200) {
            return data;
        }
        // if (data.code === 401 || data.code === 403) {
        //     // localStorage.clear();
        //     // window.location.replace("/login");
        //     Alert.open({
        //         alertTitle: <Trans i18nKey={data.messageKey}></Trans>,
        //         alertText: <Trans i18nKey="common.relogin"></Trans>,
        //         closeAlert: function () {
        //             window.location.replace("/login");
        //         },
        //     });
        //     return data;
        // }
        // if (data.code === 500) {
        //     if (data.messageKey) {
        //         toastr.error(i18n.t(data.messageKey));
        //     } else {
        //         toastr.error(i18n.t("error.500"));
        //     }
        //     return data;
        // }
        // else if (data.code === 400) {
        //     if (data.messageKey) {
        //         if (data.messageKey.startsWith("userLogin")) {
        //             return data;
        //         }
        //         if (data.messageKey.includes("codeExists")) {
        //             const firstIndex = data.message.indexOf(":");
        //             const code = data.message.substring(firstIndex + 1, data.message.length);
        //             toastr.warning(i18n.t(data.messageKey, { code }));
        //             return data;
        //         }
        //         if (data.messageKey.includes("exceedMaxLimit")) {
        //             toastr.warning(i18n.t(data.messageKey, { MAX_TAG_ROW: COUPON_TAG_MAX_ROW.MAX_TAG_ROW }));
        //             return data;
        //         }
        //         toastr.warning(i18n.t(data.messageKey));
        //     } else {
        //         toastr.warning(i18n.t(data.message));
        //     }
        //     return data;
        // }
        if (data.code === 404) return data;
        return data;
    } catch (err: any) {
        // console.error("fetch error=====>", err);
        return err;
    }
}

export const get = async (url, options: any = {}) => {
    const authToken = localStorage.getItem("authToken");
    const method = "GET";
    const headers = {
        Authorization: `Bearer ${authToken}`,
        ...options.headers,
    };
    const res = await httpRequest(url, { headers, method, ...options });
    return res;
};

export const delJson = async (url, params, options: any = {}) => {
    const authToken = localStorage.getItem("authToken");
    const body = JSON.stringify(params);
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        ...options.headers,
    };
    const res = await httpRequest(url, {
        headers,
        method: "DELETE",
        body,
        ...options,
    });
    return res;
};
export const delQuey = async (url, options: any = {}) => {
    const authToken = localStorage.getItem("authToken");
    const method = "DELETE";
    const headers = {
        Authorization: `Bearer ${authToken}`,
        ...options.headers,
    };
    const res = await httpRequest(url, { method, ...options, headers });
    return res;
};

// export const patchJson = async (url, params, options: any = {}) => {
//   const body = JSON.stringify(params);
//   options.timeout = HTTP_TIME_OUT.NORMAL;
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${authToken}`,
//     ...options.headers,
//   };
//   const res = await request(url, {
//     headers,
//     method: "PATCH",
//     body,
//     ...options,
//   });
//   return res;
// };

export const postJson = async (url, params: any, options: any = {}) => {
    const authToken = localStorage.getItem("authToken");
    const fileType = params.type === "file";
    const body = fileType ? params.formData : JSON.stringify(params);
    let headers = { Connection: 'keep-alive' };
    if (fileType) {
        options.timeout = HTTP_REQUEST_TIMEOUT.LARGE;
        headers = {
            Authorization: `Bearer ${authToken}`,
            ...options.headers,
        };
    } else {
        options.timeout = HTTP_REQUEST_TIMEOUT.NORMAL;
        headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            ...options.headers,
        };
    }

    const res = await httpRequest(url, { headers, method: "POST", body, ...options });
    return res;
};
export const putJson = async (url, params: any, options: any = {}) => {
    const authToken = localStorage.getItem("authToken");
    const fileType = params.type === "file";
    const body = fileType ? params.formData : JSON.stringify(params);
    options.timeout = HTTP_REQUEST_TIMEOUT.NORMAL;
    let headers = {};
    if (fileType) {
        options.timeout = HTTP_REQUEST_TIMEOUT.LARGE;
        headers = {
            Authorization: `Bearer ${authToken}`,
            ...options.headers,
        };
    } else {
        options.timeout = HTTP_REQUEST_TIMEOUT.NORMAL;
        headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            ...options.headers,
        };
    }
    const res = await httpRequest(url, { headers, method: "PUT", body, ...options });
    return res;
};
