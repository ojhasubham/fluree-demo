import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import TableView from "./TableView";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { flureeQuery } from "../../utils/flureeFunctions";
import AddProduct from "../Forms/AddProduct";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Products() {
  const classes = useStyles();
  const [payments, setPayments] = useState([]);
  const { path } = useRouteMatch();

  const fetchPayments = () => {
    const productQuery = {
      select: ["*"],
      from: "product"
    };
    flureeQuery(productQuery)
      .then((res) => {
        console.log("product", res);
        debugger
        const flatProduct = res.data.map((product) => {
          // const displayDate = new Date(payment.date);
          return {
            _id: product._id,
            productName: product['product/productName'],
            deliverables: product['product/deliverables'],
            price: product['product/price']
          };
        });
        console.log("paymentdata", flatProduct);
        setPayments(flatProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <React.Fragment>
        This is product page
      {payments.length === 0 ? null : (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TableView
              title="Payments"
              data={payments}
              columns={["Payment ID", "productName", "deliverables", "price"]}
              values={["_id", "productName", "deliverables", "price"]}
            />
          </Paper>
        </Grid>
      )}
      {(path === "/dash/products" ) && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AddProduct fetch={fetchPayments} />
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  );
}
