import React, { useState } from "react";
import styles from "./Header.module.css";

function Header() {
	return (
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container-md">
				<a class="navbar-brand" href="#">
					Aerospike Gui Tool
				</a>
			</div>
		</nav>
	);
}

export default Header;
