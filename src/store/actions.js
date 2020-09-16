/* eslint-disable */
import axios from 'axios'
const api = 'http://localhost:3001/users/'
export default {
    async init_all_state({commit}){
        console.log('ACTION: INIT_ALL_STATE')
        // dummy data
        let led = await axios.get(api + 'led')
        let d_o = await axios.get(api + 'do') 
        let d_i = await axios.get(api + 'di')
        //console.log('received: ', led)
        commit('INIT_ALL_STATES', {leds: led.data, d_o: d_o.data, d_i: d_i.data})
    },
    async toggleLED({commit}, payload){
        // console.log(payload)
        const {brightness, id} = payload;
        let toggle = (brightness=="0")?"1":"0";
        commit('UPDATE_LEDS', {id: id, brightness: toggle})
        // let res = await axios.put(api +'led' + id, {"brightness":toggle})
        // let data = res.data
        // if(res.data === "UPDATE SUCCESS")
        //     commit('UPDATE_LEDS', {data})
        // else return;
    },
    async toggleDO({commit}, payload){
        const {value} = payload
        let toggle = (value=="0")?"1":"0"
        commit('UPDATE_DOS', {id: "do0", value: toggle})
    }
}
/* eslint-disable */