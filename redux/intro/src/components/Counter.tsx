import { AppDispatch, RootState } from "@/app/store";
import {
	decrement,
	increment,
	incrementByAmount,
	reset,
} from "@/features/counter/counterSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
	const count = useSelector((state: RootState) => state.counter.count);
	const dispatch = useDispatch<AppDispatch>();

	const [incrementAmount, setIncrementAmount] = useState(0);

	const resetAll = () => {
		setIncrementAmount(0);
		dispatch(reset());
	};

	return (
		<section>
			<p>{count}</p>
			<div>
				<button onClick={() => dispatch(increment())}>+</button>
				<button onClick={() => dispatch(decrement())}>-</button>
			</div>
			<input
				type="number"
				value={incrementAmount}
				onChange={(e) =>
					setIncrementAmount(Number(e.target.value) || 0)
				}
			/>
			<div>
				<button
					onClick={() => dispatch(incrementByAmount(incrementAmount))}
				>
					Add amount
				</button>
				<button onClick={() => resetAll()}>Reset</button>
			</div>
		</section>
	);
};

export default Counter;
