import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isFirstEnterBeforeEach: false
  }),

  getters: {
    enterBeforeEach: (state) => (state.isFirstEnterBeforeEach = true)
  }
})
