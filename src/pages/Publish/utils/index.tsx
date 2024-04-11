import { createArticleAPI, getChannelAPI } from '@/apis/publish';
import {
  message,
  type FormProps,
  type RadioChangeEvent,
  type UploadProps,
} from 'antd';
import { useEffect, useState } from 'react';

// 频道列表类型
export type Channel = {
  id: number;
  name: string;
};

// 用于管理发布流程的自定义钩子
export function usePublish() {
  const [channels, setChannels] = useState<Channel[]>([]);

  // 从API获取频道列表
  async function fetchChannelList() {
    try {
      const res = await getChannelAPI();
      setChannels(res.data.channels);
    } catch (error) {
      message.error('获取频道列表失败');
    }
  }

  // 组件挂载时获取频道列表
  useEffect(() => {
    fetchChannelList();
    // 空依赖数组确保这个效果只在挂载时运行一次
  }, []);

  return { channels };
}

// 文章表单值类型
export type FormValue = {
  title: string;
  content: string;
  channel_id: number;
};

// 创建文章的请求数据类型
export type ReqData = {
  cover: {
    type: number;
    images: string[];
  };
} & FormValue;

// 用于管理文章表单的自定义钩子
export function useForm() {
  const [imageType, setImageType] = useState(0);
  const [imageList, setImageList] = useState<any[]>([]);

  // 处理封面类型变更
  const onTypeChange = (e: RadioChangeEvent) => {
    const type = e.target.value;
    setImageType(type);
  };

  // 处理文件上传变更
  const onUploadChange: UploadProps['onChange'] = (info) => {
    setImageList(info.fileList);
  };

  // 处理表单提交
  const onFinish: FormProps<FormValue>['onFinish'] = async (formValue) => {
    if (imageList.length !== imageType) {
      message.warning('封面类型和图片数量不匹配');
      return;
    }

    const { title, content, channel_id } = formValue;
    const reqData: ReqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map((item) => item.response.data.url),
      },
      channel_id,
    };

    try {
      await createArticleAPI(reqData);
      message.success('发布文章成功');
      // 根据需要重置表单或导航到其他页面
    } catch (error) {
      message.error('发布文章失败');
    }
  };

  return {
    onFinish,
    onTypeChange,
    onUploadChange,
    imageType,
    imageList,
  };
}
