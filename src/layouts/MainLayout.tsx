import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Navbar } from "@/components/ui/common/navbar/Navbar"
import { Footer } from "@/components/ui/common/footer/Footer"
import { ListProduct } from "@/components/ui/common/listProduct/ListProduct"
import { DisplayCard } from "@/components/ui/common/displayCard/DisplayCard"
import { useState } from "react"
import { Modal } from "@/components/ui/common/modal/Modal"
import { ListDataTimbangan } from "@/components/ui/common/listDataTimbangan/ListDataTimbangan"

export function MainLayout() {

  const [hidden, setHidden] = useState(false)
  const [dataType, setDataType] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [dataOrder, setDataOrder] = useState<[]>([])
  const [dataProductKarkas, setDataProductKarkas] = useState<[]>([])
  const [dataProductSampingan, setDataProductSampingan] = useState<[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)



  return (
    <>
      <section>
        <DisplayCard
          hidden={hidden}
          setHidden={setHidden}
          setDataType={setDataType}
          setDataOrder={setDataOrder}
          setLoading={setLoading}
        />
        <div className="h-[8vh]">
          <Navbar />
        </div>
        <div className="h-[84vh]">
          <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border"
          >
            <ResizablePanel defaultSize={65}>
              <div className="p-6 bg-gray-50 h-full">
                <Modal
                  open={open} 
                  setOpen={setOpen} 
                  dataType={dataType} 
                  dataOrder={dataOrder} 
                  dataProductKarkas={dataProductKarkas}
                  dataProductSampingan={dataProductSampingan}
                  setRefresh={setRefresh}
                  refresh={refresh}
                />
                <ListProduct
                  hidden={hidden}
                  setHidden={setHidden}
                  dataType={dataType}
                  setOpen={setOpen}
                  setDataProductKarkas={setDataProductKarkas}
                  setDataProductSampingan={setDataProductSampingan}
                  setLoading={setLoading}
                  loading={loading}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={35}>
              <div className="p-6">
                <ListDataTimbangan refresh={refresh}/>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="h-[8vh]">
          <Footer />
        </div>
      </section>
    </>
  )
}
