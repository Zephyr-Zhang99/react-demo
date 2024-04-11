import { clearUserInfo, fetchUserInfo } from '@/store/modules/user';
import { DiffOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
];

/**
 * 使用布局的自定义钩子。
 * 该钩子不接受任何参数，并返回与布局相关的菜单点击处理函数和当前选中的菜单键。
 *
 * @returns {Object} 返回一个对象，包含两个属性：
 *  - menuClick: 菜单点击事件的处理函数，接收一个参数 `route`，当菜单项被点击时调用。
 *  - selectedKeys: 当前选中的菜单键的数组，根据当前地点路径名初始化。
 *  - name: 当前登录用户的名字。
 */
export const useLayout = () => {
  const navigate = useNavigate(); // 使用react-router的useNavigate钩子，用于在应用中进行导航。
  const location = useLocation(); // 使用react-router的useLocation钩子，获取当前的地点信息。
  const dispatch = useDispatch(); // 使用react-redux的useDispatch钩子，用于派发actions。

  // 初始化选中的菜单键，根据当前路径名。
  // 使用 useMemo 来避免不必要的重新计算 selectedKeys
  const selectedKeys = useMemo(() => [location.pathname], [location.pathname]);

  /**
   * 处理菜单点击事件的函数。
   * 当菜单项被点击时，调用`navigate`函数来导航到对应的路由。
   *
   * @param {Object} route - 被点击的菜单项的路由信息对象。
   */
  const menuClick: MenuProps['onClick'] = (route) => {
    navigate(route.key);
  };

  // 使用react-redux的useSelector钩子，从全局状态中获取当前登录用户的名字。
  const name = useSelector((state: any) => state.user.userInfo.name);

  // 退出登录
  const loginOut = () => {
    dispatch(clearUserInfo()); // 清除用户信息
    navigate('/login'); // 返回登录页
  };

  // 当组件挂载时，派发一个action来获取用户信息。
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]); // 依赖项列表为空，表示仅在组件挂载时执行。

  return { menuClick, selectedKeys, name, loginOut };
};
