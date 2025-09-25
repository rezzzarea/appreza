type TipeDataParameterURL = {
    namaArea:string
}
async function fetchDataArea(namaAreaUntukEndpoint:string){
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${namaAreaUntukEndpoint}&format=json`,{
        headers:{
            'Accept-Language':'en' //biar g bahasa alien
        }
    })
    const data = await res.json()
    return{
        lat:data[0].lat,
        lon:data[0].lon,
        display_name:data[0].display_name
    }
}

async function fetchDataCuaca(lat:string,lon:string){
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`)
    const dataMeteoMateng = await res.json()
    return dataMeteoMateng.current_weather
}

export default async function HalamanInfoWilayah(
    {params}:{params:Promise<TipeDataParameterURL>}
){
    const {namaArea} = await params
    const lokasi = await fetchDataArea(namaArea)
    const cuaca = await fetchDataCuaca(lokasi.lat,lokasi.lon)
    return(
        <div>
            <h1>Informasi wilayah: {lokasi.display_name}</h1>
            <h3>Koordinat Bumi: {lokasi.lat},{lokasi.lon}</h3>
            <h3>Suhu: {cuaca.temperature}°C</h3>
            <h3>Kecepatan Angin: {cuaca.windspeed} km/h</h3>
        </div>
    )
}