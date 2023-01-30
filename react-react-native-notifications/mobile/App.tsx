import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
})

export default function App() {
	async function scheduleNotification() {
		const trigger = new Date(Date.now());
		trigger.setMinutes(trigger.getMinutes() + 1);

		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'Olá, Luhmeiy 🤩',
				body: 'Como você está?'
			},
			trigger
		})
	}

	async function getScheduleNotification() {
		const schedules = await Notifications.getAllScheduledNotificationsAsync();
		console.log(schedules);
	}

	return (
		<View style={styles.container}>
			<Button title="Enviar Notificação" onPress={scheduleNotification} />
			<Button title="Pegar Notificações" onPress={getScheduleNotification} />
			<StatusBar barStyle="light-content" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 2,
		flexDirection:'column',
		justifyContent: 'center',
	}
});
