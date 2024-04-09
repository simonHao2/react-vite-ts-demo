import paginationFactory, {
  PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone, PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";
// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";

import { useTranslation } from "react-i18next";
const RemoteTablePagination = props => {
  const {
    keyField,
    data,
    columns,
    totalSize,
    sortField,
    sortOrder,
    page,
    sizePerPage,
    onPageChange,
    onSizePerPageChange,
    toggle_detail,
    totalCount,
  } = props;
  const { t } = useTranslation();
  const language = localStorage.getItem("I18N_LANGUAGE");
  const customTotal = ({ from, to, size }) => {
    return (
      <span style={{ padding: 10 }} className="react-bootstrap-table-pagination-total">
        {language === "en" ? <span>{t('common.Showing')} {from} {t("common.to")}  {to} {t("common.of")} {size} {t("common.Results")}</span>
          : <span>{t('common.Showing')} {from} {t("common.to")}  {to} {t("common.of")}   {t("common.Results")} {size}</span>
        }
      </span>
    )
  }
  const rowEvents = {
    onClick: (e, row) => {
      if (e.target.id === "") {
        toggle_detail(row);
      }
      return false;
    }
  };

  const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
    <li
      key={text}
      role="presentation menuitem"
      className="dropdown-item"
      style={{ cursor: "pointer" }}
      tabIndex={-1}
      data-page={page}
      onMouseDown={(e) => {
        e.preventDefault();
        onSizePerPageChange(page);
      }}
    >
      {text}
    </li>
  );
  const handleTableChange = (
    _type: any,
    { sortField, sortOrder, data }: any
  ) => {
    // const currentIndex = (page - 1) * sizePerPage;
    // console.log(currentIndex);
    if (sortOrder === "asc") {
      data.sort((a, b) => {
        if (a[sortField] > b[sortField]) {
          return 1;
        } else if (b[sortField] > a[sortField]) {
          return -1;
        }
        return 0;
      });
    } else {
      data.sort((a, b) => {
        if (a[sortField] > b[sortField]) {
          return -1;
        } else if (b[sortField] > a[sortField]) {
          return 1;
        }
        return 0;
      });
    }
  };
  return (
    <div key={"remote_table_pageniation"}>
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          sizePerPageOptionRenderer,
          // showTotal: true,
          paginationTotalRenderer: (from, to, size) => customTotal({ from, to, size }),
          paginationSize: 4,
          pageStartIndex: 1,
          page,
          sizePerPage,
          totalSize,
          onPageChange, // callback function when page was changing
          onSizePerPageChange, // callback function when sizePerPage was changing
        })}
      >
        {({ paginationProps, paginationTableProps }) => (
          <>
            <div key="remote_table" className="mb-4 table-responsive">
              <BootstrapTable
                remote
                hover={true}
                bodyClasses="tbody-class"
                keyField={keyField}
                data={data}
                dataSize={totalCount}
                columns={columns}
                sort={{
                  dataField: sortField,
                  order: sortOrder,
                }}
                noDataIndication={t("common.noData")}
                rowEvents={rowEvents}
                onTableChange={handleTableChange}
                {...paginationTableProps}
              />
            </div>
            <div style={{ marginBottom: 30 }}>
              {sizePerPage ? <SizePerPageDropdownStandalone {...paginationProps} /> : null}
              {totalSize ? <PaginationTotalStandalone  {...paginationProps} /> : null}
              {page ? <PaginationListStandalone  {...paginationProps} /> : null}
            </div>
          </>
        )}
      </PaginationProvider>
    </div>
  )
}
export default RemoteTablePagination;