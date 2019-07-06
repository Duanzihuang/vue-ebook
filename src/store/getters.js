export default {
  fileName: state => state.book.fileName,
  menuVisible: state => state.book.menuVisible,
  settingVisible: state => state.book.settingVisible,
  defaultFontSize: state => state.book.defaultFontSize,
  currentBook: state => state.book.currentBook,
  defaultFontFamily: state => state.book.defaultFontFamily,
  fontFamilyVisible: state => state.book.fontFamilyVisible,
  defaultTheme:state => state.book.defaultTheme,
  bookAvailable:state => state.book.bookAvailable,
  progress: state => state.book.progress,
  section: state => state.book.section,
  cover: state => state.book.cover,
  metadata: state => state.book.metadata
}
