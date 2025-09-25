// 14 juli s/d 31 juli
/*
setup nextjs, 

*/
// library function panggilan , siap pakai , bukan u/ menampilkan komponen
// pr = mentranslate nomer value data di kolom nama surat menjadi namaLatin sesuai JSON api
// form create maupun edit = tambah input 
export async function fetchDataQuran():
    Promise<{
        nomor:number
        namaLatin:string 
        jumlahAyat:number
    }[]> // [] agar bila dipanggil fetching datanya 1 kali 
{
    const res = await fetch("https://equran.id/api/v2/surat")
    const json = await res.json()
    return json.data
}