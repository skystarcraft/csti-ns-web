import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state={   //要设置的全局访问的state对象
     user_image: null,
     user_name: null
     //要设置的初始属性值
   };
const store = new Vuex.Store({
  state () {
    return {
      user_image: null,
      user_name: null
    }
  },
  getters: {
    getStorage: function (state) {
      if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
      }
      return state.user
    }
  },
  mutations: {
    setUser_image (state, value) {
      state.user_image = value
      localStorage.setItem('user_image', value)
    },
    setUser_name(state, value) {
      state.user_name = value
      localStorage.setItem('user_name', value)
    },
    remove(state) {
      state.user_image = null;
      state.user_name = null;
      localStorage.removeItem('user_image');
      localStorage.removeItem('user_name');
    }
  }
})

export default store
