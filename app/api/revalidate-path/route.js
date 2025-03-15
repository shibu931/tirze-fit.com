import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req){
    const url = req.url;
    const urlParams = new URL(url).searchParams;
    const page_slug = urlParams.get('page_slug') 
    const access_key = urlParams.get('access_key')
    if(!page_slug) return NextResponse.json({ success: false, error: 'Page slug must be provided' }, { status: 500 });
    if(!access_key || access_key != process.env.ACCESS_KEY) return NextResponse.json({ success: false, error: 'Access Key is not provided or must be invalid' }, { status: 500 });
    try {
        if(page_slug) revalidatePath(page_slug)
        return NextResponse.json({success:true, message:`Successfully revalidated ${page_slug}`}, {status:200} )
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}