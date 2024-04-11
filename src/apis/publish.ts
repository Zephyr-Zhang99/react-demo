import type { ReqData } from '@/pages/Publish/hooks';
import { request } from '@/utils';

// 获取频道列表
export function getChannelAPI() {
  return request({
    url: '/channels',
    method: 'GET',
  });
}

// 新增文章
export function createArticleAPI(data: ReqData) {
  return request({
    url: `/mp/articles?draft=false`,
    method: 'POST',
    data,
  });
}

// 获取文章列表
export function getArticleListAPI(params: any) {
  return request({
    url: `/mp/articles`,
    method: 'GET',
    params,
  });
}

// 删除文章
export function deleteArticleAPI(id: number) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE',
  });
}

// 获取文章详情
export function getArticleDetailAPI(articleId: string) {
  return request({
    url: `/mp/articles/${articleId}`,
    method: 'GET',
  });
}

// 编辑文章
export function editArticleAPI(data: ReqData) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data,
  });
}
