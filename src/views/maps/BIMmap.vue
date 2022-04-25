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
          <el-dropdown-item command="registerService"
            >注册服务</el-dropdown-item
          >
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
          class="select1"
          v-model="level1value"
          clearable
          placeholder="请选择"
          @change="getlevel2value"
        >
          <el-option
            v-for="item in level1option"
            :key="item.id"
            :label="item.name"
            :value="item.children"
          >
          </el-option>
        </el-select>
        <el-select
          class="select2"
          v-model="level2value"
          clearable
          placeholder="请选择"
          @change="getlevel2tree"
        >
          <el-option
            v-for="item in level2option"
            :key="item.id"
            :label="item.name"
            :value="item.children"
          >
          </el-option>
        </el-select>
        <el-input
          class="searchinput"
          placeholder="输入关键字进行过滤"
          v-model="filterText"
        >
        </el-input>
        <el-tree
          :data="modelTreeData"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="expandedkeys"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          ref="tree"
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
      ></el-input>
      <el-input
        v-model="registerInfo.url"
        size="medium"
        class="inputbox"
        autosize
        placeholder="url"
      ></el-input>
      <el-input
        v-model="registerInfo.version"
        size="medium"
        class="inputbox"
        autosize
        placeholder="version"
      ></el-input>
      <el-row>
        <el-col class="button-group">
          <el-button size="medium" type="primary" @click="doRegisterService"
            >确认</el-button
          >
          <el-button size="medium" type="danger" @click="closeRegisterService"
            >取消</el-button
          >
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
                <div class="grid-content bg-purple">{{"无"}}</div>
              </el-col>
              <el-col class="info" :span="8">
                <div class="grid-content bg-purple">名称</div>
              </el-col>
              <el-col class="info" :span="16">
                <div class="grid-content bg-purple">{{"无"}}</div>
              </el-col>
              <el-col class="info" :span="8">
                <div class="grid-content bg-purple">名称</div>
              </el-col>
              <el-col class="info" :span="16">
                <div class="grid-content bg-purple">{{"无"}}</div>
              </el-col>
              <el-col class="info" :span="8">
                <div class="grid-content bg-purple">名称</div>
              </el-col>
              <el-col class="info" :span="16">
                <div class="grid-content bg-purple">{{"无"}}</div>
              </el-col>
              <el-col class="info" :span="8">
                <div class="grid-content bg-purple">名称</div>
              </el-col>
              <el-col class="info" :span="16">
                <div class="grid-content bg-purple">{{"无"}}</div>
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
					<el-button type="primary" size="mini" round plain class="type-button">防、排水</el-button>
					<el-button type="primary" size="mini" round plain class="type-button">二衬</el-button>
				</div>
			<div class="msg">
				<el-table
					border
					style="width: 100%">
					<el-table-column
						type="index"
						label="序号">
					</el-table-column>
					<el-table-column
						label="构件">
					</el-table-column>
					<el-table-column
						label="循环类型">
					</el-table-column>
					<el-table-column
						label="里程段">
					</el-table-column>
					<el-table-column
						label="指标项">
					</el-table-column>
					<el-table-column
						label="预警详情">
					</el-table-column>
					<el-table-column
						label="开始时间">
					</el-table-column>
				</el-table>
			</div>
			</el-card>
		</div>
  </div>
</template>

<script>
import axios from "axios";
import { loadModules } from "esri-loader";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import BuildingSceneLayer from "@arcgis/core/layers/BuildingSceneLayer";
import Slice from "@arcgis/core/widgets/Slice";
import SlicePlane from "@arcgis/core/analysis/SlicePlane";
import LayerList from "@arcgis/core/widgets/LayerList";
import Collection from "@arcgis/core/core/Collection";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import Legend from "@arcgis/core/widgets/Legend";
import Query from "@arcgis/core/rest/support/Query";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import DialogDrag from "vue-dialog-drag";
import { getjsontree,getServer } from "@/api/bim.js";

export default {
  name: "",

  components: {
    DialogDrag,
  },

  props: {},

  data() {
    return {
      layerTreeVisible: false,
      layerRegisterService: false,
      levelvalue: 5,
      webscene: null,
      view:null,
      marks: {
        0: "0",
        5: "5",
        10: "10",
        15: "15",
        20: "20",
      },
      level1value: "",
      level2value: "",
      level1option: [],
      level2option: [],
      filterText: "",
      modelTreeData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      defaultChecked: [],
			registerInfo: {
				name: '',
				url: '',
				version: '',
				components: []
			},
      templist: null,
      expandedkeys: ["010101", "010102", "01010101", "01010102"],
      // defaultChecked: [],
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  computed: {},

  created() {
    this.json2tree();
     this.geturlServer();
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      // Load webscene and display it in a SceneView
      this.webscene = new WebScene({
        // portalItem: {
        //     id: "f9011ca2bf0b42e78a507070b492472f",//92c97bd4e91447d6b3319da22bfa9147
        //     portal: 'http://portal.ehjedu.cn/arcgis'
        // }
      });

       this.view = new SceneView({
        container: "viewDiv",
        map: this.webscene,
        qualityProfile: "high",
        environment: {
          lighting: {
            directShadowsEnabled: true,
            ambientOcclusionEnabled: true,
          },
        },
        // by default the highlight color is set to cyan
        highlightOptions: {
          haloColor: [255, 38, 150],
          color: [255, 255, 255],
          fillOpacity: 0.3,
        },
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
      };
      const layer = new SceneLayer({
        // url: "https://portal.ehjedu.cn/server/rest/services/Hosted/%E9%87%91%E6%B2%99%E6%B1%9Fdgn%E6%A8%A1%E5%9E%8B/SceneServer",
        renderer: typeRenderer,
        title: "Renderer Scene Layer",
      });

      this.webscene.layers.add(layer);

      // wait until the webscene finished loading
      this.webscene.when(() => {
        // 过滤模型
        const filterLayer = this.webscene.layers.getItemAt(0);
        filterLayer.definitionExpression = "Level < " + this.levelvalue;
        // retrieve the scene layer from the webscene - in this case it is the first layer
        const sceneLayer = this.webscene.layers.getItemAt(0);
        console.log(sceneLayer.declaredClass + ", " + sceneLayer.title);

        // get all attributes for the query
        sceneLayer.outFields = ["*"];

        // retrieve the layer view of the scene layer
        this.view.whenLayerView(sceneLayer).then((sceneLayerView) => {
          this.view.on("click", () => {
            sceneLayerView.queryFeatures().then((result) => {
              console.log(result.features);
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
        view: this.view,
      });
      // view.ui.empty("top-left");
      // view.ui.add(layerList, "top-right");
      //   setSliceWidget();

      // const legend = new Legend({
      //   view: view,
      // });

      // view.ui.add(legend, "top-right");
    },
   
   geturlServer(){
      getServer().then(res =>{
         console.log(res);
     }).catch(error => {
        console.log(error)
      })
   },
    //滑块控制
    changeModel() {
      const filterLayer = this.webscene.layers.getItemAt(0);
      filterLayer.definitionExpression = "Level < " + this.levelvalue;
    },
    //BIM目录树
    //json节点生成tree
    json2tree() {
        getjsontree().then((res) => {
          debugger
          let nodelist = res;
          console.log(nodelist);
          let list = nodelist.reduce(function (prev, item) {
            prev[item.pCode]
              ? prev[item.pCode].push(item)
              : (prev[item.pCode] = [item]);
            return prev;
          }, {});
          console.log(list);
          for (let key in list) {
            list[key].forEach(function (item) {
              // item.id = item.code + "_" + item.bimKey;
               item.id = item.code;
              item.children = list[item.code] ? list[item.code] : [];
            });
          }

          this.templist = list;

          this.level1option = list[""];
          // this.modelTreeData = list["0101"];
          // console.log(this.modelTreeData);
        });
    },
    //获取二级下拉列表信息
    getlevel2value(item) {
      if (!item) {
        // 如果取消一级二级不存在
        this.level2option = [];
        return;
      }
      this.level2option = item;
      this.modelTreeData = item;
    },
    //通过二级下拉列表获取新的BIM目录树
    getlevel2tree(item) {
      if (!item) {
        return;
      }
      this.modelTreeData = item;
    },
    //过滤节点树
    filterNode(value, data) {
      // console.log(value, data,9999);
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //双击节点
    handleNodeClick(data, node, self) {
        let highlight = null;
      const objectId  = data.bimKey;
      console.log(data,objectId);
      const queryExtent = new Query({
          objectIds: [objectId]
        });
        const campusSceneLayer = this.webscene.layers.getItemAt(0);
        this.view.whenLayerView(campusSceneLayer).then((campusLayerView)=>{
              campusLayerView.queryExtent(queryExtent).then((result) => {
                // zoom to the extent of the feature; we use the expand method as we don't want to zoom very close to it
                view.goTo(result.extent.expand(4), { speedFactor: 0.5 });
              });
              // if any, remove the previous highlights
              if (highlight) {
                highlight.remove();
              }
              // highlight the feature with the returned objectId
              highlight = campusLayerView.highlight([objectId]);
        })
      // var target = this.sDTilesCollection.get(data.id)
      // if (Cesium.defined(target)) {
      //   this.viewer.flyTo(target)
      // }
    },

		submitRegisterService() {
			var that = this
			const fl = new SceneLayer({
				url : this.registerInfo.url
			});// map.add(fl);
			fl.load().then(function() {
				let query = fl.createQuery();
				query.outFields = [ "*" ];
				fl.queryFeatures(query).then(function (results){
					var ar = []
					// console.log(results.features[0].attributes.oid);  // prints all the client-side features to the console
					for (let i = 0; i < results.features.length; i++) {
						// console.log(results.features[i].attributes.oid)
						var tt = {};
						tt.oid = results.features[i].attributes.oid
						ar.push(tt)
					}
					that.registerInfo.components = ar
					console.lo
				});
			});
		},
    // 处理菜单事件
    handleMenuCommand(command) {
      if (command === "showLayer") {
        this.layerTreeVisible = true;
      } else if (command === "registerService") {
        this.layerRegisterService = true;
      }
    },
    // 关闭图层面板
    closeLayerTreePanel() {
      this.layerTreeVisible = false;
    },
		closeRegisterService() {
			this.layerRegisterService = false
		},
		doRegisterService() {
			console.log(this.registerInfo.url);
			this.submitRegisterService()
			
			this.layerRegisterService = false
		}
  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
	#viewDiv {
		height: calc(100vh - 50px);;
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
		/* border-radius: 4px; */
		text-align: center;
		line-height: 30px;
		color:  #fff;
	}

.select1,
.select2 {
  width: 134px;
}
.select2 {
  margin-left: 20px;
}
.searchinput {
  margin: 10px 0;
}
</style>
