import fs from 'fs';
import path from 'path';

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get('file');
    const uploadDir = path.join(process.cwd(), 'src/app/uploads');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    const data = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(data));

    return new Response('File uploaded successfully', { status: 200 });
}
