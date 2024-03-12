'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createPortfolioItem } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';


export default function Form() {
    const initialState = { message: null, errors: {} };

    const [state, dispatch] = useFormState(createPortfolioItem, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Title*/}
                <div className="mb-4">
                    <label htmlFor="title" className="mb-2 block text-sm font-medium">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm"
                        defaultValue=""
                        aria-describedby="title-error"
                    />
                    <div id="title-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.title &&
                            state.errors.title.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Body */}
                <div className="mb-4">
                    <label htmlFor="body" className="mb-2 block text-sm font-medium">
                        Body
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm"
                        defaultValue=""
                        aria-describedby="body-error"
                    />
                    <div id="body-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.body &&
                            state.errors.body.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Link */}
                <div className="mb-4">
                    <label htmlFor="link" className="mb-2 block text-sm font-medium">
                        Link
                    </label>
                    <input
                        type="text"
                        id="link"
                        name="link"
                        className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm"
                        defaultValue=""
                        aria-describedby="link-error"
                    />
                    <div id="link-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.link &&
                            state.errors.link.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Image URL */}
                <div className="mb-4">
                    <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm"
                        defaultValue=""
                        aria-describedby="image_url-error"
                    />
                    <div id="image_url-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.image_url &&
                            state.errors.image_url.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* Status active or inactive */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="active"
                                    name="status"
                                    type="radio"
                                    value="active"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"

                                />
                                <label
                                    htmlFor="active"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Active <CheckCircleIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="inactive"
                                    name="status"
                                    type="radio"
                                    value="inactive"

                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="inactive"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Inactive <ExclamationCircleIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id="status-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.status &&
                            state.errors.status.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </fieldset>
                <div id="message" aria-live="polite" aria-atomic="true">
                    {state.message && (
                        <p className="mt-2 text-sm text-red-500">{state.message}</p>
                    )}
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/portfolio"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Portfolio Item</Button>
            </div>
        </form >
    );
}
