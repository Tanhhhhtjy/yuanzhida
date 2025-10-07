export const baseUrl = 'https://yuanzhida.work:8000'
export const OSS_HOST = 'https://yuanzhida-cos-1352975306.cos.ap-beijing.myqcloud.com/'
export const api = {
  'login': { 'url': '/api/answerly/v1/user/login', 'method': 'POST' },
  'register': { 'url': '/api/answerly/v1/user', 'method': 'POST' },
  'login_code': { 'url': '/api/answerly/v1/user/captcha' },
  'register_code': { 'url': '/api/answerly/v1/user/send-code' },
  'subjects': { 'url': '/api/answerly/v1/category' },
  'questions': { 'url': '/api/answerly/v1/question/page' },
  'newQuestion': { 'url': '/api/answerly/v1/question', 'method': 'POST' },
  'oss_upload': { 'url': '/cos/upload' },
  'register_code': { 'url': '/api/answerly/v1/user/send-code' },
  'register': { 'url': '/api/answerly/v1/user', 'method': 'POST' },
  'newAnswer': { 'url': '/api/answerly/v1/comment', 'method': 'POST' },
  'questionDetail': { 'url': '/api/answerly/v1/question/' },
  'comments': { 'url': '/api/answerly/v1/comment/page' }
}