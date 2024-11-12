import Select, { SingleValue } from "react-select";
import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { getProductByOrder } from "@/services/apiServices";
  



// Tipe untuk opsi select
interface Option {
  label: string;
  value: string;
}

interface BodyForParting {
  dataOrder: [],
  setOrderId: any
  setNomorKendaraan: any
  setDataProductId: any
  setJumlahParting: any
  jumlahKgTimbangan: any
  setJumlahKgKeranjang: any
  errors: any
}

export const BodyForParting: React.FC<BodyForParting> = ({
  dataOrder,
  setOrderId,
  setNomorKendaraan,
  setDataProductId,
  setJumlahParting,
  jumlahKgTimbangan,
  setJumlahKgKeranjang,
  errors
}) => {
  const [dataProduct, setDataProduct] = useState()

  const handleChangeForOrder = async (option: SingleValue<Option>) => {
    setOrderId(option?.value);

    try {
      const response = await getProductByOrder({param: option?.value})
      const newData = response.data.map((item: { id: any; name: any; }) => ({
        value: item.id,
        label: item.name
      }))
      setDataProduct(newData)
    } catch (error) {
      console.log(error);
    }

  };

  const handleChangeForProduct = (option: SingleValue<Option>) => {
    setDataProductId(option?.value);
  };

  return (
    <>
      <div>
        <p className="mb-1 text-4xl font-medium">{jumlahKgTimbangan || 0} kg </p>
        <p className="mt-2 mb-5 text-gray-700">
          <b>Jumlah Pesanan:</b> kg <br />
          <b>Selisih timbangan:</b> kg <br />
        </p>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col col-span-2 gap-3">
            <label htmlFor="kode-order">Kode order</label>
            <Select
              name="kode-order"
              options={dataOrder}
              onChange={handleChangeForOrder}
              placeholder="Pilih kode order"
              isClearable
            />
            {errors?.orderId && <p className="text-red-500">{errors.orderId}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="vehicle_no">Nomor kendaraan</label>
            <Input
              name="vehicle_no"
              onChange={(e) => setNomorKendaraan(e.target.value)}
              placeholder="Nomor kendaraan"
              className="rounded-md h-9"
              type="text"
            />
            {errors?.nomorKendaraan && <p className="text-red-500">{errors.nomorKendaraan}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="product">Produk</label>
            <Select
              name="product"
              options={dataProduct}
              onChange={handleChangeForProduct}
              placeholder="Pilih produk"
              isClearable
            />
            
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="number_of_item">Jumlah parting</label>
            <Input
              name="number_of_item"
              onChange={(e) => setJumlahParting(e.target.value)}
              placeholder="Jumlah ekor"
              className="rounded-md h-9"
              type="text"
            />
            {errors?.jumlahParting && <p className="text-red-500">{errors.jumlahParting}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="qty_weighing">Jumlah Kg timbangan</label>
            <Input
              disabled
              name="qty_weighing"
              value={jumlahKgTimbangan}
              placeholder="Qty timbangan"
              className="rounded-md h-9"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="basket_weight">Jumlah kg keranjang</label>
            <select 
            onChange={(e) => setJumlahKgKeranjang(e.target.value)}
            className="rounded-md border p-2" name="basket_weight">
              <option value="6.7">6,7 kg</option>
              <option value="7.8">7,8 kg</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
