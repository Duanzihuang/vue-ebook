import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// 导入语言文件
import cn from './cn'
import en from './en'

const messages = {
  cn,
  en
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'en', // 设置地区
  messages, // 设置地区信息
})

export default i18n
