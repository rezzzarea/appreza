import CreateNotebookButton from "@/components/buttons/create-notebook-button"
import NotebookCard from "@/components/cards/notebook-card"
import { PageWrapper } from "@/components/wrappers/page-wrapper"
import { getNotebooks } from "@/server/notebook"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Page() {
  // menampilkan email yg terhubung dg session berdasarkan data login
  const session = await auth.api.getSession({
    headers: await headers()
  })
  // error handling u/ lempar kalau g ada session
  if (!session) {
    redirect("/");
  }
  const user = session?.user
  // memanggil function API getNotebooks utk menampilkan semua notebook milik user yg lg login 
  const notebooks = await getNotebooks()
  // console.log("notebooks: ", notebooks)
  // console.log("session: ", session)
  return (
    <Suspense>
      <PageWrapper breadcrumbs={[{label:"Dashboard",href:"/dashboard"}]}>
        {/* <h1>Bismillah, berikut dashboard dari user dengan email : {user?.email}</h1> */}
        <h1>Bismillah, berikut dashboard dari user " {user?.name} " dan email : {user?.email} </h1>
        <CreateNotebookButton />
        <div className="grid grid-cols-1 gap-4 md:grid-cols2 lg:grid-cols-3 xl:grid-cols-4">
          {notebooks.success && notebooks?.notebooks?.map((notebook)=>(
            <NotebookCard key={notebook.id} notebook={notebook}/>
          ))}
        </div>
        {notebooks.success && notebooks?.notebooks?.length === 0 && (
          <div>No notebooks found, please make your notebook</div>
        )}

      </PageWrapper>
    </Suspense>
  )
}
