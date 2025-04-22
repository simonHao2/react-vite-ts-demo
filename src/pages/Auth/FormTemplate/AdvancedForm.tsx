import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import { useTranslation } from 'react-i18next';

const AdvancedForm = () => {
    const { t } = useTranslation();

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumb
                    title={t("common.formTemplate.title")}
                    breadcrumbItem={t("common.formTemplate.advancedForm")}
                />
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                {/* 表单内容将在后续实现 */}
                                <div>Advanced Form Content</div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default AdvancedForm; 