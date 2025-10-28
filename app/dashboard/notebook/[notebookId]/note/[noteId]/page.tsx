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
import { getNoteById } from "@/server/notes"
import RichTextEditor from "@/components/tiptap/rich-text-editor"
import type { JSONContent } from "@tiptap/react"

type Params = Promise<{noteId:string}>

export default async function NotePage({params}:{params:Params}) {
  // menampilkan email yg terhubung dg session berdasarkan data login
  const { noteId } = await params
  const { note } = await getNoteById(noteId)

  return (
    <PageWrapper breadcrumbs={[
        {label:"Dashboard",href:"/dashboard"},
        {label:note?.notebook?.name ?? "Notebook",href:`/dashboard/notebook/${note?.notebook?.id}`},
        {label:note?.title ?? "Note",href:`/dashboard/note/${noteId}`},
      ]}
    >
      <h1>{note?.title}</h1>
      <RichTextEditor
        content={note?.content as JSONContent[]}
        noteId={noteId}
      />

    </PageWrapper>
  )
}
