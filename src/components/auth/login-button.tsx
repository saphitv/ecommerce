"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
};

export const LoginButton = ({
                                children,
                                mode = "redirect",
                                asChild
                            }: LoginButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push("/login");
    };

    if (mode === "modal") {

        return <></>
        /*return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className="p-0 w-auto bg-transparent border-none">
                    <LoginForm />
                </DialogContent>
            </Dialog>
        )*/
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
    );
};