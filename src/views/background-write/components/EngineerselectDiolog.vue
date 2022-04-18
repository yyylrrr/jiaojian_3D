<template>
  <el-dialog
    :title="engineerselecttitle"
		:data="engineerselectinfo"
    :visible.sync="dialogVisible"
    width="40%"
		center
  >
  <el-checkbox-group v-model="checkList" class="check-list">
    <el-checkbox label="错台" border class="check-box"></el-checkbox>
    <el-checkbox label="线条不顺直" border class="check-box"></el-checkbox>
    <el-checkbox label="尺寸偏差" border class="check-box"></el-checkbox>
		<el-checkbox label="冷缝" border class="check-box"></el-checkbox>
  </el-checkbox-group>
  <el-checkbox-group v-model="checkList" class="check-list">
    <el-checkbox label="色差" border class="check-box"></el-checkbox>
    <el-checkbox label="蜂窝麻面" border class="check-box"></el-checkbox>
    <el-checkbox label="露筋" border class="check-box"></el-checkbox>
		<el-checkbox label="浮浆" border class="check-box"></el-checkbox>
  </el-checkbox-group>
						<el-row>
							<el-col class="check-list">
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
		engineerselectinfo: {
				type: Object,
				default:function() {
				return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
			checkList: []
    }
  },
	methods: {
		submitHandler() {
			this.dialogVisible = false
		},
		cancelHandler() {
			this.checkList = [],
			this.dialogVisible = false
		}
	},
	computed: {
		engineerselecttitle() {
			return this.engineerselectinfo.workinfo
		}
	},
  watch: {
    opened() {
      this.dialogVisible = true
			console.log(this.engineerselectinfo)
    }
  },
}
</script>

<style scoped>
.check-list{
      width:100%;
      text-align:center;
			margin-top: 20px;
}
.check-box {
	width: 120px;
}
</style>