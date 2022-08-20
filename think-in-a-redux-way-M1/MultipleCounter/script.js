// initial state
let initialState = [{ id: 0, value: 0 }];
let resetState = [{ id: 0, value: 0 }];

const component = (id, count) => {
  return `<div
      id="counter-container"
      class="p-4 mb-5 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
    >
      <div id=counter${id} class="text-2xl font-semibold">${count}</div>
      <div class="flex space-x-3">
        <button
          onclick="onIncrement(${id})"
          class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
        >
          Increment
        </button>
        <button
          onclick="onDecrement(${id})"
          class="bg-red-400 text-white px-3 py-2 rounded shadow"
        >
          Decrement
        </button>
      </div>
    </div>`;
};

//select counter section dom element
const counterSection = document.getElementById("counter-section");

//make counter container
let counter_container;

// select dom elements
const addCounterEl = document.getElementById("addCounter");
const resetEl = document.getElementById("reset");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADDCOUNTER = "addCounter";
const RESET = "reset";

// action creators
const increment = (value, id) => {
  return {
    type: INCREMENT,
    payload: value,
    id: id,
  };
};

const decrement = (value, id) => {
  return {
    type: DECREMENT,
    payload: value,
    id: id,
  };
};
const addCounter = () => {
  return {
    type: ADDCOUNTER,
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    return state.map((counter) => {
      if (counter.id == action.id) {
        return {
          ...counter,
          value: counter.value + action.payload,
        };
      }
      return counter;
    });
  } else if (action.type === DECREMENT) {
    return state.map((counter) => {
      if (counter.id == action.id) {
        return {
          ...counter,
          value: counter.value - action.payload,
        };
      }
      return counter;
    });
  }
  if (action.type === ADDCOUNTER) {
    return [
      ...state,
      {
        id: state.length,
        value: state.length * 2,
      },
    ];
  } else if (action.type === RESET) {
    return resetState;
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  initialState = state;
  console.log(initialState);
};

// update UI initially
updateUI();
store.subscribe(render);

//button click listeners
function onIncrement(id) {
  store.dispatch(increment(id * 2 + 2, id));
  updateCounter();
}
function onDecrement(id) {
  store.dispatch(decrement(id * 1 + 1, id));
  updateCounter();
}

addCounterEl.addEventListener("click", () => {
  store.dispatch(addCounter());
  updateUI();
  resetState.push({
    id: resetState.length,
    value: resetState.length * 2,
  });
});

resetEl.addEventListener("click", () => {
  store.dispatch(reset());
  updateCounter();
});

function updateUI() {
  counter_container = component(
    initialState.length - 1,
    initialState[initialState.length - 1].value
  );
  console.log(resetState);
  counterSection.insertAdjacentHTML("beforeend", counter_container);
}

function updateCounter() {
  initialState.map((counter) => {
    document.getElementById(`counter${counter.id}`).innerText = counter.value;
  });
}
