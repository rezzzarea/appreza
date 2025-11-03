import { Fragment } from "react";
import { ModeToggle } from "../buttons/mode-toggle";
import LogOut from "../logout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
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
                                {breadcrumbs.map((breadcrumb,index)=>(
                                    // fragment dlm react u/ menambah komponen yg bersih tanpa margin&padding
                                    <Fragment key={breadcrumb.label}>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href={breadcrumb.href}>
                                                {breadcrumb.label}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                    </Fragment>
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