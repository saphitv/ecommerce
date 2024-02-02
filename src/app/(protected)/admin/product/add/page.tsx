import ProductForm from "@/app/(protected)/admin/_components/product-form";
import {Separator} from "@/components/ui/separator";
import Filters from "@/app/_components/filters";

export default function AddProductPage() {
    return (
        <div className="p-4 w-full flex items-center justify-center flex-col">
            <ProductForm/>

        </div>
    )
}
