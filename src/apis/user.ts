import type { FieldType } from '@/pages/Login/utils';
import { request } from '@/utils';

// 登录
export function loginAPI(formData: FieldType) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: formData,
  });
}

// 获取用户信息
export function getProfileAPI() {
  return request({
    url: '/user/profile',
    method: 'GET',
  });
}
