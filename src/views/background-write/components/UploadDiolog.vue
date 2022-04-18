<template>
  <el-dialog
		:title="uploadtitle"
		:data="uploadinfo"
    :visible.sync="dialogVisible"
    width="40%"
		center
  >
	<el-row :gutter="5" >
		<el-col :span="14" :offset="5" class="radioGroup">
			<el-radio v-model="radio" label="合格" size="small" border>合格</el-radio>
			<el-radio v-model="radio" label="Ⅰ级不合格" size="small" border>Ⅰ级不合格</el-radio>
			<el-radio v-model="radio" label="Ⅱ级不合格" size="small" border>Ⅱ级不合格</el-radio>
		</el-col>
	</el-row>
	<el-row>
		<el-col class="uploadfile">
			<el-upload
				class="upload-demo"
				ref="upload"
				action="https://jsonplaceholder.typicode.com/posts/"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:file-list="fileList"
				:auto-upload="false">
				<el-button slot="trigger" size="small" type="primary" class="uploadbutton">上传本地自检结果文件</el-button>
			</el-upload>
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
		uploadinfo: {
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
			fileList: [],
    }
  },
	methods: {
		submitHandler(file) {
			console.log(file)
			this.$refs.upload.submit();

			this.dialogVisible = false
		},
		cancelHandler() {
			this.fileList = [],
			this.dialogVisible = false
		},
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG || isPNG) {
          this.$message.error('上传文件只能是JPG或PNG!');
        }
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      }
	},
	computed: {
		uploadtitle() {
			return this.uploadinfo.name + '自检结果'
		}
	},
  watch: {
    opened() {
      this.dialogVisible = true
    }
  },
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
	.radioGroup {
				display:flex;
				justify-content:center;
	}
	.uploadfile {
      width:100%;
      text-align:center;
			height: 205px;
			border:1px solid #909399;
	}
	.uploadbutton {
		margin-top: 10px;
	}
</style>