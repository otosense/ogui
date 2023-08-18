import React, { Suspense } from "react";
import "./App.css";
import StoreView from "./Pages/StoreView";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "../utilities/ErrorBoundary";
import ErrorComponent from "../utilities/ErrorComponent";
const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* <BrowserRouter> */}
			<ErrorBoundary fallback={<ErrorComponent />}>
				<Suspense fallback={<h1>Loading..</h1>}>
					<StoreView />
				</Suspense>
			</ErrorBoundary>
			{/* </BrowserRouter> */}

		</QueryClientProvider >

	);
}

export default App;
