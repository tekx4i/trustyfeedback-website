import React, { useState, useEffect } from "react";
import { REACT_APP_API_URL } from "../../../constants/constants";
import { apiGet } from "../../../services/userAuth";
import { getStorage } from "../../../services/storage";
import { format } from "date-fns";
import Pagination from "../../../Shared/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import TableLoader from "../../../Shared/Loader/TableLoader";

const BillingInfo = () => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const token = getStorage("token");
  // pagination
  const [searchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(0);
  const [pagePagination, setPagePagination] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);
  const [pShow, setPshow] = useState(20);
  const [tRecords, setTRecords] = useState();

  const getPayments = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}user/packages`;
      const params = {
        limit: pShow,
        sort: "created_at:desc",
        page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
      };
      const response = await apiGet(URL, params, token);
      if (response.success === true) {
        setData(response.data.payload.records || []);
        setTotalPage(response?.data?.payload?.totalPages);
        setTRecords(response?.data?.payload?.totalRecords);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPayments();
  }, [searchParams, pagePagination]);

  return (
    <div className="">
      <h4 style={window.innerWidth < 992 ? { marginTop: 30, textAlign: "center" } : {}}>Billing Information</h4>
      <div className="table-responsive">
        {loading ? (
          <TableLoader />
        ) : data?.length > 0 ? (
          <>
            <table class="table bg-white table-bordered">
              <thead className="bg-light">
                <th className="p-3">Package Name</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Expiry Date</th>
              </thead>
              {data &&
                data.map((i) => (
                  <tr key={i}>
                    <td className="p-3">{i?.package?.name}</td>
                    <td className="p-3">${i.package?.price}</td>
                    <td className="p-3">{i.status}</td>
                    <td className="p-3">{format(new Date(i?.created_at), "MMM dd, yyyy")}</td>
                    <td className="p-3">{format(new Date(i?.expiry), "MMM dd, yyyy")}</td>
                  </tr>
                ))}
            </table>
            {data && data.length === 0 ? "" : <div className="d-flex justify-content-center">{tRecords > pShow ? <Pagination total={totalPage} page={pagePagination} setPage={setPagePagination} perPage={pShow} last_page={totalPage} /> : ""}</div>}
          </>
        ) : (
          <p className="p-3">No data found.</p>
        )}
      </div>
    </div>
  );
};

export default BillingInfo;
