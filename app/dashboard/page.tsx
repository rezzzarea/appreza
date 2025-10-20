import { AppSidebar } from "@/components/app-sidebar"
import CreateNotebookButton from "@/components/buttons/create-notebook-button"
import LogOut from "@/components/logout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { PageWrapper } from "@/components/wrappers/page-wrapper"
import { auth } from "@/lib/auth"
import { getNotebooks } from "@/server/notebook"
import { headers } from "next/headers"

export default async function Page() {
  // menampilkan email yg terhubung dg session berdasarkan data login
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user
  // memanggil function API getNotebooks utk menampilkan semua notebook milik user yg lg login 
  const notebooks = await getNotebooks()
  // console.log("notebooks: ", notebooks)
  // console.log("session: ", session)
  return (
    <PageWrapper breadcrumbs={[{label:"Dashboard",href:"/dashboard"}]}>
      <h1>Bismillah, berikut dashboard dari user dengan email : {user?.email}</h1>
      <CreateNotebookButton />
    </PageWrapper>
  )
}
