import React, { useEffect, useRef, useState } from 'react'
import _1 from '../icons/_1.jpg'
import _2 from '../icons/_2.jpg'
import _3 from '../icons/_3.jpg'
import _4 from '../icons/_4.jpg'
import _5 from '../icons/_5.jpg'

const icons = [{
    id: 1, img: _1,
    id: 2, img: _2,
    id: 3, img: _3,
    id: 4, img: _4,
    id: 5, img: _5
}]

const Landing = () => {
    const [currLC, setCurrLC] = useState("")
    const [loc, setLoc] = useState();
    const bc = useRef(new BroadcastChannel("lc__br"));

    useEffect(() => {
        const lc__successCallback = (e) => setLoc({ lc__lat: e.coords.latitude, lc__long: e.coords.longitude })
        const lc__errorCallback = (e) => console.log("Error getting location: ", e)
        navigator.geolocation.getCurrentPosition(lc__successCallback, lc__errorCallback);
    }, []);

    useEffect(() => {
        console.log("updated: ", currLC)
    }, [currLC])

    // bc.current.onmessage = (event) => {
    //     const msg = event.data;
    //     setCurrLC(msg)
    // };

    bc.current.addEventListener('message', (event) => {
        const msg = event.data;
        setCurrLC(msg)
    })

    function sendNotif() {
        Notification.requestPermission().then(perm => {
            if (perm === "granted" && !!loc.lc__long && !!loc.lc__lat) {
                const rnd = Math.ceil(Math.random() * 5)
                const p = new Notification("Aditya Ashtikar", {
                    body: `Latitude: ${loc.lc__lat}\nLongitute: ${loc.lc__long}`,
                    icon: `${icons.find(p => p.id === rnd)?.img}`,
                    tag: "broadcaster"
                });

                p.addEventListener('show', () => {
                    // console.log("------------")
                    bc.current.postMessage(`Current location\nLatitude: ${loc.lc__lat}\nLongitute: ${loc.lc__long}`);
                })
            }
        })
    }

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <button onClick={sendNotif} style={{ height: "30vh", width: "60vw", fontSize: "50px", fontWeight: "600" }}> Broadcast</button>

            <div style={{ marginTop: "37px", backgroundColor: "cream" }} id="currLC">
                {currLC}
            </div>
        </div >
    )
}

export default Landing