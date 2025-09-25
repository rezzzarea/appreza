async function fetchDataJoke(urutanJoke:string){
    const responseMentah = await fetch(`https://v2.jokeapi.dev/joke/any?idRange=${urutanJoke}`)
    const dataJoke = await responseMentah.json()
    return dataJoke
}
export default async function CandaanYgTersortir(
    {params}:{params:Promise<{nomorCandaan:string}>}
){
    const {nomorCandaan} = await params
    const informasiJoke = await fetchDataJoke(nomorCandaan)
    return(
        // <div>
        //     <h1>{informasiJoke.category}</h1>
        //     <h1>Candaan tak bertanya jawab: {informasiJoke.joke}</h1>
        //     <h1>Pertanyaan candaan:  {informasiJoke.setup}</h1>
        //     <h1>Jawaban candaan: {informasiJoke.delivery}</h1>
        // </div>
        <div>
            {informasiJoke.type === "single" ? (
                <h1>Candaan tak bertanya jawab:  {informasiJoke.joke}</h1>):(
                <div>
                    <h1>Pertanyaan candaan:  {informasiJoke.setup}</h1>
                    <h1>Jawaban candaan: {informasiJoke.delivery}</h1>
                </div>
            ) }
        </div>
    )
}