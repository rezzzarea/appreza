import * as React from "react"
import { ChevronRight } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { get } from "http"
import { getNotebooks } from "@/server/notebook"
import Image from "next/image"

// This is sample data.

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks()
  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      ...(notebooks.notebooks?.map((notebook)=>({
        title: notebook.name,
        url: `/dashboard/${notebook.id}`,
        items: notebook.notes.map((note)=>({
          title: note.title,
          url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
        })),
      })) ?? []),
    ],
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={32}
            height={32}
          />
          <h1 className="font-medium text-xl tracking-wider">AppReza</h1>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">

      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
