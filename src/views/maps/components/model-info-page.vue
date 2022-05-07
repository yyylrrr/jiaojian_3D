<template>
  <div v-show="modelSelectInfo.opened">
    <dialog-drag
      id="dialog-1"
      class="dialog-3"
      pinned="false"
      :options="option"
      @close="close"
    >
      <div>
          <div class="msg">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">OID</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{this.modelSelectInfo.modelInfo.oid || '无'}}</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">模型</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{this.modelSelectInfo.modelInfo.model || '无'}}</div>
              </el-col>
            </el-row>
      </div>
    </div>
    </dialog-drag>
  </div>

</template>

<script>
import DialogDrag from 'vue-dialog-drag'

export default {
  name: 'modelInfoPage',
  components: {
    DialogDrag
  },
  props: {
    modelSelectInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      option: { top: 250, left: 600, height: 350, width: 300, buttonPin: false },
    }
  },

  computed: {

  },
  watch: {

	},
  created() {

  },
  mounted(){

  },
  methods: {

    close() {
      this.modelSelectInfo.opened = false;
			console.log(this.modelSelectInfo.modelInfo)
		},
  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
	.dialog-3{
		background: #02233960;
	}
	.grid-content{
		font-size: 4px;
	}
	.msg {
		margin-top: 3%;
		margin-left: 1%;
		width: 98%;
		font-size: 14px;
		color: #606266;
		height: 160px;
	}
	.el-row {
		height: 40px;
	}
	.el-col {
		text-align: center;
		line-height: 30px;
		color:  #fff;
		border: 1px solid #facd9152;
	}
</style>

