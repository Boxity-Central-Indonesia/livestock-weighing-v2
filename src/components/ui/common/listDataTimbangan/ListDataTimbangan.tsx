import { TableComponents } from "./Table"
import { ScrollArea } from "@/components/ui/scroll-area"


interface ListProps {
    refresh: boolean
}

export const ListDataTimbangan:React.FC<ListProps> = ({refresh}) => {
    return(
        <>
        <section>
            <h2 className="text-2xl font-semibold">Daftar data timbangan</h2>
            <hr className="mt-4 mb-2"/>
            <ScrollArea className="h-[90vh]">
            <TableComponents refresh={refresh}/>
            </ScrollArea>
        </section>
        </>
    )
}