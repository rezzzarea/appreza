import { AppSidebar } from "@/components/app-sidebar"
import CreateNotebookButton from "@/components/buttons/create-notebook-button"
import NoteCard from "@/components/cards/note-card"
import NotebookCard from "@/components/cards/notebook-card"
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
import { getNotebookById, getNotebooks } from "@/server/notebook"
import { headers } from "next/headers"
import { Note } from "@/db/schema"

type Params = Promise<{notebookId:string}>

export default async function Page({params}:{params:Params}) {
  // menampilkan email yg terhubung dg session berdasarkan data login
  const { notebookId } = await params
  const { notebook } = await getNotebookById(notebookId)

  return (
    <PageWrapper breadcrumbs={[
        {label:"Dashboard",href:"/dashboard"},
        {label:notebook?.name ?? "Note",href:`/dashboard/notebook/${notebookId}`},
      ]}
    >
      <h1>{notebook?.name}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebook?.notes?.map((note)=>(
          <NoteCard key={note.id} note={note}/>
        ))}
      </div>

    </PageWrapper>
  )
}
