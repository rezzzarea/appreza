"use client"
import * as React from "react"
import { ChevronRight, File } from "lucide-react"

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

import { useQueryState } from "nuqs"

interface SidebarDataProps{
  data:{
    navMain:{
      title:string
      items:{
        title:string
        url:string
      }[]
    }[]
  }
}

export default function SidebarData({data}:SidebarDataProps) {
  const [search] = useQueryState("search",{defaultValue:""})
  const filteredData = data.navMain.filter((item) => {
    const notebookMatches = item.title.toLowerCase().includes(search.toLowerCase())
    const noteMatches = item.items.some((note) => note.title.toLowerCase().includes(search.toLowerCase()))
    return notebookMatches || noteMatches
  }
    
  )
  return (

    <>
      {filteredData.map((item) => (
        <Collapsible
          key={item.title}
          title={item.title}
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
            >
              <CollapsibleTrigger>
                {item.title}{" "}
                {/* tambahin chevron u/ isi jurnal */}
                {item.items.length > 0 && (
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        {/* menambahkan icon file u/ setiap note di sidebar */}
                        <a href={item.url}><File />{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>


  )
}
