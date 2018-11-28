// 简易封装，异常自己 catch

function request(method, url, data) {
    const options = method === 'GET' ? {} : {
        body: data ? JSON.stringify(data) : '',
        headers: {
            'content-type': 'application/json'
        },
    };
    return fetch(url,{
        credentials: 'include',
        method,
        ...options,
    }).then(function (response) {
        return response.json();
    });
}

export function get(url) {
    return request('GET', url);
}

export function post(url, data) {
    return request('POST', url, data);
}

export function put(url, data) {
    return request('PUT', url, data);
}

export function patch(url, data) {
    return request('PATCH', url, data);
}

export function del(url, data) {
    return request('DELETE', url, data);
}
