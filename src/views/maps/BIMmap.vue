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
      <el-button type="primary" icon="el-icon-view" class="mapselecttttt" @click="Openopcityslider">
      </el-button>
			<el-button type="primary" icon="el-icon-s-operation" class="mapselectttttt" @click="Openslice">
      </el-button>
			<el-button type="primary" icon="el-icon-sunny" class="mapselecttttttt" @click="Opendaylight">
			</el-button>
		<div class="logo">
			<img :src="logoSrc" width="10%" height="10%" alt="" />
			<div class="logo-title">中国交通建设集团</div>
		</div>
		<div class="date">{{dateFormat(date)}}</div>
		<div class="time">{{timeFormat(date)}}</div>
		<div class="week">{{weekFormat(date)}}</div>
			<div class="center-title">CZSCZQ-13B标隧道施工数字孪生</div>
			<div><el-link class="text-button" target="_blank">隧道掘进</el-link></div>
			<div><el-link  class="text-buttonn" target="_blank" href="https://portal.ehjedu.cn/czbusiness">后台管理</el-link></div>
			<el-image
				class="banner"
				:src="imgSrc">
			</el-image>

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
      class="dialog-3"
      title="注册服务"
      :options="{ top: 60, left: 70, width: 320, buttonPin: false, pinned: true }"
      @close="closeRegisterService"
    >
      <el-input
        v-model="registerInfo.name"
        size="medium"
        class="searchinput"
        autosize
        placeholder="name"
      />
      <el-input
        v-model="registerInfo.url"
        size="medium"
        class="searchinput"
        autosize
        placeholder="url"
      />
      <el-input
        v-model="registerInfo.version"
        size="medium"
        class="searchinput"
        autosize
        placeholder="version"
      />
      <el-row>
        <el-col class="button-group">
          <el-button
            size="medium"
						style="background:transparent;color:#fff"
            @click="doRegisterService"
          >确认</el-button>
          <el-button
            size="medium"
            style="background:transparent;color:#fff"
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
					<el-tree
					:data="urltree" class="pictree" 
					:props="defaultProps"
					node-key="id"
					:default-expanded-keys="urltreeexpand"
					@node-click="gotourl">
					</el-tree>
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
      :min ='1'
      :max ="100"
      :format-tooltip="formatopcity"
			@input="changeopcityvalue">
    </el-slider>
    </dialog-drag>

	<div id="menu" class="esri-widget" v-show="isShow">
		<div id="sliceContainer"></div>
		<div id="sliceOptions">
			<button
				class="esri-button esri-button--secondary"
				id="resetPlaneBtn"
				type="button"
				title="Reset slice plane"
			>
				重置切片
			</button>
			<button
				class="esri-button esri-button--secondary"
				id="clearPlaneBtn"
				type="button"
				title="Clear slice plane"
			>
				清除切片
			</button>
		</div>
	</div>

    <div>
      <el-card class="box-card">
				<el-image
				:src="titleSrc">				
				</el-image>
				<div class="title-font">构件施工信息</div>
        <div class="msg">
					<el-scrollbar class="scrollInfoBox">
					<el-table
						:data = "modelinforef"
						:show-header="false"
						:cell-style="tableRowStyle"
						class="search-result-list"
          >
            <el-table-column
              label="工程结构"
							prop="name"
							align="center"
            />
            <el-table-column
              label="工程结构"
							prop="size"
							align="center"
            />
					</el-table>
					</el-scrollbar>
        </div>
				<div class="pic">
				<el-image
				:src="titleSrc">				
				</el-image>
				</div>
        <div class="title-font">预警统计</div>
        <div class="merge-button-group">
          <el-button type="primary" size="small" round plain class="merge-button" :style="button1" @click="clicktoday">今日</el-button>
          <el-button type="primary" size="small" round plain class="merge-button" :style="button2" @click="clickyesterday">昨日</el-button>
          <el-button type="primary" size="small" round plain class="merge-button" :style="button3" @click="clicklastweek">近七日</el-button>
        </div>
        <div class="type-button-group">
          <el-button type="primary" size="mini" round plain class="type-button" :style="button4" @click="click01">初支开挖</el-button>
          <el-button type="primary" size="mini" round plain class="type-button" :style="button5" @click="click02">仰拱</el-button>
        </div>
        <div class="type-button-groupp">
          <el-button type="primary" size="mini" round plain class="type-button" :style="button6" @click="click03">二衬</el-button>
          <el-button type="primary" size="mini" round plain class="type-button" :style="button7" @click="click04">防、排水</el-button>
        </div>
        <div class="msgg">
					<el-scrollbar style="height:220px;width:100%;">
          <el-table
						:data = "mergeselectdata"
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
							prop="componentTypeName"
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
							prop="warningInfo"
							align="center"
            />
            <el-table-column
              label="推送人"
							prop="manageMember"
							align="center"
            />
          </el-table>
					</el-scrollbar>
        </div>
				<div class="pic">
				<el-image
				:src="titleSrc">
				</el-image>
				</div>
					<div class="title-font">施工模拟</div>
				<el-image
				:src="dataSrc">
				</el-image>
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
import Daylight from "@arcgis/core/widgets/Daylight";
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
import { getoidByDate, getjsontree, getServer, uploadBIM, getmodulinfo, getpageQuery, getwarninfoQuery, getreportQuery} from '@/api/bim.js'

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
			button1: '',
			button2: '',
			button3: '',
			button4: '',
			button5: '',
			button6: '',
			button7: '',
      urlres:[],
      opcityvalue:80,
      sliderdate:null,
      serverUrls:[],
			isShow:false,
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
			urltreeexpand: [],
      featuresArray: [],
			reportarr:[],
			urltree:[],
      modelinfos: [],
			attributename:[],
			attributesize:[],
			attributeunit:[],
			attrirefname:[],
			attrirefsize:[],
			attrirefunit:[],
			atbarr: [],
			modelinforef:[{"name":"模型名称","size":"小导管"},{"name":"小导管规格","size":"BH1108"},
			{"name":"小导管数量","size":"142"},{"name":"小导管间距","size":"0.6m"},
			{"name":"外插角","size":"45°"},{"name":"注浆量","size":"1.47L"},{"name":"注浆压力","size":"0.56pa"}],
			modelname:'',
			mergedata:[],
			mergeselectdata:[],
			daymergeselectdata:[],
			regionmergeselectdata:[],
			modelInoForm: {
				title: '模型信息页',
				opened: false,
				modelInfo: {},
				posx : '',
				posy : '',
			},
			mergeday: '',
			mergeregion: '',
			typeRenderer:{},
			scolor:'#EE2C0E',
        imgSrc:require('../../assets/images/banner.png'),
				logoSrc:require('../../assets/images/logo.png'),
				titleSrc:require('../../assets/images/title.png'),
				dataSrc:require('../../assets/images/data.png'),
				date: new Date(),
    }
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    mergeday() {
			this.getmergedata()
    },
		mergeregion() {
			this.getmergedata()
		},
  },

  created() {
    this.json2tree()
		this.pickmonth()
		this.getwarninfo()
		this.geturltree()
  },

  mounted() {
    this.init()
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

  methods: {
   async init() {
      // Load webscene and display it in a SceneView
      this.webscene = new WebScene({
        portalItem: {
            id: "1df07d93650e4b1892431e8e4a21ce31",
            portal: 'http://portal.ehjedu.cn/arcgis'
        }
      })
			var _this = this
				document.addEventListener('click',function(e){
          _this.modelInoForm.posx = e.pageX
          _this.modelInoForm.posy = e.pageY
					// console.log(e)
        })
      this.view = new SceneView({
        container: 'viewDiv',
        map: this.webscene,
        qualityProfile: 'high',
        environment: {
          lighting: {
			//  date: new Date(),
            directShadowsEnabled: true,
            ambientOcclusionEnabled: true
          },   
		  atmosphere: {
			 quality: "high"
		  },
        },
        // by default the highlight color is set to cyan
        highlightOptions: {
          haloColor: [255, 38, 150],
          color: [255, 255, 255],
          fillOpacity: 0.3
        }
      })

      this.typeRenderer = {
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
                  material: { color: this.scolor, colorMixMode: 'replace' }
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
      // console.log(this.serverUrls);
      for(let i = 0;i < this.serverUrls.length;i++){
          const layerurl = this.serverUrls[i].url;
          urlmap.set(layerurl,new SceneLayer({
             url:layerurl,
             outFields: ["*"]
             }));
          let sceneLayer = urlmap.get(layerurl);
          this.webscene.layers.add(sceneLayer);

       }
      //  console.log("urlmap",urlmap)
       this.layerMap = urlmap; 
       
	   //剖切功能
	    const excludedLayers = [];
        const resetPlaneBtn = document.getElementById("resetPlaneBtn");
        const clearPlaneBtn = document.getElementById("clearPlaneBtn");
        const sliceOptions = document.getElementById("sliceOptions");
		const plane = new SlicePlane({
				position: {
					latitude: 30.729167,
					longitude: 98.980556,
					z: 3133 
				},
				tilt: 32.62,
				width: 140,
				height: 29,
				heading: 90
			});



		let sliceWidget = null;
		sliceWidget = new Slice({
							view: this.view, 
							container: "sliceContainer"
					});
		this.view.ui.add('menu',"bottom-left");

        resetPlaneBtn.addEventListener("click", () => {
		    sliceWidget.viewModel.tiltEnabled = true;
			sliceWidget.viewModel.shape = plane;
        });
		clearPlaneBtn.addEventListener("click", () => {
          sliceWidget.viewModel.clear();
        });

      // const layer = new SceneLayer({
      //     url:'https://portal.ehjedu.cn/server/rest/services/Hosted/c3%E5%8F%B7%E6%A8%AA%E6%B4%9E_%E5%B7%B2%E6%96%BD%E5%B7%A5_P2/SceneServer',
      //   // url:'https://portal.ehjedu.cn/server/rest/services/Hosted/c3%E5%8F%B7%E6%A8%AA%E6%B4%9E_%E5%B7%B2%E6%96%BD%E5%B7%A5_BG3F2Multipatch_v32/SceneServer',
      //   // renderer: typeRenderer,
      //   title: 'Renderer Scene Layer'
      // })
    
      // this.webscene.layers.add(layer)

      // wait until the webscene finished loading
      this.webscene.when(() => {


              const layerlength = this.webscene.layers.length;
              this.view.popup.autoOpenEnabled = false;
              // retrieve the layer view of the scene layer
              this.view.on("immediate-click", (event) => {
           	          this.modelInoForm.opened = false;
                    this.webscene.layers.forEach(async sceneLayer =>{
                        // console.log(sceneLayer)
                                
                        await this.view.hitTest(event).then(async (hitTestResult) => {
												
                                if (hitTestResult.results.length > 0) {
                                            const modelAttributes = await hitTestResult.results[0].graphic.attributes;
                                            const filterLayer = await hitTestResult.results[0].graphic.layer;
                                            console.log("点击模型获取属性:" ,modelAttributes);
                                            this.modelInoForm.modelInfo = modelAttributes
                                            const ebs = modelAttributes.ebs;
																					  this.modelInoForm.opened = false;
                                            const objectId = modelAttributes.oid;
                                            //点击模型构件，高亮显示
                                            this.view.whenLayerView(filterLayer).then( filterSceneLayerView => {
                                                    this.highlightModel(filterSceneLayerView,objectId);      
                                            })
                                            // console.log("这是ebs" , ebs)
                                            if(ebs){
                                                  this.modelinfos = await  getmodulinfo(ebs).then((res) => {
                                                          return  res.data;
                                                        })
                                                        .catch((error) => {
                                                          console.log(error);
                                                        });
                                                  //  console.log("点击模型获取构件施工信息",this.modelinfos);
                                                  // this.getmodelinfo()
																									this.getmodelrefinfo(ebs.replace(/[\r\n]/g,""))
                                            }
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

	//    日光

      this.daylightWidget = new Daylight({
		   view: this.view,
		   playSpeedMultiplier: 2,
		   visibleElements: {
             timezone: false
           },
		   visible: false
	  })
	  this.view.ui.add(this.daylightWidget,"bottom-left");

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
      // console.log(this.sliderdate,'123')
      let modeloid = await getoidByDate(this.sliderdate).then(res =>{
                        return res.data;
                      });  
      if(modeloid.length >0) {                  
         this.array2combine(modeloid);
        
          modeloid.forEach(item =>{
              let campusSceneLayer = this.layerMap.get(item.url); 
              let filteroid = item.bimKeys.toString();
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
          // console.log(modeloid);
      }else{            
            // console.log(this.urlres);
            this.urlres.forEach(item =>{
                  let campusSceneLayer = this.layerMap.get(item); 
                  campusSceneLayer.definitionExpression = "oid <100000" 
            }) 
      }

    },
    //合并数组对象中相同的属性值
    array2combine(arr){
            for(var i =0;i<arr.length;i++){
                this.urlres.indexOf(arr[i].url)  == -1 ? this.urlres.push(arr[i].url) : '';
            }
    },
    // BIM目录树
    // json节点生成tree
    json2tree() {
      getjsontree().then((res) => {
        const nodelist = res.data
        nodelist.sort((a,b) =>{
          var val1 = a.level == 9 ? a.name.slice(6,11) : "";
          var val2 = b.level == 9 ? b.name.slice(6,11) : "";
          return val1 -val2;

        })
     
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
    // 双击节点
    async handleNodeClick(data, node, self) {
      // console.log( this.layerMap);
      var selfthis = this
      const bimKey = data.bimKey
      const url = data.url
      if(url){
          let campusSceneLayer = this.layerMap.get(url);     //this.webscene.layers.getItemAt(0);
          // campusSceneLayer.outFields = ['*']
      // 第一个异步 获取objectId queryExtent
          if (bimKey){
                const objectId = bimKey;
                const ebs =  data.ebs;   
                if(ebs){
                    this.modelinfos = await  getmodulinfo(ebs).then((res) => {
                                return  res.data;
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                    // console.log("点击目录树节点获取构件施工信息",this.modelinfos);
                    // this.getmodelinfo()
										this.getmodelrefinfo(ebs.replace(/[\r\n]/g,""))
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
			this.layerRegisterService = false
			this.layerTreeVisible = false
			this.layerCardService  = false
			this.opcitysliderService = false
			this.isShow = false
			this.daylightWidget.visible = false
      this.basemapGallery.visible = ! this.basemapGallery.visible;
    },
		OpenregisterService(){
			this.basemapGallery.visible = false
			this.layerTreeVisible = false
			this.layerCardService  = false
			this.opcitysliderService = false
			this.isShow = false
			this.daylightWidget.visible = false
			this.layerRegisterService = !this.layerRegisterService
		},
		OpenshowLayer(){
			this.basemapGallery.visible = false
			this.layerRegisterService = false
			this.layerCardService  = false
			this.opcitysliderService = false
			this.isShow = false
			this.daylightWidget.visible = false
			this.layerTreeVisible = !this.layerTreeVisible
			this.json2tree()
		},
		Opencard(){
			this.basemapGallery.visible = false
			this.layerRegisterService = false
			this.layerTreeVisible = false
			this.opcitysliderService = false
			this.isShow = false
			this.daylightWidget.visible = false
			this.layerCardService = !this.layerCardService
		},
		Openopcityslider(){
			this.basemapGallery.visible = false
			this.layerRegisterService = false
			this.layerTreeVisible = false
			this.layerCardService  = false
			this.isShow = false
			this.daylightWidget.visible = false
			this.opcitysliderService = !this.opcitysliderService
		},
		Openslice(){
			this.basemapGallery.visible = false
			this.layerRegisterService = false
			this.layerTreeVisible = false
			this.layerCardService  = false
			this.opcitysliderService = false
			this.daylightWidget.visible = false
			this.isShow = !this.isShow;
		},
		Opendaylight(){
			this.basemapGallery.visible = false
			this.layerRegisterService = false
			this.layerTreeVisible = false
			this.layerCardService  = false
			this.opcitysliderService = false
			this.isShow = false
			this.daylightWidget.visible = !this.daylightWidget.visible
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
				// console.log(this.timepiker)
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
      return 'background-color: rgba(255,255,255,0.29); color: #000;font-weight: 500;border: 1px solid #1E90FF60;'
    },

    // 修改table tr行的背景色
    tableRowStyles({ row, rowIndex }) {
      return 'background-color: rgba(255,255,255,0); color: #000;font-weight: 500;border: 1px solid #1E90FF60;'
    },

    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return ' background-color:rgba(129,211,248,0.23); color: #000;font-weight: 500;border: 1px solid #1E90FF60;'
      }
    },

		getmodelinfo() {
			var that = this
			var br = []
			var cr = []
			var dr = []
				// console.log(this.modelinfos,'1234566')
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
		},

		async	getmodelrefinfo(ebsstr) {
			this.atbarr = []
			this.modelinforef = []
			let partname = ['测量队', '实验室', '工程部', '质检部']
			for(let i = 0; i < partname.length; i++){
				await	getpageQuery(partname[i], true, ebsstr,'modifyDate', 1, 10).then(res=> {
					for (let j = 0; j < res.data.length; j++) {
						this.atbarr.push(res.data[j])
					}
				})
			}
			// console.log(this.atbarr)
			let modelname = {"name":"模型名称","size":this.atbarr[0].modelType}
			let startSegment = {"name":"起始里程","size":this.atbarr[0].startSegment}
			let endSegment = {"name":"终止里程","size":this.atbarr[0].endSegment}
			this.modelinforef.push(modelname, startSegment, endSegment)
			for(let k = 0; k < this.atbarr.length; k++) {
				if(this.atbarr[k].value == null){
					let modelinfoatr = {"name":this.atbarr[k].name,"size":"未填写"}
					this.modelinforef.push(modelinfoatr)
				} else {
					let modelinfoatr = {"name":this.atbarr[k].name,"size":this.atbarr[k].value+this.atbarr[k].unit}
					this.modelinforef.push(modelinfoatr)
				}
			}
			// console.log(this.modelinforef)
		},
		gotourl(data,node){
			if(data.id.substring(0,2) == '03'){
				// console.log(data.id.substring(0,2));
				window.open(data.url, '_blank')
			}
		},

		async getwarninfo() {
			await getwarninfoQuery(false,'', "modifyDate", 1, 9999999).then(res => {
				this.mergedata = res.data.map(item =>{
					item.people = '总工：舒大勇、分管领导：吴海宇'
					item.position = item.startSegment + '-' + item.endSegment
					var date = new Date(item.createDate).toJSON();
					item.modifyCreatDate = new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
					return item;
				})
				this.mergeselectdata = this.mergedata
				// console.log(this.mergeselectdata)
			}).catch(err =>{
				console.log(err);
			})
		},

      todaymerge(){
				this.daymergeselectdata = this.mergedata
        function num(i){
          return i <10?'0'+i:i;
        }
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();        
        let nowtime = "";
        nowtime = year + "-" + num(month) + "-" + num(date);
        // console.log(nowtime);
        this.daymergeselectdata = this.mergedata.filter(item => item.modifyDate.substring(0,10) == nowtime)
      },

      yesterdaymerge(){
				this.daymergeselectdata = this.mergedata
        let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
        let yesdaytime = new Date(time); 
        yesdaytime = yesdaytime.getFullYear() + "-" + (yesdaytime.getMonth()> 9 ? (yesdaytime.getMonth() + 1) : "0" + (yesdaytime.getMonth() + 1)) + "-" +
        (yesdaytime.getDate()> 9 ? (yesdaytime.getDate()) : "0" + (yesdaytime.getDate()));
        // console.log(yesdaytime);
        this.daymergeselectdata = this.mergedata.filter(item => item.modifyDate.substring(0,10) == yesdaytime)
      },

      lastweekmerge(){
				this.daymergeselectdata = []
        function num(i){
          return i <10?'0'+i:i;
        }
        let lastweekdays = [];
        let lastweek = new Date();
        for(let i=0; i<=24*6;i+=24){	
          let dateItem=new Date(lastweek.getTime() - i * 60 * 60 * 1000);
          let year = dateItem.getFullYear();	
          let month = dateItem.getMonth() + 1;	
          let date= dateItem.getDate();	
          let weektime = "";
          weektime = year + "-" + num(month) + "-" + num(date);
          lastweekdays.push(weektime);	
        }
        // console.log('最近七天日期：',lastweekdays);
        for(let i = 0; i < lastweekdays.length; i++){
					for(let j = 0; j < this.mergedata.length; j++){
						if(this.mergedata[j].modifyDate.substring(0,10) == lastweekdays[i]){
							this.daymergeselectdata.push(this.mergedata[j])
						}
					}
				}
      },

			daymerge(day){
				if(day == ''){
					this.daymergeselectdata = this.mergedata
				}
				else if(day == 'today'){
					this.todaymerge()
				}
				else if(day == 'yesterday'){
					this.yesterdaymerge()
				}
				else if(day == 'lastweek'){
					this.lastweekmerge()
				}
			},

			regionmerge(code) {
				this.regionmergeselectdata = []
				// console.log(code)
				if(code == ''){
					this.regionmergeselectdata = this.mergedata
				}else{
					for(let i = 0; i < this.mergedata.length; i++){
						if(this.mergedata[i].ebs.substring(19,21) == code){
							this.regionmergeselectdata.push(this.mergedata[i])
						}
					}
				}
			},

			getmergedata(){
				this.mergeselectdata = this.mergedata
				this.daymerge(this.mergeday)
				this.regionmerge(this.mergeregion)
				// console.log(this.regionmergeselectdata)
				this.mergeselectdata = this.daymergeselectdata.filter(item=>this.regionmergeselectdata.includes(item))
				if(this.mergeday == 'today'){
					this.button1 = 'background:#409EFF';
					this.button2 = '';
					this.button3 = '';
				}else if(this.mergeday == "yesterday"){
					this.button1 = '';
					this.button2 = 'background:#409EFF';
					this.button3 = '';
				}else if(this.mergeday == "lastweek"){
					this.button1 = '';
					this.button2 = '';
					this.button3 = 'background:#409EFF';
				}
				if(this.mergeregion == "01"){
					this.button4 = 'background:#409EFF';
					this.button5 = '';
					this.button6 = '';
					this.button7 = '';
				}else if(this.mergeregion == "02"){
					this.button4 = '';
					this.button5 = 'background:#409EFF';
					this.button6 = '';
					this.button7 = '';
				}else if(this.mergeregion == "03"){
					this.button4 = '';
					this.button5 = '';
					this.button6 = 'background:#409EFF';
					this.button7 = '';
				}else if(this.mergeregion == "04"){
					this.button4 = '';
					this.button5 = '';
					this.button6 = '';
					this.button7 = 'background:#409EFF';	
				}

			},
			buttontoblur(evt){
				let target = evt.target;
				if(target.nodeName == "SPAN"){
					target = evt.target.parentNode;
				}
				// console.log(target.nodeName)
				target.blur();
			},
			clicktoday(evt){
				this.buttontoblur(evt)
				if(this.mergeday == "today"){
					this.mergeday = "";
					this.button1 = ''
				}else{
					this.mergeday = "today";
				}
			},
			clickyesterday(evt){
				this.buttontoblur(evt)
				if(this.mergeday == "yesterday"){
					this.mergeday = "";
					this.button2 = ''
				}else{
					this.mergeday = "yesterday";
				}
			},
			clicklastweek(evt){
				this.buttontoblur(evt)
				if(this.mergeday == "lastweek"){
					this.mergeday = "";
					this.button3 = ''
				}else{
					this.mergeday = "lastweek";
				}
			},
			click01(evt){
				this.buttontoblur(evt)
				if(this.mergeregion == "01"){
					this.mergeregion = "";
					this.button4 = ''
				}else{
					this.mergeregion = "01";
				}
			},

			click02(evt){
				this.buttontoblur(evt)
				if(this.mergeregion == "02"){
					this.mergeregion = "";
					this.button5 = ''
				}else{
					this.mergeregion = "02";
				}
			},
			click03(evt){
				this.buttontoblur(evt)
				if(this.mergeregion == "03"){
					this.mergeregion = "";
					this.button6 = ''
				}else{
					this.mergeregion = "03";
				}
			},
			click04(evt){
				this.buttontoblur(evt)
				if(this.mergeregion == "04"){
					this.mergeregion = "";
					this.button7 = ''
				}else{
					this.mergeregion = "04";
				}
			},
			async geturltree(){
				await getreportQuery(1,9999,true,'modifyDate').then(res => {
					this.reportarr = res.data
					// console.log(this.reportarr)
				}).catch(err =>{
					console.log(err);
				})
				let datainfo = {}
				this.reportarr.forEach((item, index) => {
					let {locationName} =item;
					if(!datainfo[locationName]) {
						datainfo[locationName] = {
							'name':locationName,
							'id':'01' + locationName,
							children: []
						}
					}
				})
				this.urltree = Object.values(datainfo);

				this.reportarr.forEach(item => {
					for(let i = 0; i< this.urltree.length; i++ ){
						if(this.urltree[i].name == item.locationName){
							this.urltree[i].children.push({'name':item.typeName,'id':'02' + item.typeName,children:[]})
						}
					}
				})
				
				for(let i = 0; i< this.urltree.length; i++ ){
					let obj = {};
					this.urltree[i].children = this.urltree[i].children.reduce(function (item, next) {
						obj[next.name] ? '' : obj[next.name] = true && item.push(next);
						return item;
						}, []);
						this.urltreeexpand.push('01' + this.urltree[i].name)
						// console.log(this.urltreeexpand)
				}

				this.reportarr.forEach(item =>{
					for(let i = 0; i< this.urltree.length; i++ ){
								if(this.urltree[i].name == item.locationName){
									for(let j = 0; j< this.urltree[i].children.length; j++ )
									if(this.urltree[i].children[j].name == item.typeName)
										this.urltree[i].children[j].children.push({'name':item.reportName,'id':'03' + item.reportName,'url':item.link})
								}
					}
				})
			},
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

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped="scoped" lang="scss">
	#viewDiv {
		height: calc(100vh);;
	}
	.mainMenu {
		left: 80px;
		top: 10px;
		position: absolute;
		z-index: 991;
	}
//剖切
      #menu {
        padding: 0.8em;
        min-width: 240px;
	    // left: 80px;
		// top: 10px;
	    position: absolute;
		z-index: 991;
      }

      #sliceContainer {
        // width: inherit;
		    padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }

      #sliceOptions {
        margin: 0 15px;
      }

      #sliceOptions>button {
        margin-bottom: 15px;
      }

      #sliceContainer {
        max-width: 228px;
      }
//
  .opcityslider{
		left: 5%;
		top: 20px;
		width: 90%;
		position: absolute;
		z-index: 991;
  }
	.mapselect {
		background: #333333;
		top: 7%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.mapselectt {
		background: #333333;
		top: 11%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.mapselecttt {
		background: #333333;
		top: 15%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.mapselectttt {
		background: #333333;
		top: 19%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.mapselecttttt {
		background: #333333;
		top: 23%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
  .mapselectttttt {
		background: #333333;
		top: 27%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.mapselecttttttt {
		background: #333333;
		top: 31%;
		margin: 1%;
		position: absolute;
		z-index: 991;
		border: 1px solid #333333;
	}
	.logo {
		top: 5px;
		left: 15px;
		z-index: 21;
		position: absolute;
	}
	.logo-title {
		position: absolute;
    font-size: 18px;
		z-index: 21;
    font-weight: bold;
		color:#efefef;
    left: 30%;
    top: 6px;
    transform: translateX(-50%);
	}
  .center-title {
    position: absolute;
    font-size: 32px;
		z-index: 21;
    font-weight: bold;
		color:#efefef;
    left: 50%;
    top: 8px;
    transform: translateX(-50%);
  }
	.text-button{
		position: absolute;
		z-index: 21;
		left: 89%;
		top: 14px;
		font-weight: bold;
		color:#efefef;
	}
	.text-buttonn{
		position: absolute;
		z-index: 21;
		left: 94%;
		top: 14px;
		font-weight: bold;
		color:#efefef;
	}
	.banner{
		position: absolute;
		z-index: 20;
		width: 100%;
		top: 0%;
	}
	.sliderblock {
		margin-left: 5%;
		width: 80%;
		margin-top: -195px;
		position: absolute;
	}
	.block {
		position: absolute;
		z-index: 9999;
		width: 90%;
		margin-left: 2.5%;
		margin-top: -70px;
	}
	.datefont {
		z-index: 999;
		position: absolute;
		margin-top: -150px;
		margin-left: 10px;
		font-size: 2px;
		color: #F2F2F2;
		width: 20%;
	}
	.datefontt {
		z-index: 999;
		position: absolute;
		margin-top: -150px;
		margin-left: 78%;
		font-size: 2px;
		color: #F2F2F2;
		width: 20%;
	}
	.datetitle {
		font-size: 13px;
		z-index: 9999;
		color: #F2F2F2;
		font-weight: bold;
		margin-top: -210px;
		margin-left: 10px;
		position: absolute;
	}
	.datetitlee {
		position: absolute;
		z-index: 9999;
		font-size: 15px;
		margin-top: -110px;
		margin-left: 10px;
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
		background: #02233900;
		background-image: linear-gradient(to right,#00BFFF10,#4682B450,#00BFFF10);
		border: 0px solid #4B9696;
		top: 9%;
		right: 5px;
		height: 85%;
  }
	.pic{
		margin-top: 5%;
	}
	// .box-title {
	// 	width: 40%;
	// 	background: #12374F;
	// 	height: 30px;
	// 	border: 1px solid #03C4DBD1;
	// }
	.box-bar {
		background: #303133;
		border: 1px solid #409EFF;
		height: 200px;
	}
	.title-font {
		position: absolute;
    font-size: 16px;
    font-weight: bold;
		margin-top: -40px;
		margin-left: 40px;
		color: aliceblue;
		text-align:center;
	}
	.msg {
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
		color: #ffffff;
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
		border: 1px solid #1E90FF60;
		font-size: 2px;
	}
	.el-input__inner {
		border: 1px solid #409EFF;
		width: 70%;
	}
	.date-button{
		z-index: 99;
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
  .header-center-decoration {
    width: 100%;
    height: 30px;
  }

  .header-left-decoration, .header-right-decoration {
    width: 25%;
    height: 40px;
  }
</style>

<style>
.esri-basemap-gallery__item-container{
	background: #333333;
}
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
	.date{
    position: absolute;
    font-size: 13px;
		/* color:#7BABCF; */
		color: #eee;
    left: 25%;
    top: 23px;
		z-index: 9999;
    transform: translateX(-50%);
	}
	.time{
    position: absolute;
    font-size: 17px;
		/* color:#7BABCF; */
		color: #eee;
		font-weight: bold;
    left: 25%;
    top: 3px;
		z-index: 9999;
    transform: translateX(-50%);
	}
	.week{
    position: absolute;
    font-size: 18px;
		/* color:#7BABCF; */
		color: #eee;
		font-weight: bold;
    left: 28.5%;
    top: 12px;
		z-index: 9999;
    transform: translateX(-50%);
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