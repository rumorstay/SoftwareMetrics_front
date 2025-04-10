import instance from "@/api/utils/request.ts";

//面向对象的CK度量
export const getOO_CK=(file_path)=>{
  // const formData = new FormData();
  // formData.append('file_path', file_path);
  // console.log(file_path.get('file_path'))
  // console.log(file_path)

  // return instance.post('/detailed_design/ck', formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // });
  return instance.post('/api/detailed_design/ck', file_path);
}
export const getOO_CK_file=(file_path)=>{
  const formData = new FormData();
  formData.append('file', file_path);
  return instance.post('/api/detailed_design/ck_file', formData);
}
export const getOO_LK=(file_path)=>{
  return instance.post('/api/detailed_design/lk', file_path);
}
export const getOO_LK_new=(file_path)=>{
  return instance.post('/api/detailed_design/lk/mllm-api', file_path);
}

export const getFP=(file_path)=>{
  return instance.post('/api/requirements_analysis/fp/calculate', file_path);
}

export const getLOC=(file_path)=>{
  return instance.post('/api/coding_implementation/count_code', file_path);
}

export const getUC=(formdata)=>{
  return instance.post('/api/requirements_analysis/rn/calculate_ucp', formdata);
}

export const getCC=(formdata)=>{
  return instance.post('/api/detailed_design/upload_dot', formdata);
}
