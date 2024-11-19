import Select, { SingleValue } from "react-select";
import { Input } from "@/components/ui/input";

// type FormData = z.infer<typeof formSchemaForKarkas>;

// Type for the select option
interface Option {
    label: string;
    value: string;
}

interface BodyKarkas {
    dataProductKarkas: Option[];
    setJumlahKarkas: any
    jumlahKgTimbangan: any;
    setJumlahKgKeranjang: any
    setDataProductId: any
    errors?: any // Set optional with a default value later
    jumlahKarkas: any
    selectDataProduct: any
    setSelectDataProduct: any
}

export const BodyForKarkas: React.FC<BodyKarkas> = ({
    dataProductKarkas,
    setJumlahKarkas,
    jumlahKgTimbangan,
    setJumlahKgKeranjang,
    setDataProductId,
    errors, // Default to an empty object if errors is undefined
    jumlahKarkas,
    selectDataProduct,
    setSelectDataProduct
}) => {

    const handleChange = (option: SingleValue<Option>) => {
        setDataProductId(option?.value || "");
        setSelectDataProduct(option)
    };

    return (
        <>
            <div>
                <p className="mb-7 text-4xl font-medium">{jumlahKgTimbangan} kg</p>
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col col-span-1 gap-3">
                        <label htmlFor="kode-order">Produk</label>
                        <Select
                            name="produk"
                            value={selectDataProduct}
                            options={dataProductKarkas}
                            onChange={handleChange}
                            placeholder="Pilih produk"
                            isClearable
                        />
                        {/* Use optional chaining to safely access errors.dataProductId */}
                        {errors?.dataProductId && <p className="text-red-500">{errors.dataProductId}</p>}
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="number_of_item">Jumlah karkas</label>
                        <Input
                            value={jumlahKarkas}
                            name="number_of_item"
                            onChange={(e) => setJumlahKarkas(e.target.value)}
                            placeholder="Jumlah ekor"
                            className="rounded-md h-9"
                            type="text"
                        />
                        {errors?.jumlahKarkas && <p className="text-red-500">{errors.jumlahKarkas}</p>}
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
                            className="rounded-md border p-2"
                            name="basket_weight"
                        >
                            <option value="6.7">6,7 kg</option>
                            <option value="7.8">7,8 kg</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};
