import { House } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export const Navbar = () => {
    return (
        <>
            <nav className="flex justify-between items-center px-3">
                <img className="h-16" src="https://res.cloudinary.com/boxity-id/image/upload/v1713275746/ptDHKManufacturing/logo-long_qepphg.png" alt="" />
                <div className="flex items-center gap-3">
                    <House />
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </nav>
        </>
    )
}