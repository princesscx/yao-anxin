export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '告警设置' })
  : { navigationBarTitleText: '告警设置' }
