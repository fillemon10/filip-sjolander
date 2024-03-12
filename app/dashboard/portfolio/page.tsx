import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/portfolio/table';
import { lusitana } from '@/app/ui/fonts';
import { PortfolioTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchPortfolioPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { CreatePortfolioItem } from '@/app/ui/portfolio/buttons';

export const metadata: Metadata = {
    title: 'Portfolio',
};
export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchPortfolioPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Portfolio</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search portfolio items..." />
                <CreatePortfolioItem />
            </div>
            <Suspense key={query + currentPage} fallback={<PortfolioTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
