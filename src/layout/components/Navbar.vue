<template>
  <div id="top-header">
		<div class="logo">
			<img :src="logoSrc" width="20%" height="20%" alt="" />
			<div class="logo-title">中国交通建设集团</div>
		</div>
		<div class="text-button"><el-link>隧道掘进</el-link></div>
		<div class="text-buttonn"><el-link href="https://portal.ehjedu.cn/czbusiness">后台管理</el-link></div>
		<div class="date">{{dateFormat(date)}}</div>
		<div class="time">{{timeFormat(date)}}</div>
		<div class="week">{{weekFormat(date)}}</div>
		<div class="background">
			<img :src="imgSrc" width="100%" height="100%" alt="" />
		</div>
    <!-- <dv-decoration-8 :color="['white', 'white']" class="header-left-decoration" />
    <dv-decoration-5 :color="['white', 'white']" class="header-center-decoration" />
    <dv-decoration-8 :color="['white', 'white']" class="header-right-decoration" :reverse="true" /> -->
    <div class="center-title">CZSCZQ-13B标隧道施工数字孪生</div>
  </div>
</template>

<script>

export default {
	data () {    
    return {
        imgSrc:require('../../assets/images/mb1.jpg'),
				logoSrc:require('../../assets/images/logo.png'),
				date: new Date(),
    }
	},
  mounted() {
    let that= this;
    this.timer = setInterval(function() {
      that.date = new Date().toLocaleString();
    });
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  components: {

  },
  computed: {

  },
  methods: {
	// 时间格式化
    dateFormat () {
    	var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()


        // 拼接 时间格式处理
        return year + '/' + month + '/' + day
    },
		timeFormat() {
    	var date = new Date()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
				return  hours + ':' + minutes + ':' + seconds
		},
		weekFormat() {
    	var date = new Date()
        let week = date.getDay() // 星期
        let weekArr = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
				return  weekArr[week]
		}
  }
}
</script>

<style lang="scss" scoped>
#top-header {
  position: relative;
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
	// background: rgb(0, 150, 255);

	.logo {
		margin-top: 10px;
		margin-left: 10px;
		position: absolute;
	}

	.background {
			width:100%;
			height:100%;  /**宽高100%是为了图片铺满屏幕 **/
			z-index:-1;
			position: absolute;
	}

  .header-center-decoration {
    width: 40%;
    height: 30px;
    margin-top: 22px;
  }

  .header-left-decoration, .header-right-decoration {
    width: 25%;
    height: 40px;
  }

	.logo-title {
		position: absolute;
    font-size: 20px;
    font-weight: bold;
		color:#efefef;
    left: 42%;
    top: 25px;
    transform: translateX(-50%);
	}
	.text-button{
		position: absolute;
		left: 89%;
		top: 28px;
	}
	.text-buttonn{
		position: absolute;
		left: 94%;
		top: 28px;
	}
	.el-link.el-link--default {
		color: #efefef;
		font-size: 15px;
		font-weight: bold;
	}
  .center-title {
    position: absolute;
    font-size: 32px;
    font-weight: bold;
		color:#efefef;
    left: 50%;
    top: 25px;
    transform: translateX(-50%);
  }

	.date{
    position: absolute;
    font-size: 13px;
		color:#efefef;
    left: 25%;
    top: 50px;
    transform: translateX(-50%);
	}
	.time{
    position: absolute;
    font-size: 17px;
		color:#efefef;
		font-weight: bold;
    left: 25%;
    top: 30px;
    transform: translateX(-50%);
	}
	.week{
    position: absolute;
    font-size: 18px;
		color:#efefef;
		font-weight: bold;
    left: 28.5%;
    top: 38px;
    transform: translateX(-50%);
	}
}
</style>
