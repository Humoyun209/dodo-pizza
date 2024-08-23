import { NextRequest, NextResponse } from "next/server";
import { productService } from "../product.service";

export const GET = async (req: NextRequest, { params }: {params : { id: string }}) => {
    const product = await productService.getProduct(parseInt(params.id))
    return NextResponse.json(product, {status: 200})
}