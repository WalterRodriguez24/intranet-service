import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_API_KEY as string;

const supabase = createClient(url, key);

export async function uploadFile(filename: string, file: Buffer) {
  const { data, error } = await supabase.storage
    .from("backoffice-bucket")
    .upload(`${filename}`, file, {
      upsert: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export function getPublicUrl(filename: string) {
  const {
    data: { publicUrl },
  } = supabase.storage.from("backoffice-bucket").getPublicUrl(filename);

  return publicUrl;
}
