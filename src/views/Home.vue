<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <form>
            <div class="form-group mt-3">
              <label>搜尋功能</label>
              <input type="text" class="form-control" placeholder="請輸入使用者名稱 or IP位址" v-model="search">
              <small>支持模糊搜尋，但要注意英文大小寫</small>
            </div>
          </form>
          <div class="form-group">
            <label for="feature">功能操作</label>
            <select class="form-control" id="feature" @change="filterUser" v-model="selected">
              <option disabled value="">--- 請選擇 ---</option>
              <option :value="item" v-for="(item, index) in selectData" :key="index">
                {{ item }}
              </option>
            </select>
          </div>
          <small>該網站頁面資料：{{ dataLength }} 筆</small>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center pt-2" v-for="(item, index) in filteredList" :key="index">
          <div class="card card-box w-100">
            <div class="card-body">
              <h5 class="card-title d-inline">
                <span>{{ item.first_name }} {{ item.last_name }} </span>
              </h5>
              <p>性別：<span>{{ item.gender }}</span></p>
              <p v-if="item.email != null">信箱：<span>{{ item.email }}</span></p>
              <p v-else>信箱：<span>無資料</span></p>
              <p class="high-item pt-2">{{ item.description }}</p>
              <p>IP位址：<span>{{ item.ip_address }}</span></p>
              <p>最後登入時間：<span>{{ item.login_at }}</span></p>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" @click.prevent="clickItem">Click me</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  data () {
    return {
      allData: [],
      templateData: [],
      search: '',
      dataLength: '',
      isLoading: false,
      selected: '',
      selectData: ['全部資料', '取得所有男性資料', '取得所有女性資料']
    }
  },
  methods: {
    clickItem () {
      let timerInterval
      Swal.fire({
        title: '功能正在開發中><',
        html: '在 <b></b> 秒後自動關閉.',
        timer: 4000,
        timerProgressBar: true,
        willOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    },
    filterUser () {
      const cacheData = []
      this.allData.forEach((item) => {
        switch (this.selected) {
          case '全部資料':
            cacheData.push(item)
            this.templateData = cacheData
            break
          case '取得所有男性資料':
            if (item.gender === 'Male') {
              cacheData.push(item)
              this.templateData = cacheData
            }
            break
          case '取得所有女性資料':
            if (item.gender === 'Female') {
              cacheData.push(item)
              this.templateData = cacheData
            }
            break
        }
      })
    }
  },
  computed: {
    filteredList () {
      return this.templateData.filter((res) => {
        return res.first_name.match(this.search) || res.ip_address.match(this.search)
      })
    }
  },
  created () {
    const api = 'https://run.mocky.io/v3/9d5f33ec-0d2f-4743-aac9-5aef32f7badf'
    this.isLoading = true
    this.$http.get(api).then((res) => {
      this.allData = res.data
      this.dataLength = res.data.length
      this.isLoading = false
      this.templateData = JSON.parse(JSON.stringify(this.allData))
      console.log(this.templateData)
    })
  }
}
</script>
