import { useSelector, useDispatch } from "react-redux";
import CartCard from "./components/CartCard";
import ItemCard from "./components/ItemCard";
import items from "./data/items";
import { decrement } from "./redux/cart/actions";

function App() {
  const CartItems = useSelector((state) => state);
  const dispatch = useDispatch();

  const decrementHandler = (id) => {
    dispatch(decrement(id));
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="App">
      <div className="bg-gray-50 h-full md:h-screen">
        <div className="grid place-items-center">
          <h1 className="text-gray-900 font-bold text-3xl p-10 underline decoration-purple-500 decoration-4 underline-offset-8 mb-4">
            Shopping Cart
          </h1>
        </div>
        <div className="grid grid-cols-12 gap-6 container mx-auto">
          <div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-8">
            {items.map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={numberWithCommas(item.price)}
                  stock={item.stock}
                />
              );
            })}
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
            <div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4">
              {CartItems.items.map((item) => {
                const itemInfo = items.find(({ id }) => id === item.id);
                return (
                  <CartCard
                    key={itemInfo.id}
                    id={item.id}
                    name={itemInfo.name}
                    quantity={item.quantity}
                    decrementHandler={decrementHandler}
                  />
                );
              })}
              <div className="flex justify-center items-center text-center">
                <div className="text-xl font-semibold">
                  <p>Total Item</p>
                  <p className="text-5xl">{CartItems.items.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4">
              <div className="flex justify-center items-center text-center">
                <div className="text-xl font-semibold">
                  <p>Total Price</p>
                  <p className="text-5xl">
                    {numberWithCommas(CartItems.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
