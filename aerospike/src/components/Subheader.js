import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecords, fetchSetList } from "../Axios/Apicalls";

import { setSetList, setSlectedSet } from "../Redux/setAndNamespaceSlice";

function Subheader() {
	const dispatch = useDispatch();

	const { selectedNamespace, namespaceList, setList, selectedSet } = useSelector((state) => state.snReducer);

	const [records, setRecords] = useState([]);
	const [recordCount, setRecordCount] = useState(0);

	useEffect(() => {
		// fetchSets();
	}, []);

	const handleSetChange = (event) => {
		dispatch(setSlectedSet(event.target.value));
	};

	const fetchSets = async () => {
		const data = await fetchSetList(selectedNamespace);
		dispatch(setSetList(data));
	};

	const fetchRecordList = async () => {
		const { records: fetchedRecords, totalRecords: fetchedRedcordCount } = await fetchRecords(
			selectedNamespace,
			selectedSet
		);
		setRecordCount(fetchedRedcordCount);
		setRecords(fetchedRecords);
	};

	return (
		<div class="card">
			<div className="card-body">
				<div style={{ display: "flex", alignItems: "center" }}>
					<label>
						<b>Namespaces</b>
					</label>
					<select
						value={selectedNamespace}
						// defaultValue={sets.length > sets[0] ? 0 : "None"}
						class="form-select ms-2"
						aria-label="Default select example"
						style={{ maxWidth: "500px" }}
					>
						{namespaceList &&
							namespaceList.length > 0 &&
							namespaceList.map((option) => {
								return (
									<option key={option} value={option}>
										{option}
									</option>
								);
							})}
					</select>
					<label className="ms-2">
						<b>Sets</b>
					</label>
					<select
						value={selectedSet}
						onChange={handleSetChange}
						class="form-select ms-2"
						aria-label="Default select example"
						style={{ maxWidth: "500px" }}
					>
						{setList &&
							setList.length > 0 &&
							setList.map((option) => {
								return (
									<option key={option} value={option}>
										{option}
									</option>
								);
							})}
					</select>
					<button className="btn btn-dark ms-4" onClick={fetchRecordList}>
						<span class="material-icons me-1 align-middle">get_app</span>
						Fetch records
					</button>
				</div>
			</div>

			<div class="mt-5 container-fluid">
				Total Records Fetched : <b>{recordCount}</b>
				{records.map((record) => {
                    const bins = Object.keys(record.bins);
					return (
						<div class="card mt-3">
							<div className="card-body">
								<h6 class="card-title">Record key : {"122232"}</h6>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										backgroundColor: "#e9e9e9",
										padding: "8px",
										overflow: "scroll",
									}}
                                    class="me-3"
								>
									{bins.map((binKey) => {
										return (
											<>
												<div style={{ display: "flex", flexDirection: "column", maxWidth: `${100/bins.length}%` }}>
													<b>{binKey}</b>
													<p>
														{typeof record.bins[binKey] === "object"
															? JSON.stringify(record.bins[binKey])
															: record.bins[binKey]}
													</p>
													{/* Test */}
												</div>
												{/* <div class="vr"></div> */}
											</>
										);
									})}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Subheader;
