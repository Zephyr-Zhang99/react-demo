import { deleteArticleAPI, getArticleListAPI } from '@/apis/publish';
import img404 from '@/assets/error.png';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export function useArticle() {
  const navigate = useNavigate();
  // 枚举状态
  const status = {
    1: <Tag color='warning'>待审核</Tag>,
    2: <Tag color='green'>审核通过</Tag>,
  };
  // 准备列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover: any) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt='' />
        );
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data: 1 | 2) => status[data],
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data: any) => {
        return (
          <Space size='middle'>
            <Button
              type='primary'
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title='确认删除该条文章吗?'
              onConfirm={() => delArticle(data)}
              okText='确认'
              cancelText='取消'
            >
              <Button
                type='primary'
                danger
                shape='circle'
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  //   1. 准备请求参数
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 10,
  });
  // 获取文章列表
  async function getArticleList() {
    const res = await getArticleListAPI(reqData);
    setList(res.data.results);
    setCount(res.data.total_count);
  }
  //  2.获取筛选数据
  const onFinish = (formValue: any) => {
    const { channel_id, date, status } = formValue;
    // 3. 将表单数据放到参数中
    setReqData({
      ...reqData,
      channel_id,
      status,
      begin_pubdate: date && date[0].format('YYYY-MM-DD'),
      end_pubdate: date && date[1].format('YYYY-MM-DD'),
    });
  };
  //   分页
  const pageChange = (page: number) => {
    // 修改参数依赖引发列表更新
    setReqData({
      ...reqData,
      page,
    });
  };
  //   删除
  const delArticle = async (data: any) => {
    await deleteArticleAPI(data.id);
    // 修改参数依赖引发列表更新
    setReqData({
      ...reqData,
    });
  };

  useEffect(() => {
    getArticleList();
    // 4. 监听表单数据变化
  }, [reqData]);
  return { list, count, columns, onFinish, reqData, pageChange };
}
