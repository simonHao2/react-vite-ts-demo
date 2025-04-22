import React from 'react';
import { Card, CardBody, Row, Col, Label, Form, Input, FormFeedback } from 'reactstrap';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

interface Option {
    value: string;
    label: string;
}

interface FormValues {
    title: string;
    date: Date;
    categories: Option[];
    remark: string;
}

const BasicForm = () => {
    const { t } = useTranslation();

    const categoryOptions = [
        { value: 'technology', label: 'Technology' },
        { value: 'design', label: 'Design' },
        { value: 'development', label: 'Development' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'other', label: 'Other' },
    ];

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        date: Yup.date()
            .required('Date and time is required'),
        categories: Yup.array()
            .min(1, 'Please select at least one category')
            .required('Categories are required'),
        remark: Yup.string()
            .required('Remark is required')
            .min(10, 'Remark must be at least 10 characters'),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            title: '',
            date: new Date(),
            categories: [],
            remark: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form values:', values);
        },
    });

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumb
                    title={t("common.formTemplate.title")}
                    breadcrumbItem={t("common.formTemplate.basicForm")}
                />
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Form
                                    onSubmit={formik.handleSubmit}
                                    className="needs-validation"
                                >
                                    <Row className="mb-3">
                                        <Label
                                            htmlFor="title"
                                            className="col-md-2 col-form-label"
                                        >
                                            Title
                                        </Label>
                                        <Col md={10}>
                                            <Input
                                                name="title"
                                                placeholder="Enter title"
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.title}
                                                invalid={
                                                    formik.touched.title && formik.errors.title ? true : false
                                                }
                                            />
                                            {formik.touched.title && formik.errors.title && (
                                                <FormFeedback type="invalid">{formik.errors.title}</FormFeedback>
                                            )}
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Label
                                            htmlFor="date"
                                            className="col-md-2 col-form-label"
                                        >
                                            Date and Time
                                        </Label>
                                        <Col md={10}>
                                            <Flatpickr
                                                className={`form-control ${formik.touched.date && formik.errors.date ? 'is-invalid' : ''}`}
                                                options={{
                                                    enableTime: true,
                                                    enableSeconds: true,
                                                    time_24hr: true,
                                                    dateFormat: "Y-m-d H:i:S",
                                                    allowInput: true,
                                                    minuteIncrement: 1
                                                }}
                                                onChange={(dates) => {
                                                    formik.setFieldValue('date', dates[0]);
                                                }}
                                                value={formik.values.date ? new Date(formik.values.date) : undefined}
                                                onClose={() => formik.setFieldTouched('date', true)}
                                            />
                                            {formik.touched.date && formik.errors.date && (
                                                <div className="invalid-feedback d-block">
                                                    {String(formik.errors.date)}
                                                </div>
                                            )}
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Label
                                            htmlFor="categories"
                                            className="col-md-2 col-form-label"
                                        >
                                            Categories
                                        </Label>
                                        <Col md={10}>
                                            <Select
                                                id="categories"
                                                name="categories"
                                                isMulti
                                                options={categoryOptions}
                                                className={`${formik.touched.categories && formik.errors.categories ? 'is-invalid' : ''}`}
                                                value={formik.values.categories}
                                                onChange={(value) => formik.setFieldValue('categories', value)}
                                                onBlur={() => formik.setFieldTouched('categories', true)}
                                            />
                                            {formik.touched.categories && formik.errors.categories && (
                                                <div className="invalid-feedback d-block">
                                                    {String(formik.errors.categories)}
                                                </div>
                                            )}
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Label
                                            htmlFor="remark"
                                            className="col-md-2 col-form-label"
                                        >
                                            Remark
                                        </Label>
                                        <Col md={10}>
                                            <Input
                                                name="remark"
                                                placeholder="Enter remark"
                                                type="textarea"
                                                rows="4"
                                                className="form-control"
                                                id="remark"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.remark}
                                                invalid={
                                                    formik.touched.remark && formik.errors.remark ? true : false
                                                }
                                            />
                                            {formik.touched.remark && formik.errors.remark && (
                                                <FormFeedback type="invalid">{formik.errors.remark}</FormFeedback>
                                            )}
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Col md={{ size: 10, offset: 2 }}>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Submit
                                            </button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default BasicForm; 