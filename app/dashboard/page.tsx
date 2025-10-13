import { AppSidebar } from "@/components/app-sidebar"
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

export default function Page() {
  return (
    <PageWrapper breadcrumbs={[{label:"Dashboard",href:"/dashboard"}]}>
      <h1>Bismillah</h1>
    </PageWrapper>
  )
}
