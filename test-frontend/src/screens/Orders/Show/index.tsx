import React from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import { map } from "lodash";
import Item from "./components/Item"
import { SingleOrderItem } from "~/screens/Orders/Show/types";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const [state, setState] = React.useState(new OrdersShowStore(useParams()));

    return (
      <div className={styles.screenWrapper}>
        <div className={styles.screen}>
          <div className={styles.items}>
          {state.order &&
map(state.order.items, (order: SingleOrderItem, index: number) => (
              <Item item={order} key={index}/>
            ))
            }
          </div>
        </div>
      </div>
    );
  }
);

export default OrdersShow;
