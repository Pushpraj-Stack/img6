import fs from 'fs';
import path from 'path';

export async function GET() {
    const uploadDir = path.join(process.cwd(), 'src/app/uploads');
    const files = fs.readdirSync(uploadDir);
    return new Response(JSON.stringify(files), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
