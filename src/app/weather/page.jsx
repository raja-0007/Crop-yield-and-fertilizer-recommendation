"use client"
import Navbar from '@/components/Navbar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import { MdNotes } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { AiTwotoneClockCircle } from "react-icons/ai";
import AvgTemps from '@/components/AvgTemps';
import Hourly from '@/components/Hourly';



function page() {
    // const [userdetails, setUserdetails] = useState({})
    const [search, setSearch] = useState('')
    const [result, setResult] = useState([{ name: '', country: '' }])
    const [currentDate, setCurrentDate] = useState('')
    const [forecast, setForecast] = useState([])
    const [loading, setLoading] = useState(false)
    const [time, setTime] = useState('')


    function times() {
        var obj = new Date()
        // setTime(obj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        // setTime(obj.toLocaleTimeString())
        // obj.setUTCHours(obj.getUTCHours(), obj.getUTCMinutes())
        // setTime(obj.toISOString().substr(11, 5))
        let hrs = obj.getHours()
        let mins = obj.getMinutes()
        let ampm = hrs >= 12 ? 'PM' : 'AM'
        mins = mins < 10 ? '0' + mins : mins
        hrs = hrs < 10 ? '0' + hrs : hrs

        setTime(hrs + ':' + mins + ' ' + ampm)

        // setTime(obj.getHours() + ':' + obj.getMinutes('2-digit'))

    }




    function searchhandler(e) {

        var ch = (e.target.value).charAt(0).toUpperCase() + (e.target.value).slice(1)

        setSearch(ch)
    }
    useEffect(() => {
        setLoading(true)
        let lat = ''
        let lon = ''
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords)
            lat = position.coords.latitude
            lon = position.coords.longitude
            console.log(lon, lat)
            current_temp(lat, lon)
        })

        // setUserdetails(JSON.parse(sessionStorage.getItem('userdetails'))?.userDetails || '')
        setInterval(times, 1000)
        var date = new Date()
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // console.log(date.toLocaleDateString())
        setCurrentDate(date.getDate() + ', ' + (months[date.getMonth()]) + ' ' + date.getFullYear())


    }, [])
    async function current_temp(lat, lon) {
        // axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=c0362684f2ada7fd9502b79579bf3a59')
        //     .then(response => calculate_current_temp(response))
        // http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
        console.log(`http://api.weatherapi.com/v1/forecast.json?key=80f1c45204854ecabd693722231309&q=${lat},${lon}&days=${3}`)
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=80f1c45204854ecabd693722231309&q=${lat},${lon}&days=${3}`)
            .then(res => { console.log(res.data); calculate_current_temp(res.data) })
    }



    async function tempresult(e) {
        e.preventDefault()
        setLoading(true)
        if (search != '') {
            try {
                // await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + search + '&appid=c0362684f2ada7fd9502b79579bf3a59')
                //     .then(response => calculate_current_temp(response))

                // const params = {
                //     : 'value1',
                //     param2: 'value2'
                //   }
                await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=80f1c45204854ecabd693722231309&q=${search}&days=${3}`)
                    .then(res => { console.log(res.data); calculate_current_temp(res.data); })
            } catch (error) {

                console.log(error)
                if (error.message == "Network Error") {
                    alert('check your network connection')
                }
                else {
                    alert('enter a valid city name')
                    setLoading(false)
                }
            }
        }
        else {
            let lat = ''
            let lon = ''
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords)
                lat = position.coords.latitude
                lon = position.coords.longitude
                console.log(lon, lat)
                current_temp(lat, lon)
            })
        }
    }

    function calculate_current_temp(response) {
        console.log(response)
        setForecast(response.forecast.forecastday)
        const loc = { name: response.location.name, country: response.location.country }
        // const kelvin = response.data.main.temp
        // const celcius = kelvin - 273.15

        // const speed = (response.data.wind.speed * 3.6).toFixed(2)

        // const coord = response.data.coord //has two keys => lon, lat

        // const description = response.data.weather[0].description
        // let icon = response.current.condition.icon
        var iconurl = response.current.condition.icon
        // document.getElementById('iconw').src = iconurl
        // setResult([loc, Math.round(celcius), coord.lon, coord.lat, response.data.weather[0].description, response.data.main.humidity, speed])
        setResult([loc, response.current.temp_c, response.location.lon, response.location.lat, response.current.condition.text, response.current.humidity, response.current.wind_kph, iconurl])
        setTimeout(() => setLoading(false), 1000)



    }
    const getDay = (date) => {
        
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(date);
        var dayName = days[d.getDay()];
        
        return dayName
    }

    useEffect(() => {
        console.log(forecast)
    }, [forecast])

    return (
        <div className='h-[100vh] relative flex flex-col'>
            <img src="/bg1.jpg" className='absolute top-0 w-full h-[100vh] z-0 opacity-40' alt="" />
            <Navbar />

            <div className='w-[80%] p-12 pb-7 flex flex-col mx-auto bg-gray-400 mt-6 bg-opacity-20 z-10 shadow-md shadow-gray-400 rounded-lg'>


                <div className='w-full flex '>
                    <div className='flex flex-col items-center w-[30%]  h-full'>

                        <form className='w-96 border-2 rounded-full bg-white overflow-hidden px-3 py-1 flex' onSubmit={tempresult}>
                            <input type='text' id='searchbox' className='w-full outline-none ' placeholder='enter a city name..' value={search} onChange={searchhandler}></input><button className='searcher'><FiSearch /></button>
                        </form>
                        <div
                            className={`flex self-end  items-center gap-[1px]  font-medium mt-3 ${loading && 'bg-gray-300 w-[200px] text-gray-600 rounded-md py-1 px-2 animate-pulse'}`}>
                            <span><FaLocationDot className='text-red-500' /></span>
                            {loading ? 'loading...' : result[0]?.name + ', ' + result[0]?.country}
                        </div>
                        {loading ? <div className='flex items-center justify-center h-[155px] mt-5 w-full animate-pulse bg-gray-300 text-gray-600'>loading...</div> :
                            <div className='flex flex-col items-center mx-auto justify-center mt-5'>
                                <img id='iconw' src={result[7] || ''} className='w-[150px]' alt='weather icon'></img>
                                <label className='text-3xl font-bold'>{result[1]}&deg;C</label>

                            </div>}

                    </div>
                    <div className='w-[70%] flex flex-col gap-4'>


                        <div className='flex justify-end gap-5'><label>{currentDate}</label><label>{time}</label></div>
                        <div className='w-full flex gap-4 justify-between items-center'>
                            <div className='w-[75%] flex flex-col justify-around gap-8 h-full'>
                                <div className='flex justify-around'>
                                    <div className={`flex flex-col w-[40%] py-3 px-3 bg-white bg-opacity-20 shadow-md gap-4 shadow-gray-400`}>
                                        <div className='flex justify-between items-center'>
                                            <span className='font-semibold'>Coordinates</span><MdMyLocation className='text-blue-600 text-xl' />

                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <span className='flex gap-2 items-center'>Lon:{loading ? <div className='animate-pulse w-[50px] h-[20px] bg-gray-300 rounded-full'></div> : <span>&nbsp;&nbsp;{result[2]}</span>}</span>
                                            {/* <span>Lat:&nbsp;&nbsp;{result[3]}</span> */}
                                            <span className='flex gap-2 items-center'>Lon:{loading ? <div className='animate-pulse w-[50px] h-[20px] bg-gray-300 rounded-full'></div> : <span>&nbsp;&nbsp;{result[2]}</span>}</span>

                                        </div>


                                    </div>
                                    <div className={`flex flex-col w-[40%] py-3 px-3 bg-white bg-opacity-20 shadow-md gap-4 shadow-gray-400`}>
                                        <div className='flex justify-between items-center'><span className='font-semibold'>Description</span><MdNotes className='text-blue-600 text-xl' /></div>
                                        {loading ? <div className='animate-pulse w-[100px] h-[20px] bg-gray-300 rounded-full'></div> : <span className='description'>
                                            {result[4]}
                                        </span>}
                                    </div>
                                </div>
                                <div className='flex justify-around '>
                                    <div className={`flex flex-col w-[40%] py-3 px-3 bg-white bg-opacity-20 shadow-md gap-4 shadow-gray-400`}>
                                        <div className='flex justify-between items-center'><span className='font-semibold'>humidity</span><WiHumidity className='text-blue-600 text-2xl' /></div>
                                        {/* <span className='humidity'>
                                        {result[5]}%
                                    </span> */}
                                        {loading ? <div className='animate-pulse w-[100px] h-[20px] bg-gray-300 rounded-full'></div> : <span className='description'>
                                            {result[5]}%
                                        </span>}
                                    </div>
                                    <div className={`flex flex-col w-[40%] py-3 px-3 bg-white bg-opacity-20 shadow-md gap-4 shadow-gray-400`}>
                                        <div className='flex justify-between items-center'><span className='font-semibold'>Wind</span><LuWind className='text-blue-600 text-xl' /></div>
                                        {/* <span className='wind'>
                                        {result[6]}<small className='windunits'>kmph</small>
                                    </span> */}
                                        {loading ? <div className='animate-pulse w-[100px] h-[20px] bg-gray-300 rounded-full'></div> : <span className='description'>
                                            {result[6]}<small className='windunits'>kmph</small>
                                        </span>}
                                    </div>
                                </div>




                            </div>
                            <div className='w-[25%] flex flex-col gap-0  bg-white  shadow-md shadow-gray-400 bg-opacity-20' >
                                


                                <AvgTemps forecast={forecast} loading={loading} getDay={getDay} />


                            </div>
                        </div>

                    </div>
                </div>
                <div className='w-full flex flex-col gap-5 mt-5'>
                    <span className='font-semibold border-b-2 border-blue-600 border-opacity-20 py-2 w-full '>Today</span>
                    <div className='w-full flex justify-start gap-1 shadow-md shadow-gray-400 bg-white bg-opacity-10 '>
                        <Hourly forecast={forecast} loading={loading} time={time}/>
                        {/*loading ? 

                            forecast[0]?.hour.filter(hour => parseInt(hour.time.split(' ')[1].slice(0, 2)) > parseInt(time.slice(0, 2))).slice(0, 5).map((day, ind) => {

                                <div key={ind} className='w-[180px] h-[120px] p-3 flex justify-center  items-center  bg-opacity-20 shadow-md shadow-gray-400  rounded-md'>
                                    <div className='w-[50px] flex h-[50px] bg-gray-300 animate-pulse text-sm rounded-s-md rounded-e-md'>

                                    </div>

                                    <div className='h-full w-[max-content] text-end flex flex-col justify-between items-end self-end gap-2'>
                                        <div className='animate-pulse w-[40px] h-[20px] bg-gray-300 rounded-full'></div>
                                        <div className='animate-pulse w-[60px] h-[20px] bg-gray-300 rounded-full'></div>
                                        <div className='animate-pulse w-[100px] h-[20px] bg-gray-300 rounded-full'></div>
                                    </div>



                                </div>
                            }) : 
                                forecast[0]?.hour.filter(hour => parseInt(hour.time.split(' ')[1].slice(0, 2)) > parseInt(time.slice(0, 2))).slice(0, 5).map((day, ind) => {

                                    <div key={ind} className='w-[180px] p-3 flex justify-between  items-center bg-white bg-opacity-20 shadow-md shadow-gray-400  rounded-md'>
                                     <div className='w-full flex h-full items-center justify-center'>
                                         <img src={day.condition.icon} className='w-[60px] self-center' alt="" />
                                     </div>

                                     <div className='h-full w-[max-content] text-end flex flex-col justify-between items-end self-end gap-2'>
                                         <span className='flex items-center'> {day.time.split(' ')[1]} <AiTwotoneClockCircle className='text-blue-200  my-auto' size={'12px'} /> </span>
                                         <span className='font-semibold'>{day.temp_c}&deg;C</span>
                                         <span>{day.condition.text.split(' ').length > 1 ? day.condition.text.split(' ')[0] + ' ' + day.condition.text.split(' ')[1] : day.condition.text}</span>
                                    </div>



                                 </div>
                                }
                            )*/}
                         {/*forecast[0]?.hour.filter(hour => parseInt(hour.time.split(' ')[1].slice(0, 2)) > parseInt(time.slice(0, 2))).slice(0, 5).map((day, ind) => {
                        //     if (loading) return (
                        //         <div key={ind} className='w-[180px] h-[120px] p-3 flex justify-center  items-center  bg-opacity-20 shadow-md shadow-gray-400  rounded-md'>
                        //             <div className='w-[50px] flex h-[50px] bg-gray-300 animate-pulse text-sm rounded-s-md rounded-e-md'>

                        //             </div>

                        //             <div className='h-full w-[max-content] text-end flex flex-col justify-between items-end self-end gap-2'>
                        //                 <div className='animate-pulse w-[40px] h-[20px] bg-gray-300 rounded-full'></div>
                        //                 <div className='animate-pulse w-[60px] h-[20px] bg-gray-300 rounded-full'></div>
                        //                 <div className='animate-pulse w-[100px] h-[20px] bg-gray-300 rounded-full'></div>
                        //             </div>



                        //         </div>
                        //     )
                        //     return (
                        //         <div key={ind} className='w-[180px] p-3 flex justify-between  items-center bg-white bg-opacity-20 shadow-md shadow-gray-400  rounded-md'>
                        //             <div className='w-full flex h-full items-center justify-center'>
                        //                 <img src={day.condition.icon} className='w-[60px] self-center' alt="" />
                        //             </div>

                        //             <div className='h-full w-[max-content] text-end flex flex-col justify-between items-end self-end gap-2'>
                        //                 <span className='flex items-center'> {day.time.split(' ')[1]} <AiTwotoneClockCircle className='text-blue-200  my-auto' size={'12px'} /> </span>
                        //                 <span className='font-semibold'>{day.temp_c}&deg;C</span>
                        //                 <span>{day.condition.text.split(' ').length > 1 ? day.condition.text.split(' ')[0] + ' ' + day.condition.text.split(' ')[1] : day.condition.text}</span>
                        //             </div>



                        //         </div>
                        //     )
                            // })*/}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page
