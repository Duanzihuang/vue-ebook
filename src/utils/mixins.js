import {mapGetters,mapActions} from 'vuex'

export const ebookMixins = {
  computed: {
    ...mapGetters([
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'currentBook',
      'defaultFontFamily',
      'fontFamilyVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setCurrentBook',
      'setDefaultFontFamily',
      'setFontFamilyVisible'
    ])
  }
}
