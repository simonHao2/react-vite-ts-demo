import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import { useTranslation } from 'react-i18next';

interface Item {
    id: string;
    name: string;
    order: number;
}

const DragDropList = () => {
    const { t } = useTranslation();
    const [items, setItems] = useState<Item[]>([
        { id: 'item-1', name: 'Item 1', order: 0 },
        { id: 'item-2', name: 'Item 2', order: 1 },
        { id: 'item-3', name: 'Item 3', order: 2 },
        { id: 'item-4', name: 'Item 4', order: 3 },
        { id: 'item-5', name: 'Item 5', order: 4 },
    ]);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

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

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumb
                    title={t("common.uiTemplate.title")}
                    breadcrumbItem={t("common.uiTemplate.dragAndDropList")}
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
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {items.map((item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="p-3 mb-2 bg-light rounded"
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    backgroundColor: snapshot.isDragging ? '#e9ecef' : '#f8f9fa',
                                                                    boxShadow: snapshot.isDragging ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
                                                                }}
                                                            >
                                                                {item.name} (Order: {item.order})
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DragDropList; 