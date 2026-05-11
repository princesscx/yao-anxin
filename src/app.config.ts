export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/records/index',
    'pages/messages/index',
    'pages/profile/index',
    'pages/device/index',
    'pages/alarm/index',
    'pages/medicine/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#10B981',
    navigationBarTitleText: '药安心',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#6B7280',
    selectedColor: '#10B981',
    backgroundColor: '#FFFFFF',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tabbar/home.png',
        selectedIconPath: './assets/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/records/index',
        text: '记录',
        iconPath: './assets/tabbar/records.png',
        selectedIconPath: './assets/tabbar/records-active.png'
      },
      {
        pagePath: 'pages/messages/index',
        text: '消息',
        iconPath: './assets/tabbar/messages.png',
        selectedIconPath: './assets/tabbar/messages-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: './assets/tabbar/profile.png',
        selectedIconPath: './assets/tabbar/profile-active.png'
      }
    ]
  }
})
