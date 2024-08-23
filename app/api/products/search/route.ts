import { NextRequest, NextResponse } from "next/server";
import { productService } from "../product.service";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("query")
    const products = await productService.searchProducts(query || "")
    req.cookies.set("query", query || "")
    return NextResponse.json(products, {status: 200})
}