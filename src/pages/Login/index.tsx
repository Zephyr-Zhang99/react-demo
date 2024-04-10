import logo from '@/assets/logo.png';
import { Button, Card, Form, Input } from 'antd';
import { onFinish, validationRules } from '.';
import './index.scss';
const Login = () => {
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt='' />
        {/* 登录表单 */}
        <Form validateTrigger='onBlur' onFinish={onFinish}>
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
