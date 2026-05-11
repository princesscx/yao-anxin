export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '设备管理' })
  : { navigationBarTitleText: '设备管理' }
