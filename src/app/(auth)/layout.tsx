import {GridPattern} from "@/components/grid-pattern";

const AuthLayout = ({
                        children
                    }: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-dvh flex items-center justify-center mx-auto overflow-y-hidden">
            <GridPattern
                className="absolute inset-x-0 -top-14 -z-10 h-dvh w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_55%,transparent_80%)]"
                yOffset={-96}
                interactive
            />
            {children}
        </div>
    );
}

export default AuthLayout;