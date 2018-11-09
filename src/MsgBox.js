import MsgBox from './Msg.vue'

const MsgBoxPlugin = {
  install (Vue) {

    const MsgBoxConstructor = Vue.extend(MsgBox)

    const msgbox = new MsgBoxConstructor()

    document.body.appendChild(msgbox.$mount().$el)

    Vue.prototype.$toast = (msg) => {
      msgbox.addQueue(msg)
    }
  }
}

export default MsgBoxPlugin
