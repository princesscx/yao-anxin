export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '药安心 - 首页' })
  : { navigationBarTitleText: '药安心 - 首页' }
