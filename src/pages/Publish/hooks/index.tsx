import { createArticleAPI } from '@/apis/publish';
import { useChannel } from '@/hooks/useChannel';
import {
  message,
  type FormProps,
  type RadioChangeEvent,
  type UploadProps,
} from 'antd';
import { useState } from 'react';

// 频道列表类型
export type Channel = {
  id: number;
  name: string;
};

// 用于管理发布流程的自定义钩子
export function usePublish() {
  const { channels } = useChannel();
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
