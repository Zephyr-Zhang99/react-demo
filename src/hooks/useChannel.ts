import { getChannelAPI } from '@/apis/publish';
import type { Channel } from '@/pages/Publish/hooks';
import { message } from 'antd';
import { useEffect, useState } from 'react';

function useChannel() {
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

export { useChannel };
