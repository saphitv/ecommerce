import {QueryClientProvider} from "@tanstack/react-query";
import Providers from "@/components/providers";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <>
                {children}
        </>
    );
}

export default ProtectedLayout;