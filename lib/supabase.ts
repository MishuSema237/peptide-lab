import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

// Client for browser-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (with service role key)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseAdmin = supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })
    : null;

/**
 * Upload image to Supabase Storage
 * @param file - File to upload
 * @param bucket - Storage bucket name
 * @param path - File path in bucket
 * @returns Public URL of uploaded file
 */
export async function uploadImage(
    file: File,
    bucket: string = 'products',
    path?: string
): Promise<string> {
    const fileName = path || `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

    return publicUrl;
}

/**
 * Delete image from Supabase Storage
 * @param filePath - Path to file in bucket
 * @param bucket - Storage bucket name
 */
export async function deleteImage(
    filePath: string,
    bucket: string = 'products'
): Promise<void> {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
        throw new Error(`Delete failed: ${error.message}`);
    }
}
