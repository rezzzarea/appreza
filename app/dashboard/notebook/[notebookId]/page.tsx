import NoteCard from "@/components/cards/note-card"
import { PageWrapper } from "@/components/wrappers/page-wrapper"
import { getNotebookById } from "@/server/notebook"
import CreateNoteButton from "@/components/buttons/create-note-button"

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
      <CreateNoteButton notebookId={notebookId}/>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebook?.notes?.map((note)=>(
          <NoteCard key={note.id} note={note}/>
        ))}
      </div>

    </PageWrapper>
  )
}
