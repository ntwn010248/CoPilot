<template>
  <!-- Main content -->
  <section class="content">
    <!-- GitHub hint -->
    <div class="row">
      <h1>LEDS:</h1>
      <!-- <div class="col-xs-12">
        <alert :dismissible="true"
               type="success"
               :iconClasses="['fa', 'fa-check']"
               title="CoPilot is open source!">
          <span>Click on icon to check it out on github.</span>
          <a href="https://github.com/misterGF/CoPilot" target="_blank">
            <i class="fa fa-github fa-2x"></i>
          </a>
        </alert>
      </div> -->

      <!-- Info boxes -->

      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>

      <!-- /.col -->
      <div class="col-md-4 col-sm-6 col-xs-12" v-for="led in leds" :key="led.id">
        <info-box color-class="bg-green"
                  :icon-classes="['ion', 'ion-ios-sunny-outline']"
                  :text="'LED'+ led.id"
                  :number="led.brightness"
                  v-if="led.brightness==='1'"
                  @toggleBrightness="toggleBrightness"></info-box>
        <info-box color-class="bg-gray"
                  :icon-classes="['ion', 'ion-ios-sunny-outline']"
                  :text="'LED'+ led.id"
                  :number="led.brightness"
                  v-else
                  @toggleBrightness="toggleBrightness"></info-box>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row  CHARTS-->
<!-- 
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
          <div class="box-body">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>Web Traffic Overview</strong>
              </p>
              <canvas id="trafficBar" ></canvas>
            </div>
            <hr class="visible-xs-block">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>Language Overview</strong>
              </p>
              <canvas id="languagePie"></canvas>
            </div>
          </div>
        </div>
        <div class="text-center">
          <small><b>Pro Tip</b> Don't forget to star us on github!</small>
        </div>
      </div>
    </div> -->
    <!-- /.row -->

    <!-- Main row -->
    <div class="row">
      <h1>Digital I/O</h1>
      <div class="col-md-3 col-sm-6 col-xs-12" v-for="d_o in d_os" :key="d_o.id">
        <info-box color-class="bg-green"
                  :icon-classes="['ion', 'ion-ios-sunny-outline']"
                  :text="'DigitalOutput'+ d_o.id"
                  :number="d_o.value"
                  v-if="d_o.value==='1'"
                  @toggleValue="toggleValue"></info-box>
        <info-box color-class="bg-gray"
                  :icon-classes="['ion', 'ion-ios-sunny-outline']"
                  :text="'DigitalOutput'+ d_o.id"
                  :number="d_o.value"
                  v-else
                  @toggleValue="toggleValue"></info-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12" v-for="d_i in d_is" :key="d_i.id">
        <info-box color-class="bg-green"
                  :icon-classes="['ion', 'ion-ios-sunny-outline']"
                  :text="'DigitalOutput'+ d_i.id"
                  :number="d_i.value"
                  v-if="d_i.value==='1'"
                  ></info-box>
        <info-box color-class="bg-gray"
                  :icon-classes="['ion', 'ion-ios-sunny-outline']"
                  :text="'DigitalOutput'+ d_i.id"
                  :number="d_i.value"
                  v-else
                  ></info-box>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>

<script>
import Chart from 'chart.js'
import Alert from '../widgets/Alert'
import InfoBox from '../widgets/InfoBox'
import ProcessInfoBox from '../widgets/ProcessInfoBox'

export default {
  name: 'Dashboard',
  components: {
    Alert,
    InfoBox,
    ProcessInfoBox
  },
  data () {
    return {
      generateRandomNumbers (numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      }
    }
  },
  computed: {
    coPilotNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    personalNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile () {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    },
    leds () {
      // console.log(this.$store.state.leds)
      return this.$store.state.leds
    },
    d_os () {
      // console.log(this.$store.state.leds)
      return this.$store.state.d_os
    },
    d_is () {
      return this.$store.state.d_is
    }
  },
  methods: {
    toggleBrightness(event) {
      this.$store.dispatch('toggleLED', event)
      // console.log(event)
    },
    toggleValue(event) {
      this.$store.dispatch('toggleDO', event)
      // console.log(event)
    }
  },
  mounted () {
    console.log('ACTION: INIT ALL STATE')
    this.$store.dispatch('init_all_state')
    this.$nextTick(() => {
      var ctx = document.getElementById('trafficBar').getContext('2d')
      var config = {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: 'CoPilot',
            fill: false,
            borderColor: '#284184',
            pointBackgroundColor: '#284184',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: this.coPilotNumbers
          }, {
            label: 'Personal Site',
            borderColor: '#4BC0C0',
            pointBackgroundColor: '#4BC0C0',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: this.personalNumbers
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          },
          tooltips: {
            mode: 'label',
            xPadding: 10,
            yPadding: 10,
            bodySpacing: 10
          }
        }
      }

      new Chart(ctx, config) // eslint-disable-line no-new

      var pieChartCanvas = document.getElementById('languagePie').getContext('2d')
      var pieConfig = {
        type: 'pie',
        data: {
          labels: ['HTML', 'JavaScript', 'CSS'],
          datasets: [{
            data: [56.6, 37.7, 4.1],
            backgroundColor: ['#00a65a', '#f39c12', '#00c0ef'],
            hoverBackgroundColor: ['#00a65a', '#f39c12', '#00c0ef']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          }
        }
      }

      new Chart(pieChartCanvas, pieConfig) // eslint-disable-line no-new
    })
  }
}
</script>
<style>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
</style>
