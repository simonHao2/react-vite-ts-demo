import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    CardBody,
    // UncontrolledTooltip,
    Button,
    UncontrolledTooltip
} from "reactstrap";
// import toastr from 'toastr';
//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";
import PageLoading from "../../../components/PageLoading/PageLoading";
import RemoteTablePagination from "../../../components/RemoteTablePagination/RemoteTablePagination";
// import SearchInput from "../../../components/SearchInput/SearchInput";
// import "toastr/build/toastr.min.css";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import RoleCreateModal from "./RoleModal/RoleCreateModal";
// import RoleEditModal from "./RoleModal/RoleEditModal";
// import SweetAlert from "react-bootstrap-sweetalert";
// import { roleActions } from "../../../redux/reducer/Role/role.action";
// import { promiseDispatch } from "../../../utils/commonRedux";
// import permissionLevel from "../../../utils/permissionLevel";

const RoleList = () => {
    const { t } = useTranslation();
    // const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [data, setData] = useState<Array<object>>([]);
    const [addModal, setAddModal] = useState<boolean>(false);
    // const [editModal, setEditModal] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<string>("desc");
    const [sortField, setSortField] = useState<string>("name");
    // const [searchKey, setSearchKey] = useState<string>("");
    // const [role, setRole] = useState<Role>();
    // const [roleId, setRoleId] = useState("");
    // const [isDel, setIsDel] = useState<boolean>(false);
    const [loaded, setLoaded] = useState(false);
    // const editAuth = permissionLevel("Role", "Edit");
    // const delAuth = permissionLevel("Role", "Delete");


    // const { roles, rolesTotal, permissions } = useAppSelector((state) => ({
    //     roles: state.role.roles,
    //     rolesTotal: state.role.rolesTotal,
    //     permissions: state.role.permissions
    // }));
    const roleData = [
        {
            "_id": "612db37174cd7493f4b57e22",
            "ctime": "2024-03-19T07:02:28.108Z",
            "mtime": "2024-03-20T03:43:13.028Z",
            "name": "test-role",
            "permissions": "Company:Delete,Company:Edit,Company:Read,Company:View,Role:Delete,Role:Edit,Role:Read,Role:View,Team:Delete,Team:Edit,Team:Read,Team:View,User:Delete,User:Edit,User:Read,User:View"
        }
    ];

    useEffect(() => {
        setLoaded(true);
        if (roleData) {
            setData(setRow(roleData))
            setTotalCount(roleData.length);
        }
    }, []);



    const columns = [
        {
            dataField: "_id",
            text: "No",
            sort: true,
            hidden: true,
        },
        {
            dataField: "name",
            text: t("role.name"),
            sort: true,
            onSort: (field: string, order: string) => {
                setSortField(field);
                setSortOrder(order);
            },
        },
        {
            dataField: "permissions",
            text: t("role.permissions"),
            sort: true,
            onSort: (field: string, order: string) => {
                setSortField(field);
                setSortOrder(order);
            },
        },
        {
            dataField: "action",
            text: t("common.action"),
            sort: true,
        },
    ];
    // const status = {
    //     true: (
    //         <Badge
    //             className="font-size-12 badge-soft-success "
    //             color="badge-success"
    //             pill
    //         >
    //             {t("common.active")}
    //         </Badge>
    //     ),
    //     false: (
    //         <Badge
    //             className="font-size-12 badge-soft-secondary "
    //             color="badge-secondary"
    //             pill
    //         >
    //             {t("common.inactive")}
    //         </Badge>
    //     )
    // };

    const toggle_detailRole = (role) => {
        if (role) {
            console.log(role);
        }
    }


    const setRow = (list: any = []) => {
        return list.map((item: any, index: number) => {
            return {
                no: index,
                _id: item._id,
                name: item.name,
                permissions:
                    item.permissions && item.permissions.length > 100 ? (
                        <div>
                            {item.permissions && item.permissions
                                .substring(0, 100)
                                .split(",")
                                .map((p: string, subIdx: number) => {
                                    return (
                                        <span key={subIdx} className="badge rounded-pill text-truncate bg-info float-start me-2 mb-1">
                                            {p}
                                        </span>
                                    );
                                })}
                            <Link
                                to="#"
                                className="mr-3 text-primary"
                                title={item.permissions}
                                onClick={() => {
                                    toggle_detailRole(item);
                                }}
                            >
                                ...&lt;more&gt;
                            </Link>
                        </div>
                    ) : (
                        item.permissions && item.permissions.split(",").map((p, index) => {
                            return (
                                <span key={index} className="badge rounded-pill text-truncate bg-info float-start me-2 mb-1">
                                    {p}
                                </span>
                            );
                        })
                    ),
                action: (
                    <div>
                        <Link to="#" className="mr-3 text-primary">
                            <i
                                className="fas fa-eye text-success mr-1"
                                id={"detailtooltip" + index}
                                onClick={() => {
                                    toggle_detailRole(item);
                                }}
                            ></i>
                            <UncontrolledTooltip placement="top" target={"detailtooltip" + index}>
                                {t("common.view")}
                            </UncontrolledTooltip>
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                ),
            };
        });
    }


    // const handleSearch = (e: any) => {
    //     if (e.keyCode === 13) {
    //         setSearchKey(e.target.value);
    //         setPage(1);
    //     }
    // };

    const toggle_add = () => {
        setAddModal(!addModal);
    }

    const onPageChange = async (page: number) => {
        setPage(page);
    }
    const onSizePerPageChange = async (page: number) => {
        setPage(1);
        setSizePerPage(page);
    }
    document.title = "Role & Role List";

    if (!loaded) {
        return <PageLoading />;
    }

    return (
        <Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title={t("common.administration.roles")}
                        breadcrumbItem={t("common.administration.roles")}
                    />
                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md="4">
                                            {/* <SearchInput
                                                id="roleSearch"
                                                searchKey={searchKey}
                                                handleSearch={handleSearch}
                                            /> */}
                                        </Col>
                                        <Col sm="8">
                                            <div className="text-sm-end">
                                                <Button
                                                    type="button"
                                                    color="success"
                                                    onClick={toggle_add}
                                                    data-toggle="modal"
                                                    data-target=".bs-example-modal-center"
                                                    className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                                >
                                                    <i className="mdi mdi-plus mr-1"></i>{" "}
                                                    {t("role.newRole")}
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <RemoteTablePagination
                                        keyField={"_id"}
                                        data={data}
                                        columns={columns}
                                        sortField={sortField}
                                        sortOrder={sortOrder}
                                        totalSize={totalCount}
                                        page={page}
                                        sizePerPage={sizePerPage}
                                        onPageChange={onPageChange}
                                        toggle_detail={() => { return false; }}
                                        onSizePerPageChange={onSizePerPageChange}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    );
};

export default RoleList;
