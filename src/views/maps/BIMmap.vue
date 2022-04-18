<template>
<div>
    <div id="viewDiv"></div> 
     <div class="sliderblock">
           <span class="demonstration">默认</span>
           <el-slider v-model="levelvalue" :max="20" @input="changeModel"></el-slider>
    </div>
</div>
     

</template>

<script>
import { loadModules } from 'esri-loader'
import WebScene from '@arcgis/core/WebScene'
import SceneView from "@arcgis/core/views/SceneView"
import BuildingSceneLayer from   "@arcgis/core/layers/BuildingSceneLayer"
import Slice from   "@arcgis/core/widgets/Slice"
import SlicePlane from   "@arcgis/core/analysis/SlicePlane"
import LayerList from   "@arcgis/core/widgets/LayerList"
import Collection from   "@arcgis/core/core/Collection"
import SceneLayer from   "@arcgis/core/layers/SceneLayer"
import Legend from   "@arcgis/core/widgets/Legend"
import FeatureFilter from  "@arcgis/core/layers/support/FeatureFilter"

export default {
  name: '',

  components: {},

  props: {},

  data() {
    return {
        levelvalue:5,
        webscene:null,
    }
  },

  computed: {},

  created() {},

  mounted() {
    this.init()
  },
//   watch:{
//       levelvalue:{

//       }
//   },

  methods: {
      init(){
        // Load webscene and display it in a SceneView
        this.webscene = new WebScene({
            // portalItem: {
            //     id: "f9011ca2bf0b42e78a507070b492472f",//92c97bd4e91447d6b3319da22bfa9147
            //     portal: 'http://portal.ehjedu.cn/arcgis'
            // }
        }); 

        const view = new SceneView({
            container: "viewDiv",
            map: this.webscene
        });   

        const typeRenderer = {
            type: "unique-value",
            legendOptions: {
                title: "Level",
            },
            field: "Level",
            uniqueValueInfos: [
                {
                    value: 11,
                    symbol: {
                        type: "mesh-3d",
                        symbolLayers: [
                            {
                                type: "fill",
                                material: { color: "#FD7F6F", colorMixMode: "replace" },
                            },
                        ],
                    },
                    label: "11",
                },
                {
                    value: 19,
                    symbol: {
                        type: "mesh-3d",
                        symbolLayers: [
                            {
                                type: "fill",
                                material: { color: "#7EB0D5", colorMixMode: "replace" },
                            },
                        ],
                    },
                    label: "19",
                },
            ],
        }
        const layer = new SceneLayer({
            url: "https://portal.ehjedu.cn/server/rest/services/Hosted/%E9%87%91%E6%B2%99%E6%B1%9Fdgn%E6%A8%A1%E5%9E%8B/SceneServer",
            renderer: typeRenderer,
            title: "Renderer Scene Layer"
        });

        this.webscene.layers.add(layer);

        // wait until the webscene finished loading
        this.webscene.when(() => {
            //过滤模型
            const filterLayer = this.webscene.layers.getItemAt(0);
            filterLayer.definitionExpression = "Level < " + this.levelvalue;
            // retrieve the scene layer from the webscene - in this case it is the first layer
            const sceneLayer = this.webscene.layers.getItemAt(0);
            console.log(sceneLayer.declaredClass + ", " + sceneLayer.title);

            // get all attributes for the query
            sceneLayer.outFields = ["*"];


            // retrieve the layer view of the scene layer
            view.whenLayerView(sceneLayer).then((sceneLayerView) => {
                view.on("click", (event) => {
                    sceneLayerView.queryFeatures().then((result) => {
                        console.log(result.features)
                    });
                });

                // const filter = new FeatureFilter({
                //     where: "Level > 10"
                // });
                // sceneLayerView.filter = filter;
            });

        });
    
        // Add a layer list widget
        const layerList = new LayerList({
            view: view
        });
        // view.ui.empty("top-left");
        view.ui.add(layerList, "top-right");
        //   setSliceWidget();

        const legend = new Legend({
            view: view,
        })

        view.ui.add(legend, "top-right")
      },
      changeModel(){
         
        //   console.log("Level < " + this.levelvalue)
        const filterLayer = this.webscene.layers.getItemAt(0);
        filterLayer.definitionExpression = "Level < " + this.levelvalue;
      }
  }
}
</script>
<style scoped>
#viewDiv {
  height: calc(100vh - 84px);;
}
.sliderblock {
  background-color:cadetblue;
  left: 100px;
  top: 10px;
  width: 10%;
  position: absolute;
  z-index: 991;
}
</style>