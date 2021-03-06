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

//获取服务地址分页
export function getServerQuery(page,size,sortType,sortableFields) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/bimUpload/getServerPage',
    method: 'get',
		params: {
			page: page,
			size: size,
			sortType: sortType,
			sortableFields: sortableFields
		}
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

//返回超前地质勘探报告分页
export function getreportQuery(page,size,sortType,sortableFields) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/reportInfo/pageQuery',
    method: 'get',
		params: {
			page: page,
			size: size,
			sortType: sortType,
			sortableFields: sortableFields
		}
  })
}

//获取隧道类型字典
export function gettunnel() {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/addProperty/tunnel',
    method: 'get',
  })
}

//获取所属区域字典
export function getregion(tunnelCode) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/addProperty/region',
    method: 'get',
		params: {
			tunnelCode
		}
  })
}

//获取里程段
export function getmileageSection(regionCode) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/addProperty/mileageSection',
    method: 'get',
		params: {
			regionCode
		}
  })
}

//删除注册的BIM模型
export function deleteserver(id) {
  return request({
    url: `https://portal.ehjedu.cn/arcgisService/bimUpload/delete/${id}`,
    method: 'delete',
  })
}

//更新服务
export function updateBIM(bimUploadDO) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/bimUpload/update',
    method: 'post',
    data:bimUploadDO 
  })
}

export function getcolor() {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/color/find',
    method: 'get',
		params: {
		}
  })
}

export function updatecolor(code,colorState,opacity) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/color/update',
    method: 'post',
		params: {
			code: code,
			colorState: colorState,
			opacity: opacity
		}
  })
}