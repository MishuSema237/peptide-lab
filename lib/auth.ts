import { auth0 } from './auth0';

export async function getUserRole() {
    const session = await auth0.getSession();
    if (!session || !session.user) return null;

    // You would typically store roles in Auth0 app_metadata or user_metadata
    // and access them here. For now, checking a strict list or metadata property.
    // const user = session.user;
    // return user['https://peptidelab.com/roles'] || ['customer']; // Example namespaced claim

    // For development without Auth0 Actions setup:
    // You can check specific email addresses for admin access
    const adminEmails = (process.env.ADMIN_EMAIL || '').split(',');
    if (session.user.email && adminEmails.includes(session.user.email)) {
        return 'admin';
    }

    return 'customer';
}

export async function isAdmin() {
    const role = await getUserRole();
    return role === 'admin';
}
