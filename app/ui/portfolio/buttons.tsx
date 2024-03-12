
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePortfolioItem } from '@/app/lib/actions';

export function CreatePortfolioItem() {
    return (
        <Link
            href="/dashboard/portfolio/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create Portfolio Item</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdatePortfolioItem({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/portfolio/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeletePortfolioItem({ id }: { id: string }) {
    const deletePortfolioItemWithId = deletePortfolioItem.bind(null, id);

    return (
        <form action={deletePortfolioItemWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}
