// tujuan TS = membuat kita konsisten dengan tipe data sehingga kalau sewaktu-waktu ada yg mau re-assign value baru atau mau memproses datanya, kita bisa tahu kalau errornya sebelum aplikasi ny di deploy

import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import Navbar from "@/components/navbars/navbar";
import Title from "@/components/titles/title";

// let umur = 10 
// auto infer = otomatis menentukan tipe data
// umur = "10"
// umur = "10"
// umur = 10
// let SepuluhThKedepan = 10 + umur

type NominatimResult = {
    lat: string;
    lon: string;
    display_name: string;
    importance: number;
    address: {
        country_code: string;
        country: string;
    };
    name?: string;
}

type AreaData = {
    lat: string;
    lon: string;
    display_name: string;
    country_code: string;
    country: string;
}

async function fetchAreaById(areaId: string): Promise<AreaData> {
    // dbwh ini u/ debugging
    // console.log('Fetching area for:', areaId)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${areaId}&format=json&addressdetails=1&limit=10`,
      {
        headers: {
          "Accept-Language": "en", //biar gk bahasa jepang, dsb
          "User-Agent": "MutabaahApp/1.0", //handler nominatim biar gk ke block & menghindari bot generik / bot detection / abusive requests
        },
        cache: 'no-store',
      }
    );
    if (!response.ok) {
        throw new Error(`Nominatim API error: ${response.status} ${response.statusText}`)
    }
    let areaData: NominatimResult[] = await response.json()
    console.log('Area data length:', areaData.length)
    console.log('Results:', areaData)
    // Filter out invalid results
    areaData = areaData.filter((item) => (!item.name || item.name !== 'undefined') && !item.display_name.includes('undefined'))
    console.log('Filtered results:', areaData)
    if (!areaData || areaData.length === 0) {
        throw new Error('Area not found')
    }
    // Sort by importance descending to get the most relevant result
    areaData.sort((a, b) => (b.importance || 0) - (a.importance || 0))
    const selectedArea = areaData[0]
    console.log('Selected area:', selectedArea)
    return {
        lat: selectedArea.lat,
        lon: selectedArea.lon,
        display_name: selectedArea.display_name,
        country_code: selectedArea.address.country_code,
        country: selectedArea.address.country
    }
}

type CuacaData = {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
}

async function fetchCuaca(lat: string, lon: string): Promise<CuacaData> {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`,
      { cache: 'no-store' }
    );
    if (!response.ok) {
        throw new Error(`Open-Meteo API error: ${response.status} ${response.statusText}`)
    }
    const cuacaData = await response.json()
    return cuacaData.current_weather
}

type DataWaktu = {
    status: string;
    message: string;
    countryCode: string;
    countryName: string;
    zoneName: string;
    abbreviation: string;
    gmtOffset: number;
    dst: string;
    zoneStart: number;
    zoneEnd: number;
    nextAbbreviation: string;
    timestamp: number;
    formatted: string;
}
// fetching data zona waktu API berdasarkan garis lintang dan bujur
// lat = garis lintang
// lon = garis bujur
async function fetchWaktu(lat: string, lon: string): Promise<DataWaktu> {
    const response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.TIMEZONE_DB_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`,
      {
        headers: {
          "User-Agent": "MutabaahApp/1.0",
        },
        cache: 'no-store'
      }
    );
    // error hendling API
    if (!response.ok) {
        throw new Error(`Timezonedb API error: ${response.status} ${response.statusText}`)
    }
    const DataWaktu: DataWaktu = await response.json()
    return DataWaktu
}

type MataUangData = {
    code: string;
    symbol: string;
    name: string;
}

async function fetchMataUang(countryCode: string): Promise<MataUangData> {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`,
      { cache: 'no-store' }
    );
    if (!response.ok) {
        throw new Error(`RestCountries API error: ${response.status} ${response.statusText}`)
    }
    const mataUangData = await response.json()

    const currencies = mataUangData[0].currencies
    const currencyKey = Object.keys(currencies)[0]
    return {
        code: currencyKey,
        symbol: currencies[currencyKey].symbol,
        name: currencies[currencyKey].name,
    }
}

// async function fetchKurs(currencyCode:string){
//     if (currencyCode === "IDR") {
//         return { rate: 1, base: "IDR" };
//     }
//     const response = await fetch(`https://api.frankfurter.app/latest?from=${currencyCode}&to=IDR`)
//     const kursData = await response.json()
//     return {
//         rate: kursData.rates.IDR,
//         base: currencyCode,
//     }
// }

type KursData = {
    rate: number;
    base: string;
}

async function fetchKurs(currencyCode: string): Promise<KursData> {
    if (currencyCode === "IDR") {
        return { rate: 1, base: "IDR" };
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyCode}`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`ExchangeRate API error: ${response.status} ${response.statusText}`)
    }
    const kursData = await response.json();

    if (!kursData.rates || typeof kursData.rates.IDR !== "number") {
        throw new Error(`Exchange rate from ${currencyCode} to IDR not available.`);
    }

    return {
        rate: kursData.rates.IDR,
        base: currencyCode,
    };
}


/*
FLOW 1 = fetchAreaById -> fetchCuaca -> fetchWaktu -> fetchMataUang -> fetchKurs
1) routing parameter tersimpan {params} akan terisi oleh namaArea (yg kita ketik di browser)
2) areaId dibuat sesuai parameter routing yg telah dibuka pada browser valuenya akan di proses u/ menjadi argumen pada function yg akan menghasilkan values pada keys yg kita butuhkan dan semua hasil tersebut akan kita simpan pada sebuah variable sebelum kita sortir bagian mana yg ingin di berikan kepada halaman website

tau dr mn otak atik endpoint / link API , dr dokumentasi API ny

3) area dibuat sebagai wadah yg menampung keys object yg akan kita panggil di website

2) namaArea akan di destructuring menjadi areaId
desctructuring a/ mewariskan tipe data dari suatu referensi tipe data ke var yg mau kita buat

3) areaId akan di fetch ke API untuk mendapatkan data area
4) data area akan di fetch ke API untuk mendapatkan data cuaca
5) data area akan di fetch ke API untuk mendapatkan data waktu
6) data area akan di fetch ke API untuk mendapatkan data mata uang
7) data mata uang akan di fetch ke API untuk mendapatkan data kurs
*/
export default async function AreaPage({params}:{params:Promise<{namaArea:string}>}) {
    const {namaArea:areaId} = await params //tipe data areaId akan menjadi string sesuai namaArea
    // const areaId = await params
    const area = await fetchAreaById(areaId)
    const cuaca = await fetchCuaca(area.lat, area.lon)
    let waktu = null
    let tanggal = null
    let hari = null
    let bulan = null
    let tahun = null
    let jam = null
    let menit = null
    let detik = null
    try {
        waktu = await fetchWaktu(area.lat, area.lon)
        if (waktu) {
            const formatted = waktu.formatted;
            const [dateStr, timeStr] = formatted.split(' ');
            const [year, month, day] = dateStr.split('-').map(Number);
            const [hour, minute, second] = timeStr.split(':').map(Number);
            tahun = year;
            const bulanNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            bulan = bulanNames[month - 1];
            tanggal = day;
            jam = hour;
            menit = minute;
            detik = second;
            // For hari
            const utcDate = new Date(waktu.timestamp * 1000);
            const localMillis = utcDate.getTime() + (waktu.gmtOffset * 1000);
            const localDate = new Date(localMillis);
            const hariIndex = localDate.getUTCDay();
            const hariNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            hari = hariNames[hariIndex];
        }
    } catch (error) {
        console.error('Error fetching time:', error)
    }
    const mataUang = await fetchMataUang(area.country_code)
    let kurs = null
    try {
        kurs = await fetchKurs(mataUang.code)
    } catch (error) {
        console.error('Error fetching exchange rate:', error)
    }

    return (
      /* 
      background pakai bg-[hexcode bebas] atau rgba kaya gini bg-[rgba(123,114,68,0.61)]
      warna teks text-[warnahexcode]
      */
      <main className="bg-[#fcfcfc] text-[#b96821]">
        <Navbar />
        <Title />
        <Input />
        <Button />

        <h1>Latitude: {area.lat}</h1>
        <h1>Longitude: {area.lon}</h1>
        <h1>Lokasi: {area.display_name}</h1>
        <h1>Suhu: {cuaca.temperature}°C</h1>
        <h1>Kecepatan Angin: {cuaca.windspeed} km/h</h1>
        {waktu ? (
            <>
                <h1>Waktu: {waktu.formatted}</h1>
                <h1>Timezone: {waktu.zoneName}</h1>
                <h1>Tanggal: {tanggal}</h1>
                <h1>Hari: {hari}</h1>
                <h1>Bulan: {bulan}</h1>
                <h1>Tahun: {tahun}</h1>
                <h1>Jam: {jam}</h1>
                <h1>Menit: {menit}</h1>
                <h1>Detik: {detik}</h1>

            </>
        ) : (
            <h1>Waktu: Not available</h1>
        )}
        <h1>Mata Uang: {mataUang.name}</h1>
        {kurs ? (
            <h1>Kurs ke indo: {mataUang.code} = {kurs.rate.toLocaleString('id-ID')}</h1>
        ) : (
            <h1>Kurs tidak tersedia untuk {mataUang.code}</h1>
        )}
      </main>
    );
}




/*

JSON top level types:
    object → { ... }
    array → [ ... ]
    string → "abc"
    number → 123
    boolean → true / false
    null


HTTP Headers:
| **Category**               | **Description**                                                            | **Example Header**                                               | **Purpose**                                                                                    |
| -------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Request Headers**        | Sent by the client to the server to provide context for the request.       | `User-Agent`, `Accept-Language`, `Authorization`, `Content-Type` | Tell the server who you are, what format you want, and how to process the data you're sending. |
| **Response Headers**       | Sent by the server back to the client to provide context for the response. | `Content-Type`, `Date`, `Server`, `Set-Cookie`                   | Tell the client about the content being sent, the server details, and caching policies.        |
| **Representation Headers** | Describe the payload (body) of the message.                                | `Content-Type`, `Content-Length`, `Content-Encoding`             | Indicate the format, size, and compression of the data being transmitted.                      |
| **Control Headers**        | Define policies for caching, network routing, and authentication.          | `Cache-Control`, `Connection`, `Authorization`                   | Manage how the request/response is handled by intermediaries and ensure security.              |



nominatim references:
base format: 
https://nominatim.openstreetmap.org/search?q=singapore&format=json
limited:
https://nominatim.openstreetmap.org/search?q={query}&format=json&addressdetails=1&limit=1
(limit ny berdasarkan sort rank)
https://nominatim.org/release-docs/develop/api/Search/
https://nominatim.org/release-docs/latest/api/Output/
*/