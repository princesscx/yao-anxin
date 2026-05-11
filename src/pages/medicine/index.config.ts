export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '用药方案' })
  : { navigationBarTitleText: '用药方案' }
