import logo from '@/assets/logo.png';
import { Button, Card, Form, Input } from 'antd';

import './index.scss';
import { useLogin, validationRules } from './utils';
const Login = () => {
  const { onFinish } = useLogin();
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt='' />
        {/* 登录表单 */}
        <Form
          validateTrigger='onBlur'
          onFinish={onFinish}
          initialValues={{ mobile: '13800000002', code: '246810' }}
        >
          <Form.Item name='mobile' rules={validationRules.mobile}>
            <Input size='large' placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item name='code' rules={validationRules.code}>
            <Input size='large' placeholder='请输入验证码' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
