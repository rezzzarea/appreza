// type declaration = deklarasi tipe data
type TipeDataParameterQuran = {
    nomorSurat:string
}
type TipeDataHasilFetchinganAPIQuran = {
    data:{
        namaLatin:string
        jumlahAyat:number
    }
}
type TipeDataUntukDisempilKeAPI = string

async function fetchDataQuran(angkaUrutan:TipeDataUntukDisempilKeAPI){
    const mentahanAPIQuran = await fetch(`https://equran.id/api/v2/surat/${angkaUrutan}`)
    const dataSurat:TipeDataHasilFetchinganAPIQuran = await mentahanAPIQuran.json()
    return dataSurat.data
}

export default async function QuranTersortir(
    {params}:{params:Promise<TipeDataParameterQuran>}
){
    const {nomorSurat} = await params
    const informasiSurat = await fetchDataQuran(nomorSurat)
    return(
        <div>
            <h1>Nama surat nya adalah: {informasiSurat.namaLatin}</h1>
            <h1>Jumlah ayat nya adalah: {informasiSurat.jumlahAyat}</h1>
        </div>
    )
}