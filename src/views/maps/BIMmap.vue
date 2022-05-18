<template>
  <div>
    <div id="viewDiv" />
      <el-button type="primary" icon="el-icon-info" class="mapselect" @click="OpenbasemapGallery">
      </el-button>
      <el-button type="primary" icon="el-icon-circle-plus" class="mapselectt" @click="OpenregisterService">
      </el-button>
      <el-button type="primary" icon="el-icon-thumb" class="mapselecttt" @click="OpenshowLayer">
      </el-button>
      <el-button type="primary" icon="el-icon-news" class="mapselectttt" @click="Opencard">
      </el-button>
      <el-button type="primary" icon="el-icon-s-operation" class="mapselecttttt" @click="Openopcityslider">
      </el-button>
    <dialog-drag
      v-show="layerTreeVisible"
      id="dialog-1"
      class="dialog-3"
      title="BIM模型目录树"
      pinned="false"
      :options="{ top: 60, left: 90, width: 360, buttonPin: false }"
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
				<div class="serachtreebox">
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
				</div>
    </dialog-drag>

    <dialog-drag
      v-show="layerRegisterService"
      id="dialog-1"
      class="dialog-2"
      title="注册服务"
      pinned="false"
      :options="{ top: 90, left: 90, width: 320, buttonPin: false }"
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

    <dialog-drag
      v-show="layerCardService"
      id="dialog-1"
      class="dialog-3"
      title="超前地质勘探综合分析报告"
      pinned="false"
      :options="{ top: 120, left: 90, width: 360, buttonPin: false }"
      @close="closeCardService"
    >
				<div class="device-tree">
					<el-scrollbar class="scrolldevice-tree">
					<el-tree :data="pictree" class="pictree" :props="defaultProps"></el-tree>
					</el-scrollbar>
				</div>
    </dialog-drag>

	  <dialog-drag
      v-show="opcitysliderService"
      id="dialog-1"
      class="dialog-3"
      title="地图底图透明度滑块"
      pinned="false"
      :options="{ top: 330, left: 90, width: 360, buttonPin: false }"
      @close="closeopcitysliderService"
    >
    <el-slider class="opcityslider"
      v-model="opcityvalue"
      :max ="100"
      :format-tooltip="formatopcity"
			@input="changeopcityvalue">
    </el-slider>
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
              <div class="grid-content">模型名称：{{this.modelname || "小导管"}}</div>
            </el-col>
            <el-col class="info" :span="14">
              <div class="grid-content">{{ this.attributename[0] || "小导管规格" }}</div>
            </el-col>
            <el-col class="info" :span="10">
              <div class="grid-content">{{ this.attributesize[0]+this.attributeunit[0] || "BH1108" }}</div>
            </el-col>
            <el-col class="info" :span="14">
              <div class="grid-content">{{ this.attributename[1] || "小导管数量" }}</div>
            </el-col>
            <el-col class="info" :span="10">
              <div class="grid-content">{{ this.attributesize[1]+this.attributeunit[1] || "142" }}</div>
            </el-col>
            <el-col class="info" :span="14">
              <div class="grid-content">{{ this.attributename[2] || "小导管间距" }}</div>
            </el-col>
            <el-col class="info" :span="10">
              <div class="grid-content">{{ this.attributesize[2]+this.attributeunit[2] || "0.6m" }}</div>
            </el-col>
            <el-col class="info" :span="14">
              <div class="grid-content">{{ this.attributename[3] || "外插角" }}</div>
            </el-col>
            <el-col class="info" :span="10">
              <div class="grid-content">{{ this.attributesize[3]+this.attributeunit[3] || "45°" }}</div>
            </el-col>
            <el-col class="info" :span="14">
              <div class="grid-content">{{ this.attributename[4] || "注浆量" }}</div>
            </el-col>
            <el-col class="info" :span="10">
              <div class="grid-content">{{ this.attributesize[4]+this.attributeunit[4] || "1.47L" }}</div>
            </el-col>
            <el-col class="info" :span="14">
              <div class="grid-content">{{ this.attributename[5] || "注浆压力" }}</div>
            </el-col>
            <el-col class="info" :span="10">
              <div class="grid-content">{{ this.attributesize[5]+this.attributeunit[5] || "0.56pa" }}</div>
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
					<el-scrollbar style="height:220px;width:100%;">
          <el-table
						:data = "mergedata"
						border
            :cell-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
            class="search-result-list"
          >
            <el-table-column
              type="index"
              label="序号"
              width="40px"
							align="center"
            />
            <el-table-column
              label="工程结构"
							prop="instruct"
              width="50px"
							align="center"
            />
            <el-table-column
              label="工程部位"
							prop="position"
							align="center"
            />
            <el-table-column
              label="报警详情"
							prop="details"
							align="center"
            />
            <el-table-column
              label="推送人"
							prop="people"
							align="center"
            />
          </el-table>
					</el-scrollbar>
        </div>
				<el-card class="box-titleee">
					<dt class="title-font">施工模拟</dt>
				</el-card>
			<el-card class="box-bar">
				<div class="datetitle">日期滑块</div>
				<div class="sliderblock">
					<el-slider
						v-model="levelvalue"
						:max="levelmax"
						:format-tooltip="formatTooltip"
						@input="changeModel">
					</el-slider>
				</div>
				<div class="datefont">{{ this.startmonth }}</div>
				<div class="datefontt">{{ this.endmonth }}</div>
				<div class="datetitlee">日期选择</div>
				<div class="block">
					<el-date-picker
						size = "small"
						v-model="timepiker"
						type="monthrange"
						range-separator="至"
						start-placeholder="开始月份"
						end-placeholder="结束月份"
						format="yyyy年MM月"
						value-format="yyyy-MM"
						:clearable = false>
					</el-date-picker>
          <el-button size="small" type="primary" class="date-button" @click="pickmonth"
            >确认</el-button>
				</div>
			</el-card>
      </el-card>
    </div>

		<ModelInfoPage :modelSelectInfo ="modelInoForm" />
  </div>
</template>

<script>
import axios from 'axios'
import { loadModules } from 'esri-loader'
import WebScene from '@arcgis/core/WebScene'
import SceneView from '@arcgis/core/views/SceneView'
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
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
import { getoidByDate, getjsontree, getServer, uploadBIM ,getmodulinfo} from '@/api/bim.js'

import ModelInfoPage from "./components/model-info-page.vue"

export default {
  name: '',

  components: {
    DialogDrag,
		ModelInfoPage
  },

  props: {},

  data() {
    return {
      urlres:[],
      opcityvalue:80,
      sliderdate:null,
      serverUrls:[],
      basemapGallery:null,
      layerTreeVisible: false,
      layerRegisterService: false,
			layerCardService: false,
			opcitysliderService: false,
      levelvalue: 0,
			timepiker:['2021-12', '2022-05'],
			startmonth:'',
			endmonth:'',
      layerMap:null,
      webscene: null,
      view: null,
      highlight: null,
      level1value: '',
      level2value: '',
      level1option: [],
      level2option: [],
      filterText: '',
			levelmax: 100,
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
			attributeunit:[],
			modelname:'',
			mergedata:[{
				instruct:'喷射混凝土',
				position:'H3DK2+218-H3DK2+214',
				details:'实际喷射量超方160%',
				people:'总工：舒大勇、分管领导：吴海宇'
			},{
				instruct:'喷射混凝土',
				position:'H3DK2+202-H3DK2+201',
				details:'实际喷射量超方160%',
				people:'总工：舒大勇、分管领导：吴海宇'
			},{
				instruct:'喷射混凝土',
				position:'H3DK2+199-H3DK2+197',
				details:'实际喷射量超方170%',
				people:'总工：舒大勇、分管领导：吴海宇'
			}],
			modelInoForm: {
				title: '模型信息页',
				opened: false,
				modelInfo: {}
			}
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
		this.pickmonth()
  },

  mounted() {
    this.init()
  },

  methods: {
   async init() {
      // Load webscene and display it in a SceneView
      this.webscene = new WebScene({
        portalItem: {
            id: "1df07d93650e4b1892431e8e4a21ce31",//92c97bd4e91447d6b3319da22bfa9147
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
      let urlmap = new Map();
      await this.geturlServer();
      console.log(this.serverUrls);
      for(let i = 0;i < this.serverUrls.length;i++){
          const layerurl = this.serverUrls[i].url;
          urlmap.set(layerurl,new SceneLayer({
             url:layerurl,
             outFields: ["*"]
             }));
          let sceneLayer = urlmap.get(layerurl);
          this.webscene.layers.add(sceneLayer);

       }
       console.log("urlmap",urlmap)
       this.layerMap = urlmap; 
      // const layer = new SceneLayer({
      //     url:'https://portal.ehjedu.cn/server/rest/services/Hosted/c3%E5%8F%B7%E6%A8%AA%E6%B4%9E_%E5%B7%B2%E6%96%BD%E5%B7%A5_P2/SceneServer',
      //   // url:'https://portal.ehjedu.cn/server/rest/services/Hosted/c3%E5%8F%B7%E6%A8%AA%E6%B4%9E_%E5%B7%B2%E6%96%BD%E5%B7%A5_BG3F2Multipatch_v32/SceneServer',
      //   // renderer: typeRenderer,
      //   title: 'Renderer Scene Layer'
      // })
    
      // this.webscene.layers.add(layer)

      // wait until the webscene finished loading
      this.webscene.when(() => {
            // 过滤模型
            // const filterLayer = this.webscene.layers.getItemAt(0)
            // filterLayer.definitionExpression = 'Level < ' + this.levelvalue

              const layerlength = this.webscene.layers.length;
              // console.log("layerlength",layerlength)
              // for(let j = 0;j< layerlength;i++){
              //   const sceneLayer = this.webscene.layers.getItemAt(j)
              // }
        
              // console.log(sceneLayer)
            // console.log(sceneLayer.declaredClass + ', ' + sceneLayer.title)

            // get all attributes for the query
          
              this.view.popup.autoOpenEnabled = false;
              // retrieve the layer view of the scene layer
              this.view.on("immediate-click", (event) => {
                    // this.attributename = [];
                    // this.attributesize = [];
                    this.webscene.layers.forEach(async sceneLayer =>{
                        console.log(sceneLayer)
                                
                        await this.view.hitTest(event).then(async (hitTestResult) => {
                                if (hitTestResult.results.length > 0) {
                                      // if(hitTestResult.results[0].graphic.attributes.ebs){
                                            const modelAttributes = await hitTestResult.results[0].graphic.attributes;
                                            const filterLayer = await hitTestResult.results[0].graphic.layer;
                                            console.log("点击模型获取属性:" ,modelAttributes);
                                            this.modelInoForm.modelInfo = modelAttributes
                                            this.modelInoForm.opened = false;
                                            const ebs = modelAttributes.ebs;
                                            const objectId = modelAttributes.oid;
                                            //点击模型构件，高亮显示
                                            this.view.whenLayerView(filterLayer).then( filterSceneLayerView => {
                                                    this.highlightModel(filterSceneLayerView,objectId);      
                                            })

                                            console.log("这是ebs" , ebs)
                                            if(ebs){
                                                  this.modelinfos = await  getmodulinfo(ebs).then((res) => {
                                                          return  res.data;
                                                        })
                                                        .catch((error) => {
                                                          console.log(error);
                                                        });
                                                  //  console.log("点击模型获取构件施工信息",this.modelinfos);
                                                  this.getmodelinfo()
                                            }
                                      //  }
                                } 
                                return;
                                }).catch((error) => {
                                    console.error(error);
                                    });
                      
                    })
              });

       })
     
      // Add a layer list widget
      const layerList = new LayerList({
        view: this.view
      })

       this.basemapGallery  = new BasemapGallery({
              view: this.view,
              source: {
                portal: {
                  url: "https://www.arcgis.com",
                  useVectorBasemaps: true // Load vector tile basemaps
                }
              },
              visible: false
            });
       this.view.ui.add(this.basemapGallery,"bottom-left");
      // this.view.ui.empty("top-left");
      // this.view.ui.add(layerList, "top-right");
      //   setSliceWidget();

      // const legend = new Legend({
      //   view: this.view,
      // });

      // this.view.ui.add(legend, "top-right");
    },

    async geturlServer() {
       this.serverUrls = await getServer().then(res => {
          return res.data;
      }).catch(error => {
        console.log(error)
      })
    },
    //透明度
    changeopcityvalue(){
      const opcityv = this.opcityvalue / 100;
      if(this.webscene.basemap){
            const basemap = this.webscene.basemap.baseLayers.getItemAt(0);
            basemap.opacity = opcityv;
            console.log(opcityv,basemap)
      }
      return
        
    },
    // 滑块控制
     async changeModel() {

      this.formatTooltip(this.levelvalue)
      console.log(this.sliderdate,'123')
      let modeloid = await getoidByDate(this.sliderdate).then(res =>{
                        return res.data;
                      });           
       let newOidarray = this.array2combine(modeloid);
      

      newOidarray.forEach(item =>{
           let campusSceneLayer = this.layerMap.get(item.url); 
           let filteroid = item.oid.toString();
           filteroid = "(" + filteroid + ")"
           campusSceneLayer.definitionExpression = "oid in" + filteroid //"oid in (193,186)"
          //  this.view.whenLayerView(campusSceneLayer).then((sceneLayerView)=>{
          //       const filterSilderLayer = new FeatureFilter({
          //         where: "oid in" + filteroid
          //         //  where: "oid in (193,186)"
          //       })
          //       sceneLayerView.filter = filterSilderLayer;
          //   })
      })
      if(newOidarray.length < 1){

         console.log(this.urlres);
         this.urlres.forEach(item =>{
              let campusSceneLayer = this.layerMap.get(item); 
              campusSceneLayer.definitionExpression = "oid <10000" 
         }) 
      }

    },
    //合并数组对象中相同的属性值
    array2combine(arr){
        var res =[];
        var narr=[];
            for(var i =0;i<arr.length;i++){
                var n = res.indexOf(arr[i][0]);
                if(n == -1){
                    res.push(arr[i][0]);
                    this.urlres.indexOf(arr[i][0])  == -1 ? this.urlres.push(arr[i][0]) : '';
                    narr.push({"url":arr[i][0],oid:[arr[i][1]]})
                }else{
                    narr[n].oid.push(arr[i][1])
                }
            }
        return narr;
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
        //  console.log(list);
         //把子节点赋值给children
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
            return item.attributes.oid == bimKey
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
          campusSceneLayer.outFields = ['*']
            const result = await campusSceneLayerView.queryFeatures()
          if(result.features.length > 0){
                const tempfeature = result.features.find(item => {
                   return item.attributes.oid == bimKey
                })
                if(tempfeature && tempfeature.attributes.ebs){
                    const ebs = tempfeature.attributes.ebs.replace(/[\r\n]/g,"")
                    //  console.log("这是点击节点获取ebs", ebs)
                    return ebs
                }
          }
        })
    },
    // 双击节点
    async handleNodeClick(data, node, self) {
      console.log( this.layerMap);
      var selfthis = this
      const bimKey = data.bimKey
      const url = data.url
      if(url){
          let campusSceneLayer = this.layerMap.get(url);     //this.webscene.layers.getItemAt(0);
          campusSceneLayer.outFields = ['*']
      // 第一个异步 获取objectId queryExtent
          if (bimKey){
                const objectId = bimKey;
                const ebs = await this.getebs(campusSceneLayer, bimKey)
                if(ebs){
                    this.modelinfos = await  getmodulinfo(ebs).then((res) => {
                                return  res.data;
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                    console.log("点击目录树节点获取构件施工信息",this.modelinfos);
                    this.getmodelinfo()
                }
              //飞行放大
                const queryExtent = new Query({
                  objectIds: [objectId]
                })
                this.view.whenLayerView(campusSceneLayer).then(async (campusSceneLayerView) => {
                  const result = await campusSceneLayerView.queryExtent(queryExtent)
                  if (result.extent) {
                    selfthis.view.goTo(result.extent.expand(4), { speedFactor: 1.3 })
                      .catch((error) => {
                        if (error.name != 'AbortError') {
                          console.error(error)
                        }
                      })
                  }
                  this.highlightModel(campusSceneLayerView,objectId);
                })
          }
      }
      //点击目录树节点，获取构件施工信息，右上角card渲染

    },
    
    //highlight
    highlightModel(SceneLayerView,objectId){
        if (this.highlight) {
          this.highlight.remove()
        }
        this.highlight = SceneLayerView.highlight([objectId])
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
                        bimattributes.bimKey = results.features[i].attributes.oid
                        bimattributes.componentTypeName = "componentTypeName"
                        bimattributes.cycleType = "类型"
                        bimattributes.ebs = results.features[i].attributes.ebs.replace(/[\r\n]/g,"")
                        bimattributes.endSegment =  results.features[i].attributes.终止里程 ? results.features[i].attributes.终止里程.replace(/[\r\n]/g,"") : "空" ;
                        bimattributes.startSegment =   results.features[i].attributes.起始里程 ? results.features[i].attributes.起始里程.replace(/[\r\n]/g,"") : "空" ;
                        bimattributes.surroundRockGrade =  "围岩等级"             //results.features[i].attributes.围岩等级
                        bimattributes.workFace = "隧道名称workFace"                              //results.features[i].attributes.隧道名称
                        ar.push(bimattributes)
                }
          }
          var hash = {};
          that.registerInfo.components = ar.reduce(function(pre,item){
             hash[item.ebs] ? '' : hash[item.ebs] = true && pre.push(item);
             return pre;
          },[])
           uploadBIM(that.registerInfo)
          // console.log(that.registerInfo)
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
      } else if (command === 'card') {
        this.layerCardService = true
      }
    },
    OpenbasemapGallery(){
      this.basemapGallery.visible = ! this.basemapGallery.visible;
    },
		OpenregisterService(){
			this.layerRegisterService = !this.layerRegisterService
		},
		OpenshowLayer(){
        this.layerTreeVisible = !this.layerTreeVisible
         this.json2tree()
		},
		Opencard(){
			this.layerCardService = !this.layerCardService
		},
		Openopcityslider(){
			this.opcitysliderService = !this.opcitysliderService
		},
    // 关闭图层面板
    closeLayerTreePanel() {
      this.layerTreeVisible = false
    },
    closeRegisterService() {
      this.layerRegisterService = false
    },
    closeCardService() {
      this.layerCardService = false
    },
		closeopcitysliderService() {
			this.opcitysliderService = false
		},
    doRegisterService() {
      // console.log(this.registerInfo.url);
      this.submitRegisterService()
       this.json2tree()

      this.layerRegisterService = false
    },
		pickmonth(){
			if(this.timepiker != ''){
				console.log(this.timepiker)
				let month1, month2
				month1 = this.timepiker[0].split('-')
				month2 = this.timepiker[1].split('-')
				month1 = parseInt(month1[0]) * 12 + parseInt(month1[1])
				month2 = parseInt(month2[0]) * 12 + parseInt(month2[1])
				this.levelmax = Math.abs(month2 - month1);
				this.startmonth = this.timepiker[0]
				this.endmonth = this.timepiker[1]
			}
		},
    formatopcity(val){
        return val / 100;
    },
		formatTooltip(val) {
			if(this.timepiker != ''){
				let date = this.timepiker[1].split('-')
				let year = parseInt(date[0])
				let month = parseInt(date[1])
				// console.log(year,month,this.levelmax-val)
				if(month - ((this.levelmax-val) % 12) > 0){
					year = year - Math.floor((this.levelmax-val)/12)
					month = month - ((this.levelmax-val) % 12)
				}
				else if(month - ((this.levelmax-val) % 12) < 0){
					year = year - Math.floor((this.levelmax-val)/12) - 1
					month = (month + 12) - ((this.levelmax-val) % 12)
				}
				else if(month - ((this.levelmax-val) % 12) == 0){
					year = year - Math.floor((this.levelmax-val)/12) - 1
					month = 12
				}
				// console.log(val,year,month)
        
        if(month < 10){
           this.sliderdate = year + '-0' + month + '-25';
        }else{
           this.sliderdate = year + '-' + month + '-25';
        }
				return year + '-' + month
			}
		},
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'background-color: rgba(255,255,255,0.29); color: #000;font-weight: 500;border: 1px solid #FACD91C2;'
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
			var dr = []
				console.log(this.modelinfos,'1234566')
			for(let i = 0; i < this.modelinfos.length; i++){
					var info = {}
					var infobox = []
					infobox = this.modelinfos[i]
					info.name = infobox[6]
					info.size = infobox[8]
					info.unit = infobox[13]
					br.push(info.name)
					cr.push(info.size)
					dr.push(info.unit)
			}
			for(let i = this.modelinfos.length; i < 6; i++){
					var info = {}
					var infobox = []
					infobox = this.modelinfos[i]
					info.name = '-'
					info.size = '-'
					info.unit = '-'
					br.push(info.name)
					cr.push(info.size)
					dr.push(info.unit)
			}
			var infoboxname = this.modelinfos[0]
			that.modelname = infoboxname[5]
			that.attributename = br
			that.attributesize = cr
			that.attributeunit = dr
			// console.log("获取属性",that.attributename,that.attributesize,that.attributeunit,that.modelname)
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
  .opcityslider{
    	left: 5%;
		top: 20px;
		width: 90%;
     	position: absolute;
		z-index: 991;
  }
	.mapselect {
		background: #333333;
		top: 14%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.mapselectt {
		background: #333333;
		top: 19%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.mapselecttt {
		background: #333333;
		top: 24%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.mapselectttt {
		background: #333333;
		top: 29%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.mapselecttttt {
		background: #333333;
		top: 34%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.sliderblock {
		margin-left: 5%;
		width: 90%;
	}
	.block {
		margin-left: 5%;
		margin-top: 5%;
	}
	.datefont {
		font-size: 2px;
		z-index: 9999;
		color: #F2F2F2;
		width: 20%;
	}
	.datefontt {
		font-size: 2px;
		z-index: 9999;
		color: #F2F2F2;
		margin-left: 90%;
		margin-top: -14px;
		width: 20%;
	}
	.datetitle {
		font-size: 13px;
		z-index: 9999;
		color: #F2F2F2;
		font-weight: bold;
	}
	.datetitlee {
		font-size: 13px;
		margin-top: 5%;
		z-index: 9999;
		color: #F2F2F2;
		font-weight: bold;
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
		height: 30px;
		border: 1px solid #03C4DBD1;
	}
	.box-titlee {
		width: 40%;
		background: #12374F;
		height: 30px;
		margin-top: 15px;
		border: 1px solid #03C4DBD1;
	}
	.box-titleee {
		width: 40%;
		background: #12374F;
		height: 30px;
		margin-top: 25px;
		border: 1px solid #03C4DBD1;
	}
	.box-bar {
		background: #303133;
		border: 1px solid #409EFF;
		margin-top: 15px;
		height: 200px;
	}
	.title-font {
    font-size: 13px;
    font-weight: bold;
		margin-top: -12px;
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
		background-color:transparent;
		color: #000;
		height: 220px;
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
		font-size: 2px;
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
    height: 250px;
    width: 100%;
}
.scrollserachtree{
    height: 600px;
    width: 100%;
}

</style>

<style>
.esri-ui-top-left{
   display: none;
}
.esri-ui .esri-attribution {
  display: none;
}
	
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
/* 使表格背景透明 */
.el-table th, .el-table tr {
 background-color: transparent;
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

 .table-wrapper /deep/ .el-table--fit{
        padding: 20px;
}
 .table-wrapper /deep/  .el-table, .el-table__expanded-cell {
    background-color: transparent;
}

 .table-wrapper /deep/ .el-table tr {
    background-color: transparent!important;
}
 .table-wrapper /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
    background-color: transparent;
}

.el-table::before {
	 left: 0;
	 bottom: 0;
	 width: 100%;
	 height: 0px;
}
</style>