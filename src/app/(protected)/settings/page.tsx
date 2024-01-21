"use client";

import { Suspense} from "react";
import SettingsForm from "@/app/(protected)/settings/_components/settings-form";

const SettingsPage = () => {


    return (
        <div className="w-full p-12 container space-y-6">
            <h2 className="text-2xl font-bold">⚙️ Settings</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <SettingsForm/>
            </Suspense>
        </div>
    );
}

export default SettingsPage;