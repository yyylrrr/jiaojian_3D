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

//通过服务名称和objectid获取构件施工信息
export function getmodulinfo(ebs) {
  return request({
    url: `https://portal.ehjedu.cn/arcgisService/addProperty/getByEbs/${ebs}`,
    method: 'get',
  })
}


//通过当前滑块时间返回当前显示的模型/progress/getModel/{nowDate}
export function getoidByDate(nowDate) {
  return request({
    url: `https://portal.ehjedu.cn/arcgisService/progress/getModel/${nowDate}`,
    method: 'get',
  })
}

//分页查询构建属性
export function getpageQuery(department, direction, ebsStr,orderBy, page, size) {
	return request({
		url: 'https://portal.ehjedu.cn/arcgisService/addProperty/pageQuery',
		method: 'get',
		params: {
			department: department,
			direction: direction,
			ebsStr: ebsStr,
			orderBy: orderBy,
			page: page,
			size: size
		}
	})
}

//分页查询预警信息
export function getwarninfoQuery(direction,ebsStr, orderBy, page, size) {
	return request({
		url: 'https://portal.ehjedu.cn/arcgisService/warningInfo/pageQuery',
		method: 'get',
		params: {
			direction: direction,
			ebsStr: ebsStr,
			orderBy:orderBy,
			page: page,
			size: size
		}
	})
}