/* eslint-disable */
export default {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  INIT_ALL_STATES (state, payload) {
    const {leds, d_o, d_i} = payload
    console.log('leds: ', leds)
    state.leds = leds
    console.log('d_os: ', d_o)
    state.d_os = d_o
    console.log('d_is: ', d_i)
    state.d_is = d_i
    console.log('GET DATA FROM BACKEND')
  },
  UPDATE_LEDS (state, payload) {
    const {id, brightness} = payload
    console.log('received data: ', payload);
    let index = state.leds.findIndex((item, i)=>{return item.id == id});
    console.log('index: ', index)
    state.leds[index].brightness = brightness
    console.log('LED' + id + 'TURN BRIGHTNESS TO ' + brightness);
  },
  UPDATE_DOS (state, payload) {
    const {id, value} = payload
    console.log('received data: ', payload);
    let index = state.d_os.findIndex((item, i)=>{return item.id == id});
    console.log('index: ', index)
    state.d_os[index].value = value
    console.log('DO:' + id + 'TURN BRIGHTNESS TO ' + value);
  }
}
/* eslint-disable */