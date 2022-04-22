<template>
  <div>
    <div id="viewDiv" />
    <div class="mainMenu">
      <el-dropdown @command="handleMenuCommand">
        <el-button type="primary">
          基础功能
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showLayer">模型管理</el-dropdown-item>
					<el-dropdown-item command="registerService">注册服务</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <dialog-drag
      v-show="layerTreeVisible"
      id="dialog-1"
      class="dialog-3"
      title="模型目录"
      pinned="false"
      :options="{ top: 60, left: 80, width: 320, buttonPin: false }"
      @close="closeLayerTreePanel"
    >
      <el-scrollbar :native="false" style="height: 100%">
        <el-tree
          show-checkbox
          :data="modelTreeData"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="[1, 2]"
          :default-checked-keys="defaultChecked"
        />
      </el-scrollbar>
    </dialog-drag>

    <dialog-drag
      v-show="layerRegisterService"
      id="dialog-1"
      class="dialog-2"
      title="注册服务"
      pinned="false"
      :options="{ top: 60, left: 80, width: 320, buttonPin: false }"
      @close="closeRegisterService"
    >
		<el-input v-model="registerInfo.name"
		size="medium" class="inputbox"
		autosize placeholder="name"></el-input>
		<el-input v-model="registerInfo.url"
		size="medium" class="inputbox"
		autosize placeholder="url"></el-input>
		<el-input v-model="registerInfo.version"
		size="medium" class="inputbox"
		autosize placeholder="version"></el-input>
		<el-row>
			<el-col class="button-group">
				<el-button size="medium" type="primary" @click="doRegisterService">确认</el-button>
				<el-button size="medium" type="danger" @click="closeRegisterService">取消</el-button>
			</el-col>
		</el-row>
    </dialog-drag>
    <div class="sliderblock">
      <el-slider
        v-model="levelvalue"
        :max="20"
        vertical
        height="200px"
        :marks="marks"
        @input="changeModel"
      />
    </div>
  </div>

</template>

<script>
import axios from 'axios'
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
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import DialogDrag from 'vue-dialog-drag'

export default {
  name: '',

  components: {
    DialogDrag
  },

  props: {},

  data() {
    return {
      layerTreeVisible: false,
			layerRegisterService: false,
      levelvalue: 5,
      webscene: null,
      marks: {
        0: '0',
        5: '5',
        10: '10',
        15: '15',
        20: '20'
      },
      modelTreeData:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultChecked: [],
			registerInfo: {
				name: '',
				url: '',
				version: '',
			}
    }
  },

  computed: {},

  created() {
    this.json2tree()
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      // Load webscene and display it in a SceneView
      this.webscene = new WebScene({
        // portalItem: {
        //     id: "f9011ca2bf0b42e78a507070b492472f",//92c97bd4e91447d6b3319da22bfa9147
        //     portal: 'http://portal.ehjedu.cn/arcgis'
        // }
      })

      const view = new SceneView({
        container: 'viewDiv',
        map: this.webscene
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

      this.webscene.layers.add(layer)

      // wait until the webscene finished loading
      this.webscene.when(() => {
        // 过滤模型
        const filterLayer = this.webscene.layers.getItemAt(0)
        filterLayer.definitionExpression = 'Level < ' + this.levelvalue
        // retrieve the scene layer from the webscene - in this case it is the first layer
        const sceneLayer = this.webscene.layers.getItemAt(0)
        console.log(sceneLayer.declaredClass + ', ' + sceneLayer.title)

        // get all attributes for the query
        sceneLayer.outFields = ['*']

        // retrieve the layer view of the scene layer
        view.whenLayerView(sceneLayer).then((sceneLayerView) => {
          view.on('click', () => {
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
    },
    //滑块控制
    changeModel() {
      const filterLayer = this.webscene.layers.getItemAt(0)
      filterLayer.definitionExpression = 'Level < ' + this.levelvalue
    },
    //json节点生成tree
    json2tree(){
       axios
        .request({
          url: '/BIMContents.json', // 读取public目录下节点json文件
          method: 'get'
        }).then(res =>{
              let nodelist = res.data.nodes; 
              let list = nodelist.reduce(function(prev, item){
                                  prev[item.parent] ? prev[item.parent].push(item) : prev[item.parent] = [item];
                                  return prev
                          },{});
       
              for (let key in list) {
                  list[key].forEach(function (item) {
                                        item.id = item.code + "_" +item.c_id;
                                        item.children = list[item.code] ? list[item.code] : [];
                                    });
              }
            
              this.modelTreeData = list[""]; 
              console.log(this.modelTreeData) ;
        })

    },

    // 处理菜单事件
    handleMenuCommand(command) {
      if (command === 'showLayer') {
        this.layerTreeVisible = true
      }
			else if (command === 'registerService') {
				this.layerRegisterService = true
			}
    },
    // 关闭图层面板
    closeLayerTreePanel() {
      this.layerTreeVisible = false
    },
		closeRegisterService() {
			this.layerRegisterService = false
		},
		doRegisterService() {
			console.log(this.registerInfo.url);
			const fl = new SceneLayer({
				url : this.registerInfo.url
			});// map.add(fl);
			fl.load().then(function() {
				let query = fl.createQuery();
				query.outFields = [ "*" ];
				fl.queryFeatures(query).then(function (results){
					console.log(results.features);  // prints all the client-side features to the console
				});
			});
			this.layerRegisterService = false
		}
  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
	#viewDiv {
		height: calc(100vh - 84px);;
	}
	.mainMenu {
		left: 80px;
		top: 10px;
		position: absolute;
		z-index: 991;
	}
	.sliderblock {
		background: #9093991A;
		border: 1px solid #bfcbd9;
		left: 10px;
		top: 220px;
		height: 220px;
		width: 60px;
		position: absolute;
		z-index: 991;
	}
	.el-slider.is-vertical {
		top: 10px;
	}
	.inputbox {
		padding: 5px;
	}
	.button-group {
		margin-top: 5px;
		display:flex;
		justify-content:center;
	}
</style>
