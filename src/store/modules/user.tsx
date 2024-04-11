import { getProfileAPI, loginAPI } from '@/apis/user';
import type { FieldType } from '@/pages/Login/hooks';
import { setToken as _setToken, removeToken } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';
const userStore = createSlice({
  // 命名空间
  name: 'user',
  //  数据状态
  initialState: {
    token: localStorage.getItem('token_key') || '',
    // 用户数据
    userInfo: {},
  },
  //   同步修改
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // 存入本地
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = '';
      state.userInfo = {};
      removeToken();
    },
  },
});

// 解构actionCreate
const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

// 获取reducer函数
const userReducer = userStore.reducer;

// 登录异步方法
const fetchLogin: any = (loginForm: FieldType) => {
  // dispatch,用来分发action
  return async (dispatch: any) => {
    // 发送异步请求
    const res = await loginAPI(loginForm);
    // 提交同步action进行token注入
    dispatch(setToken(res.data.token));
  };
};

// 获取用户信息
const fetchUserInfo: any = () => {
  return async (dispatch: any) => {
    const res = await getProfileAPI();
    dispatch(setUserInfo(res.data));
  };
};
export { clearUserInfo, fetchLogin, fetchUserInfo, setToken, setUserInfo };
export default userReducer;
