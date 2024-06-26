"use client";

import {UploadDropzone} from "@/lib/uploadthing";
import {toast} from "sonner";

export default function UploadImage({onUploadComplete}: { onUploadComplete: (res: any) => void}) {

    return (
        <main className="">
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    onUploadComplete(res)

                }}

                onUploadError={(_: Error) => {
                    // Do something with the error.
                    toast.error("Upload Failed: Check the file size and try again")
                }}

            />
        </main>
    );
}