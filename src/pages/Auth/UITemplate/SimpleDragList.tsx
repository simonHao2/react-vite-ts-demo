import React, { useState } from 'react';
import ReactDragListView from 'react-drag-listview';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import { useTranslation } from 'react-i18next';

interface Item {
    id: string;
    name: string;
    order: number;
}

const SimpleDragList = () => {
    const { t } = useTranslation();
    const [items, setItems] = useState<Item[]>([
        { id: 'item-1', name: 'Item 1', order: 0 },
        { id: 'item-2', name: 'Item 2', order: 1 },
        { id: 'item-3', name: 'Item 3', order: 2 },
        { id: 'item-4', name: 'Item 4', order: 3 },
        { id: 'item-5', name: 'Item 5', order: 4 },
    ]);

    const onDragEnd = (fromIndex: number, toIndex: number) => {
        const newItems = [...items];
        const item = newItems.splice(fromIndex, 1)[0];
        newItems.splice(toIndex, 0, item);
        
        // 更新排序顺序
        const updatedItems = newItems.map((item, index) => ({
            ...item,
            order: index
        }));

        setItems(updatedItems);
    };

    const handleSave = () => {
        const sortedData = items.map(item => ({
            id: item.id,
            name: item.name,
            order: item.order
        }));
        
        console.log('排序后的数据:', sortedData);
    };

    const dragProps = {
        onDragEnd,
        nodeSelector: 'li',
        handleSelector: 'li'
    };

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumb
                    title={t("common.uiTemplate.title")}
                    breadcrumbItem="Simple Drag List"
                />
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <div className="d-flex justify-content-end mb-3">
                                    <Button
                                        color="primary"
                                        onClick={handleSave}
                                    >
                                        保存排序
                                    </Button>
                                </div>
                                <ReactDragListView {...dragProps}>
                                    <ul className="list-unstyled">
                                        {items.map((item, index) => (
                                            <li
                                                key={item.id}
                                                className="p-3 mb-2 bg-light rounded cursor-move"
                                                style={{
                                                    cursor: 'move',
                                                    userSelect: 'none'
                                                }}
                                            >
                                                {item.name} (Order: {item.order})
                                            </li>
                                        ))}
                                    </ul>
                                </ReactDragListView>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default SimpleDragList; 