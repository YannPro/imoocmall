<template>
  <div>
    <vheader></vheader>
    <vbread></vbread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>
      <div class="order-create">
        <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{orderId}}</span>
            <span>Order total：{{orderTotal | currency('$')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">Cart List</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">Goods List</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vfooter></vfooter>
  </div>
</template>
<script>
  import axios from 'axios'
  import vheader from '@/components/header.vue'
  import vfooter from '@/components/footer.vue'
  import vbread from '@/components/bread.vue'
  export default{
    components: {
      vheader,
      vfooter,
      vbread
    },
    data () {
      return {
        orderId: '',
        orderTotal: ''
      }
    },
    mounted () {
      this.getOrderDetail()
    },
    methods: {
      getOrderDetail () {
        this.orderId = this.$route.query.orderId
        // axios get方法传递参数要写params
        axios.get('users/getOrderDetail', {
          params: {
            'orderId': this.orderId
          }
        }).then(res => {
          if (res.data.statusCode === 0) {
            let orderDetail = res.data.result.orderDetail
            this.orderTotal = orderDetail.orderTotal
          }
        })
      }
    }
  }
</script>
