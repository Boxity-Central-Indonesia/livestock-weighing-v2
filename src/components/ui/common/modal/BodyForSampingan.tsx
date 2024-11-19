import Select, { SingleValue } from "react-select";
import { Input } from "@/components/ui/input"
  



// Tipe untuk opsi select
interface Option {
  label: string;
  value: string;
}

interface BodySampingan {
  dataProductSampingan: any
  setJumlahSampingan: any
  jumlahKgTimbangan: any
  setJumlahKgKeranjang: any
  setDataProductId: any
  errors: any
  jumlahSampingan: any
}

export const BodyForSampingan: React.FC<BodySampingan> = ({
  dataProductSampingan,
  setJumlahSampingan,
  jumlahKgTimbangan,
  setJumlahKgKeranjang,
  setDataProductId,
  errors,
  jumlahSampingan,
}) => {

  const handleChange = (option: SingleValue<Option>) => {
    setDataProductId(option?.value)
};



  return (
    <>
      <div>
        <p className="mb-7 text-4xl font-medium"> kg </p>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="product">Produk</label>
            <Select
              name="product"
              options={dataProductSampingan}
              onChange={handleChange}
              placeholder="Pilih produk"
              isClearable
            />
            {errors?.dataProductId && <p className="text-red-500">{errors.dataProductId}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="number_of_item">Jumlah sampingan</label>
            <Input
              value={jumlahSampingan}
              name="number_of_item"
              onChange={(e) => setJumlahSampingan(e.target.value)}
              placeholder="Jumlah ekor"
              className="rounded-md h-9"
              type="text"
            />
            {errors?.jumlahSampingan && <p className="text-red-500">{errors.jumlahSampingan}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="qty_weighing">Jumlah Kg timbangan</label>
            <Input
              disabled
              value={jumlahKgTimbangan}
              name="qty_weighing"
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
