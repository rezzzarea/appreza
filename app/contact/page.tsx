import ButtonComponent from "./button"
// asynchronous component berfungsi u/ menampilkan data dari API sekaligus u/ menampilkan isi website & server component bersamaan
type Post = {
    id:number
    title:string
    body:string
}
export default async function Apaaja() {
    console.log("dikirim dari halaman kontak, ini client / server component?")
    // response = mentahan api dr db
    // await sintaks u/ 
    // fetch itu u/ narik mentahan ny aja, blm dlm bentuk json yg rapi
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts:Post[] = await response.json()
    console.log(posts)
    return (
        <>
        {/* fragment itu tag tak bernama sama persis spt dif  */}
        <div>
            {/* ciri" komponen modular 1 tag saja */}
            <ButtonComponent/>
            <div>halaman contact disini</div>
            <h1>
                Post Title List
            </h1>
            <ul>
                {posts.map(post=>(
                    <li key={post.id}>
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>

        </>
    )
}
