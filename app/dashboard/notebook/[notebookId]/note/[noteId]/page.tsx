import { PageWrapper } from "@/components/wrappers/page-wrapper"
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
