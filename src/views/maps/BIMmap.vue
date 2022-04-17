<template>
  <div id="viewDiv" />
</template>

<script>
import { loadModules } from 'esri-loader'
import WebScene from '@arcgis/core/WebScene'
import SceneView from '@arcgis/core/views/SceneView'
import BuildingSceneLayer from '@arcgis/core/layers/BuildingSceneLayer'
import Slice from '@arcgis/core/widgets/Slice'
import SlicePlane from '@arcgis/core/analysis/SlicePlane'
import LayerList from '@arcgis/core/widgets/LayerList'
import Collection from '@arcgis/core/core/Collection'
import SceneLayer from '@arcgis/core/layers/SceneLayer'
import Legend from '@arcgis/core/widgets/Legend'
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter'

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
    this.init()
  },

  methods: {
    init() {
      // Load webscene and display it in a SceneView
      const webscene = new WebScene({
        // portalItem: {
        //     id: "f9011ca2bf0b42e78a507070b492472f",//92c97bd4e91447d6b3319da22bfa9147
        //     portal: 'http://portal.ehjedu.cn/arcgis'
        // }
      })

      const view = new SceneView({
        container: 'viewDiv',
        map: webscene
      })

      const typeRenderer = {
        type: 'unique-value',
        legendOptions: {
          title: 'Level'
        },
        field: 'Level',
        uniqueValueInfos: [
          {
            value: 11,
            symbol: {
              type: 'mesh-3d',
              symbolLayers: [
                {
                  type: 'fill',
                  material: { color: '#FD7F6F', colorMixMode: 'replace' }
                }
              ]
            },
            label: '11'
          },
          {
            value: 19,
            symbol: {
              type: 'mesh-3d',
              symbolLayers: [
                {
                  type: 'fill',
                  material: { color: '#7EB0D5', colorMixMode: 'replace' }
                }
              ]
            },
            label: '19'
          }
        ]
      }
      const layer = new SceneLayer({
        url: 'https://portal.ehjedu.cn/server/rest/services/Hosted/%E9%87%91%E6%B2%99%E6%B1%9Fdgn%E6%A8%A1%E5%9E%8B/SceneServer',
        renderer: typeRenderer,
        title: 'Renderer Scene Layer'
      })

      webscene.layers.add(layer)

      // wait until the webscene finished loading
      webscene.when(() => {
        // 过滤模型
        const filterLayer = webscene.layers.getItemAt(0)
        filterLayer.definitionExpression = 'Level < 5'

        // retrieve the scene layer from the webscene - in this case it is the first layer
        const sceneLayer = webscene.layers.getItemAt(0)
        console.log(sceneLayer.declaredClass + ', ' + sceneLayer.title)

        // get all attributes for the query
        sceneLayer.outFields = ['*']

        // retrieve the layer view of the scene layer
        view.whenLayerView(sceneLayer).then((sceneLayerView) => {
          view.on('click', (event) => {
            sceneLayerView.queryFeatures().then((result) => {
              console.log(result.features)
            })
          })

          // const filter = new FeatureFilter({
          //     where: "Level > 10"
          // });
          // sceneLayerView.filter = filter;
        })
      })

      // Add a layer list widget
      const layerList = new LayerList({
        view: view
      })
      // view.ui.empty("top-left");
      view.ui.add(layerList, 'top-right')
      //   setSliceWidget();

      const legend = new Legend({
        view: view
      })

      view.ui.add(legend, 'top-right')
    }
  }
}
</script>
<style scoped>
#viewDiv {
  width: 100%;
  height: calc(100vh - 84px);;
}
</style>
