import { Button } from "../../button";
import React, { useEffect, useState } from "react";
import { getProduct } from "@/services/apiServices";
import { getProductByCategorie } from "@/services/apiServices";
import { Loading } from "../loading/Loading";

// Definisikan tipe untuk produk
interface Product {
    id: number;
    name: string;
    image: string;
    // Tambahkan properti lain sesuai dengan struktur data produk
}

interface ListProduct {
    hidden: boolean
    setHidden: any
    dataType: string
    setOpen: any
    setDataProductKarkas: any
    setDataProductSampingan: any
    setLoading: any
    loading: any
}

export const ListProduct: React.FC<ListProduct> = ({
    hidden, 
    setHidden, 
    dataType, 
    setOpen, 
    setDataProductKarkas,
    setDataProductSampingan,
    setLoading,
    loading
}) => {
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const product = await getProduct({param: dataType});
                setData(product.data);
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        getData();
    }, [dataType]);

    const handleClick = async () => {
        setOpen(true)

        if(dataType == 'Karkas') {
            try {
                const response = await getProductByCategorie({param: dataType})
                const newData = response.data.map((item: { id: any; name: any; }) => ({
                    value: item.id,
                    label: item.name
                }))
                setDataProductKarkas(newData)
            } catch (error) {
                console.log(Response);
            }
        } else if(dataType == 'Sampingan') {
            try {
                const response = await getProductByCategorie({param: dataType})
                const newData = response.data.map((item: { id: any; name: any; }) => ({
                    value: item.id,
                    label: item.name
                }))
                setDataProductSampingan(newData)
            } catch (error) {
                console.log(Response);
            }
        }
    }


    if(loading){
        return(
            <Loading/>
        )
    }

    return (
        <div>
            <Button onClick={() => setHidden(!hidden)} className="py-6 px-7 text-sm">Pilih tipe</Button>
            <div className="mt-4 space-y-2">
                <h2 className="text-2xl font-medium">{dataType}</h2>
                <p className="text-xl font-medium">Pilih kategori barang yang akan ditimbang</p>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <div onClick={handleClick} key={item.id} className="border p-5 rounded-lg bg-white text-center hover:bg-gray-50 cursor-pointer">
                            <div>
                                <img src={item.image} alt={item.name} className="w-full h-auto object-cover" />
                            </div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};
