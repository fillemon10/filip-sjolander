import Form from '@/app/ui/portfolio/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Create Portfolio Item',
};
export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Portfolio', href: '/dashboard/portfolio' },
                    {
                        label: 'Create Portfolio Item',
                        href: '/dashboard/portfolio/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}
