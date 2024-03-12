'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/auth';
import { AuthError, Session } from 'next-auth';
import { getUser } from './data';
export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export type PortfolioItemState = {
    errors?: {
        title?: string[];
        image_url?: string[];
        body?: string[];
        link?: string[];
        status?: string[];
    };
    message?: string | null;
};

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });


export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // Insert data into the database
    try {
        await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}


const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {

    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function deletePortfolioItem(id: string) {
    try {
        await sql`DELETE FROM portfolio WHERE id = ${id}`;
        revalidatePath('/dashboard/portfolio');
        return { message: 'Deleted Portfolio Item.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Portfolio Item.' };
    }
}

const FormSchemaPortfolio = z.object({
    id: z.string(),
    title: z.string({
        invalid_type_error: 'Please enter a title.',
    }),
    image_url: z.string({
        invalid_type_error: 'Please enter an image URL.',
    }),
    body: z.string({
        invalid_type_error: 'Please enter a body.',
    }),
    link: z.string({
        invalid_type_error: 'Please enter a link.',
    }),
    status: z.enum(['active', 'inactive'], {
        invalid_type_error: 'Please select a status.',
    }),
    date: z.string(),
});

const UpdatePortfolioItem = FormSchemaPortfolio.omit({ id: true, date: true });

export async function updatePortfolioItem(
    id: string,
    prevState: PortfolioItemState,
    formData: FormData,
) {
    const validatedFields = UpdatePortfolioItem.safeParse({
        title: formData.get('title'),
        image_url: formData.get('image_url'),
        body: formData.get('body'),
        link: formData.get('link'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Portfolio Item.',
        };
    }

    const { title, image_url, body, link, status } = validatedFields.data;

    try {
        await sql`
      UPDATE portfolioitems
      SET title = ${title}, image_url = ${image_url}, body = ${body}, link = ${link}, status = ${status}
      WHERE id = ${id}
    `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Portfolio Item.' };
    }

    revalidatePath('/dashboard/portfolio');
    redirect('/dashboard/portfolio');
}

const CreatePortfolioItem = FormSchemaPortfolio.omit({ id: true, date: true });

export async function createPortfolioItem(prevState: PortfolioItemState, formData: FormData) {
    const validatedFields = CreatePortfolioItem.safeParse({
        title: formData.get('title'),
        image_url: formData.get('image_url'),
        body: formData.get('body'),
        link: formData.get('link'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Portfolio Item.',
        };
    }

    const { title, image_url, body, link, status } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];
    
    const session = await auth();
    const email = session?.user?.email ?? '';
    const user = await getUser(email);
    const userId = user.id;
    
    try {
        await sql`
        INSERT INTO portfolioitems (title, image_url, body, link, status, date, user_id)
        VALUES (${title}, ${image_url}, ${body}, ${link}, ${status}, ${date},${userId})
    `;
    } catch (error) {
        return { message: 'Database Error: Failed to Create Portfolio Item.' };
    }

    revalidatePath('/dashboard/portfolio');
    redirect('/dashboard/portfolio');
}
