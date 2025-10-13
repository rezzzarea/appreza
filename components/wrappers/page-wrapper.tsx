import { ModeToggle } from "../buttons/mode-toggle";
import LogOut from "../logout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../ui/breadcrumb"
import { SidebarTrigger } from "../ui/sidebar"

interface PageWrapperProps{
    children:React.ReactNode
    breadcrumbs:{
        label: string;
        href: string;
    }[]
}
export function PageWrapper({children,breadcrumbs}:PageWrapperProps){
    return(
        <div className="flex flex-col gap-4 border">
            <header className="flex items-center p-4 border-b">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((breadcrumb)=>(
                                    <BreadcrumbItem key={breadcrumb.label}>
                                        <BreadcrumbLink href={breadcrumb.href}>
                                            {breadcrumb.label}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <LogOut />
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
            </div>
        </div>
    )
}