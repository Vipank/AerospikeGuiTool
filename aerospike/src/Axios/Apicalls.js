import axios from "axios";

export const connectToAerospike = async (hostIp, port) => {
	const response = await axios.post(`http://localhost:5000/connect`, {
		hostIp,
		port,
	});
	if (response.data.success) {
		alert(`Aerospike Connected to ${hostIp}:${port}`);
		return true;
	} else {
		alert("Couldn't connect. Please retry");
		return false;
	}
};

export const fetchSetList = async (namespace) => {
	const response = await axios.get(`http://localhost:5000/namespaces/${namespace}`);
	if (response.data.success) {
		return response.data.data;
	} else {
		alert(response.data.message);
	}
};

export const fetchRecords = async (namespace, set) => {
	const response = await axios.get(`http://localhost:5000/namespaces/${namespace}/${set}`);
	if (response.data.success) {
		return response.data.data;
	} else {
		alert(response.data.message);
	}
};
