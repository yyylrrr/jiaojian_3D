<template>
  <div id="viewDiv" class="viewDiv" />
</template>

<script>

import { loadModules } from 'esri-loader'

export default {
  name: 'Map',
  components: {

  },
  mounted: function() {
    this._addSceneView()
  },
  methods: {
    // 加载场景
    _addSceneView: function() {
      const options = {
        url: 'https://js.arcgis.com/4.23/',
        css: 'https://js.arcgis.com/4.23/esri/themes/light/main.css'
      }

      loadModules([
        'esri/WebScene', 'esri/views/SceneView',
        'esri/layers/BuildingSceneLayer',
        'esri/widgets/Slice',
        'esri/analysis/SlicePlane',
        'esri/widgets/LayerList',
        'esri/core/Collection'
      ], options).then(([
        WebScene,
        SceneView,
        BuildingSceneLayer,
        Slice,
        SlicePlane,
        LayerList,
        Collection
      ]) => {
        // Load webscene and display it in a SceneView
        const webscene = new WebScene({
          portalItem: {
            id: '92c97bd4e91447d6b3319da22bfa9147',
            portal: 'http://portal.ehjedu.cn/arcgis'
          }
        })

        const view = new SceneView({
          container: 'viewDiv',
          map: webscene
        })

        // Create the BuildingSceneLayer and add it to the webscene
        const buildingLayer = new BuildingSceneLayer({
          url: 'https://portal.ehjedu.cn/server/rest/services/Hosted/%E9%95%BF%E6%B2%99%E6%B6%8C%E6%B0%B4%E9%97%B8%E8%BF%9B%E5%BA%A6%E6%95%B0%E6%8D%AE/SceneServer',
          title: 'Administration Building, Redlands - Building Scene Layer'
        })
        webscene.layers.add(buildingLayer)

        buildingLayer.when(() => {
          // Iterate through the flat array of sublayers and extract the ones
          // that should be excluded from the slice widget
          buildingLayer.allSublayers.forEach((layer) => {
            // modelName is standard accross all BuildingSceneLayer,
            // use it to identify a certain layer
            switch (layer.modelName) {
              // Because of performance reasons, the Full Model view is
              // by default set to false. In this scene the Full Model should be visible.
              case 'FullModel':
                layer.visible = true
                break
              case 'Overview':
                // case "Rooms":
                //     layer.visible = false;
                //     break;
                // // Extract the layers that should not be hidden by the slice widget
                // case "Doors":
                //     doorsLayer = layer;
                //     excludedLayers.push(layer);
                //     break;
              default:
                layer.visible = true
            }
          })

          // Add a layer list widget
          const layerList = new LayerList({
            view: view
          })
          // view.ui.empty("top-left");
          view.ui.add(layerList, 'top-left')
          //   setSliceWidget();
        })
      })
    }
  }
}
</script>

<style scoped>
#viewDiv {
	padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
