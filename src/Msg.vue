<template>
  <transition-group name="move" tag="div" @afterLeave="afterLeave">
    <Box v-for="(box, index) in showQueue" :index="index" :key="box.guid" v-bind="box" @delete="handleDelete"/>
  </transition-group>
</template>

<script>
import { guid } from './util.js'
import Box from './Box'

export default {
  name: 'MsgBox',

  components: {
    Box
  },

  data () {
    return {
      showQueue: [],
      queue: [],
      number: 100
    }
  },

  methods: {
    addQueue (msg = {
      title: '消息',
      type: 'info',
      duration: 4500
    }) {
      if (msg.title && typeof msg.title !== 'string') throw new TypeError('The title must be a string')
      if (msg.type && typeof msg.title !== 'string') throw new TypeError('The type must be a string')
      if (msg.duration && typeof msg.duration !== 'number') throw new TypeError('The duration must be a number')
      if (msg.type && ['info', 'warning', 'error', 'success'].indexOf(msg.type) < 0) throw new Error('Type attribute type error')
      msg.guid = guid()
      if (!msg.title) msg.title = '消息'
      if (!msg.type) msg.type = 'info'
      if (!msg.duration) msg.duration = 4500
      this.queue.push(msg)
      this.processQueue()
    },

    processQueue () {
      if (this.queue.length && this.showQueue.length < this.number) {
        this.showQueue.push(this.queue.shift())
      }
    },

    afterLeave () {
      this.processQueue()
    },

    handleDelete (guid) {
      this.showQueue = this.showQueue.filter(q => q.guid !== guid)
    }
  }
}
</script>

<style scoped>
.move-enter-active, .move-leave-active {
  transition: 400ms;
}
.move-enter, .move-leave-to {
  transform: translateX(200%);
}
</style>
