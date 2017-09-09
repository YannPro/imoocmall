<template>
  <div>
    <vheader></vheader>
    <vbread></vbread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default" :class="{'cur':!isSortByPriceAsc}" @click="sortByDefault">Default</a>
          <a href="javascript:void(0)" class="price" :class="{'cur':isSortByPriceAsc}" @click="sortByPriceAsc">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': isFilterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':goodsAll.isActive}" @click="setPriceFilter(-1)">{{goodsAll.text}}</a></dd>
              <dd v-for="(item,index) in priceFilter" @click="setPriceFilter(index)">
                <a href="javascript:void(0)" :class="{'cur':item.isActive}">{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.productPrice| currency('$')}}</div>
                    <div class="btn-area" @click="addCart(item.productId)">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infiniter-scroll-disabled="busy" infiniter-scroll-distance="1">
                <img src="/static/loading-svg/loading-spinning-bubbles.svg" v-show="loading" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :mdShow="mdShow">
      <p slot="message">
        <span>请先登录，否则无法加入购物车 </span>
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    <modal :mdShow="mdShowCart">
      <p slot="message">
        <svg class="icon-status-ok">
          <use  xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功</span>
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShowCart=false">继续购物</a>
        <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <div class="md-overlay" v-show="overlayFlag" @click="closeFilterPop"></div>
    <vfooter></vfooter>
  </div>
</template>
<script>
  import vheader from '@/components/header.vue'
  import vfooter from '@/components/footer.vue'
  import vbread from '@/components/bread.vue'
  import modal from '@/components/modal.vue'
  import axios from 'axios'
  export default{
    data () {
      return {
        goodsList: [],
        goodsAll: {
          isActive: true,
          text: 'all'
        },
        priceFilter: [
          {
            isActive: false,
            startPrice: 0,
            endPrice: 500
          },
          {
            isActive: false,
            startPrice: 500,
            endPrice: 1000
          },
          {
            isActive: false,
            startPrice: 1000,
            endPrice: 2000
          },
          {
            isActive: false,
            startPrice: 2000,
            endPrice: 4000
          }
        ],
        isFilterBy: false,
        overlayFlag: false,
        priceFilterOn: {text: 'all'},
        isSortByPriceAsc: false,
        page: 1,
        pageSize: 8,
        busy: true,
        loading: false,
        // 未登录时的添加购物车flag
        mdShow: false,
        mdShowCart: false
      }
    },
    components: {
      vheader,
      vfooter,
      vbread,
      modal
    },
    mounted: function () {
      this.getData(false)
    },
    methods: {
      // 如果flag为true分页需要累加，否则不累加
      getData (flag) {
        let param = {
          priceFilter: this.priceFilterOn,
          isSortByPriceAsc: this.isSortByPriceAsc ? 1 : 0,
          page: this.page,
          pageSize: this.pageSize
        }
        axios.get('/goods/list', {
          params: param
        }).then(res => {
          this.loading = false
          if (flag) {
            if (res.data.length < this.pageSize) {
              this.busy = true
            } else {
              this.busy = false
            }
            this.goodsList = this.goodsList.concat(res.data)
          } else {
            this.goodsList = res.data
          }
        })
      },
      addCart (productId) {
        axios.post('/goods/addCart', {
          productId: productId
        }).then((res) => {
          if (res.data.statusCode === 0) {
            this.mdShowCart = true
            this.mdShow = false
          } else {
            this.mdShowCart = false
            this.mdShow = true
          }
        })
        this.mdShow = true
      },
      setPriceFilter (index) {
        for (let item of this.priceFilter) {
          item.isActive = false
        }
        if (index === -1) {
          // 设置价格过滤按钮是否激活
          this.goodsAll.isActive = true
          this.priceFilterOn = this.goodsAll
        } else {
          // 设置价格过滤按钮是否激活
          this.goodsAll.isActive = false
          this.priceFilter[index].isActive = !this.priceFilter[index].isActive
          this.priceFilterOn = this.priceFilter[index]
        }
        this.closeFilterPop()
        this.getData(false)
      },
      sortByPriceAsc () {
        this.page = 1
        this.isSortByPriceAsc = true
        this.getData(false)
      },
      sortByDefault () {
        this.page = 1
        this.isSortByPriceAsc = false
        this.getData(false)
      },
      showFilterPop () {
        this.isFilterBy = true
        this.overlayFlag = true
      },
      closeFilterPop () {
        this.isFilterBy = false
        this.overlayFlag = false
      },
      loadMore () {
        setTimeout(() => {
          this.page++
          this.loading = true
          this.getData(true)
        }, 1000)
      }
    }
  }
</script>
