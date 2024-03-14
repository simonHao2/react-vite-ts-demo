import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import classnames from 'classnames';
interface Props {
  title?: string;
  breadcrumbItem?: string;
  breadcrumbTitle?: any;
  items?: any;
}
const Breadcrumbs = (props: Props): JSX.Element => {
  const { items = [] } = props;
  return (
    <React.Fragment>
      <Col xs="12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          <div>
            {!!props.breadcrumbItem && <h4 className="mb-0 font-size-18">{props.breadcrumbItem}</h4>}
            {!!props.breadcrumbTitle && <h4 className="mb-0 font-size-18">{props.breadcrumbTitle}</h4>}
          </div>
          <div className="page-title-right">
            <Breadcrumb listClassName="m-0 justify-content-end">
              {!!props.title && (
                <BreadcrumbItem active>
                  <p className={classnames(['m-0'])}>{props.title}</p>
                </BreadcrumbItem>
              )}
              {items.length > 0 &&
                items.map(
                  (item, index) =>
                    !!item && (
                      <BreadcrumbItem
                        key={`bread-item-${index}-${item.title}`}
                        active={!item.to}
                        className="text-nowrap"
                      >
                        {!!item.to ? (
                          <Link to={item.to || '#'}>{item.title}</Link>
                        ) : (
                          <p className={classnames(['m-0'])}>{item.title}</p>
                        )}
                      </BreadcrumbItem>
                    )
                )}
              {!!props.breadcrumbItem && (
                <BreadcrumbItem active className="text-nowrap">
                  <p className={classnames(['text-muted', 'm-0'])}>{props.breadcrumbItem}</p>
                </BreadcrumbItem>
              )}
            </Breadcrumb>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
}
Breadcrumbs.propTypes = {
  breadcrumbItems: PropTypes.array,
  items: PropTypes.array,
  title: PropTypes.string
}
export default Breadcrumbs;
