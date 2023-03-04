import { BroadcastChannel } from 'broadcast-channel';
const channel = new BroadcastChannel("lc__br");

export const runChannelReceiver = () => {
    channel.onmessage = (event) => {
        const msg = event.data.data;
        // console.log(msg)
        document.getElementById("currLC").innerHTML = msg;
    };
}