<template>
  <div class="wrapper">
    <div id="map" class="map" />
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'
export default {
  name: '',

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  created() {},

  mounted() {
    this._createMapView()
  },

  methods: {

    // 创建地图
    _createMapView: function() {
      const _self = this // 定义一个_self防止后续操作中this丢失
      const option = { // 定义一个包含有JS API中js开发包和css样式文件的对象
        url: 'https://js.arcgis.com/4.23/',
        css: 'https://js.arcgis.com/4.23/esri/themes/light/main.css'
      }
      // 通过loadModules来做衔接
      loadModules(['esri/Map',
        'esri/views/MapView'], option)
        .then(([Map, MapView]) => {
          // 业务代码在此处编写
          const map = new Map({ // 实例化地图
            basemap: 'topo-vector'
          })
          const view = new MapView({ // 实例化地图视图
            container: 'map',
            map: map,
            zoom: 11,
            center: [104.072044, 30.663776]
          })
          view.ui.components = [] // 清除掉地图左上角默认的缩放图标
        }).catch((err) => {
          _self.$message('地图创建失败，' + err)
        })
    }
  }
}
</script>
<style scoped>
.map {
  width: 100%;
  height: calc(100vh - 84px);;
}
</style>
