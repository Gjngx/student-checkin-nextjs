'use client'
import AdminLayoutHeader from '@/components/admin/layout.header';
import LayoutFooter from '@/components/layout.footer';
import Container from 'react-bootstrap/Container';


export default function AdminLayoutApp({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <AdminLayoutHeader />
            <Container>
                <div className="my-3">
                    {children}
                </div>
            </Container>
            <LayoutFooter />
        </div>
    )
}