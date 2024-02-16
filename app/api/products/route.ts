import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	await connectMongoDB();
	const products = await Product.find();
	return NextResponse.json({
		products,
	});
}

export async function POST(request: NextRequest) {
	const { name, image, price, category } = await request.json();

	await connectMongoDB();
	await Product.create({ name, image, price, category });
	
	return NextResponse.json(
		{
			message: "Product created"
		},
		{
			status: 201
		}
	);
}

export async function DELETE(request: NextRequest) {
	const id = request.nextUrl.searchParams.get("id");

	await connectMongoDB();
	await Product.findByIdAndDelete(id);
	
	return NextResponse.json(
		{
			message: "Product delete"
		},
		{
			status: 200
		}
	);
}