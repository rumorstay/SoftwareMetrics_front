import axios from 'axios'
import {ElMessage} from "element-plus";

const instance =axios.create({
  timeout:1000000,
  // headers:{"Content-Type":"application/json"},
  // headers:{"Content-Type":"application/octet-stream"},
  // headers:{"Content-Type":"multipart/form-data"},
  headers:{"Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary5NqxviCXpyAjOEV6"},
  // baseURL:'http://127.0.0.1:5000'
  baseURL:'/'

  //这里要改
})

instance.interceptors.request.use(
  config => {
    // 可以在这里添加请求头等信息
    //添加固定请求query参数username,userId
    config.params = {
      ...config.params,
    };

    return config;
  },
  error => {
    // 请求错误处理
    console.log('请求拦截器错误:', error); // for debug
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {

    console.log(response);
    console.log(response.status);
    // 对响应数据做处理，例如只返回data部分
    const res = response;
    // 如果返回的状态码为200，说明成功，可以直接返回数据
    if (response.status === 200) {
      return res;
    } else {
      // 其他状态码都当作错误处理
      // 可以在这里对不同的错误码进行不同处理
      return Promise.reject({
        message: res.message || 'Error',
        status: res.code
      });
    }
  },
  error => {
    // 对响应错误做处理
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);

export { instance as default };
