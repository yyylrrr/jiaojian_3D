import request from '@/utils/request'


//获取bim树节点
export function getjsontree() {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/bimContent/get',
    method: 'get',
  })
}

//获取服务地址
export function getServer() {
    return request({
      url: 'https://portal.ehjedu.cn/arcgisService/bimUpload/getServer',
      method: 'get',
    })
}

//注册上传BIM地址，获取构件属性，post特定格式
export function uploadBIM(bimUploadRequest) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/bimUpload/saveAll',
    method: 'post',
    data:bimUploadRequest 
  })
}