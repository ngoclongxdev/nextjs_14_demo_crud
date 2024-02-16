import connectMongoDB from "@/libs/mongodb";
import ProductModel from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";
import { Key } from "react";

export async function GET(request: NextRequest, { params }: { params: { id: Key } }) {
	const { id } = params;
	
	await connectMongoDB();
	const product = await ProductModel.findOne({_id: id});

	return NextResponse.json(
		{
			product
		},
		{
			status: 200
		}
	);
}

export async function PUT(request: NextRequest, { params } : { params: { id: Key } }) {
	const { id } = params;
	const {
		newName: name,
		newImage: image,
		newPrice: price,
		newCategory: category
	} = await request.json();

	await connectMongoDB();
	await ProductModel.findByIdAndUpdate(id, { name, image, price, category });
	
	return NextResponse.json(
		{
			message: "Product updated"
		},
		{
			status: 200
		}
	)
}