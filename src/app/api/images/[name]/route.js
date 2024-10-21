import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
    const { name } = params;
    const filePath = path.join(process.cwd(), 'src/app/uploads', name);

    if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath);
        return new Response(file, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg', // Change this based on your file type
                'Content-Disposition': `inline; filename="${name}"`,
            },
        });
    } else {
        return new Response('File not found', { status: 404 });
    }
}
