"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useTransition, useState, Suspense} from "react";
import { useSession } from "next-auth/react";

import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SettingsSchema } from "@/schemas/auth";
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/auth/settings";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {UserRoleEnum} from "@/lib/db/schemas/auth";
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