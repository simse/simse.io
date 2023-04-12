import { z } from "zod";
import { zfd } from "zod-form-data";

const imageRequestSchema = zfd.formData({
    url: zfd.text(),
    w: zfd.numeric(z.number().optional()),
    h: zfd.numeric(z.number().optional()),
    q: zfd.numeric(z.number().optional()),
});

export default imageRequestSchema;