import type { FormProps } from 'antd';

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

// 表单提交
type FieldType = {
  mobile: string;
  code: string;
};
export const onFinish: FormProps<FieldType>['onFinish'] = (formValue) => {
  console.log(formValue);
};
