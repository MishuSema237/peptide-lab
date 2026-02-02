import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

// USE SERVICE ROLE KEY (Bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const BUCKET_NAME = 'PeptidesLab';

async function testUpload() {
    console.log(`[Test] Attempting upload to bucket '${BUCKET_NAME}' using SERVICE ROLE key...`);

    const fileName = `test-upload-${Date.now()}.txt`;
    const fileContent = 'This is a test file to verify bucket write access.';

    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, fileContent, {
            contentType: 'text/plain',
            upsert: false
        });

    if (error) {
        console.error('❌ Upload FAILED:', error.message);
        if (error.message.includes('not found')) {
            console.error('   -> Check if bucket name is exactly correct (case-sensitive).');
        }
    } else {
        console.log('✅ Upload SUCCESSFUL!');
        console.log('   Path:', data.path);

        // Clean up
        console.log('   Cleaning up (deleting test file)...');
        const { error: delError } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([fileName]);

        if (delError) console.error('   (Cleanup failed:', delError.message, ')');
        else console.log('   Cleanup successful.');
    }
}

testUpload();
