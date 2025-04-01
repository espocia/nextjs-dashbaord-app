import Form from "@/app/ui/invoices/edit-form"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const [invoices, customers] = await Promise.all([
		fetchInvoiceById(id),
		fetchCustomers()
	])

	if (!invoices) {
		notFound()
	}


	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Invoices', href: '/dashbaord/invoices' },
					{
						label: 'Edit Invoice',
						href: `/dashboard/invoices/${id}/edit`,
						active: true,
					}
				]}
			/>
			<Form invoice={invoices} customers={customers} />
		</main>
	)
}
