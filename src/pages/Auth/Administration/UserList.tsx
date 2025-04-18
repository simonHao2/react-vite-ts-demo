import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useTranslation } from "react-i18next";
//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumbs';
import SearchBox from '../../../components/SearchBox/SearchBox';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const UserList = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    // Mock data - replace with your actual user data
    const users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
    ];

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredUsers(users);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery]);

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Users" breadcrumbItem="User List" />

                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    {/* <CardTitle>User Management</CardTitle> */}
                                    <Row>
                                        <Col md={6}>
                                            <SearchBox
                                                value={searchQuery}
                                                onChange={setSearchQuery}
                                                placeholder={t("common.search")}
                                                variant="square"
                                            />
                                        </Col>
                                    </Row>

                                    <div className="table-rep-plugin">
                                        <div className="table-responsive mb-0" data-pattern="priority-columns">
                                            <Table id="tech-companies-1" className="table table-striped table-bordered">
                                                <Thead>
                                                    <Tr>
                                                        <Th>Name</Th>
                                                        <Th>Email</Th>
                                                        <Th>Role</Th>
                                                        <Th>Actions</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {filteredUsers.map(user => (
                                                        <Tr key={user.id}>
                                                            <Td>{user.name}</Td>
                                                            <Td>{user.email}</Td>
                                                            <Td>{user.role}</Td>
                                                            <Td>
                                                                <button className="btn btn-primary btn-sm me-1">
                                                                    <i className="bx bx-edit"></i>
                                                                </button>
                                                                <button className="btn btn-danger btn-sm">
                                                                    <i className="bx bx-trash"></i>
                                                                </button>
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                    {isSearching && filteredUsers.length === 0 && (
                                                        <Tr>
                                                            <Td colSpan={4} className="text-center">
                                                                {t("common.noResults")}
                                                            </Td>
                                                        </Tr>
                                                    )}
                                                </Tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserList;
