import COS from 'cos-js-sdk-v5'
import { getAuthorization, getMallAuthorization } from '@/api/cos.js'

export const COS_IMAGE_PREFIX = '?imageView2'

export const cos = new COS({
  getAuthorization: (options, callback) => {
    getAuthorization((options.Method || 'get').toLowerCase(), '/' + (options.Key || ''))
      .then(response => {
        callback(response.authorization)
      }).catch(() => {
        callback('error')
      })
  }
})

export function Base64ToBlob(urlData) {
  // 去掉url的头，并转换为byte
  const bytes = window.atob(urlData.split(',')[1])

  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {
    type: 'image/png'
  })
}

export function sliceUploadFile(file, onTaskReady = null, onProgress = null, callback = null) {
  cos.sliceUploadFile({
    Bucket: process.env.VUE_APP_COS_BUCKET,
    Region: process.env.VUE_APP_COS_REGION,
    Key: file.key,
    Body: file.body,
    onTaskReady: function(tid) {
      onTaskReady && onTaskReady(tid)
    },
    onProgress: function(info) {
      const percent = Number(info.percent * 10000 / 100).toFixed(0)
      const speed = (info.speed / 1024 / 1024 * 100) / 100
      onProgress && onProgress(percent, speed)
    }
  }, function(err, data) {
    callback && callback(err, data)
  })
}

export function sliceUploadFiles(files, onTaskReady = null, onProgress = null, callback = null) {
  const cosFiles = []
  for (const file of files) {
    cosFiles.push({
      Bucket: process.env.VUE_APP_COS_BUCKET,
      Region: process.env.VUE_APP_COS_REGION,
      Key: file.key,
      Body: file.body
    })
  }
  cos.uploadFiles({
    files: cosFiles,
    onTaskReady: function(tid) {
      onTaskReady && onTaskReady(tid)
    },
    onProgress: function(info) {
      const percent = Number(info.percent * 10000 / 100).toFixed(0)
      const speed = (info.speed / 1024 / 1024 * 100) / 100
      onProgress && onProgress(percent, speed)
    }
  }, function(err, data) {
    callback && callback(err, data)
  })
}

export function putObject(key, content, callback = null) {
  cos.putObject({
    Bucket: process.env.VUE_APP_COS_BUCKET,
    Region: process.env.VUE_APP_COS_REGION,
    Key: key,
    Body: content
  }, function(err, data) {
    callback && callback(err, data)
  })
}

export function getObject(key, callback = null) {
  cos.getObject({
    Bucket: process.env.VUE_APP_COS_BUCKET,
    Region: process.env.VUE_APP_COS_REGION,
    Key: key
  }, function(err, data) {
    callback && callback(err, data)
  })
}

export function getImageUrl(cosRespObj) {
  if (cosRespObj.Key === undefined) {
    return `${process.env.VUE_APP_COS_IMAGE_SERVER}${cosRespObj.options.Key}`
  } else {
    return `${process.env.VUE_APP_COS_IMAGE_SERVER}${cosRespObj.Key}`
  }
}

export function getCosFileUrl(cosRespObj) {
  if (cosRespObj.data !== undefined) {
    return `https://${cosRespObj.data.Location}`
  } else {
    return `https://${cosRespObj.Location}`
  }
}

export function getCosFileKeyByUrl(cosFileUrl) {
  const url = new URL(cosFileUrl)
  return url.pathname.substring(1)
}

export const mallCos = new COS({
  getAuthorization: (options, callback) => {
    getMallAuthorization((options.Method || 'get').toLowerCase(), '/' + (options.Key || ''))
      .then(response => {
        callback(response.authorization)
      }).catch(() => {
        callback('error')
      })
  }
})

export function getMallObject(key, callback = null) {
  mallCos.getObject({
    Bucket: process.env.VUE_APP_COS_BUCKET,
    Region: process.env.VUE_APP_COS_REGION,
    Key: key
  }, function(err, data) {
    callback && callback(err, data)
  })
}
