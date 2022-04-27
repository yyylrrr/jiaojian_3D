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
      title="BIM模型目录树"
      pinned="false"
      :options="{ top: 60, left: 80, width: 360, buttonPin: false }"
      @close="closeLayerTreePanel"
    >
        <el-select
          v-model="level1value"
          class="select1"
          clearable
          placeholder="请选择"
					:popper-append-to-body = "false"
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
					:popper-append-to-body = "false"
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
				<!-- <div class="serachtreebox"> -->
				<el-scrollbar class="scrollserachtree">
        <el-tree
          :data="modelTreeData"
          :props="defaultProps"
					class="serachtree"
          node-key="id"
          :default-expanded-keys="expandedkeys"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        />
				</el-scrollbar>
				<!-- </div> -->
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
					<el-scrollbar class="scrollInfoBox">
          <el-row>
            <el-col class="info" :span="24">
              <div class="grid-content">模型名称：{{this.modelname}}</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content">{{ this.attributename[0] || "属性1" }}</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content">{{ this.attributesize[0] || "无" }}</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content">{{ this.attributename[1] || "属性2" }}</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content">{{ this.attributesize[1] || "无" }}</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content">{{ this.attributename[2] || "属性3" }}</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content">{{ this.attributesize[2] || "无" }}</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content">{{ this.attributename[3] || "属性4" }}</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content">{{ this.attributesize[3] || "无" }}</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content">{{ this.attributename[3] || "属性5" }}</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content">{{ this.attributesize[3] || "无" }}</div>
            </el-col>
            <el-col class="info" :span="8">
              <div class="grid-content">{{ this.attributename[3] || "属性6" }}</div>
            </el-col>
            <el-col class="info" :span="16">
              <div class="grid-content">{{ this.attributesize[3] || "无" }}</div>
            </el-col>
          </el-row>
					</el-scrollbar>
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
						:data = "mergedata"
						border
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
            class="search-result-list"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50px"
            />
            <el-table-column
              label="工程结构"
							prop="instruct"
              width="50px"
            />
            <el-table-column
              label="工程部位"
							prop="position"
              width="95px"
            />
            <el-table-column
              label="报警详情"
							prop="details"

            />
            <el-table-column
              label="推送人"
							prop="people"
              width="70px"
            />
          </el-table>
        </div>
				<el-card class="box-titleee">
					<dt class="title-font">超前地质勘探综合分析报告</dt>
				</el-card>
				<el-card class="box-bar">
				<div class="device-tree">
					<el-scrollbar class="scrolldevice-tree">
					<el-tree :data="pictree" class="pictree" :props="defaultProps"></el-tree>
					</el-scrollbar>
				</div>
				</el-card>
			<!-- <el-card class="box-bar">
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
import { getjsontree, getServer, uploadBIM ,getmodulinfo} from '@/api/bim.js'

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
      expandedkeys: ['01010201', '0101020103', '0101020102', '0101020101',
			'0101020103001', '0101020102002', '0101020102001', '0101020101001', '0101020101002'],
      featuresArray: [],
			pictree: [{
				name: '格聂山3#横洞',
				children: [{
					name: 'H3DK2+490~H3DK2+460-001格聂山3#横洞'
				},{
					name: 'H3DK2+460~H3DK2+438.4-002格聂山3#横洞'
				},{
					name: 'H3DK2+441.6~H3DK2+400-003格聂山3#横洞'
				},{
					name: 'H3DK2+402.6~H3DK2+347-004格聂山3#横洞'
				},{
					name: 'H3DK2+350.4~H3DK2+318-005格聂山3#横洞'
				},{
					name: 'H3DK2+319~H3DK2+277-006格聂山3#横洞'					
				},{
					name: 'H3DK2+278.8~H3DK2+242.0-007格聂山3#横洞'
				}]
			},{
				name: '格聂平-1',
				children: [{
					name: 'K1+317.6~K1+288-001格聂平-1'
				},{
					name: 'K1+288.8~K1+277-002格聂平-1'
				},{
					name: 'K1+280.0~K1+256.0-003格聂平-1'
				}]
			}],
      modelinfos: [],
			attributename:[],
			attributesize:[],
			modelname:'',
			mergedata:[{
				instruct:'拱墙衬砌',
				position:'H3DK2+482-H3DK2+470',
				details:'拱墙衬砌结构等级：B级',
				people:'魏大勇、吴海舒'
			}],
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
        portalItem: {
            id: "ef4613f21ed34c649c3a728dea62edc1",//92c97bd4e91447d6b3319da22bfa9147
            portal: 'http://portal.ehjedu.cn/arcgis'
        }
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
            value: 1,
            symbol: {
              type: 'mesh-3d',
              symbolLayers: [
                {
                  type: 'fill',
                  material: { color: '#FFFFFF', colorMixMode: 'replace' }
                }
              ]
            },
            label: '1'
          },
          {
            value: 64,
            symbol: {
              type: 'mesh-3d',
              symbolLayers: [
                {
                  type: 'fill',
                  material: { color: '#7EB0D5', colorMixMode: 'replace' }
                }
              ]
            },
            label: '64'
          }
        ]
      }
      const popupOpenspaces = {
        "title": "构件设计信息",
        "content": [{
          "type": "fields",
          "fieldInfos": [
            // {
            //   "fieldName": "assetID",
            //   "label": "定位信息",
            //   "isEditable": true,
            //   "tooltip": "",
            //   "visible": true,
            //   "format": null,
            //   "stringFieldOption": "text-box"
            // },
            // {
            //   "fieldName": "IFD编码",
            //   "label": "IFD编码",
            //   "isEditable": true,
            //   "tooltip": "",
            //   "visible": true,
            //   "format": null,
            //   "stringFieldOption": "text-box"
            // },

            {
              "fieldName": "起始里程",
              "label": "起始里程",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
               "format": null,
              // "format": {
              //             "places": 2,
              //             "digitSeparator": true
              //           },
              "stringFieldOption": "text-box"
            },
            {
              "fieldName": "结束里程",
              "label": "终止里程",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },
            //             {
            //   "fieldName": "Type",
            //   "label": "类型名称",
            //   "isEditable": true,
            //   "tooltip": "",
            //   "visible": true,
            //   "format": null,
            //   "stringFieldOption": "text-box"
            // },
            // {
            //   "fieldName": "oid",
            //   "label": "支护范围",
            //   "isEditable": true,
            //   "tooltip": "",
            //   "visible": true,
            //   "format": null,
            //   "stringFieldOption": "text-box"
            // },
            // {
            //   "fieldName": "oid",
            //   "label": "材料型号",
            //   "isEditable": true,
            //   "tooltip": "",
            //   "visible": true,
            //   "format": null,
            //   "stringFieldOption": "text-box"
            // },
            // {
            //   "fieldName": "oid",
            //   "label": "小导管长度",
            //   "isEditable": true,
            //   "tooltip": "",
            //   "visible": true,
            //   "format": null,
            //   "stringFieldOption": "text-box"
            // },
            // {
            //   "fieldName": "oid",
            //   "label": "小导管直径",
            //   "isEditable": true,
            //   "tooltip": "",
            //   "visible": true,
            //   "format": null,
            //   "stringFieldOption": "text-box"
            // },
            // {
            //   "fieldName": "oid",
            //   "label": "其他属性",
            //   "isEditable": true,
            //   "tooltip": "",
            //   "visible": true,
            //   "format": null,
            //   "stringFieldOption": "text-box"
            // },
          ]
        }]
      }
      const layer = new SceneLayer({
        url:'https://portal.ehjedu.cn/server/rest/services/Hosted/c3%E5%8F%B7%E6%A8%AA%E6%B4%9E_%E5%B7%B2%E6%96%BD%E5%B7%A5_BG3F2Multipatch_v32/SceneServer',
        // renderer: typeRenderer,
        title: 'Renderer Scene Layer',
        // popupTemplate: popupOpenspaces
      })
    
      this.webscene.layers.add(layer)

      // wait until the webscene finished loading
      this.webscene.when(() => {
        // 过滤模型
        const filterLayer = this.webscene.layers.getItemAt(0)
        // filterLayer.definitionExpression = 'Level < ' + this.levelvalue
        // retrieve the scene layer from the webscene - in this case it is the first layer
        const sceneLayer = this.webscene.layers.getItemAt(0)
        console.log(sceneLayer.declaredClass + ', ' + sceneLayer.title)

        // get all attributes for the query
        sceneLayer.outFields = ['*']
         this.view.popup.autoOpenEnabled = false;
        // retrieve the layer view of the scene layer
        this.view.on("immediate-click", (event) => {
          this.view.hitTest(event).then(async (hitTestResult) => {
              if (hitTestResult.results.length > 0) {
                 const modelAttributes = await hitTestResult.results[0].graphic.attributes;
                 const ebs = modelAttributes.ebs;
                 console.log("这是ebs" , ebs)
                 this.modelinfos = await  getmodulinfo(ebs).then((res) => {
                                             return  res.data;
                                          })
                                          .catch((error) => {
                                            console.log(error);
                                          });
                console.log("点击模型获取构件施工信息",this.modelinfos);
								this.getmodelinfo()
              } 
              return;
            })
            .catch((error) => {
              console.error(error);
            });
        });
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
        console.log(res.data, '获取服务地址')
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
        const nodelist = res.data
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

        this.level1option = list['0101']
        // this.modelTreeData = list["0101"];
        //  console.log(this.level1option);
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
    // 获取构件的objectId
    getobjectId(campusSceneLayer, bimKey) {
      return this.view.whenLayerView(campusSceneLayer).then(
        async(campusSceneLayerView) => {
          const result = await campusSceneLayerView.queryFeatures()

          const tempfeature = result.features.find(item => {
            return item.attributes.element_id == bimKey
          })
          // console.log(tempfeature, bimKey)
          const objectId = tempfeature.attributes.oid
          return objectId
        })
    },
     // 点击目录树节点获取ebs
    getebs(campusSceneLayer, bimKey) {
      return this.view.whenLayerView(campusSceneLayer).then(
        async(campusSceneLayerView) => {
          const result = await campusSceneLayerView.queryFeatures()

          const tempfeature = result.features.find(item => {
            return item.attributes.element_id == bimKey
          })
         
          const ebs = tempfeature.attributes.ebs.replace(/[\r\n]/g,"")
           console.log("这是点击节点获取ebs", ebs)
          return ebs
        })
    },
    // 双击节点
    async handleNodeClick(data, node, self) {
			//console.log("获取结点",data.code)
      var selfthis = this
      const bimKey = data.bimKey
      const url = data.url
      const campusSceneLayer = this.webscene.layers.getItemAt(0)
      // 第一个异步 获取objectId queryExtent
      const objectId = await this.getobjectId(campusSceneLayer, bimKey)
      const ebs = await this.getebs(campusSceneLayer, bimKey)
      this.modelinfos = await  getmodulinfo(ebs).then((res) => {
                              return  res.data;
                            })
                            .catch((error) => {
                              console.log(error);
                            });
      console.log("点击目录树节点获取构件施工信息",this.modelinfos);
			this.getmodelinfo()
      // console.log(objectId,ebs,1212)
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

      //点击目录树节点，获取构件施工信息，右上角card渲染

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

            console.log(results.features,111);  // prints all the client-side features to the console

					 for (let i = 0; i < results.features.length; i++) {
                if( results.features[i].attributes.ebs &&  results.features[i].attributes.ebs.length > 10){
                        var bimattributes = {}
                        bimattributes.bimKey = results.features[i].attributes.element_id
                        bimattributes.componentTypeName = '喷混模型'
                        bimattributes.cycleType = results.features[i].attributes.type
                        bimattributes.ebs = results.features[i].attributes.ebs.replace(/[\r\n]/g,"")
                        bimattributes.endSegment =  "结束里程"                //results.features[i].attributes.结束里程
                        bimattributes.startSegment =  "起始里程"              //results.features[i].attributes.起始里程
                        bimattributes.surroundRockGrade =  "围岩等级"             //results.features[i].attributes.围岩等级
                        bimattributes.workFace = "隧道名称workFace"                              //results.features[i].attributes.隧道名称
                        ar.push(bimattributes)
                }

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
         this.json2tree()
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
       this.json2tree()

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
    },

		getmodelinfo() {
			var that = this
			var br = []
			var cr = []
			for(let i = 0; i < this.modelinfos.length; i++){
	
					var info = {}
					var infobox = []
					infobox = this.modelinfos[i]
					info.name = infobox[6]
					info.size = infobox[7]
					br.push(info.name)
					cr.push(info.size)
			}
			var infoboxname = this.modelinfos[0]
			that.modelname = infoboxname[5]
			that.attributename = br
			that.attributesize = cr
			console.log("获取属性",that.attributename,that.attributesize,that.modelname)
		}
  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped="scoped" lang="scss">
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
		margin-top: 20px;
		border: 1px solid #03C4DBD1;
	}
	.box-titleee {
		width: 60%;
		background: #12374F;
		height: 38px;
		margin-top: 20px;
		border: 1px solid #03C4DBD1;
	}
	.box-bar {
		background: #303133;
		border: 1px solid #409EFF;
		margin-top: 15px;
		height: 352px;
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
		margin-left: 1%;
		width: 98%;
		font-size: 14px;
		color: #606266;
		height: 160px;
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
	.dialog-3{
		background: #333333;
	}
	.select1, .select2 {
		width: 48%;
	}
	.select2 {
		margin-left: 4%;
	}
	.searchinput {
		margin: 10px 0;
	}
	.search-result-list{
		width: 100%;
		background-color:transparent;
		border: 1px solid #FACD91C2;
		height: 138px;
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
	.serachtree{
		background-color: transparent;
		color: #eee;
		height: 600px;	
	}
	.serachtreebox{
		border: 1px solid #eee;
		height: 600px;
	}
	.pictree{
		background-color: transparent;
		color: #eee;
		height: 300px;
	}
	.el-tree-node.is-current.is-focusable{
		background-color: transparent;
		border: 1px solid #eee;
	}
	.grid-content{
		font-size: 4px;
	}

/*el-scrollbar 必须指定高度*/
.scrollInfoBox {
    height: 160px;
    width: 100%;
}
.scrolldevice-tree{
    height: 300px;
    width: 100%;
}
.scrollserachtree{
    height: 600px;
    width: 100%;
}
</style>

<style>
	
    /* 修改element-ui中table组件的样式 */

    .select1 .el-input__inner {
			background: transparent;
			color: #eee;
			border: 1px solid #eee;
		}

    .select2 .el-input__inner {
			background: transparent;
			color: #eee;
			border: 1px solid #eee;
		}

    .searchinput .el-input__inner {
			background: transparent;
			color: #eee;
			border: 1px solid #eee;
		}

		.dialog-3.dialog-drag .dialog-header{
			background-color: transparent;
			color: #eee;
		}

</style>

<style scoped>
.el-tree /deep/ .el-tree-node .el-tree-node__content{
  height: 40px;
  background: transparent;
  color: #efefef;
}
.el-tree /deep/ .is-current>.el-tree-node__content{
  color: orange !important;
}

.el-tree /deep/ .el-tree-node__children .el-tree-node__content{
  height:30px;
  background:transparent !important;
}

.el-select /deep/ .popper__arrow::after {
	border-bottom-color: #333333;
}

.el-select /deep/ .el-select-dropdown {
	border: 1px solid #409EFF !important;
	background: #333333 !important;
	z-index: 9999;
}

.el-select /deep/ .el-select-dropdown__item {
	color: #efefef !important;
	 z-index: 9999;
}

.el-select /deep/ .el-select-dropdown__item.selected span{
	color: orange !important;
	z-index: 9999;
}

.el-select /deep/ .el-select-dropdown__item.hover{
	 background-color: rgba(255, 255, 255, 0.06);
	 color: rgba(255, 255, 255, 0.80) !important;
	 z-index: 9999;
}

.el-select /deep/ .el-scrollbar__bar.is-vertical {
	width: 10px;
	top: 2px;
}


.el-scrollbar /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>