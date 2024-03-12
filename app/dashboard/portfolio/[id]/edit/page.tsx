import Form from '@/app/ui/portfolio/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPortfolioItemById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Edit Portfolio Item',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [portfolioItem] = await Promise.all([fetchPortfolioItemById(id)]);
    if (!portfolioItem) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Portfolio', href: '/dashboard/portfolio' },
                    {
                        label: 'Edit Portfolio Item',
                        href: `/dashboard/portfolio/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form portfolioItem={portfolioItem}/>
        </main>
    );
}
