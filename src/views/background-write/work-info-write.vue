<template>
	<div>
		<div class="info-box">
			<el-card class="box-card">
				<el-tabs>
					<el-tab-pane label="测量队">
						<el-row>
							<el-col :span="1">
									<span class="select-title">围岩等级</span>
							</el-col>
							<el-col :span="2">
								<el-select v-model="legendvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in legendoptions"
										:key="item.legendvalue"
										:label="item.legendlabel"
										:value="item.legendvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="1">
									<span class="select-title">所属区域</span>
							</el-col>
							<el-col :span="3">
								<el-select v-model="regionvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in regionoptions"
										:key="item.regionvalue"
										:label="item.regionlabel"
										:value="item.regionvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="1">
									<span class="select-title">里&emsp;程&emsp;段</span>
							</el-col>
							<el-col :span="4">
								<el-select v-model="factorvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in factoroptions"
										:key="item.factorvalue"
										:label="item.factorlabel"
										:value="item.factorvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
									<el-button class="certain-button" size="mini"
									type="primary" icon="el-icon-search" @click="search">确认</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div class="search-list">
										<el-table
										:data="searchList"
										border
										class="search-result-list"
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										prop="name"
										label="构件名称">
										</el-table-column>
										<el-table-column
										align="center"
										prop="code"
										label="构件编码">
										</el-table-column>
										<el-table-column
										align="center"
										prop="legend"
										label="围岩等级">
										</el-table-column>
										<el-table-column
										align="center"
										prop="workinfo"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										prop="datainfo"
										label="数据内容">
										</el-table-column>
										<el-table-column
										align="center"
										prop="designref"
										label="设计参考值">
										</el-table-column>
										<el-table-column
										align="center"
										prop="unit"
										label="单位"
										width="80">
										</el-table-column>
										<el-table-column align="center" label="操作" width="120">
											<el-button
												type="warning"
												size="mini"
											>
												操作
											</el-button>
										</el-table-column>
									</el-table>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<div class="block">
									<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:page-sizes="[100, 200, 300, 400]"
										:page-size="100"
										layout="total, sizes, prev, pager, next, jumper"
										:total="400">
									</el-pagination>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col class="button-group">
								<el-col :span="2">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-upload">提交</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="primary" icon="el-icon-edit">编辑</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="danger" icon="el-icon-circle-close">取消</el-button>
								</el-col>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="试验室">
						<el-row>
							<el-col :span="1">
									<span class="select-title">围岩等级</span>
							</el-col>
							<el-col :span="2">
								<el-select v-model="legendvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in legendoptions"
										:key="item.legendvalue"
										:label="item.legendlabel"
										:value="item.legendvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="1">
									<span class="select-title">所属区域</span>
							</el-col>
							<el-col :span="3">
								<el-select v-model="regionvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in regionoptions"
										:key="item.regionvalue"
										:label="item.regionlabel"
										:value="item.regionvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="1">
									<span class="select-title">里&emsp;程&emsp;段</span>
							</el-col>
							<el-col :span="4">
								<el-select v-model="factorvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in factoroptions"
										:key="item.factorvalue"
										:label="item.factorlabel"
										:value="item.factorvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
									<el-button class="certain-button" size="mini"
									type="primary" icon="el-icon-search" @click="search">确认</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div class="search-list">
										<el-table
										:data="searchList"
										border
										class="search-result-list"
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										prop="name"
										label="构件名称">
										</el-table-column>
										<el-table-column
										align="center"
										prop="code"
										label="构件编码">
										</el-table-column>
										<el-table-column
										align="center"
										prop="legend"
										label="围岩等级">
										</el-table-column>
										<el-table-column
										align="center"
										prop="workinfo"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										prop="datainfo"
										label="数据内容">
										</el-table-column>
										<el-table-column
										align="center"
										prop="designref"
										label="设计参考值">
										</el-table-column>
										<el-table-column
										align="center"
										prop="unit"
										label="单位"
										width="80">
										</el-table-column>
										<el-table-column align="center" label="操作" width="120">
											<template slot-scope="scope">
											<el-button
												type="warning"
												size="mini"
												@click="operateDataInfo(scope.row)"
											>
												操作
											</el-button>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<div class="block">
									<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:page-sizes="[100, 200, 300, 400]"
										:page-size="100"
										layout="total, sizes, prev, pager, next, jumper"
										:total="400">
									</el-pagination>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col class="button-group">
								<el-col :span="2">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-upload">提交</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="primary" icon="el-icon-edit">编辑</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="danger" icon="el-icon-circle-close">取消</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="primary" icon="el-icon-upload" @click="uploadDataInfo">导入</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-more">选择</el-button>
								</el-col>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="工程部">
						<el-row>
							<el-col :span="1">
									<span class="select-title">围岩等级</span>
							</el-col>
							<el-col :span="2">
								<el-select v-model="legendvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in legendoptions"
										:key="item.legendvalue"
										:label="item.legendlabel"
										:value="item.legendvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="1">
									<span class="select-title">所属区域</span>
							</el-col>
							<el-col :span="3">
								<el-select v-model="regionvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in regionoptions"
										:key="item.regionvalue"
										:label="item.regionlabel"
										:value="item.regionvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="1">
									<span class="select-title">里&emsp;程&emsp;段</span>
							</el-col>
							<el-col :span="4">
								<el-select v-model="factorvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in factoroptions"
										:key="item.factorvalue"
										:label="item.factorlabel"
										:value="item.factorvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
									<el-button class="certain-button" size="mini"
									type="primary" icon="el-icon-search" @click="search">确认</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div class="search-list">
										<el-table
										:data="searchList"
										border
										class="search-result-list"
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										prop="name"
										label="构件名称">
										</el-table-column>
										<el-table-column
										align="center"
										prop="code"
										label="构件编码">
										</el-table-column>
										<el-table-column
										align="center"
										prop="legend"
										label="围岩等级">
										</el-table-column>
										<el-table-column
										align="center"
										prop="workinfo"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										prop="datainfo"
										label="数据内容">
										</el-table-column>
										<el-table-column
										align="center"
										prop="designref"
										label="设计参考值">
										</el-table-column>
										<el-table-column
										align="center"
										prop="unit"
										label="单位"
										width="80">
										</el-table-column>
										<el-table-column align="center" label="操作" width="120">
											<el-button
												type="warning"
												size="mini"
											>
												操作
											</el-button>
										</el-table-column>
									</el-table>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<div class="block">
									<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:page-sizes="[100, 200, 300, 400]"
										:page-size="100"
										layout="total, sizes, prev, pager, next, jumper"
										:total="400">
									</el-pagination>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col class="button-group">
								<el-col :span="2">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-upload">提交</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="primary" icon="el-icon-edit">编辑</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="danger" icon="el-icon-circle-close">取消</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-more" @click="engineerselectWorkInfo">选择</el-button>
								</el-col>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="质检部">
						<el-row>
							<el-col :span="1">
									<span class="select-title">围岩等级</span>
							</el-col>
							<el-col :span="2">
								<el-select v-model="legendvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in legendoptions"
										:key="item.legendvalue"
										:label="item.legendlabel"
										:value="item.legendvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="1">
									<span class="select-title">所属区域</span>
							</el-col>
							<el-col :span="3">
								<el-select v-model="regionvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in regionoptions"
										:key="item.regionvalue"
										:label="item.regionlabel"
										:value="item.regionvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="1">
									<span class="select-title">里&emsp;程&emsp;段</span>
							</el-col>
							<el-col :span="4">
								<el-select v-model="factorvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in factoroptions"
										:key="item.factorvalue"
										:label="item.factorlabel"
										:value="item.factorvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
									<el-button class="certain-button" size="mini"
									type="primary" icon="el-icon-search" @click="search">确认</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div class="search-list">
										<el-table
										:data="searchList"
										border
										class="search-result-list"
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										prop="name"
										label="构件名称">
										</el-table-column>
										<el-table-column
										align="center"
										prop="code"
										label="构件编码">
										</el-table-column>
										<el-table-column
										align="center"
										prop="legend"
										label="围岩等级">
										</el-table-column>
										<el-table-column
										align="center"
										prop="workinfo"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										prop="datainfo"
										label="数据内容">
										</el-table-column>
										<el-table-column
										align="center"
										prop="designref"
										label="设计参考值">
										</el-table-column>
										<el-table-column
										align="center"
										prop="unit"
										label="单位"
										width="80">
										</el-table-column>
										<el-table-column align="center" label="操作" width="120">
											<el-button
												type="warning"
												size="mini"
											>
												操作
											</el-button>
										</el-table-column>
									</el-table>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<div class="block">
									<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:page-sizes="[100, 200, 300, 400]"
										:page-size="100"
										layout="total, sizes, prev, pager, next, jumper"
										:total="400">
									</el-pagination>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col class="button-group">
								<el-col :span="2">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-upload">提交</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="primary" icon="el-icon-edit">编辑</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="danger" icon="el-icon-circle-close">取消</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-more" @click="qualitiselectWorkInfo">选择</el-button>
								</el-col>
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-card>
		</div>
		<OperateDiolog :opened ="operateFrom.opened" :operateinfo = operateFrom.operateBrief />
		<UploadDiolog :opened ="uploadFrom.opened" :uploadinfo = uploadFrom.uploadBrief />
		<EngineerselectDiolog :opened ="engineerselectFrom.opened" :engineerselectinfo = engineerselectFrom.engineerselectBrief />
		<QualitiselectDiolog :opened ="qualitiselectFrom.opened" :qualitiselectinfo = qualitiselectFrom.qualitiselectBrief />
	</div>
</template>

<script>

import OperateDiolog from './components/OperateDiolog.vue'
import UploadDiolog from './components/UploadDiolog.vue'
import EngineerselectDiolog from './components/EngineerselectDiolog.vue'
import QualitiselectDiolog from './components/QualitiselectDiolog.vue'

export default {
	name: '',
	components: {
		OperateDiolog,
		UploadDiolog,
		EngineerselectDiolog,
		QualitiselectDiolog
	},
	data() {
		return{
			legendoptions: [{
				legendvalue: 'Ⅰ级',
				legendlabel: 'Ⅰ级'
			},{
				legendvalue: 'Ⅱ级',
				legendlabel: 'Ⅱ级'				
			},{
				legendvalue: 'Ⅲ级',
				legendlabel: 'Ⅲ级'
			}],
			legendvalue:'',
			regionoptions: [{
				regionvalue: '初支开挖',
				regionlabel: '初支开挖'
			},{
				regionvalue: '仰拱',
				regionlabel: '仰拱'				
			},{
				regionvalue: '二衬',
				regionlabel: '二衬'
			},{
				regionvalue: '防、排水',
				regionlabel: '防、排水'
			}],
			regionvalue:'',
			factoroptions: [{
				factorvalue: '+DK200+100~DK200+120',
				factorlabel: '+DK200+100~DK200+120'
			},{
				factorvalue: '+DK200+240~DK200+260',
				factorlabel: '+DK200+240~DK200+260'				
			}],
			factorvalue:'',

			searchList: [],

			copyList: [
				{
					name: "喷混模型",
					cdoe: "",
					legend: "",
					workinfo: "实际喷射厚度",
					datainfo: "",
					designref: "",
					unit: "cm",
				}
			],

			operateFrom: {
				title: '质量自检',
				opened:false,
				operateBrief: {}
			},

			uploadFrom: {
				title: '自检结果',
				opened:false,
				uploadBrief: {}
			},

			engineerselectFrom: {
				title: '施工信息',
				opened:false,
				engineerselectBrief: {}
			},

			qualitiselectFrom: {
				title: '质检信息',
				opened:false,
				qualitiselectBrief: {}
			}
		}
	},
	
	methods: {
		search() {
			this.searchList = this.copyList
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
    },
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
    },
		operateDataInfo(row) {
			this.operateFrom.opened = !this.operateFrom.opened;
			this.operateFrom.operateBrief = row
		},
		uploadDataInfo() {
			this.uploadFrom.opened = !this.uploadFrom.opened;
			this.uploadFrom.uploadBrief = this.searchList[0]
		},
		engineerselectWorkInfo() {
			this.engineerselectFrom.opened = !this.engineerselectFrom.opened;
			this.engineerselectFrom.engineerselectBrief = this.searchList[0]
		},
		qualitiselectWorkInfo() {
			this.qualitiselectFrom.opened = !this.qualitiselectFrom.opened;
			this.qualitiselectFrom.qualitiselectBrief = this.searchList[0]
		}
	}
}
</script>

<style scoped>
  .box-card {
		margin: 1%;
    width: 98%;
  }
  .el-row {
    margin-bottom: 15px;
  }
  .el-col {
    border-radius: 4px;
  }
	.select-title {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		text-align:center;
		line-height: 40px	;
	}
	.search-box-handler {
		width :90%;
		margin-top: 5px;
	}
	.certain-button {
		margin-left: 10px;
		margin-top: 5px;
	}
  .search-list {
		height: 660px;
  }
	.search-result-list {
		width: 100%;
		height: 660px;
	}
	.block {
		margin-top: 5px;
	}
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple {
    background: #d3dce6;
  }
	.button-group {
		margin-top: 5px;
		display:flex;
		justify-content:center;
	}
</style>