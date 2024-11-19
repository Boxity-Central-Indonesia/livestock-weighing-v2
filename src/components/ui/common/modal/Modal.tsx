import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { Button } from "../../button";
import { BodyForAyam } from "./BodyForAyam";
import { BodyForKarkas } from "./BodyForKarkas";
import { BodyForParting } from "./BodyForParting";
import { BodyForSampingan } from "./BodyForSampingan";
import { handleCreate } from "./handleCreate";
import { timbanganServices } from "@/services/timbanganServices";

interface ModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	dataType: string;
	dataOrder: [];
	dataProductKarkas: []
	dataProductSampingan: []
	setRefresh: any
	refresh: boolean
}

export const Modal: React.FC<ModalProps> = ({ 
	open, 
	setOpen, 
	dataType, 
	dataOrder,
	dataProductKarkas,
	dataProductSampingan,
	setRefresh,
	refresh
}) => {
	const [orderId, setOrderId] = useState('')
	const [dataProductId, setDataProductId] = useState('')
	const [nomorKendaraan, setNomorKendaraan] = useState('')
	const [jumlahEkor, setJumlahEkor] = useState('')
	const [jumlahAyamMati, setJumlahAyamMati] = useState('')
	const [jumlahAyamBasah, setJumlahAyamBasah] = useState('')
	const [jumlahKgKeranjang, setJumlahKgKeranjang] = useState(6.7)
	const [jumlahKgTimbangan, setJumlahKgTimbangan] = useState<string>()
	const [jumlahKarkas, setJumlahKarkas] = useState<string>('')
	const [jumlahParting, setJumlahParting] = useState<string>('')
	const [jumlahSampingan, setJumlahSampingan] = useState<string>('')
	const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
	const [dataOrderProductQuantity, setDataOrderProductQuantity] = useState<any>()
	const [dataOrderProductSelisih, setDataOrderProductSelisih] = useState<any>()
	const [dataOrderProduct, setDataOrderProduct] = useState<[]>()
	const [selectDataOrder, setSelectDataOrder] = useState<any>({})
	const [selectDataProduct, setSelectDataProduct] = useState<any>({})



	const dataTimbangan = timbanganServices()


	useEffect(() => {
		setJumlahKgTimbangan(dataTimbangan)
	} ,[dataTimbangan])

	useEffect(() => {
		setOrderId('')
		setDataProductId('')
		setNomorKendaraan('')
		setJumlahEkor('')
		setJumlahAyamMati('')
		setJumlahAyamBasah('')
		setDataOrderProductQuantity('')
		setDataOrderProductSelisih('')
		setSelectDataOrder({})
		setSelectDataProduct({})
		setJumlahKarkas('')
		setJumlahParting('')
		setJumlahSampingan('')
	}, [dataType, refresh])


	return(
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow overflow-y-auto" />
				<Dialog.Content className="fixed left-1/2 top-1/2 w-[35vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow max-h-[90vh] overflow-y-auto">
					<Dialog.Title className="m-0 text-xl font-medium text-mauve12 mb-4">
						Timbangan
					</Dialog.Title>
					<hr className="mb-2" />
	
					{/* Conditional rendering for each dataType */}
					{dataType === 'Ayam' && <BodyForAyam 
						errors={errors}
						setOrderId={setOrderId}
						setDataProductId={setDataProductId}
						setNomorKendaraan={setNomorKendaraan}
						setJumlahEkor={setJumlahEkor}
						setJumlahAyamMati={setJumlahAyamMati}
						setJumlahAyamBasah={setJumlahAyamBasah}
						setJumlahKgKeranjang={setJumlahKgKeranjang}
						dataOrder={dataOrder}
						jumlahKgTimbangan={jumlahKgTimbangan}
						jumlahEkor={jumlahEkor}
						jumlahAyamtBasah={jumlahAyamBasah}
						jumlahAyamtMati={jumlahAyamMati}
						nomorKendaraan={nomorKendaraan}
						setDataOrderProductQuantity={setDataOrderProductQuantity}
						setDataOrderProductSelisih={setDataOrderProductSelisih}
						dataOrderProductQuantity={dataOrderProductQuantity}
						dataOrderProductSelisih={dataOrderProductSelisih}
						setDataOrderProduct={setDataOrderProduct}
						dataOrderProduct={dataOrderProduct}
						setSelectDataOrder={setSelectDataOrder}
						selectDataOrder={selectDataOrder}
						setSelectDataProduct={setSelectDataProduct}
						selectDataProduct={selectDataProduct}
					/>
					}
					{dataType === 'Karkas' && <BodyForKarkas 
						errors={errors}
						setJumlahKarkas={setJumlahKarkas}
						jumlahKgTimbangan={jumlahKgTimbangan}
						setJumlahKgKeranjang={setJumlahKgKeranjang}
						dataProductKarkas={dataProductKarkas}
						setDataProductId={setDataProductId}
						jumlahKarkas={jumlahKarkas}
						setSelectDataProduct={setSelectDataProduct}
						selectDataProduct={selectDataProduct}
					/>}
					{dataType === 'Parting' && <BodyForParting 
						errors={errors}
						dataOrder={dataOrder}
						setOrderId={setOrderId}
						setNomorKendaraan={setNomorKendaraan}
						setDataProductId={setDataProductId}
						setJumlahParting={setJumlahParting}
						jumlahKgTimbangan={dataTimbangan}
						setJumlahKgKeranjang={setJumlahKgKeranjang}
						nomorKendaraan={nomorKendaraan}
						jumlahParting={jumlahParting}
						setDataOrderProductQuantity={setDataOrderProductQuantity}
						setDataOrderProductSelisih={setDataOrderProductSelisih}
						dataOrderProductQuantity={dataOrderProductQuantity}
						dataOrderProductSelisih={dataOrderProductSelisih}
						setDataOrderProduct={setDataOrderProduct}
						dataOrderProduct={dataOrderProduct}
						setSelectDataOrder={setSelectDataOrder}
						selectDataOrder={selectDataOrder}
						setSelectDataProduct={setSelectDataProduct}
						selectDataProduct={selectDataProduct}
					/>}
					{dataType === 'Sampingan' && <BodyForSampingan
						errors={errors} 
						dataProductSampingan={dataProductSampingan}
						setJumlahSampingan={setJumlahSampingan}
						jumlahKgTimbangan={dataTimbangan}
						setJumlahKgKeranjang={setJumlahKgKeranjang}
						setDataProductId={setDataProductId}
						jumlahSampingan={jumlahSampingan}
						selectDataProduct={selectDataProduct}
						setSelectDataProduct={setSelectDataProduct}
					/>}
	
					<hr className="mt-5" />
					<div className="mt-[25px] flex justify-end">
						<Button onClick={() => handleCreate({
							setErrors: setErrors,
							orderId: orderId,
							dataProductId: dataProductId,
							nomorKendaraan: nomorKendaraan,
							jumlahEkor: jumlahEkor,
							jumlahAyamMati: jumlahAyamMati,
							jumlahAyamBasah: jumlahAyamBasah,
							jumlahKgKeranjang: jumlahKgKeranjang,
							jumlahKgTimbangan: jumlahKgTimbangan,
							jumlahKarkas: jumlahKarkas,
							jumlahParting: jumlahParting,
							jumlahSampingan: jumlahSampingan,
							dataType: dataType,
							setRefresh: setRefresh,
							refresh: refresh,
							setOpen: setOpen
						})}>Simpan</Button>
					</div>
					<Dialog.Close asChild>
						<button
							onClick={() => setOpen(false)}
							className="absolute p-0 right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
							aria-label="Close"
						>
							x
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
