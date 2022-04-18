<template>
  <el-dialog
    :title="operatetitle"
		:data="operateinfo"
    :visible.sync="dialogVisible"
    width="60%"
		center
  >
	<el-row  :gutter="5">
		<el-col :span="2.5" :offset="4">
			<span class="select-title">是否不合格：</span>
		</el-col>
		<el-col :span="4">
			<el-radio v-model="radio" label = "合格" border size="mini">是</el-radio>
			<el-radio v-model="radio" label = "不合格" border size="mini">否</el-radio>
		</el-col>
		<el-col :span="2.5" :offset="3">
			<span class="select-title">不合格数量：</span>
		</el-col>
		<el-col :span="4">
			<el-input v-model="unpasscount" placeholder="请输入内容"></el-input>
		</el-col>
	</el-row>
	<el-row  :gutter="5">
		<el-col :span="2.5" :offset="4">
			<span class="select-title">不合格位置：</span>
		</el-col>
		<el-col :span="4">
			<el-input v-model="unpassadress" placeholder="请输入内容"></el-input>
		</el-col>
		<el-col :span="2.5" :offset="3">
			<span class="select-title">合&emsp;格&emsp;数&emsp;量&emsp;：</span>
		</el-col>
		<el-col :span="4">
			<el-input v-model="passcount" placeholder="请输入内容"></el-input>
		</el-col>
	</el-row>
						<el-row>
							<el-col class="button-group">
								<el-col :span="2" :offset="8">
									<el-button size="small"
									type="success"
									icon="el-icon-upload"
									@click="submitHandler"
									>提交</el-button>
								</el-col>
								<el-col :span="2" :offset="4">
									<el-button size="small"
									type="danger" 
									icon="el-icon-circle-close"
									@click="cancelHandler"
									>取消</el-button>
								</el-col>
							</el-col>
						</el-row>
  </el-dialog>
</template>

<script>

export default {
  name: '',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
		operateinfo: {
				type: Object,
				default:function() {
				return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
			radio: "",
			unpasscount: '',
			unpassadress: '',
			passcount: '',
    }
  },
	methods: {
		submitHandler() {
			if(this.radio === "合格"){
				this.operateinfo.datainfo = this.radio
			}
			else if(this.radio === "不合格"){
				this.operateinfo.datainfo = "不合格数量：" + this.unpasscount + "\xa0\xa0" + "不合格位置：" + this.unpassadress + "\xa0\xa0" + "合格数量：" + this.passcount
			}
			this.dialogVisible = false
		},
		cancelHandler() {
			this.dialogVisible = false
		}
	},
	computed: {
		operatetitle() {
			return this.operateinfo.name + '质量自检'
		}
	},
  watch: {
    opened() {
      this.dialogVisible = true
			console.log(this.operateinfo)
    }
  },
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
	.select-title {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		text-align:center;
		line-height: 40px	;
	}
</style>