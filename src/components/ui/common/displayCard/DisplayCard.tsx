// import React from "react"
import { getOrders } from "@/services/apiServices"

interface DisplayCard {
    hidden: boolean
    setHidden: any
    setDataType: any
    setDataOrder: any
    setLoading: any
}



export const DisplayCard: React.FC<DisplayCard> = ({ hidden, setHidden, setDataType, setDataOrder, setLoading }) => {

    const handleClick = async (param: string) => {
        setHidden(!hidden)
        setDataType(param)
        setLoading(true)
        try {
            const {data, status} = await getOrders()
            if(status === 200) {
                if(param == 'Ayam') {
                    const newData = data.filter((item: { vendor: { transaction_type: string } }) => item.vendor?.transaction_type === "inbound")
                    .map((item: { id: any; kode_order: any }) => ({
                        value: item.id,
                        label: item.kode_order
                    }))
                    setDataOrder(newData)
                }else if(param == 'Parting') {
                    const newData = data.filter((item: { vendor: { transaction_type: string } }) => item.vendor?.transaction_type === "outbound")
                    .map((item: { id: any; kode_order: any }) => ({
                        value: item.id,
                        label: item.kode_order
                    }))
                    setDataOrder(newData)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className={`${hidden ? `hidden` : ``}`}>
                <div
                    className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
                ></div>
                <div className="absolute z-40 flex items-center justify-center w-full h-full">
                    <div className="flex gap-2">
                        <div onClick={() => handleClick('Ayam')} className="max-w-sm cursor-pointer bg-white rounded-md p-5 hover:bg-gray-50">
                            <div>
                                <img
                                    src="https://res.cloudinary.com/boxity-id/image/upload/v1713273620/ptDHKManufacturing/kategori/ayam_wobgug.png"
                                    alt=""
                                />
                            </div>
                            <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white mb-3">
                                Ayam
                            </h5>
                            <p className="text-gray-800">Produk produk tentang ayam hidup</p>
                        </div>
                        <div
                            onClick={() => handleClick('Karkas')}
                            className="max-w-sm cursor-pointer bg-white rounded-md p-5 hover:bg-gray-50"
                        >
                            <div>
                                <img
                                    src="https://res.cloudinary.com/boxity-id/image/upload/v1713273620/ptDHKManufacturing/kategori/dagingayamsegar_gq4pt8.png"
                                    alt=""
                                />
                            </div>
                            <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                                Karkas
                            </h5>
                            <p className="text-gray-800 mt-3">
                                Daging ayam utuh tanpa kepala dan ceker yang sudah dibersihkan
                                dari bulunya juga jeroannya.
                            </p>
                        </div>
                        <div
                            onClick={() => handleClick('Parting')}
                            className="max-w-sm cursor-pointer bg-white rounded-md p-5 hover:bg-gray-50"
                        >
                            <div>
                                <img
                                    src="https://res.cloudinary.com/boxity-id/image/upload/v1713273622/ptDHKManufacturing/kategori/dagingayamolahan_jwq3mw.png"
                                    alt=""
                                />
                            </div>
                            <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                                Parting
                            </h5>
                            <p className="text-gray-800 mt-3">
                                Berbagai produk potongan ayam, seperti sayap, dada, dan lain
                                lain.
                            </p>
                        </div>
                        <div
                            onClick={() => handleClick('Sampingan')}
                            className="max-w-sm cursor-pointer bg-white rounded-md p-5 hover:bg-gray-50"
                        >
                            <div>
                                <img
                                    src="https://res.cloudinary.com/boxity-id/image/upload/v1713817516/ptDHKManufacturing/kategori/produksammmpingan_wspxzl.png"
                                    alt=""
                                />
                            </div>
                            <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                                Sampingan
                            </h5>
                            <p className="text-gray-800 mt-3">
                                Produk-produk sampingan yang dihasilkan selama pemrosesan ayam,
                                seperti bulu ayam, darah ayam, dan tulang yang dapat digunakan
                                untuk berbagai tujuan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}