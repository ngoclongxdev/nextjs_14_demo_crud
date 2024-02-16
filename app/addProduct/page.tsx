"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProduct() {
	const [name, setName] = useState("");
	const [image, setImage] = useState("/images/1.png");
	const [price, setPrice] = useState("1");
	const [category, setCategory] = useState("");

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name || !image) {
			alert("Name and image are required.");
			return;
		}

		try {
			const res = await fetch("http://localhost:3000/api/products", {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({ name, image, price, category }),
			});

			if (res.ok) {
				router.push("/products");
				router.refresh();
			} else {
				throw new Error("Failed to create a product");
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="font-bold py-10 text-2xl">Add New Product</h1>
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-3">
				<input
					onChange={e => setName(e.target.value)}
					value={name}
					className="input input-bordered input-accent w-full max-w-xs"
					type="text"
					placeholder="Product Name"
				/>

				<input
					onChange={e => setImage(e.target.value)}
					value={image}
					className="input input-bordered input-accent w-full max-w-xs"
					type="text"
					placeholder="/images/1.png"
				/>

				<input
					onChange={e => setPrice(e.target.value)}
					value={price}
					className="input input-bordered input-accent w-full max-w-xs"
					type="number"
					placeholder="1"
				/>
				<input
					onChange={e => setCategory(e.target.value)}
					value={category}
					className="input input-bordered input-accent w-full max-w-xs"
					type="text"
					placeholder="Product Category"
				/>

				<button
					type="submit"
					className="btn btn-primary w-full max-w-xs"
				>
					Add Product
				</button>
					
			</form>
		</>
	);
}