import fs from 'fs';
import path from 'path';

export async function DELETE(req, { params }) {
    const { name } = params;
    const filePath = path.join(process.cwd(), 'src/app/uploads', name);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // File deletion
        return new Response('File deleted', { status: 200 });
    } else {
        return new Response('File not found', { status: 404 });
    }
}
