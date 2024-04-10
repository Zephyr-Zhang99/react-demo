import type { FieldType } from '@/pages/Login/utils';
import { request } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  // 命名空间
  name: 'user',
  //   数据状态
  initialState: {
    token: '',
  },
  //   同步修改
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});
// 解构actionCreate
const { setToken } = userStore.actions;
// 获取reducer函数
const userReducer = userStore.reducer;
// 异步方法
const fetchLogin: any = (loginForm: FieldType) => {
  // dispatch,用来分发action
  return async (dispatch: any) => {
    // 发送异步请求
    const res = await request.post('/authorizations', loginForm);
    // 提交同步action进行token注入
    dispatch(setToken(res.data.token));
  };
};
export { fetchLogin, setToken };
export default userReducer;
