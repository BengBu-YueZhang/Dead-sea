<template>
  <div class="box" :style="positionStyle">
    <div>
      <img :src="InfoIcon" v-if="type === 'info'" class="icon"/>
      <img :src="ErrorIcon" v-else-if="type === 'error'" class="icon"/>
      <img :src="RightIcon" v-else-if="type === 'success'" class="icon"/>
      <img :src="WarningIcon" v-else class="icon"/>
    </div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
import InfoIcon from '../assets/info.svg'
import ErrorIcon from '../assets/error.svg'
import RightIcon from '../assets/right.svg'
import WarningIcon from '../assets/warning.svg'

export default {
  props: {
    title: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    duration: {
      type: Number,
      required: true
    },

    guid: {
      type: String,
      required: true
    },

    index: {
      type: Number,
      required: true
    }
  },

  created () {
    this.InfoIcon = InfoIcon
    this.ErrorIcon = ErrorIcon
    this.RightIcon = RightIcon
    this.WarningIcon = WarningIcon
  },

  mounted () {
    this.init()
  },

  computed: {
    positionStyle () {
      return {
        top: `${this.index * 140}px`
      }
    }
  },

  methods: {
    init () {
      setTimeout(() => {
        this.deleteMsg()
      }, this.duration)
    },

    deleteMsg () {
      this.$emit('delete', this.guid)
    }
  }
}
</script>

<style scoped>
.box {
  position: fixed;
  right: 20px;
  z-index: 1128;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  width: 280px;
  height: 120px;
  box-shadow: 1px 1px 1px 1px #ccc;
  background: #fff;
  border-radius: 5px;
  transition: 400ms;
}

.icon {
  width: 30px;
  height: 30px;
}

.title {
  font-size: 14px;
  color: #616161;
  margin-left: 20px;
}
</style>
