<template>
  <div id="top-header">
		<div class="background">
			<img :src="imgSrc" width="100%" height="100%" alt="" />
		</div>
    <dv-decoration-8 :color="['white', 'white']" class="header-left-decoration" />
    <dv-decoration-5 :color="['white', 'white']" class="header-center-decoration" />
    <dv-decoration-8 :color="['white', 'white']" class="header-right-decoration" :reverse="true" />
    <div class="center-title"></div>
  </div>
</template>

<script>

export default {
	data () {    
    return {
        imgSrc:require('../../assets/images/mb.png')
    }},

  components: {

  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
#top-header {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
	background: rgb(0, 150, 255);

	.background {
			width:100%;
			height:100%;  /**宽高100%是为了图片铺满屏幕 **/
			z-index:1;
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

  .center-title {
    position: absolute;
    font-size: 25px;
    font-weight: bold;
		color:#fff;
    left: 50%;
    top: 6px;
    transform: translateX(-50%);
  }
}
</style>
