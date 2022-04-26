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
          <el-dropdown-item
            command="registerService"
          >注册服务</el-dropdown-item>
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
        <el-select
          v-model="level1value"
          class="select1"
          clearable
          placeholder="请选择"
          @change="getlevel2value"
        >
          <el-option
            v-for="item in level1option"
            :key="item.id"
            :label="item.name"
            :value="item.children"
          />
        </el-select>
        <el-select
          v-model="level2value"
          class="select2"
          clearable
          placeholder="请选择"
          @change="getlevel2tree"
        >
          <el-option
            v-for="item in level2option"
            :key="item.id"
            :label="item.name"
            :value="item.children"
          />
        </el-select>
        <el-input
          v-model="filterText"
          class="searchinput"
          placeholder="输入关键字进行过滤"
        />
        <el-tree
          ref="tree"
          :data="modelTreeData"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="expandedkeys"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
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
      <el-input
        v-model="registerInfo.name"
        size="medium"
        class="inputbox"
        autosize
        placeholder="name"
      />
      <el-input
        v-model="registerInfo.url"
        size="medium"
        class="inputbox"
        autosize
        placeholder="url"
      />
      <el-input
        v-model="registerInfo.version"
        size="medium"
        class="inputbox"
        autosize
        placeholder="version"
      />
      <el-row>
        <el-col class="button-group">
          <el-button
            size="medium"
            type="primary"
            @click="doRegisterService"
          >确认</el-button>
          <el-button
            size="medium"
            type="danger"
            @click="closeRegisterService"
          >取消</el-button>
        </el-col>
      </el-row>
    </dialog-drag>
    <div>
      <el-card class="box-card">
        <el-card class="box-title">
          <dt class="title-font">构件施工信息</dt>
        </el-card>
        <div class="msg">
          <el-row>
            <el-col class="info" :span="24">
              <div class="grid-content bg-purple">模型名称</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content bg-purple">名称</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content bg-purple">{{ "无" }}</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content bg-purple">名称</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content bg-purple">{{ "无" }}</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content bg-purple">名称</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content bg-purple">{{ "无" }}</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content bg-purple">名称</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content bg-purple">{{ "无" }}</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content bg-purple">名称</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content bg-purple">{{ "无" }}</div>
            </el-col>
          </el-row>
        </div>
        <el-card class="box-titlee">
          <dt class="title-font">预警统计</dt>
        </el-card>
        <div class="merge-button-group">
          <el-button type="primary" size="small" round plain class="merge-button">今日</el-button>
          <el-button type="primary" size="small" round plain class="merge-button">昨日</el-button>
          <el-button type="primary" size="small" round plain class="merge-button">近七日</el-button>
        </div>
        <div class="type-button-group">
          <el-button type="primary" size="mini" round plain class="type-button">初支开挖</el-button>
          <el-button type="primary" size="mini" round plain class="type-button">仰拱</el-button>
        </div>
        <div class="type-button-groupp">
          <el-button type="primary" size="mini" round plain class="type-button">二衬</el-button>
          <el-button type="primary" size="mini" round plain class="type-button">防、排水</el-button>
        </div>
        <div class="msgg">
          <el-table
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
            class="search-result-list"
          >
            <el-table-column
              type="index"
              label="序号"
              width="46px"
            />
            <el-table-column
              label="构件"
              width="46px"
            />
            <el-table-column
              label="循环类型"
              width="46px"
            />
            <el-table-column
              label="里程段"
              width="58px"
            />
            <el-table-column
              label="指标项"
              width="58px"
            />
            <el-table-column
              label="预警详情"
              width="46px"
            />
            <el-table-column
              label="开始时间"
              width="71px"
            />
          </el-table>
        </div>
        <!-- <el-card class="box-titleee">
				<dt class="title-font">施工模拟</dt>
			</el-card>
			<el-card class="box-bar">
				<div class="sliderblock">
					<el-slider
						v-model="levelvalue"
						:max="20"
						:marks="marks"
						@input="changeModel"
					/>
				</div>
				<div class="block">
					<el-date-picker
						size = "small"
						v-model="value1"
						type="monthrange"
						range-separator="至"
						start-placeholder="开始月份"
						end-placeholder="结束月份">
					</el-date-picker>
          <el-button size="small" type="primary" class="date-button"
            >确认</el-button>
				</div>
			</el-card> -->
      </el-card>
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
import LayerView from '@arcgis/core/views/layers/LayerView'
import Collection from '@arcgis/core/core/Collection'
import SceneLayer from '@arcgis/core/layers/SceneLayer'
import Legend from '@arcgis/core/widgets/Legend'
import Query from '@arcgis/core/rest/support/Query'
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import DialogDrag from 'vue-dialog-drag'
import { getjsontree, getServer, uploadBIM } from '@/api/bim.js'

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
      levelvalue: 500,
      webscene: null,
      view: null,
      highlight: null,
      marks: {
        0: '0',
        5: '5',
        10: '10',
        15: '15',
        20: '20'
      },
      level1value: '',
      level2value: '',
      level1option: [],
      level2option: [],
      filterText: '',
      modelTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultChecked: [],
      registerInfo: {
        name: '',
        url: '',
        version: '',
        components: []
      },
      templist: null,
      expandedkeys: ['010101', '010102', '01010101', '01010102'],
      featuresArray: []
    }
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  created() {
    this.json2tree()
    this.geturlServer()
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

      this.view = new SceneView({
        container: 'viewDiv',
        map: this.webscene,
        qualityProfile: 'high',
        environment: {
          lighting: {
            directShadowsEnabled: true,
            ambientOcclusionEnabled: true
          }
        },
        // by default the highlight color is set to cyan
        highlightOptions: {
          haloColor: [255, 38, 150],
          color: [255, 255, 255],
          fillOpacity: 0.3
        }
      })

      const typeRenderer = {
        type: 'unique-value',
        legendOptions: {
          title: 'Level'
        },
        field: 'Level',
        uniqueValueInfos: [
          {
            value: 17,
            symbol: {
              type: 'mesh-3d',
              symbolLayers: [
                {
                  type: 'fill',
                  material: { color: '#FD7F6F', colorMixMode: 'replace' }
                }
              ]
            },
            label: '17'
          },
          {
            value: 18,
            symbol: {
              type: 'mesh-3d',
              symbolLayers: [
                {
                  type: 'fill',
                  material: { color: '#7EB0D5', colorMixMode: 'replace' }
                }
              ]
            },
            label: '18'
          }
        ]
      }
      const layer = new SceneLayer({
        //  url: "https://portal.ehjedu.cn/server/rest/services/Hosted/%E9%87%91%E6%B2%99%E6%B1%9Fdgn%E6%A8%A1%E5%9E%8B/SceneServer",
        url: 'https://portal.ehjedu.cn/server/rest/services/Hosted/%E8%AF%95%E9%AA%8C%E6%A8%A1%E5%9E%8B%E7%BC%96%E7%A0%81V1_BG3F2Multipatch/SceneServer',
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
        this.view.whenLayerView(sceneLayer).then((sceneLayerView) => {
          this.view.on('click', () => {
            sceneLayerView.queryFeatures().then((result) => {
              console.log(result.features, 'sceneLayerView')
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
        view: this.view
      })
      // this.view.ui.empty("top-left");
      // this.view.ui.add(layerList, "top-right");
      //   setSliceWidget();

      // const legend = new Legend({
      //   view: this.view,
      // });

      // this.view.ui.add(legend, "top-right");
    },

    geturlServer() {
      getServer().then(res => {
        console.log(res, '获取服务地址')
      }).catch(error => {
        console.log(error)
      })
    },
    // 滑块控制
    changeModel() {
      const filterLayer = this.webscene.layers.getItemAt(0)
      filterLayer.definitionExpression = 'Level < ' + this.levelvalue
    },
    // BIM目录树
    // json节点生成tree
    json2tree() {
      getjsontree().then((res) => {
        const nodelist = res
        // console.log(nodelist);
        const list = nodelist.reduce(function(prev, item) {
          prev[item.pCode]
            ? prev[item.pCode].push(item)
            : (prev[item.pCode] = [item])
          return prev
        }, {})
        // console.log(list);
        for (const key in list) {
          list[key].forEach(function(item) {
            // item.id = item.code + "_" + item.bimKey;
            item.id = item.code
            item.children = list[item.code] ? list[item.code] : []
          })
        }

        this.templist = list

        this.level1option = list['']
        // this.modelTreeData = list["0101"];
        // console.log(this.modelTreeData);
      })
    },
    // 获取二级下拉列表信息
    getlevel2value(item) {
      if (!item) {
        // 如果取消一级二级不存在
        this.level2option = []
        return
      }
      this.level2option = item
      this.modelTreeData = item
    },
    // 通过二级下拉列表获取新的BIM目录树
    getlevel2tree(item) {
      if (!item) {
        return
      }
      this.modelTreeData = item
    },
    // 过滤节点树
    filterNode(value, data) {
      // console.log(value, data,9999);
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },

    getobjectId(campusSceneLayer, bimKey) {
      return this.view.whenLayerView(campusSceneLayer).then(
        async(campusSceneLayerView) => {
          const result = await campusSceneLayerView.queryFeatures()

          const tempfeature = result.features.find(item => {
            return item.attributes.element_id == bimKey
          })
          console.log(tempfeature, bimKey)
          const objectId = tempfeature.attributes.oid
          return objectId
        })
    },
    // 双击节点
    async handleNodeClick(data, node, self) {
      var selfthis = this
      // let highlight = null;
      const bimKey = data.bimKey
      const url = data.url
      //    const queryExtent = new Query({
      //         objectIds: [objectId]
      //       });
      const campusSceneLayer = this.webscene.layers.getItemAt(0)
      // 第一个异步  queryExtent
      const objectId = await this.getobjectId(campusSceneLayer, bimKey)
      console.log(objectId)
      const queryExtent = new Query({
        objectIds: [objectId]
      })
      this.view.whenLayerView(campusSceneLayer).then(async(campusSceneLayerView) => {
        const result = await campusSceneLayerView.queryExtent(queryExtent)
        if (result.extent) {
          selfthis.view.goTo(result.extent.expand(4), { speedFactor: 0.5 })
            .catch((error) => {
              if (error.name != 'AbortError') {
                console.error(error)
              }
            })
        }
        if (this.highlight) {
          this.highlight.remove()
        }
        this.highlight = campusSceneLayerView.highlight([objectId])
      })
    },

    submitRegisterService() {
      var that = this
      const fl = new SceneLayer({
        url: this.registerInfo.url
      })// map.add(fl);
      fl.load().then(function() {
        const query = fl.createQuery()
        query.outFields = ['*']
        fl.queryFeatures(query).then(function(results) {
          var ar = []

          //  console.log(results.features,111);  // prints all the client-side features to the console

					 for (let i = 0; i < results.features.length; i++) {
            var bimattributes = {}
            bimattributes.bimKey = results.features[i].attributes.element_id
            bimattributes.componentTypeName = '喷混模型'
            bimattributes.cycleType = results.features[i].attributes.type
            bimattributes.ebs = results.features[i].attributes.ebs编码
            bimattributes.endSegment = results.features[i].attributes.结束里程
            bimattributes.startSegment = results.features[i].attributes.起始里程
            bimattributes.surroundRockGrade = results.features[i].attributes.围岩等级
            bimattributes.workFace = results.features[i].attributes.隧道名称
            ar.push(bimattributes)
          }
          that.registerInfo.components = ar
          uploadBIM(that.registerInfo)
          console.log(that.registerInfo)
        })
      })
    },
    // 处理菜单事件
    handleMenuCommand(command) {
      if (command === 'showLayer') {
        this.layerTreeVisible = true
      } else if (command === 'registerService') {
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
      // console.log(this.registerInfo.url);
      this.submitRegisterService()

      this.layerRegisterService = false
    },

    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'background-color: rgba(255,255,255,0.29);		border: 1px solid #FACD91C2;'
    },

    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return ' background-color:rgba(129,211,248,0.23); color: #000;font-weight: 500;border: 1px solid #FACD91C2;'
      }
    }

  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
	#viewDiv {
		height: calc(100vh - 85px);;
	}
	.mainMenu {
		left: 80px;
		top: 10px;
		position: absolute;
		z-index: 991;
	}
	.sliderblock {
		margin-top: 5%;
		margin-left: 5%;
		width: 90%;
	}
	.block {
		margin-left: 5%;
		margin-top: 15%;
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
  .box-card {
    width: 22%;
		z-index: 991;
		position: absolute;
		background: #02233960;
		border: 1px solid #4B9696;
		top: 5px;
		right: 5px;
		height: 97%;
  }
	.box-title {
		width: 40%;
		background: #12374F;
		height: 38px;
		border: 1px solid #03C4DBD1;
	}
	.box-titlee {
		width: 40%;
		background: #12374F;
		height: 38px;
		margin-top: 170px;
		border: 1px solid #03C4DBD1;
	}
	.box-titleee {
		width: 40%;
		background: #12374F;
		height: 38px;
		margin-top: 20px;
		border: 1px solid #03C4DBD1;
	}
	.box-bar {
		background: #303133;
		border: 1px solid #409EFF;
		margin-top: 10px;
		height: 200px;
	}
	.title-font {
    font-size: 15px;
    font-weight: bold;
		margin-top: -10px;
		color: aliceblue;
		text-align:center;
	}
	.msg {
		margin-top: 3%;
		margin-left: 10%;
		width: 80%;
		font-size: 14px;
		color: #606266;
	}
	.msgg {
		margin-top: 3%;
		margin-left: 1%;
		width: 98%;
	}
	.merge-button-group {
		margin-top: 3%;
		width: 58%;
	}
	.type-button-group{
		margin-top: -12%;
		margin-left: 61%;
		width: 40%;
	}
	.type-button-groupp{
		margin-top: 1%;
		margin-left: 61%;
		width: 40%;
	}
	.merge-button {
		background-color:transparent;
		color: #2193FF;
		font-weight: bold;
		border: 1px solid #2193FF;
		width: 30%;
	}
	.type-button{
		background-color:transparent;
		border: 1px solid #027DB4;
		color: #F2F2F2;
	}
	.info {
		border: 1px solid #facd9152;
	}
	.el-row {
		height: 40px;
	}
	.el-col {
		text-align: center;
		line-height: 30px;
		color:  #fff;
	}
	.select1, .select2 {
		width: 134px;
	}
	.select2 {
		margin-left: 20px;
	}
	.searchinput {
		margin: 10px 0;
	}
	.search-result-list{
		width: 100%;
		background-color:transparent;
		border: 1px solid #FACD91C2;
		height: 550px;
		font-size: 4px;
	}
	.el-input__inner {
		border: 1px solid #409EFF;
		width: 70%;
	}
	.date-button{
		margin-left: 5%;
		width: 20%;
	}
</style>
