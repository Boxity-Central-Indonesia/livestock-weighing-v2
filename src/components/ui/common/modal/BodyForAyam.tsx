import Select, { SingleValue } from "react-select";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { getProductByOrder, getOrdersById } from "@/services/apiServices";
import { ScrollArea } from "@/components/ui/scroll-area"



interface Option {
  label: string;
  value: string;
}

interface BodyProps {
  setOrderId: any;
  setDataProductId: any;
  setNomorKendaraan: any;
  setJumlahEkor: any;
  setJumlahAyamMati: any;
  setJumlahAyamBasah: any;
  setJumlahKgKeranjang: any;
  jumlahKgTimbangan: any;
  dataOrder: Option[];
  errors: any
  jumlahEkor: any
  nomorKendaraan: any
  jumlahAyamtMati: any
  jumlahAyamtBasah: any
  setDataOrderProductQuantity: any
  setDataOrderProductSelisih: any
  dataOrderProductQuantity: any
  dataOrderProductSelisih: any
  setDataOrderProduct: any
  dataOrderProduct: any
}

type OrderProduct = {
  id: string; // Adjust the type based on your actual data (e.g., number, string, etc.)
  quantity_pesanan: number; // Adjust the type as needed
  selisih_quantity: number; // Adjust the type as needed
};

export const BodyForAyam: React.FC<BodyProps> = ({
  setOrderId,
  setDataProductId,
  setNomorKendaraan,
  setJumlahEkor,
  setJumlahAyamMati,
  setJumlahAyamBasah,
  setJumlahKgKeranjang,
  jumlahKgTimbangan,
  dataOrder,
  errors,
  jumlahEkor,
  nomorKendaraan,
  jumlahAyamtMati,
  jumlahAyamtBasah,
  setDataOrderProductQuantity,
  setDataOrderProductSelisih,
  dataOrderProductQuantity,
  dataOrderProductSelisih,
  setDataOrderProduct,
  dataOrderProduct,
}) => {
  const [dataProduct, setDataProduct] = useState<Option[]>([]);

  const handleChangeForOrder = async (option: SingleValue<Option>) => {
    setOrderId(option?.value);
    try {
      const response = await getProductByOrder({ param: option?.value });
      const newData = response.data.map((item: { id: any; name: any }) => ({
        value: item.id,
        label: item.name,
      }));
      setDataProduct(newData);
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await getOrdersById({ param: option?.value });
      if(response.status === 200) {
        setDataOrderProduct(response.data.products)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeForProduct = (option: SingleValue<Option>) => {
    setDataProductId(option?.value);
    const data = dataOrderProduct.find((item: OrderProduct) => item.id === option?.value)

    setDataOrderProductQuantity(data.quantity_pesanan)
    setDataOrderProductSelisih(data.selisih_quantity)

  };
  

  return (
    <>
      <div>
        <p className="mb-1 text-4xl font-medium">{jumlahKgTimbangan} kg </p>
        <p className="mt-2 mb-5 text-gray-700">
          <b>Jumlah Pesanan:</b> {dataOrderProductQuantity} kg <br />
          <b>Selisih timbangan:</b> {Number(dataOrderProductSelisih.toFixed(1))} kg <br />
        </p>
        <ScrollArea>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2 gap-3">
              <label htmlFor="kode-order">Kode order</label>
              <Select
                name="kode-order"
                options={dataOrder}
                onChange={handleChangeForOrder}
                placeholder="Pilih kode order"
                isClearable
                className="mt-3"
              />
              {errors.orderId && <p className="text-red-500">{errors.orderId}</p>}
            </div>

            <div className="">
              <label htmlFor="vehicle_no">Nomor kendaraan</label>
              <Input
                value={nomorKendaraan}
                name="vehicle_no"
                onChange={(e) => setNomorKendaraan(e.target.value)}
                placeholder="Nomor kendaraan"
                className="rounded-md h-9 mt-3"
                type="text"
              />
              {errors.nomorKendaraan && <p className="text-red-500">{errors.nomorKendaraan}</p>}
            </div>
            <div className="">
              <label htmlFor="product">Produk</label>
              <Select
                name="product"
                className="mt-3"
                options={dataProduct}
                onChange={handleChangeForProduct}
                placeholder="Pilih produk"
                isClearable
              />
              {errors.dataProductId && <p className="text-red-500">{errors.dataProductId}</p>}
            </div>

            <div className="">
              <label htmlFor="number_of_item">Jumlah ekor</label>
              <Input
                value={jumlahEkor}
                name="number_of_item"
                onChange={(e) => setJumlahEkor(e.target.value)}
                placeholder="Jumlah ekor"
                className="rounded-md h-9 mt-3"
                type="text"
              />
              {errors.jumlahEkor && <p className="text-red-500">{errors.jumlahEkor}</p>}
            </div>

            <div className="">
              <label htmlFor="qty_weighing">Jumlah Kg timbangan</label>
              <Input
                disabled
                value={jumlahKgTimbangan}
                name="qty_weighing"
                placeholder="Qty timbangan"
                className="rounded-md h-9 mt-3"
                type="text"
              />
            </div>

            <div className="">
              <label htmlFor="qty_ayam_mati">Jumlah ayam mati</label>
              <Input
                value={jumlahAyamtMati}
                name="qty_ayam_mati"
                onChange={(e) => setJumlahAyamMati(e.target.value)}
                placeholder="Jumlah ayam mati"
                className="rounded-md h-9 mt-3"
                type="number"
              />
              {errors.jumlahAyamMati && <p className="text-red-500">{errors.jumlahAyamMati}</p>}
            </div>

            <div className="">
              <label htmlFor="qty_ayam_basah">Jumlah ayam basah</label>
              <Input
                value={jumlahAyamtBasah}
                name="qty_ayam_basah"
                onChange={(e) => setJumlahAyamBasah(e.target.value)}
                placeholder="Jumlah ayam basah"
                className="rounded-md h-9 mt-3"
                type="number"
              />
              {errors.jumlahAyamBasah && <p className="text-red-500">{errors.jumlahAyamBasah}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="basket_weight">Jumlah kg keranjang</label>
              <select
                onChange={(e) => setJumlahKgKeranjang(e.target.value)}
                className="rounded-md border p-2 mt-3 dark:text-white"
                name="basket_weight"
              >
                <option className="dark:text-white" value="6.7">6,7 kg</option>
                <option className="dark:text-white" value="7.8">7,8 kg</option>
              </select>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};
