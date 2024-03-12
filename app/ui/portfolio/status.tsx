import { CheckCircleIcon, ExclamationCircleIcon, TvIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function PortfolioItemStatus({ status }: { status: string }) {
    return (
        <span
            className={clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-xs',
                {
                    'bg-green-500 text-white': status === 'active',
                    'bg-red-500 text-white': status === 'inactive',
                },
            )}
        >
            {status === 'active' ? (
                <>
                    Active
                    <CheckCircleIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
            {status === 'inactive' ? (
                <>
                    Inactive
                    <ExclamationCircleIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
        </span>
    );
}
