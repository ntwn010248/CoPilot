<template>
  <div class="info-box">
    <span :class="['info-box-icon', colorClass]" @click="toggleValue">
      <i :class="iconClasses"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text">{{text}}</span>
      <span class="info-box-number">{{number}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBox',
  props: {
    text: {
      type: String,
      required: true
    },
    number: {
      type: String,
      default: ''
    },
    iconClasses: {
      type: Array,
      default: []
    },
    colorClass: {
      type: String,
      default: 'bg-default'
    }
  },
  methods: {
    toggleValue() {
      // console.log('hello')
      if (this.text.includes('LED')) {
        this.$emit('toggleBrightness', {brightness: this.number, id: this.text[3]})
      } else if (this.text.includes('DigitalOutput')) {
        this.$emit('toggleValue', {value: this.number})
      } else {
        return
      }
    }
  }
}
</script>
