import { fetchLogin } from '@/store/modules/user';
import { message, type FormProps } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// 校验规则
export const validationRules = {
  mobile: [
    { required: true, message: '请输入手机号' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号码格式不正确',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
    },
  ],
};

// 表单提交数据类型
export type FieldType = {
  mobile: string;
  code: string;
};
// 登录
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async (
    formValue: FieldType
  ) => {
    // 1. 触发异步action
    await dispatch(fetchLogin(formValue));
    // 2. 跳转到首页
    navigate('/');
    // 3. 提示用户
    message.success('登录成功');
  };

  return { onFinish };
};
