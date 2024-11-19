import { postOrderWeighing, postKarkas } from "@/services/apiServices";
import { formSchemaForAyam, formSchemaForKarkas, formSchemaForParting, formSchemaForSampingan } from "./formSchme";
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

interface HandleCreateParams {
    orderId: string;
    dataProductId: string;
    nomorKendaraan: string;
    jumlahEkor: string;
    jumlahAyamMati: string;
    jumlahAyamBasah: string;
    jumlahKgKeranjang: number;
    jumlahKgTimbangan: any;
    jumlahKarkas: string;
    jumlahParting: string;
    dataType: string;
    jumlahSampingan: string;
    setRefresh: any;
    refresh: boolean;
    setOpen: any;
    setErrors: any;
}

export const handleCreate = async ({
    orderId,
    dataProductId,
    nomorKendaraan,
    jumlahEkor,
    jumlahAyamMati,
    jumlahAyamBasah,
    jumlahKgKeranjang,
    jumlahKgTimbangan,
    jumlahKarkas,
    jumlahParting,
    dataType,
    jumlahSampingan,
    setRefresh,
    refresh,
    setErrors
}: HandleCreateParams) => {
    let validation;
    let dataBody;

    if (dataType === "Ayam") {
        const ayamData = {
            orderId,
            dataProductId,
            nomorKendaraan,
            jumlahEkor,
            jumlahAyamMati,
            jumlahAyamBasah,
            jumlahKgKeranjang,
            jumlahKgTimbangan,
        };
        validation = formSchemaForAyam.safeParse(ayamData);

        if (!validation.success) {
            const formattedErrors = Object.fromEntries(
                Object.entries(validation.error.format()).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        // Directly use value if it's an array of strings
                        return [key, value[0]];
                    } else if (value && '_errors' in value) {
                        // Use the first error message from _errors if it's an object with _errors
                        return [key, value._errors[0]];
                    }
                    return [key, "Invalid value"]; // Default message if format is unexpected
                })
            );
            setErrors(formattedErrors);
            return;
        }
        

        dataBody = {
            order_id: orderId,
            product_id: dataProductId,
            details: {
                type_of_item: dataType,
                qty_ayam_mati: jumlahAyamMati,
                qty_ayam_basah: jumlahAyamBasah,
                basket_weight: jumlahKgKeranjang,
                vehicle_no: nomorKendaraan,
                qty_weighing: jumlahKgTimbangan,
                number_of_item: jumlahEkor,
            },
        };

        const response = await postOrderWeighing({ dataBody });
        if (response.status === 201) {
            setRefresh(!refresh);
            Toast.fire({
                icon: "success",
                title: "Data berhsail ditambahkan"
              });
        }

    } else if (dataType === "Karkas") {
        const karkasData = {
            dataProductId,
            jumlahKarkas,
        };
        validation = formSchemaForKarkas.safeParse(karkasData);

        if (!validation.success) {
            const formattedErrors = Object.fromEntries(
                Object.entries(validation.error.format()).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        // Directly use value if it's an array of strings
                        return [key, value[0]];
                    } else if (value && '_errors' in value) {
                        // Use the first error message from _errors if it's an object with _errors
                        return [key, value._errors[0]];
                    }
                    return [key, "Invalid value"]; // Default message if format is unexpected
                })
            );
            setErrors(formattedErrors);
            return;
        }
        

        dataBody = {
            product_id: dataProductId,
            details: {
                type_of_item: "carcass",
                basket_weight: jumlahKgKeranjang,
                qty_weighing: jumlahKgTimbangan,
                number_of_item: jumlahKarkas,
            },
        };

        const response = await postKarkas({ dataBody });
        if (response.status === 201) {
            setRefresh(!refresh);
            Toast.fire({
                icon: "success",
                title: "Data berhsail ditambahkan"
              });
        }

    } else if (dataType === "Parting") {

        const partingData = {
            orderId,
            nomorKendaraan,
            jumlahParting
        };

        validation = formSchemaForParting.safeParse(partingData);

        if (!validation.success) {
            const formattedErrors = Object.fromEntries(
                Object.entries(validation.error.format()).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        // Directly use value if it's an array of strings
                        return [key, value[0]];
                    } else if (value && '_errors' in value) {
                        // Use the first error message from _errors if it's an object with _errors
                        return [key, value._errors[0]];
                    }
                    return [key, "Invalid value"]; // Default message if format is unexpected
                })
            );
            setErrors(formattedErrors);
            return;
        }
        

        dataBody = {
            order_id: orderId,
            product_id: dataProductId,
            details: {
                type_of_item: dataType,
                basket_weight: jumlahKgKeranjang,
                vehicle_no: nomorKendaraan,
                qty_weighing: jumlahKgTimbangan,
                number_of_item: jumlahParting,
            },
        };

        const response = await postOrderWeighing({ dataBody });
        if (response.status === 201) {
            setRefresh(!refresh);
            Toast.fire({
                icon: "success",
                title: "Data berhsail ditambahkan"
              });
        }

    } else if (dataType === "Sampingan") {

        const sampinganData = {
            dataProductId,
            jumlahSampingan
        };

        validation = formSchemaForSampingan.safeParse(sampinganData);

        if (!validation.success) {
            const formattedErrors = Object.fromEntries(
                Object.entries(validation.error.format()).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        // Directly use value if it's an array of strings
                        return [key, value[0]];
                    } else if (value && '_errors' in value) {
                        // Use the first error message from _errors if it's an object with _errors
                        return [key, value._errors[0]];
                    }
                    return [key, "Invalid value"]; // Default message if format is unexpected
                })
            );
            setErrors(formattedErrors);
            return;
        }
        

        dataBody = {
            product_id: dataProductId,
            details: {
                type_of_item: dataType,
                basket_weight: jumlahKgKeranjang,
                qty_weighing: jumlahKgTimbangan,
                number_of_item: jumlahSampingan,
            },
        };

        const response = await postKarkas({ dataBody });
        if (response.status === 201) {
            setRefresh(!refresh);
            Toast.fire({
                icon: "success",
                title: "Data berhsail ditambahkan"
              });
        }
    }
};
