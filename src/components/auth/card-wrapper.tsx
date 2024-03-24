"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    title?: string;
};

export const CardWrapper = ({
                                children,
                                headerLabel,
                                backButtonLabel,
                                backButtonHref,
                                showSocial,
                                title,
                            }: CardWrapperProps) => {
    return (
        <Card className="max-w-[400px] w-5/6 shadow-md">
            <CardHeader>
                <Header label={headerLabel} title={title}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    );
};