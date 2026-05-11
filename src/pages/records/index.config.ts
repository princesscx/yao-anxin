export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '用药记录' })
  : { navigationBarTitleText: '用药记录' }
