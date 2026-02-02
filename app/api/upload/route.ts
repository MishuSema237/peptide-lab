import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isAdmin } from '@/lib/auth';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        // 1. Check Authentication
        const isUserAdmin = await isAdmin();
        if (!isUserAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Check Service Client
        if (!supabaseAdmin) {
            return NextResponse.json({ error: 'Server configuration error (Missing Admin Key)' }, { status: 500 });
        }

        // 3. Parse FormData
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // 4. Validate File (Optional: Check size/type)
        // const bytes = await file.arrayBuffer();
        // const buffer = Buffer.from(bytes);

        // 5. Upload to Supabase (using Admin Client)
        const bucket = 'PeptidesLab';
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

        console.log(`[API/Upload] Uploading ${fileName} to ${bucket}...`);

        const { data, error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type,
            });

        if (error) {
            console.error('[API/Upload] Supabase Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // 6. Get Public URL
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return NextResponse.json({ success: true, url: publicUrl });

    } catch (error: any) {
        console.error('[API/Upload] Unexpected Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
