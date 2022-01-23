import "./App.css";
import Herobanner from "./components/HeroBanner/Herobanner";
import Header from "./components/layouts/Header/Header";
import Subheader from "./components/Subheader";

function App() {
	return (
		<>
			<Header />
			<main>
				<Herobanner />
				<Subheader />
				<div className="container-fluid mt-5">
					{/* <table class="table table-success table-striped">
						<thead>
							<td>Name</td>
              <td>Name</td>
              <td>Name</td>
              <td>Name</td>
              <td>Name</td>
						</thead>
						<tbody>
							<td>
								<tr>Vipan</tr>
							</td>
              <td>
								<tr>Vipan</tr>
							</td>
              <td>
								<tr>Vipan</tr>
							</td>
              <td>
								<tr>Vipan</tr>
							</td>
              <td>
								<tr>Vipan</tr>
							</td>
						</tbody>
					</table> */}
				</div>
			</main>
		</>
	);
}

export default App;
