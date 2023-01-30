// libraries
import api from './lib/axios';

// styles
import './App.scss';

navigator.serviceWorker.register('/service-worker.js')
	.then(async serviceWorker => {
		let subscription = await serviceWorker.pushManager.getSubscription();

		if (!subscription) {
			const publicKeyResponse = await api.get('/push/public_key');

			subscription = await serviceWorker.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: publicKeyResponse.data.publicKey
			});
		}

		await api.post('/push/send', {
			subscription
		});
	});

function App() {
	return (
		<div className="App">
			<h1>Service Worker Notification Test</h1>
		</div>
	)
}

export default App;