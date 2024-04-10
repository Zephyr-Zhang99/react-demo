// 封装个高阶组件
// 有token正常跳转 无token 去登录
import { getToken } from '@/utils';
import { Navigate } from 'react-router-dom';

function AuthRoute({ children }: { children: any }) {
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={'/login'} replace></Navigate>;
  }
}

export default AuthRoute;
