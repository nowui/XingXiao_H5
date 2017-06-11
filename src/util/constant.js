export default {
  timeout: 1200,
  duration: 1.2,
  load: '正在加载中..',
  success: '操作成功',
  error: '网络有问题',
  required: '不能为空',
  placeholder: '请输入',
  empty: '当前没有数据',
  platform: 'H5',
  version: '1.0.1',
  is_developer: true,
  // is_developer: false,
  host: 'http://localhost:8080',
  // host: 'http://api.xingxiao.nowui.com',
  order_status_list: [{
    order_status_value: 'ALL',
    order_status_name: '全部订单',
    order_status_image: ''
  }, {
    order_status_value: 'WAIT_PAY',
    order_status_name: '待付款',
    order_status_image: '/image/pay.svg'
  }, {
    order_status_value: 'WAIT_SEND',
    order_status_name: '待发货',
    order_status_image: '/image/send.svg'
  }, {
    order_status_value: 'WAIT_RECEIVE',
    order_status_name: '待收货',
    order_status_image: '/image/deliver.svg'
  }, {
    order_status_value: 'FINISH',
    order_status_name: '已完成',
    order_status_image: '/image/comment.svg'
  }]
};
