import { headers } from "next/headers";

async function fetchAreaById(areaId:string) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${areaId}&format=json&addressdetails=1`,
      {
        headers: {
          "Accept-Language": "en", //biar gk bahasa jepang, dsb
        },
      }
    );
    const areaData = await response.json()
    return {
        lat:areaData[0].lat,
        lon:areaData[0].lon,
        display_name:areaData[0].display_name,
        country_code: areaData[0].address.country_code,
        country: areaData[0].address.country
    }
}

async function fetchCuaca(lat:string, lon:string) {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
    );
    const cuacaData = await response.json()
    return cuacaData.current_weather
}

async function fetchWaktu(lat:string, lon:string) {
    const response = await fetch(
      `https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`
    );
    const waktuData = await response.json()
    return waktuData
}

async function fetchMataUang(countryCode:string) {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    const mataUangData = await response.json()

    const currencies = mataUangData[0].currencies
    const currencyKey = Object.keys(currencies)[0]
    return {
        code:currencyKey,
        symbol:currencies[currencyKey].symbol,
        name:currencies[currencyKey].name,
    }
}

async function fetchKurs(currencyCode:string){
    if (currencyCode === "IDR") {
        return { rate: 1, base: "IDR" };
    }
    const response = await fetch(`https://api.frankfurter.app/latest?from=${currencyCode}&to=IDR`)
    const kursData = await response.json()
    return {
        rate: kursData.rates.IDR,
        base: currencyCode,
    }
}

export default async function AreaPage(
    {params}:{params:Promise<{areaId:string}>}) 
    {
    const {areaId} = await params
    const area = await fetchAreaById(areaId)
    const cuaca = await fetchCuaca(area.lat, area.lon)
    const waktu = await fetchWaktu(area.lat, area.lon)
    const mataUang = await fetchMataUang(area.country_code)
    const kurs = await fetchKurs(mataUang.code)
    return (
      <main>
        <h1>Latitude: {area.lat}</h1>
        <h1>Longitude: {area.lon}</h1>
        <h1>Lokasi: {area.display_name}</h1>
        <h1>Suhu: {cuaca.temperature}°C</h1>
        <h1>Kecepatan Angin: {cuaca.windspeed} km/h</h1>
        <h1>Tanggal: {waktu.date}</h1>
        <h1>Jam: {waktu.time}</h1>
        <h1>Hari: {waktu.dayOfWeek}</h1>
        <h1>Mata Uang: {mataUang.name}</h1>
        <h1>Kurs ke indo: {mataUang.code} = {kurs.rate.toLocaleString('id-ID')}</h1>
      </main>
    );
}