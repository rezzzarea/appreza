type TipeDataParameterQuran = {
    nomorSurat:string
}
type TipeDataAngkaUrutanYgAkanDisempilDiEndpointPI = string
type TipeDataHasilFetchinganAPIQuran = {
    data:{
        namaLatin:string
        jumlahAyat:number
    }
}
async function fetchDataQuran(angkaUrutan:TipeDataAngkaUrutanYgAkanDisempilDiEndpointPI){
    const mentahanAPIQuran = await fetch(`https://equran.id/api/v2/surat/${angkaUrutan}`)
    const dataSurat:TipeDataHasilFetchinganAPIQuran = await mentahanAPIQuran.json()
    return dataSurat.data
}
export default async function HalamanYgBerdasarkanParameterSurat(
    // cara baru yg di approve nextjs15
    {params}:{params:Promise<TipeDataParameterQuran>}
    // cara lama - nextjs14
    // {params}:{params:TipeDataParameterQuran}

){
    // cara baru yg di approve nextjs15
    const {nomorSurat} = await params
    // cara lama - nextjs14
    // const {nomorSurat} = params
    const informasiSurat = await fetchDataQuran(nomorSurat)

    return(
        <div>
            <h1>{informasiSurat.namaLatin}</h1>
            <h1>{informasiSurat.jumlahAyat}</h1>
        </div>
    )
}