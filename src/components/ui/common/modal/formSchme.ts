import z from "zod"

export const formSchemaForAyam = z.object({
    orderId: z.number().min(1, "Order ID is required"),
    nomorKendaraan: z.string().min(1, "Nomor kendaraan is required"),
    dataProductId:z.number(),
    jumlahEkor: z.string().nonempty("Jumlah ekor is required"),
    jumlahAyamMati: z.string(),
    jumlahAyamBasah: z.string(),
});


export const formSchemaForKarkas = z.object({
    dataProductId: z.number(),
    jumlahKarkas: z.string().regex(/^\d+$/, "Jumlah karkas harus berupa angka"),
});

export const formSchemaForParting = z.object({
    orderId: z.number().min(1, "Order ID is required"),
    nomorKendaraan: z.string().min(1, "Nomor kendaraan is required"),
    jumlahParting: z.string().nonempty("Jumlah ekor is required"),
});

export const formSchemaForSampingan = z.object({
    dataProductId: z.number(),
    jumlahSampingan: z.string().regex(/^\d+$/, "Jumlah sampingan harus berupa angka"),
});