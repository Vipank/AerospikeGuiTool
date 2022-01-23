import React, { useState } from "react";
import styles from './HeroBanner.module.css';

import { connectToAerospike, fetchSetList } from "../../Axios/Apicalls";

import { useSelector, useDispatch } from "react-redux";
import { setSetList } from "../../Redux/setAndNamespaceSlice";


function Herobanner() {
	const [isConnected, setIsConnected] = useState(false);
	const [hostIp, setHostIp] = useState("");
	const [port, setPort] = useState("");

	const dispatch = useDispatch();
	const { selectedNamespace } = useSelector((state) => state.snReducer);

	const hostChangeHandler = (event) => {
		setHostIp(event.target.value);
	};

	const portChangeHandler = (event) => {
		setPort(event.target.value);
	};

	const connect = async () => {
		const status = await connectToAerospike(hostIp, port);
		setIsConnected(status);
		if (status) {
			const data = await fetchSetList(selectedNamespace);
			dispatch(setSetList(data));
		}
	};

	return (
		<div class="card">
			<div className="card-body">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "center",
						}}
					>
						<div className="ms-2">
							<label>Host IP:</label>
							<input type={"text"} className="ms-2" value={hostIp} onChange={hostChangeHandler}></input>
						</div>
						<div className="ms-2">
							<label>Port:</label>
							<input type={"text"} className="ms-2" value={port} onChange={portChangeHandler}></input>
						</div>
						<button className="btn btn-primary ms-4" onClick={connect}>
							Connect
						</button>
						<div className="ms-2"></div>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "center",
						}}
					>
						Connection Status :
						<span className={`badge  ms-1 ${isConnected ? "bg-success" : "bg-danger"}`}>
							{isConnected ? "Connected" : "Not Connected"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Herobanner;
