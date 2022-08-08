import request from '@/utils/request'

export function getAuthorization(methods, pathname) {
  return request({
    url: 'qcloud/cos_sign',
    method: 'post',
    data: { method: methods, pathname: pathname }
  })
}

export function getMallAuthorization(methods, pathname) {
  return request({
    url: 'mall_qcloud/cos_sign',
    method: 'post',
    data: { method: methods, pathname: pathname }
  })
}
