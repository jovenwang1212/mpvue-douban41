const BASE_URL = 'https://api.douban.com'

export default function request (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + options.url,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
